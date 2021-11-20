import { useState } from "react";
import { IoIosRocket } from "react-icons/io";
import styles from "./styles/Home.module.scss";

export const Home = ({ setUser }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loginState, setLoginState] = useState(true);
  const [error, setError] = useState("");

  const logIn = () => {
    window.firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
      .then((userCredential) => {
        window.firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .get()
          .then((userData) => setUser(userData.data()))
          .then(() => window.sessionStorage.setItem("userID", userCredential.user.uid));
      })
      .catch((error) => setError(error.message));
  };

  const signUp = () => {
    window.firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((userCredential) => {
        const user = {
          userID: userCredential.user.uid,
          email: input.email,
          balance: 100000,
          portfolio: [],
          orders: [],
          watchlist: ["AAPL"],
        };

        window.firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(user)
          .then(() => setUser(user))
          .then(() =>
            window.sessionStorage.setItem("userID", userCredential.user.uid)
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => setError(error.message));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.name === "logIn" ? logIn() : signUp();
  };

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h3 className="text-center font-weight-bold p-4">Paper Rockets</h3>
      <div className={styles.rocketSymbol}><IoIosRocket /></div>

      <form className={styles.loginForm} onSubmit={handleSubmit} name={loginState ? 'logIn' : 'signUp'}>
        <div className='form-group'>
            <input type='email' name='email' className='form-control' onChange={handleInputChange} value={input.email} placeholder='Email' />
        </div>
        <div className='form-group'>
            <input type='password' name='password' className='form-control' onChange={handleInputChange} value={input.password} placeholder='Password' />
        </div>
        <div className='text-center'>
            <button type='submit' className='btn btn-primary'>{loginState ? 'Login' : 'Sign Up'}</button>
            <button type='button' className='btn btn-info mx-2' onClick={() => setLoginState(!loginState)}>{loginState ? 'Create account' : 'I have an account'}</button>
        </div>
    </form>

      <div className={styles.loginError}>{error}</div>
    </>
  );
};
