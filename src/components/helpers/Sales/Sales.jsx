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
            'rgb(112, 21, 216)',
            'rgb(255, 29, 107)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { tooltip: {
          titleFont: {
            size: 18
          },
          bodyFont: {
            size: 18
          }
        }}
        
      }
  });

  // myChart.canvas.parentNode.style.height = '300px'; 
  // myChart.canvas.parentNode.style.width = '300px'; 

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
            'rgb(112, 21, 216)',
            'rgb(255, 29, 107)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { tooltip: {
          titleFont: {
            size: 18
          },
          bodyFont: {
            size: 18
          }
        }}
        
      }
  });
  // myChart.canvas.parentNode.style.height = '300px'; 
  // myChart.canvas.parentNode.style.width = '300px'; 

  return () => {
    myChart.destroy();
  }
  },[ordersChartRef.current, props.dayOrders]) 
//---------------------------------//
  const avgChartRef = useRef()
  useEffect(() =>{ 
    if (!avgChartRef.current) {
      // Stopper execution, hvis current ikke er sat
      return
    }

    const total = 200
    const avgOrder = Math.round(sum/props.dayOrders).toFixed(0);
    console.log(avgChartRef.current);
    const myChart = new Chart(avgChartRef.current, {
      type: 'doughnut',
      data: {
        labels: [
          'Avg order income',
          'Todays Goal',
        ],
        datasets: [{
          label: 'Average Chart',
          data: [avgOrder, total-avgOrder],
          backgroundColor: [
            'rgb(112, 21, 216)',
            'rgb(255, 29, 107)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { 
          tooltip: {
            titleFont: {
              size: 18
            },
            bodyFont: {
              size: 18
            }
          },
        }
      }
  });

  // myChart.canvas.parentNode.style.height = '300px'; 
  // myChart.canvas.parentNode.style.width = '300px'; 
  return () => {
    myChart.destroy();
  }
  },[avgChartRef.current, sum, props.dayOrders]) 

    
      // console.log(namePrice);
      // console.log(sum);


    return (
<>
  <div className="sales">
    <div className="salesHeader">
      <h3>Todays sales</h3>
    </div>
    <div className="figures">
      <div>
        <h4>Total income</h4>
        <canvas ref={totalChartRef} width="300" height="300"></canvas>
      </div>
      <div>
        <h4>Total Orders</h4>
        <canvas ref={ordersChartRef} width="300" height="300"></canvas>
      </div>
      <div>
        <h4>Avg order income</h4>
        <canvas ref={avgChartRef} width="300" height="300"></canvas>
      </div>
    </div>
  </div>
</>

        
    )
}