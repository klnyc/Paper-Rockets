import styles from "./styles/Market.module.scss";
import { Stock, Stocks } from "../types";
import { useEffect, useState } from "react";
import { displayNumber } from "../utility";

interface MarketProps {
  stockList?: Stocks;
  goToCompany: (ticker: string) => void;
}

export const Market = ({
  stockList,
  goToCompany,
}: MarketProps): JSX.Element => {
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
          onClick={() => goToCompany(stock.ticker)}
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
