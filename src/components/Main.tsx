import { useState } from "react";
import { Header } from "./Header";
import { Portfolio } from "./Portfolio";
import { Watchlist } from "./Watchlist";
import { Account } from "./Account";
import { CompanyPage } from "./CompanyPage";
import { Route, Switch, useHistory } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { Company } from "../types";

interface MainProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const Main = ({ user, setUser }: MainProps) => {
  const [company, setCompany] = useState<Company | undefined>();
  const history = useHistory();
  const roundNumber = (number: number) => Number(number.toFixed(2));

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
            <CompanyPage
              company={company}
              user={user}
              setUser={setUser}
              roundNumber={roundNumber}
            />
          </Route>
        )}

        <Route exact path="/account">
          <Account user={user} setUser={setUser} />
        </Route>

        <Route path="/">
          <Portfolio
            user={user}
            goToCompany={goToCompany}
            roundNumber={roundNumber}
          />
        </Route>
      </Switch>

      <Watchlist user={user} goToCompany={goToCompany} />
    </>
  );
};