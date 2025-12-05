import { useEffect, useState, type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./styles/Home.module.scss";
import { type DocumentData } from "firebase/firestore";
import { type Stocks } from "../types";
import { Header } from "./Header";
import { priceChangeInterval } from "../constants";
import { Portfolio } from "./Portfolio";
import { Watchlist } from "./Watchlist";
import { Account } from "./Account";
import { Company } from "./Company";
import { Market } from "./Market";
import {
  generateInitialPrice,
  stocks as defaultStocks,
  generatePriceChange,
} from "../stocks";

interface HomeProps {
  user: DocumentData;
  setUser: (user?: DocumentData) => void;
}

export const Home = ({ user, setUser }: HomeProps): JSX.Element => {
  const [stockList, setStockList] = useState<Stocks | undefined>();
  const [stocksLoaded, setStocksLoaded] = useState<boolean>(false);

  const updatePrices = () => {
    const stocks = { ...stockList };
    for (const stock in stocks) {
      stocks[stock].latestPrice += generatePriceChange();
    }
    setStockList(stocks);
  };

  useEffect(() => {
    const stocks = { ...defaultStocks };
    for (const stock in stocks) {
      const defaultPrice = stocks[stock].latestPrice;
      stocks[stock].latestPrice = generateInitialPrice(defaultPrice);
    }
    setStockList(stocks);
    setStocksLoaded(true);
  }, []);

  useEffect(() => {
    if (stocksLoaded) {
      setTimeout(() => {
        setInterval(updatePrices, priceChangeInterval);
      }, priceChangeInterval);
    }
  }, [stocksLoaded]);

  return (
    <>
      <Header stockList={stockList} />
      <div className={styles.home}>
        <Routes>
          <Route path="/" element={<Market stockList={stockList} />} />

          <Route
            path="/portfolio"
            element={<Portfolio user={user} stockList={stockList} />}
          />

          <Route
            path="/account"
            element={<Account user={user} setUser={setUser} />}
          />

          <Route
            path="/stock/:ticker"
            element={
              <Company user={user} setUser={setUser} stockList={stockList} />
            }
          />
        </Routes>

        <Watchlist user={user} stockList={stockList} />
      </div>
    </>
  );
};
