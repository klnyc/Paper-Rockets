import { useEffect, useState } from 'react'
import styles from './Company.module.scss'

export const Company = (props) => {
    const { company, user, setUser, roundNumber } = props
    const [orderMode, setOrderMode] = useState("buy")
    const [quantity, setQuantity] = useState("")
    const [position, setPosition] = useState({})
    const cost = roundNumber(quantity * company.latestPrice)
    const userData = window.firebase.firestore().collection("users").doc(user.userID)

    const handleQuantityInput = (event) => setQuantity(event.target.value)

    const selectInput = () => {
        const input = document.getElementById("quantityInput")
        input.focus()
        input.select()
    }

    const findPosition = () => {
        const userPosition = user.portfolio.filter(position => position.ticker === company.symbol)
        if (userPosition.length) setPosition(userPosition[0])
    }

    const addToWatchlist = () => {
        userData.update({ watchlist: window.firebase.firestore.FieldValue.arrayUnion(company.symbol) })
        .then(() => {
            userData.get().then((userData) => setUser(userData.data()))
        })
    }

    const removeFromWatchlist = () => {
        userData.update({ watchlist: window.firebase.firestore.FieldValue.arrayRemove(company.symbol) })
        .then(() => {
            userData.get().then((userData) => setUser(userData.data()))
        })
    }

    const buy = () => {
        const buyOrder = { 
            ticker: company.symbol, 
            quantity: Number(quantity) + (position.quantity || 0), 
            cost: cost + (position.cost || 0)
        }

        if (position.ticker) {
            userData.update({ portfolio: window.firebase.firestore.FieldValue.arrayRemove(position) })
            .then(() => {
                userData.update({ 
                    balance: roundNumber(user.balance - cost),
                    portfolio: window.firebase.firestore.FieldValue.arrayUnion(buyOrder)
                })
            })
            .then(() => {
                userData.get().then((userData) => setUser(userData.data()))
            })
        } else {
            userData.update({ 
                balance: roundNumber(user.balance - cost),
                portfolio: window.firebase.firestore.FieldValue.arrayUnion(buyOrder)
            }).then(() => {
                userData.get().then((userData) => setUser(userData.data()))
            })
        }
    }

    const sell = () => {
        const sellOrder = {
            ticker: company.symbol, 
            quantity: position.quantity - Number(quantity), 
            cost: position.cost - cost
        }
        if (Number(quantity) === position.quantity) {
            userData.update({ 
                balance: roundNumber(user.balance + cost),
                portfolio: window.firebase.firestore.FieldValue.arrayRemove(position) 
            })
            .then(() => {
                userData.get().then((userData) => {
                    setUser(userData.data())
                    setPosition({})
                })
            })
        } else {
            userData.update({ portfolio: window.firebase.firestore.FieldValue.arrayRemove(position) })
            .then(() => {
                userData.update({ 
                    balance: roundNumber(user.balance + cost),
                    portfolio: window.firebase.firestore.FieldValue.arrayUnion(sellOrder)
                })
            })
            .then(() => {
                userData.get().then((userData) => setUser(userData.data()))
            })
        }
    }

    const submitOrder = () => {
        orderMode === "buy" ? buy() : sell()
        setQuantity("")
    }

    const renderOrderBox = () =>
        <div className={styles.buySellContainer}>
            <div className={styles.buySellTabContainer}>
                <div className={orderMode === "buy" ? styles.buySellTab : `${styles.buySellTab} ${styles.notActive}`} onClick={() => setOrderMode("buy")}>Buy</div>
                <div className={orderMode === "sell" ? styles.buySellTab : `${styles.buySellTab} ${styles.notActive}`} onClick={() => setOrderMode("sell")}>Sell</div>
            </div>
            <div>
                <input id="quantityInput" className={styles.quantityInput} type="number" value={quantity} placeholder="NUMBER" onChange={handleQuantityInput} onClick={() => selectInput()} />
                <div className="my-3">SHARES</div>
                <div>${cost}</div>
                <button className="btn btn-outline-info btn-sm my-4" onClick={() => submitOrder()}>Submit Order</button>
            </div>
        </div>

    const renderPosition = () => {
        const initialEquity = position.cost
        const currentEquity = roundNumber(position.quantity * company.latestPrice)
        const averagePrice = roundNumber(position.cost/position.quantity)
        const profit = roundNumber(currentEquity - initialEquity)
        const percent = roundNumber(profit/initialEquity * 100)
        return (
            <div className={styles.positionContainer}>
                <div className={`${styles.positionRow} font-weight-bold`}>
                    <div className={styles.positionColumn}>Quantity</div>
                    <div className={styles.positionColumn}>Average Price</div>
                    <div className={styles.positionColumn}>Profit</div>
                    <div className={styles.positionColumn}>Percent</div>
                    <div className={styles.positionColumn}>Equity</div>
                </div>
                <div className={styles.positionRow}>
                    <div className={styles.positionColumn}>{position.quantity}</div>
                    <div className={styles.positionColumn}>{averagePrice}</div>
                    <div className={styles.positionColumn}>{profit}</div>
                    <div className={styles.positionColumn}>{percent}</div>
                    <div className={styles.positionColumn}>{currentEquity}</div>
                </div>
            </div>
        )
    }

    useEffect(findPosition, [user.portfolio, company.symbol])

    return (
        <div>
            <h4 className="p-4">{company.companyName}</h4>
            <h5 className="px-4">${roundNumber(company.latestPrice)}</h5>
            {position.ticker && renderPosition()}
            {renderOrderBox()}
            {user.watchlist.includes(company.symbol)
            ? <button className="btn btn-outline-info btn-sm m-4" onClick={() => removeFromWatchlist()}>Remove from Watchlist</button>
            : <button className="btn btn-outline-info btn-sm m-4" onClick={() => addToWatchlist()}>Add to Watchlist</button>}
        </div>
    )
}