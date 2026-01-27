import { useState, useEffect, useRef, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { type DocumentData } from "firebase/firestore";
import styles from "./styles/Watchlist.module.scss";
import { type Stock, type Stocks } from "../types";
import { ScrollHint, scrollHintHandler } from "./ScrollHint";

interface WatchListProps {
  user: DocumentData;
  stockList?: Stocks;
}

export const Watchlist = ({ user, stockList }: WatchListProps): JSX.Element => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = () => {
    setShowScrollHint(scrollHintHandler(containerRef.current));
  };

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
      (ticker: string) => stockList[ticker],
    );
    setWatchlist(watchlistPrices);
  };

  useEffect(queryWatchlist, [user.watchlist, stockList]);

  useEffect(() => {
    updateScrollHint();
  }, [user.watchlist]);

  return (
    <div className={styles.watchlist}>
      <div className="text-center fw-bold">Watchlist</div>
      {watchlist.map((company, index) => (
        <div
          key={index}
          className={styles.watchlistRow}
          onClick={() => navigate(`/stock/${company.ticker}`)}
        >
          <div>{company.ticker}</div>
          <div>${company.latestPrice.toFixed(2)}</div>
        </div>
      ))}

      {showScrollHint && <ScrollHint />}
    </div>
  );
};
