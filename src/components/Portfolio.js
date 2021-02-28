import styles from './Portfolio.module.scss'

const data = [
    {
        ticker: "TSLA",
        company: "Tesla",
        quantity: 6,
        currentPrice: 600,
        averagePrice: 800
    },
    {
        ticker: "AAPL",
        company: "Apple",
        quantity: 10,
        currentPrice: 120,
        averagePrice: 110
    }
]

const renderColumnNames = () => {
    return (
        <div className={styles["position-row"] + " font-weight-bold"}>
            <div className={styles["position-column"]}>Ticker</div>
            <div className={styles["position-column"]}>Company</div>
            <div className={styles["position-column"]}>Quantity</div>
            <div className={styles["position-column"]}>Current Price</div>
            <div className={styles["position-column"]}>Average Price</div>
            <div className={styles["position-column"]}>Profit</div>
            <div className={styles["position-column"]}>Percent</div>
            <div className={styles["position-column"]}>Equity</div>
        </div>
    )
}

const renderPositions = () => {
    return data.map((position, index) => {
        const initialEquity = position.averagePrice * position.quantity
        const currentEquity = position.currentPrice * position.quantity
        const profit = currentEquity - initialEquity
        const percent = (profit/initialEquity * 100).toFixed(2)
        return (
            <div key={index} className={styles["position-row"]}>
                <div className={styles["position-column"]}>{position.ticker}</div>
                <div className={styles["position-column"]}>{position.company}</div>
                <div className={styles["position-column"]}>{position.quantity}</div>
                <div className={styles["position-column"]}>${position.currentPrice}</div>
                <div className={styles["position-column"]}>${position.averagePrice}</div>
                <div className={styles["position-column"]}>{profit >= 0 ? `$${profit}` : `-$${profit * -1}`}</div>
                <div className={styles["position-column"]}>{percent}%</div>
                <div className={styles["position-column"]}>${currentEquity}</div>
            </div>
        )
    })
}

export const Portfolio = () => {
    return (
        <div>
            <div className={styles.balance}>$20000</div>
            {renderColumnNames()}
            {renderPositions()}
        </div>
    )
}