import { useState, ChangeEvent } from "react";
import { auth, firestore } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, DocumentData } from "firebase/firestore";
import { IoIosRocket } from "react-icons/io";
import styles from "./styles/Login.module.scss";

interface HomeProps {
  setUser: (user: DocumentData) => void;
}

interface FormProps {
  email: string;
  password: string;
}

export const Login = ({ setUser }: HomeProps) => {
  const [input, setInput] = useState<FormProps>({ email: "", password: "" });
  const [loginState, setLoginState] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const logIn = () => {
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        if (!userCredential) return;
        const ref = doc(firestore, `users/${userCredential.user.uid}`);
        getDoc(ref)
          .then((userData: DocumentData) => {
            if (userData) {
              setUser(userData.data());
            }
          })
          .then(() =>
            window.sessionStorage.setItem(
              "userID",
              userCredential.user.uid || ""
            )
          );
      })
      .catch((error) => setError(error.message));
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        const user = {
          userID: userCredential.user?.uid,
          email: input.email,
          balance: 100000,
          portfolio: [],
          orders: [],
          watchlist: ["AAPL"],
        };

        const ref = doc(firestore, `users/${userCredential.user.uid}`);
        setDoc(ref, user)
          .then(() => setUser(user))
          .then(() =>
            window.sessionStorage.setItem(
              "userID",
              userCredential.user?.uid || ""
            )
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => setError(error.message));
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginState = event.target.name;
    loginState === "logIn" ? logIn() : signUp();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h3 className="text-center font-weight-bold p-4">Paper Rockets</h3>
      <div className={styles.rocketSymbol}>
        <IoIosRocket />
      </div>

      <form
        className={styles.loginForm}
        onSubmit={handleSubmit}
        name={loginState ? "logIn" : "signUp"}
      >
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleInputChange}
            value={input.email}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleInputChange}
            value={input.password}
            placeholder="Password"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {loginState ? "Login" : "Sign Up"}
          </button>
          <button
            type="button"
            className="btn btn-info mx-2"
            onClick={() => setLoginState(!loginState)}
          >
            {loginState ? "Create account" : "I have an account"}
          </button>
        </div>
      </form>

      <div className={styles.loginError}>{error}</div>
    </>
  );
};
