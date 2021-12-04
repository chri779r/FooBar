import "./App.scss";
import "./index.scss";
import "antd/dist/antd.css";
import timeDiference from "./modules/timeDiference";

import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Form from "./components/Form/Form";
import Manager from "./components/Manager/Manager";
import Customer from "./components/Customer/Customer";
import Barteneder from "./components/Bartender/Bartender";
import Home from "./components/Home/Home";
//import { display } from "@mui/system";
import Nav1 from "./components/helpers/Nav1/Nav1";
import Footer from "./components/helpers/Footer/Footer";

function App() {
  const [windowDimension, setWindowDimension] = useState(null);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  //const [realTime, setRealTime] = useState(0);
  const [isCustomer, setIsCustomer] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  //const [orderTime, setRealTime] = useState(0);
  const [now, setNow] = useState(new Date().getTime());
  const [allOrders, setAllOrders] = useState([]);
  const [ordersReady, setOrdersReady] = useState([]);
  const [cart, setCart] = useState(false);
  const beerBasePrice = 40;

  function changeCartState(state) {
    setCart(state);
  }

  useEffect(() => {
    const URL = "https://los-amigos.herokuapp.com/";
    // (1) define within effect callback scope
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
        checkTaps(data);
        setAllOrders([...data.queue, ...data.serving]);

        //   setRealTime(json.timestamp);
      } catch (error) {
        console.log(error);
      }
    };

    const id = setInterval(() => {
      fetchData(); // <-- (3) invoke in interval callback
    }, 2000);

    function upDateNow() {
      setNow(new Date().getTime());
    }
    const id2 = setInterval(() => {
      upDateNow();
    }, 1000);

    fetch("https://los-amigos.herokuapp.com/beertypes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const beers = addStuff(data);
        console.log(beers);
        setProducts(beers);
        fetchData(); // <-- (2) invoke on mount
      });

    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);

  //-----------------------

  allOrders.forEach((order) => {
    if (data.bartenders.find((bartender) => bartender.servingCustomer === order.id)) {
      const bartender = data.bartenders.filter((bartender) => bartender.servingCustomer === order.id)[0];
      if (bartender.statusDetail === "receivePayment") {
        const tookenTime = timeDiference(order.startTime, now);
        upDateOrdersReady({ id: order.id, tookenTime: tookenTime });
      }
    }
  });

  //-----------------------
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  function checkTaps(info) {
    setProducts(function (oldProducts) {
      return oldProducts.map((item) => {
        const copy = { ...item };
        if (info.taps.filter((tap) => tap.beer === item.name).length > 0) {
          copy.onTap = true;
        } else {
          copy.onTap = false;
        }

        return copy;
      });
    });
  }

  function addStuff(data) {
    return data.map((beer, i) => {
      const copy = {
        ...beer,
        id: (i < 9 ? "b0" : "b") + (i + 1),
        onTap: false,
        price: function () {
          return Math.round(this.alc + beerBasePrice);
        },
        amount: 1,
        totalPrice: function () {
          return this.amount * this.price();
        },
      };
      return copy;
    });
  }

  function upDateOrdersReady(order) {
    if (!ordersReady.find((element) => element.id === order.id)) {
      setOrdersReady(function (oldOrdersReady) {
        const copy = [order, ...oldOrdersReady];
        return copy.slice(0, 10);
      });
    }
    return;
  }

  return (
    <div className="App">
      {isCustomer ? (
        <header className="mobileHeader">
          <h1>Welcome to FooBar</h1>
          <Nav1 isMobile={isMobile} cart={cart} changeCartState={changeCartState} />
        </header>
      ) : (
        <header>
          <h1>FooBar</h1>
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/Manager">Manager</Link>
            <Link to="/Bartender">Bartenders</Link>

            <Link
              to="/Customers"
              onClick={() => {
                setIsCustomer(true);
              }}
            >
              Customers
            </Link>
          </nav>
        </header>
      )}

      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Manager" element={<Manager {...data} now={now} />} />
          <Route exact path="/Bartender" element={<Barteneder {...data} now={now} upDateOrdersReady={upDateOrdersReady} ordersReady={ordersReady} />} />
          <Route exact path="/Customers" element={<Customer {...data} now={now} ordersReady={ordersReady} />} />
          <Route exact path="/Form" element={<Form products={products} cart={cart} isMobile={isMobile} ordersReady={ordersReady} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
