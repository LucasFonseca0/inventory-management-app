import Loading from "../../components/loading/loading.component";
import YourStocksTitle from "./homeComponents/YourStocksTitle/YourStocksTitle";
import getAllStocks from "../../services/getAllStocks.service";
import StockCard from "./homeComponents/StockCard/StockCard";
import TextForCreateaNewStock from "./homeComponents/TextForCreateaNewStock/TextForCreateaNewStock";

import React, { useEffect, useState } from "react";

import styles from "./styles/home.module.css";

function Home() {
  const [stocks, setStocks] = useState();
  const isLoadingStocks = stocks === undefined;

  //getStocks
  useEffect(() => {
    const fetchData = async () => {
      const stocksData = await getAllStocks();

      setStocks(stocksData)
    };

    fetchData();
  }, []);

  function showStocks() {
    if (stocks.length !== 0) {
      return stocks.map((stock) => (
        <StockCard
          key={stock._id}
          stockId={stock._id}
          stockName={stock.name}
          lastUpdated={stock.lastUpdate}
        />
      ));
    }

    return <TextForCreateaNewStock />;
  }

  return (
    <div>
      <>
        <YourStocksTitle />
        {isLoadingStocks && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
        {stocks && (
          <div className={styles.showStockContainer}>{showStocks()}</div>
        )}
      </>
    </div>
  );
}

export default Home;
