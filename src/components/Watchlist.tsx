import { type DocumentData } from "firebase/firestore";
import styles from "./styles/Watchlist.module.scss";
import { useState, useEffect, type JSX } from "react";
import { type Stock, type Stocks } from "../types";

interface WatchListProps {
  user: DocumentData;
  goToCompany: (ticker: string) => void;
  stockList?: Stocks;
}

export const Watchlist = ({
  user,
  goToCompany,
  stockList,
}: WatchListProps): JSX.Element => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);

  const queryWatchlist = () => {
    // const version = process.env.REACT_APP_IEX_VERSION;
    // const token = process.env.REACT_APP_IEX_API_KEY;
    // const url = (ticker) =>
    //   `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    // const watchlistRequests = user.watchlist.map((ticker) =>
    //   fetch(url(ticker))
    // );
    // Promise.all(watchlistRequests)
    //   .then((companyPromises) => {
    //     return Promise.all(
    //       companyPromises.map((companyPromise) => {
    //         return companyPromise.json().then((data) => data);
    //       })
    //     );
    //   })
    //   .then((companyData) => setWatchlist(companyData));

    if (!stockList || !user.watchlist.length) return;
    const watchlistPrices: Stock[] = user.watchlist.map(
      (ticker: string) => stockList[ticker]
    );
    setWatchlist(watchlistPrices);
  };

  useEffect(queryWatchlist, [user.watchlist, stockList]);

  return (
    <div id={styles.watchlist}>
      <div className={styles.watchlistHeader}>Watchlist</div>
      {watchlist.map((company, index) => (
        <div
          key={index}
          className={styles.watchlistRow}
          onClick={() => goToCompany(company.ticker)}
        >
          <div className={styles.watchlistRowSection}>{company.ticker}</div>
          <div className={styles.watchlistRowSection}>
            ${company.latestPrice.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};
