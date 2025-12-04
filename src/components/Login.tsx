import { useState, type ChangeEvent, type JSX } from "react";
import { auth, firestore } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, type DocumentData } from "firebase/firestore";
import { IoIosRocket } from "react-icons/io";
import styles from "./styles/Login.module.scss";

interface HomeProps {
  setUser: (user: DocumentData) => void;
}

interface FormProps {
  email: string;
  password: string;
}

export const Login = ({ setUser }: HomeProps): JSX.Element => {
  const [input, setInput] = useState<FormProps>({ email: "", password: "" });
  const [loginState, setLoginState] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const logIn = (): void => {
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

  const signUp = (): void => {
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

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const loginState = event.target.name;
    loginState === "logIn" ? logIn() : signUp();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex flex-column gap-3 pt-5">
      <h3 className="text-center fw-bold m-0">Paper Rockets</h3>
      <div id={styles.rocketLogo}>
        <IoIosRocket />
      </div>

      <form
        className="mx-auto w-50 d-flex flex-column gap-3"
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
        <div className="text-center d-flex flex-row gap-3 mx-auto">
          <button type="submit" className="btn btn-primary">
            {loginState ? "Login" : "Sign Up"}
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setLoginState(!loginState)}
          >
            {loginState ? "Create account" : "I have an account"}
          </button>
        </div>
      </form>

      <div className="text-center text-danger p-3">{error}</div>
    </div>
  );
};
