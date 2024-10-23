import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Portfolio } from "./Portfolio";
import { Watchlist } from "./Watchlist";
import { Account } from "./Account";
import { Company } from "./Company";
import { DocumentData } from "firebase/firestore";
import { Stock, Stocks } from "../types";
import { priceChangeInterval } from "../constants";
import {
  generateInitialPrice,
  stocks as defaultStocks,
  generatePriceChange,
} from "../stocks";

interface MainProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const Home = ({ user, setUser }: MainProps): JSX.Element => {
  const [stockList, setStockList] = useState<Stocks | undefined>();
  const [stocksLoaded, setStocksLoaded] = useState<boolean>(false);
  const [company, setCompany] = useState<Stock | undefined>();
  const history = useHistory();

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
    // history.push(`/${companyData.symbol}`);
  };

  return (
    <>
      <Header setCompany={setCompany} />

      <Switch>
        {company?.ticker && (
          <Route exact path={`/${company.ticker}`}>
            <Company company={company} user={user} setUser={setUser} />
          </Route>
        )}

        <Route exact path="/account">
          <Account user={user} setUser={setUser} />
        </Route>

        <Route path="/">
          <Portfolio user={user} goToCompany={goToCompany} />
        </Route>
      </Switch>

      <Watchlist user={user} goToCompany={goToCompany} />
    </>
  );
};
