import "./Manager.scss";
import Inventory from "../helpers/Inventory/Inventory";
import Workers from "../helpers/Workers/Workers";
import TopBeer from "../helpers/Ranking/Ranking";
import Sales from "../helpers/Sales/Sales";

export default function Manager(props) {
  if (!props.bartenders) {
    return null;
  }

  return (
    <>
      <section className="manager">
        <div className="charts">
          <Sales className="sales" {...props} />
          <TopBeer className="topBeer" {...props} />
          {/* <Workers className="workers" {...props} /> */}
        </div>
        <div>
        <Inventory className="inventory" {...props} />
        </div>
        
      </section>
    </>
  );
}
