import { Link } from 'react-router-dom';
import styles from './StockCard.module.css'
import moment from 'moment';

export default function StockCard({stockName, lastUpdated,stockId}){


let lastUpdatedFormatted = typeof lastUpdated === 'string' ? lastUpdated.split("by")[0] : lastUpdated;


let date = moment(new Date(lastUpdatedFormatted));

let formattedDate = date.fromNow();



    return(
        <div className={styles.container}>
            <div className={styles.backDecoration}></div>
            <Link to={`/stock/${stockId}`} className={styles.StockCard}>
                <h2>{stockName}</h2>
                <p>Last updated: {formattedDate}</p>
            </Link>
        </div>
    )
}