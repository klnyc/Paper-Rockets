import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import styles from "./styles/App.module.scss";
import { Login } from "./Login";
import { Main } from "./Main";
import { Loading } from "./Loading";

export const App = (): JSX.Element => {
  const [user, setUser] = useState<DocumentData | undefined>();
  const [loading, setLoading] = useState(true);

  const load = (): void => {
    setTimeout(() => setLoading(false), 1000);
  };

  const checkSessionForUserID = (): void => {
    const sessionUserID = window.sessionStorage.getItem("userID");
    if (sessionUserID && !user) {
      const ref = doc(firestore, `users/${sessionUserID}`);
      getDoc(ref)
        .then((userData) => {
          if (userData) {
            setUser(userData.data());
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  const renderApp = (): JSX.Element => {
    if (loading) {
      return <Loading />;
    } else if (user?.userID) {
      return <Main user={user} setUser={setUser} />;
    } else {
      return <Login setUser={setUser} />;
    }
  };

  useEffect(load, []);
  useEffect(checkSessionForUserID, [user]);

  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route path="/">{renderApp()}</Route>
        </Switch>
      </div>
    </Router>
  );
};
