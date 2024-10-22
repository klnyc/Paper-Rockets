import { DocumentData } from "firebase/firestore";
import styles from "./styles/Watchlist.module.scss";
import { useState, useEffect } from "react";
import { Company } from "../types";

interface WatchListProps {
  user: DocumentData;
  goToCompany: (ticker: string) => void;
}

export const Watchlist = ({
  user,
  goToCompany,
}: WatchListProps): JSX.Element => {
  const [watchlist, setWatchlist] = useState<Company[]>([]);

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
  };

  useEffect(queryWatchlist, [user.watchlist]);

  return (
    <div className={styles.watchlist}>
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
