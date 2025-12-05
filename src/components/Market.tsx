import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Market.module.scss";
import { type Stock, type Stocks } from "../types";
import { displayNumber } from "../utility";

interface MarketProps {
  stockList?: Stocks;
}

export const Market = ({ stockList }: MarketProps): JSX.Element => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[] | undefined>();

  useEffect(() => {
    if (!stockList) return;
    setStocks(Object.entries(stockList).map((stock) => stock[1]));
  }, [stockList]);

  return (
    <div className={styles.market}>
      <div className={`${styles.stockRow} ${styles.stockTableTop}`}>
        <div className={styles.stockColumn}>Ticker</div>
        <div className={styles.stockColumn}>Company</div>
        <div className={styles.stockColumn}>Current Price</div>
      </div>
      {stocks?.map((stock, index) => (
        <div
          className={styles.stockRow}
          onClick={() => navigate(`/stock/${stock.ticker}`)}
          key={index}
        >
          <div className={styles.stockColumn}>{stock.ticker}</div>
          <div className={styles.stockColumn}>{stock.name}</div>
          <div className={styles.stockColumn}>
            {displayNumber(stock.latestPrice)}
          </div>
        </div>
      )) || <></>}
    </div>
  );
};
