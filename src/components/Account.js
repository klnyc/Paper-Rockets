import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export const Account = ({ user, setUser }) => {
  const signOut = () => {
    firebaseSignOut(auth)
      .then(() => setUser({}))
      .then(() => window.sessionStorage.removeItem("userID"))
      .catch((error) => console.log(error));
  };

  const reset = () => {
    const newUser = {
      userID: user.userID,
      email: user.email,
      balance: 100000,
      portfolio: [],
      orders: [],
      watchlist: ["AAPL"],
    };

    window.firebase
      .firestore()
      .collection("users")
      .doc(user.userID)
      .set(newUser)
      .then(() => setUser(newUser))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h5 className="p-4">{user.email}</h5>
      <button
        className="btn btn-secondary btn-sm mx-4 my-4"
        onClick={() => signOut()}
      >
        <Link to="/">Sign Out</Link>
      </button>
      <button
        className="btn btn-danger btn-sm mx-2 my-4"
        onClick={() => reset()}
      >
        <Link to="/">Reset Account</Link>
      </button>
    </div>
  );
};
