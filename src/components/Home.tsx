import { useState } from "react";
import { Header } from "./Header";
import { Portfolio } from "./Portfolio";
import { Watchlist } from "./Watchlist";
import { Account } from "./Account";
import { Company } from "./Company";
import { Route, Switch, useHistory } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { Stock } from "../types";

interface MainProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const Home = ({ user, setUser }: MainProps): JSX.Element => {
  const [company, setCompany] = useState<Stock | undefined>();
  const history = useHistory();

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
