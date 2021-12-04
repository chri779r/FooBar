import "./MyBasket.scss";
import { useState } from "react";
import Checkout from "../Checkout/Checkout";

export default function MyBasket(props) {
  const [amount, setAmount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [newAmount, setNewAmount] = useState(0);
  const onClick = () => setShowResults(true);
  const initialValue = 0;
  let sum = props.basket.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.price();
  }, initialValue);

  let total = props.basket.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.amount;
  }, initialValue);

  const basket = [...props.basket].filter((element) => element.amount > 0);
  const payload = basket.map((item) => {
    const order = {
      amount: item.amount,
      name: item.name,
    };
    return order;
  });
  // console.log(payload);
  const orders = basket.map((order, i) => (
    <li className="addedItem" key={i}>
      <button class="deleteItem" data-name={order.name} onClick={noBeer}>
        X
      </button>
      {order.amount} {order.name} ${order.price()}
      <div className="actions">
        <div className="amountWrapper">
          <button data-name={order.name} onClick={handleClickMinus}>
            -
          </button>
          <input type="number" min="1" max="100" onInput={oneMore} data-name={order.name} value={order.amount} />
          <button data-name={order.name} onClick={handleClickPlus}>
            +
          </button>
        </div>
      </div>
    </li>
  ));

  function noBeer(e) {
    const productName = e.currentTarget.dataset.name;
    props.deleteBeer(productName);
  }

  function oneMore(e) {
    const beerValue = e.currentTarget.value;
    const productName = e.currentTarget.dataset.name;

    setNewAmount(beerValue);
    props.addMoreBeer(Number(beerValue), productName);
    // console.log(newAmount, productName);
  }

  function handleClickPlus(e) {
    // console.log(props.id);
    const productName = e.currentTarget.dataset.name;
    props.increaseAmount(productName);
  }

  function handleClickMinus(e) {
    // console.log(props.id);
    const productName = e.currentTarget.dataset.name;
    props.decreaseAmount(productName);
  }

  return (
    <div className="MyBasket">
      <h2>Your order</h2>
      <ul>{orders}</ul>
      <div className="totalOrder">
        <p>{total} items</p>
        <p>
          Total: <span> ${sum}</span>
        </p>
      </div>
      {props.basket.length > 0 && (
        <div>
          <button onClick={onClick}>Checkout</button>
          {showResults ? <Checkout resetBasket={props.resetBasket} payload={payload} addID={props.addID} /> : null}
        </div>
      )}
    </div>
  );
}
