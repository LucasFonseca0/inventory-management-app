import styles from "../Stock.module.css";
import Table from "react-bootstrap/Table";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import EditItem from "./EditItem";

const StockTables = ({ stockData, setloading, setStockData }) => {
  const [currentItem, setCurrentItem] = useState();
  const [show, setShow] = useState(false);

  const handleClick = (item) => {
    setCurrentItem(item);
    setShow(true);
  };

  const ShowTableHead = () => {
    return stockData.itemModel.map((item, j) => (
      <th key={j} className={styles.tableHeader}>
        {item.key}
      </th>
    ));
  };

  const ShowRows = () => {
    return stockData.items.map((item, i) => (
      <tr
        key={i}
        className={styles.tableRow}
        onClick={() => handleClick(item)}
      >
        {stockData.itemModel.map((model, j) => (
          <td key={j} className={styles.tableData}>
            {model.type != "boolean" && item[model.key]}
            {model.type == "boolean" &&
              (item[model.key] ? <AiOutlineCheck /> : <AiOutlineClose />)}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className={styles.tableContainer}>
      <Table striped bordered hover className={styles.stockTable} responsive>
        <thead>
          <tr>
            <ShowTableHead />
          </tr>
        </thead>
        <tbody>
          <ShowRows />
        </tbody>
      </Table>
      {currentItem && (
        <EditItem
          item={currentItem}
          setShow={setShow}
          show={show}
          stockData={stockData}
          setCurrentItem={setCurrentItem}
          setloading={setloading}
          setStockData={setStockData}
        />
      )}
    </div>
  );
};

export default StockTables;
