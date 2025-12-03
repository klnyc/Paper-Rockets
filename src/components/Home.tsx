import { useEffect, useState, type JSX } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.scss";
import { Header } from "./Header";
import { Portfolio } from "./Portfolio";
import { Watchlist } from "./Watchlist";
import { Account } from "./Account";
import { Company } from "./Company";
import { type DocumentData } from "firebase/firestore";
import { type Stock, type Stocks } from "../types";
import { priceChangeInterval } from "../constants";
import {
  generateInitialPrice,
  stocks as defaultStocks,
  generatePriceChange,
} from "../stocks";
import { Market } from "./Market";

interface MainProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const Home = ({ user, setUser }: MainProps): JSX.Element => {
  const [stockList, setStockList] = useState<Stocks | undefined>();
  const [stocksLoaded, setStocksLoaded] = useState<boolean>(false);
  const [company, setCompany] = useState<Stock | undefined>();
  const navigate = useNavigate();

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
    const updatePrices = () => {
      const stocks = { ...stockList };
      for (const stock in stocks) {
        stocks[stock].latestPrice += generatePriceChange();
      }
      setStockList(stocks);
    };

    if (stocksLoaded) {
      setTimeout(() => {
        setInterval(updatePrices, priceChangeInterval);
      }, priceChangeInterval);
    }
  }, [stocksLoaded]);

  const goToCompany = async (ticker: string) => {
    // const version = process.env.REACT_APP_IEX_VERSION;
    // const token = process.env.REACT_APP_IEX_API_KEY;
    // const url = (ticker) =>
    //   `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    // const response = await fetch(url(ticker));
    // const companyData = await response.json();
    // setCompany(companyData);
    // navigate(`/${companyData.symbol}`);

    if (!stockList) return;
    if (!stockList[ticker]) {
      console.log("Stock not found");
      return;
    }
    setCompany(stockList[ticker]);
    navigate(`/${ticker}`);
  };

  return (
    <>
      <Header stockList={stockList} setCompany={setCompany} />
      <div className={styles.home}>
        <Routes>
          {company?.ticker && (
            <Route
              path={`/${company.ticker}`}
              element={
                <Company company={company} user={user} setUser={setUser} />
              }
            />
          )}

          <Route
            path="/account"
            element={<Account user={user} setUser={setUser} />}
          />

          <Route
            path="/portfolio"
            element={
              <Portfolio
                user={user}
                goToCompany={goToCompany}
                stockList={stockList}
              />
            }
          />

          <Route
            path="*"
            element={<Market stockList={stockList} goToCompany={goToCompany} />}
          />
        </Routes>

        <Watchlist
          user={user}
          goToCompany={goToCompany}
          stockList={stockList}
        />
      </div>
    </>
  );
};
