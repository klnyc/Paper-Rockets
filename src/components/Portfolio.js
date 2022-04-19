import { useEffect, useState } from "react";
import styles from "./styles/Portfolio.module.scss";

export const Portfolio = ({ user, goToCompany, roundNumber }) => {
  const [prices, setPrices] = useState([]);

  const renderColumnNames = () => (
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

  const renderPositions = () =>
    user.portfolio.map((position, index) => {
      const initialEquity = position.cost;
      const currentEquity = roundNumber(
        position.quantity * (prices.length ? prices[index].latestPrice : 0)
      );
      const averagePrice = roundNumber(position.cost / position.quantity);
      const profit = roundNumber(currentEquity - initialEquity);
      const percent = roundNumber((profit / initialEquity) * 100);
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
            ${prices.length ? prices[index].latestPrice : 0}
          </div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            ${averagePrice}
          </div>
          <div className={styles.positionColumn}>
            {profit >= 0 ? `$${profit}` : `-$${profit * -1}`}
          </div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            {percent}%
          </div>
          <div
            className={styles.positionColumn + " " + styles.positionColumnHide}
          >
            ${currentEquity}
          </div>
        </div>
      );
    });

  const queryPrices = () => {
    const version = process.env.REACT_APP_IEX_VERSION;
    const token = process.env.REACT_APP_IEX_API_KEY;
    const url = (ticker) =>
      `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    const priceRequests = user.portfolio.map((position) =>
      fetch(url(position.ticker))
    );

    Promise.all(priceRequests)
      .then((pricePromises) => {
        return Promise.all(
          pricePromises.map((pricePromise) => {
            return pricePromise.json().then((data) => data);
          })
        );
      })
      .then((priceData) => setPrices(priceData));
  };

  useEffect(queryPrices, [user.portfolio]);

  return (
    <div style={{ "overflow-y": "auto" }}>
      <div className={styles.balance}>${user.balance}</div>
      <div className={styles.portfolio}>
        {renderColumnNames()}
        {renderPositions()}
      </div>
    </div>
  );
};
