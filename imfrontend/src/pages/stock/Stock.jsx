import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getStockById from "../../services/getStockById.service";

import styles from "./Stock.module.css";
import StockTables from "./stockComponents/StockTables";
import OrderTableDropdown from "./stockComponents/OrderTableDropdown";
import Loading from "../../components/loading/loading.component";
import NewItem from "./stockComponents/NewItem";
import DeleteStock from "./stockComponents/DeleteStock";

function Stock() {
  const { id } = useParams();

  const [stockData, setStockData] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const stock = await getStockById(id);

      setStockData(stock);
      setloading(false);
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.stockContainer}>
      <div>
        {stockData && (
          <>
            <header >
              <DeleteStock
                stockData={stockData}
                setloading={setloading}
              
              />
              <h1 className={styles.stockTitle}>{stockData.name}</h1>
            </header>
            <div className={styles.buttons}>
              <OrderTableDropdown
                stockData={stockData}
                setStockData={setStockData}
              />
              <NewItem stockData={stockData} setStockData={setStockData} setloading={setloading}/>
            </div>
            <StockTables
              stockData={stockData}
              setloading={setloading}
              setStockData={setStockData}
            />
          </>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Stock;
