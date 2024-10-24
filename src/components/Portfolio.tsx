import { useEffect, useState } from "react";
import styles from "./styles/Portfolio.module.scss";
import { displayNumber } from "../utility";
import { DocumentData } from "firebase/firestore";
import { Stock, Position, Stocks } from "../types";

interface PortfolioProps {
  user: DocumentData;
  goToCompany: (ticker: string) => void;
  stockList?: Stocks;
}

export const Portfolio = ({
  user,
  goToCompany,
  stockList,
}: PortfolioProps): JSX.Element => {
  const [prices, setPrices] = useState<Stock[]>([]);

  const renderColumnNames = (): JSX.Element => (
    <div className={`${styles.positionRow} ${styles.positionTableTop}`}>
      <div className={styles.positionColumn}>Ticker</div>
      <div className={styles.positionColumn + " " + styles.positionColumnHide}>
        Quantity
      </div>
      <div className={styles.positionColumn}>Current Price</div>
      <div className={styles.positionColumn + " " + styles.positionColumnHide}>
        Average Price
      </div>
      <div className={styles.positionColumn}>Profit</div>
      <div className={styles.positionColumn + " " + styles.positionColumnHide}>
        Percent
      </div>
      <div className={styles.positionColumn + " " + styles.positionColumnHide}>
        Equity
      </div>
    </div>
  );

  const renderPositions = (): JSX.Element => {
    if (!prices.length) return <></>;
    return user.portfolio.map((position: Position, index: number) => {
      const initialEquity = position.cost;
      const currentEquity = position.quantity * prices[index].latestPrice;
      const averagePrice = position.cost / position.quantity;
      const profit = currentEquity - initialEquity;
      const percent = (profit / initialEquity) * 100;

      return (
        <div
          key={index}
          className={styles.positionRow}
          onClick={() => goToCompany(position.ticker)}
        >
          <div className={styles.positionColumn}>{position.ticker}</div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            {position.quantity}
          </div>
          <div className={styles.positionColumn}>
            ${displayNumber(prices[index].latestPrice)}
          </div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            ${displayNumber(averagePrice)}
          </div>
          <div className={styles.positionColumn}>${displayNumber(profit)}</div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            {displayNumber(percent)}%
          </div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            ${displayNumber(currentEquity)}
          </div>
        </div>
      );
    });
  };

  const renderEmptyState = (): JSX.Element => {
    return <div className={styles.empty}>You do not own any stocks.</div>;
  };

  const queryPrices = (): void => {
    // const version = process.env.REACT_APP_IEX_VERSION;
    // const token = process.env.REACT_APP_IEX_API_KEY;
    // const url = (ticker) =>
    //   `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    // const priceRequests = user.portfolio.map((position) =>
    //   fetch(url(position.ticker))
    // );
    // Promise.all(priceRequests)
    //   .then((pricePromises) => {
    //     return Promise.all(
    //       pricePromises.map((pricePromise) => {
    //         return pricePromise.json().then((data) => data);
    //       })
    //     );
    //   })
    //   .then((priceData) => setPrices(priceData));

    if (!stockList || !user.portfolio?.length) return;
    const portfolioPrices: Stock[] = user.portfolio.map(
      (position: Position) => stockList[position.ticker]
    );
    setPrices(portfolioPrices);
  };

  useEffect(queryPrices, [user.portfolio, stockList]);

  return (
    <div style={{ overflowY: "auto" }}>
      <div className={styles.balance}>${user.balance}</div>
      <div className={styles.portfolio}>
        {renderColumnNames()}
        {user.portfolio.length ? renderPositions() : renderEmptyState()}
      </div>
    </div>
  );
};
