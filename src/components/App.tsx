import { useState, useEffect, type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import styles from "./styles/App.module.scss";
import { Login } from "./Login";
import { Home } from "./Home";
import { Loader } from "./Loader";

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

  useEffect(load, []);
  useEffect(checkSessionForUserID, [user]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route
            path="*"
            element={
              loading ? (
                <Loader />
              ) : user?.userID ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
