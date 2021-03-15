import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Company.module.scss'

export const Company = (props) => {
    const { company, user, setUser } = props
    const [orderMode, setOrderMode] = useState("buy")
    const [quantity, setQuantity] = useState("")
    const history = useHistory()
    const cost = (quantity * company.latestPrice).toFixed(2)

    const handleQuantityInput = (event) => setQuantity(event.target.value) 

    const addToWatchlist = () => {
        window.firebase.firestore().collection("users").doc(user.userID)
        .update({ watchlist: window.firebase.firestore.FieldValue.arrayUnion(company.symbol) })
        .then(() => {
            window.firebase.firestore().collection("users").doc(user.userID).get()
            .then((userData) => setUser(userData.data()))
        })
    }

    const removeFromWatchlist = () => {
        window.firebase.firestore().collection("users").doc(user.userID)
        .update({ watchlist: window.firebase.firestore.FieldValue.arrayRemove(company.symbol) })
        .then(() => {
            window.firebase.firestore().collection("users").doc(user.userID).get()
            .then((userData) => setUser(userData.data()))
        })
    }

    const buy = () => {
        const buyOrder = {
            ticker: company.symbol,
            quantity,
            cost
        }
        window.firebase.firestore().collection("users").doc(user.userID)
        .update({ 
            balance: (user.balance - cost).toFixed(2),
            portfolio: window.firebase.firestore.FieldValue.arrayUnion(buyOrder)
        })
        .then(() => {
            window.firebase.firestore().collection("users").doc(user.userID).get()
            .then((userData) => setUser(userData.data()))
        })
    }

    const sell = () => {

    }

    const submitOrder = () => {
        orderMode === "buy" ? buy() : sell()
        history.push('/')
    }

    return (
        <div>
            <h4 className="p-4">{company.companyName}</h4>
            <h5 className="px-4">${company.latestPrice.toFixed(2)}</h5>

            <div className={styles.buySellContainer}>
                <div className={styles.buySellTabContainer}>
                    <div className={orderMode === "buy" ? styles.buySellTab : `${styles.buySellTab} ${styles.notActive}`} onClick={() => setOrderMode("buy")}>Buy</div>
                    <div className={orderMode === "sell" ? styles.buySellTab : `${styles.buySellTab} ${styles.notActive}`} onClick={() => setOrderMode("sell")}>Sell</div>
                </div>
                <div>
                    <input className={styles.quantityInput} type="number" placeholder="NUMBER OF SHARES" value={quantity} onChange={handleQuantityInput} />
                    <div>${cost}</div>
                    <button className="btn btn-outline-info btn-sm my-4" onClick={() => submitOrder()}>Submit Order</button>
                </div>
            </div>

            {user.watchlist.includes(company.symbol)
            ? <button className="btn btn-outline-info btn-sm m-4" onClick={() => removeFromWatchlist()}>Remove from Watchlist</button>
            : <button className="btn btn-outline-info btn-sm m-4" onClick={() => addToWatchlist()}>Add to Watchlist</button>}
        </div>
    )
}