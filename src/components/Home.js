import { useState } from 'react'
import { IoIosRocket } from "react-icons/io"
import styles from './Home.module.scss'

export const Home = (props) => {
    const [input, setInput] = useState({ email: "", password: "" })
    const [loginState, setLoginState] = useState(true)
    const [error, setError] = useState("")
    const { setUser } = props

    const logIn = () => {
        window.firebase.auth().signInWithEmailAndPassword(input.email, input.password)
        .then((userCredential) => {
            window.firebase.firestore().collection("users").doc(userCredential.user.uid).get()
            .then((userData) => setUser(userData.data()))
        }).catch((error) => {
            setError(error.message)
        })
    }

    const signUp = () => {
        window.firebase.auth().createUserWithEmailAndPassword(input.email, input.password)
        .then((userCredential) => {
            const newUser = {
                userID: userCredential.user.uid,
                email: input.email,
                balance: 100000,
                portfolio: [],
                orders: [],
                watchlist: []
            }
            window.firebase.firestore().collection("users").doc(userCredential.user.uid).set(newUser)
            .then(() => setUser(newUser))
            .catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            setError(error.message)
        })
    }

    const handleSubmit = (event) => {
        if (event) event.preventDefault()
        event.target.name === 'logIn' ? logIn() : signUp()
    }

    const handleInputChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <div className="text-center font-weight-bold p-4">Paper Rockets</div>
            <div className={styles.rocketLogo}><IoIosRocket /></div>
            
            <div className={styles.loginTitle}>{loginState ? "Login" : "Sign Up"}</div>
            <form className={styles.loginForm} onSubmit={handleSubmit} name={loginState ? "logIn" : "signUp"}>
                <div className="form-group">
                    <input type="email" name="email" className="form-control" onChange={handleInputChange} value={input.email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" onChange={handleInputChange} value={input.password} placeholder="Password" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">{loginState ? "Login" : "Sign Up"}</button>
                    <button type="button" className="btn btn-info mx-2" onClick={() => setLoginState(!loginState)}>{loginState ? "Create account" : "I have an account"}</button>
                </div>
            </form>
            <div className={styles.loginError}>{error}</div>
        </div>
    )
}
    