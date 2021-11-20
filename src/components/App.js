import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./styles/App.module.scss";
import { Home } from "./Home";
import { Main } from "./Main";
import { Loading } from "./Loading";

export const App = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const checkSessionForUserID = () => {
    const sessionUserID = window.sessionStorage.getItem("userID");
    if (sessionUserID && !user.userID) {
      window.firebase
        .firestore()
        .collection("users")
        .doc(sessionUserID)
        .get()
        .then((userData) => setUser(userData.data()))
        .catch((error) => console.log(error.message));
    }
  };

  const renderApp = () => {
    if (loading) {
      return <Loading />;
    } else if (user.userID) {
      return <Main user={user} setUser={setUser} />;
    } else {
      return <Home setUser={setUser} />;
    }
  };

  useEffect(load);
  useEffect(checkSessionForUserID, [user.userID]);

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
