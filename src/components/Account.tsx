import type { JSX } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { doc, setDoc, type DocumentData } from "firebase/firestore";
import styles from "./styles/Account.module.scss";

interface AccountProps {
  user: DocumentData;
  setUser: (user?: DocumentData) => void;
}

interface ResetAccountModalProps {
  reset: () => void;
}

const ResetAccountModal = ({ reset }: ResetAccountModalProps): JSX.Element => {
  return (
    <div className="modal fade" id="reset-account-modal">
      <div className="modal-dialog">
        <div className={`modal-content ${styles.resetAccountModal}`}>
          <div className="modal-header">
            <h5 className="modal-title">Reset account</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Delete all stocks in your portfolio and watchlist. This cannot be undone.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => reset()}
            >
              Reset account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Account = ({ user, setUser }: AccountProps): JSX.Element => {
  const signOut = (): void => {
    firebaseSignOut(auth)
      .then(() => setUser())
      .then(() => window.sessionStorage.removeItem("userID"))
      .catch((error) => console.log(error));
  };

  const reset = (): void => {
    const newUser = {
      userID: user.userID,
      email: user.email,
      balance: 100000,
      portfolio: [],
      orders: [],
      watchlist: ["AAPL"],
    };

    const ref = doc(firestore, `users/${user.userID}`);
    setDoc(ref, newUser)
      .then(() => setUser(newUser))
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-100">
      <h5 className="m-0 pb-3">{user.email}</h5>
      <button className="btn btn-secondary btn-sm" onClick={() => signOut()}>
        <Link to="/">Sign out</Link>
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sm ms-3"
        data-bs-toggle="modal"
        data-bs-target="#reset-account-modal"
      >
        Reset account
      </button>

      <ResetAccountModal reset={reset} />
    </div>
  );
};
