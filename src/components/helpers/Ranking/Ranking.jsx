import React, { useRef, useEffect } from "react";
import "./Ranking.scss"

import Chart from 'chart.js/auto';


export default function TopBeer(props) {
    const ranking = [...props.storage];
    // let rankingSort = ranking.sort((a, b)=>a.amount-b.amount); FJERNET FOR VIASUAL
    // const rankingMap = rankingSort.map((keg, i ) => <li key={i}>{keg.name}</li> ); BRUGES IKKE

    const rankingChartRef = useRef()
    useEffect(() =>{ 
      if (!rankingChartRef.current) {
        // Stopper execution, hvis current ikke er sat
        return
      }
  
      console.log(rankingChartRef.current);
      const myChart = new Chart(rankingChartRef.current, {
        type: 'bar',
        data: {
            labels: ranking.map(beer => beer.name),
              datasets: [{
                label: '',
                data: ranking.map(beer => beer.amount),
                backgroundColor: [
                  'rgb(255, 29, 107)',
                  'rgb(122, 208, 200)',
                  'rgb(255, 227, 59)',
                  'rgb(112, 21, 216)',
                  'rgb(202, 146, 41)',
                  'rgb(42, 158, 253)',
                  'rgb(255, 99, 132)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 205, 86)',
                  'rgb(201, 203, 207)',
                  'rgb(54, 162, 235)'
                ]
              }]
        },
        options: {
            maintainAspectRatio: false,          
            plugins: {
            legend: {
              display: false
            },
            tooltip: {
              titleFont: {
                size: 18
              },
              bodyFont: {
                size: 18
              }
            }
          },
          scales: {
            x: {
              categoryPercentage: .1,
              barPercentage: 1,
                ticks: {
                  color: 'rgb(202, 146, 41)',
                  font: {
                    size: 16,
                  }
                }
            }
        }
        }

    });
  myChart.canvas.parentNode.style.padding = '2rem'; 

    return () => {
        //NÅR DATA SKIFTER SKAL DEN "FJERNE" CHARTEN OG LAVE EN NY
      myChart.destroy();
    }
    },[rankingChartRef.current, ranking.length]) 

    // function responsiveFonts(){
    //   if (window.outerWidth > 819) {
    //     Chart.defaults.font.size = 18
    //   }
    // }

    return (
        <div className="topBeer">
            <h4>Top Sellers</h4>
            <canvas ref={rankingChartRef} width="200" height="200"></canvas>
        </div>
    )

}
