import React, { useRef, useEffect } from "react";
import "./Ranking.scss"

import Chart from 'chart.js/auto';



export default function TopBeer(props) {
    const ranking = [...props.storage];
    // let rankingSort = ranking.sort((a, b)=>a.amount-b.amount); FJERNET FOR VIASUAL
    // const rankingMap = rankingSort.map((keg, i ) => <li key={i}>{keg.name}</li> ); BRUGES IKKE

    const ordersChartRef = useRef()
    useEffect(() =>{ 
      if (!ordersChartRef.current) {
        // Stopper execution, hvis current ikke er sat
        return
      }
  
      console.log(ordersChartRef.current);
      const myChart = new Chart(ordersChartRef.current, {
        type: 'bar',
        data: {
            labels: ranking.map(beer => beer.name),
              datasets: [{
                label: 'My First Dataset',
                data: ranking.map(beer => beer.amount),
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 205, 86)',
                  'rgb(201, 203, 207)',
                  'rgb(54, 162, 235)'
                ]
              }]
        }
    });
    return () => {
        //NÅR DATA SKIFTER SKAL DEN "FJERNE" CHARTEN OG LAVE EN NY
      myChart.destroy();
    }
    },[ordersChartRef.current, ranking.length]) 

    return (
        <div className="topBeer">
            <h3>Top Sellers</h3>
            <canvas ref={ordersChartRef} width="150" height="150"></canvas>
        </div>
    )

}
