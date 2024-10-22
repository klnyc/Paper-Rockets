import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/compat/app";
import styles from "./styles/App.module.scss";
import { Home } from "./Home";
import { Main } from "./Main";
import { Loading } from "./Loading";
import { DocumentData } from "firebase/firestore";

export const App = () => {
  const [user, setUser] = useState<DocumentData | undefined>();
  const [loading, setLoading] = useState(true);

  const load = () => {
    setTimeout(() => setLoading(false), 1000);
  };

  const checkSessionForUserID = () => {
    const sessionUserID = window.sessionStorage.getItem("userID");
    if (sessionUserID && !user) {
      firebase
        .firestore()
        .collection("users")
        .doc(sessionUserID)
        .get()
        .then((userData) => {
          if (userData) {
            setUser(userData.data());
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  const renderApp = () => {
    if (loading) {
      return <Loading />;
    } else if (user?.userID) {
      return <Main user={user} setUser={setUser} />;
    } else {
      return <Home setUser={setUser} />;
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
