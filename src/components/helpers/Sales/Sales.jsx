import React, { useRef, useEffect } from "react";
import "./Sales.scss";
import Chart from 'chart.js/auto';


export default function Sales(props) {
    
  if (!props.products) {
    return null;
  }

const namePrice = props.products.map((beer) => {
    const name = beer.name.toLowerCase().split(" ").join("");
    const total = props.ranking[name] * beer.price();
    return total;
  });

  const initialValue = 0;
  let sum = namePrice.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, initialValue);

  const totalChartRef = useRef()
  useEffect(() =>{ 
    if (!totalChartRef.current) {
      // Stopper execution, hvis current ikke er sat
      return
    }

    const total = 13000
    console.log(totalChartRef.current);
    const myChart = new Chart(totalChartRef.current, {
      type: 'doughnut',
      data: {
        labels: [
          'Todays Income',
          'Todays Goal',
        ],
        datasets: [{
          label: 'Income chart',
          data: [sum, total-sum],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
      }
  });
  return () => {
    myChart.destroy();
  }
  },[totalChartRef.current, sum]) 

//---------------------------------//
  const ordersChartRef = useRef()
  useEffect(() =>{ 
    if (!ordersChartRef.current) {
      // Stopper execution, hvis current ikke er sat
      return
    }

    const total = 100
    console.log(ordersChartRef.current);
    const myChart = new Chart(ordersChartRef.current, {
      type: 'doughnut',
      data: {
        labels: [
          'Number of orders',
          'Todays Goal',
        ],
        datasets: [{
          label: 'Orders Chart',
          data: [props.dayOrders, total-props.dayOrders],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
      }
  });
  return () => {
    myChart.destroy();
  }
  },[ordersChartRef.current, props.dayOrders]) 

  
    
      console.log(namePrice);
      console.log(sum);


    return (
<>
<div>
<canvas ref={totalChartRef} width="400" height="400"></canvas>
<canvas ref={ordersChartRef} width="400" height="400"></canvas>
</div>

<div className="sales">
            <div className="salesHeader">
              <h3>Todays sales</h3>
          </div>
            <div className="figures">
            <div>
                <h4>Total income</h4>
                <p>{sum} kr</p>
            </div>
            <div>
                <h4>Total Orders</h4>
                <p>{props.dayOrders}</p>
            </div>
            <div>
                <h4>Average order income</h4>
                <p>{Math.round(sum/props.dayOrders).toFixed(0)} kr</p>
            </div>
          </div>
        </div>
</>

        
    )
}