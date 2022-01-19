import React, { useRef, useEffect } from "react";
import "./Inventory.scss";

import Chart from 'chart.js/auto';


export default function Inventory(props) {
  function Keg(props) {
    return (
      <li>
        {props.name}: {props.amount} left
      </li>
    );
  }

  function Depot(props) {
    const kegs = props.storage.map((keg, i) => <Keg key={(i < 9 ? "keg0" : "keg") + (i + 1)} {...keg} />);
    return (
      <section className="Depot">
        <h4>Kegs in depot</h4>
        <ul>{kegs}</ul>
      </section>
    );
  }

  return (
    <div className="inventoryList">
      <h3>Inventory</h3>
      <Depot {...props} />
    </div>
  );
}
