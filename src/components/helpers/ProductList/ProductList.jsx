import { useState } from "react";
import Product from "./Product/Product";
import "./ProductList.scss";

export default function ProductList(props) {
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState(1);

  function sorting(e) {
    if (e.currentTarget.dataset.sortDirection === "asc") {
      e.target.dataset.sortDirection = "desc";
      setDirection(-1);
    } else {
      e.target.dataset.sortDirection = "asc";
      setDirection(1);
    }

    setSortBy(e.currentTarget.dataset.sort);
  }

  function sortBeers(a, b) {
    if (a[sortBy] > b[sortBy]) {
      return 1 * direction;
    } else {
      return -1 * direction;
    }
  }

  let displayList = [...props.beers].sort(sortBeers);
  const beers = displayList.map((beer) => <Product addToBasket={props.addToBasket} addMoreBeer={props.addMoreBeer} key={beer.id} {...beer} />);

  return (
    <section className="ProductList">
      <h2>Our selection</h2>
      <div className="sortingOptions">
        <h4>Sorty by:</h4>
        <button data-sort-direction="asc" data-sort="name" onClick={sorting}>
          Name
        </button>{" "}
        |
        <button data-sort-direction="asc" data-sort="category" onClick={sorting}>
          Type
        </button>{" "}
        |
        <button data-sort-direction="asc" data-sort="alc" onClick={sorting}>
          % alcohol
        </button>
      </div>
      <section>{beers}</section>
    </section>
  );
}
