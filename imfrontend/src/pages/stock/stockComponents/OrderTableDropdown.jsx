import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import styles from "../Stock.module.css";
import { useState } from "react";

export default function OrderTableDropdown({ stockData, setStockData }) {
  const [orderFilter, setOrderFilter] = useState("ascending order");

  const OrderTable = (key) => {
    const newStockData = { ...stockData };
    //to order by string, boolean or number
    function orderByKey(array, key) {
      return array.sort((a, b) => {
        if (typeof a[key] === "string") {
          return a[key].localeCompare(b[key]);
        } else if (typeof a[key] === "boolean") {
          return a[key] === b[key] ? 0 : a[key] ? -1 : 1;
        } else {
          return a[key] - b[key];
        }
      });
    }
    //to reload the table
    newStockData.items = orderByKey(newStockData.items, key);
    //ez
    if (orderFilter === "descending order") {
      newStockData.items.reverse();
    }

    setStockData(newStockData);
  };
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Order by"
      className={styles.OrderTableDropdown}
    >
      {stockData.itemModel.map((model, j) => (
        <Dropdown.Item
          key={j}
          onClick={() => {
            OrderTable(model.key);
          }}
        >
          {model.key}
        </Dropdown.Item>
      ))}
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          if (orderFilter === "ascending order") {
            let newStockData = { ...stockData };
            newStockData.items = newStockData.items.reverse();
            setStockData(newStockData);
            setOrderFilter("descending order");
          }
        }}
      >
        descending order
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          if (orderFilter === "descending order") {
            let newStockData = { ...stockData };
            newStockData.items = newStockData.items.reverse();
            setStockData(newStockData);
            setOrderFilter("ascending order");
          }
        }}
      >
        ascending order
      </Dropdown.Item>
    </DropdownButton>
  );
}
