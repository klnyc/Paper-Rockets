import type { JSX } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { doc, setDoc, type DocumentData } from "firebase/firestore";

interface AccountProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const Account = ({ user, setUser }: AccountProps): JSX.Element => {
  const signOut = (): void => {
    firebaseSignOut(auth)
      .then(() => setUser({}))
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
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => signOut()}
      >
        <Link to="/">Sign Out</Link>
      </button>
      <button
        className="btn btn-danger btn-sm ms-3"
        onClick={() => reset()}
      >
        <Link to="/">Reset Account</Link>
      </button>
    </div>
  );
};
