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
    },
    {
        ticker: "UBER",
        company: "Uber",
        quantity: 200,
        currentPrice: 54,
        averagePrice: 38
    }
]

const renderColumnNames = () => 
    <div className={`${styles.positionRow} font-weight-bold`}>
        <div className={styles.positionColumn}>Ticker</div>
        <div className={styles.positionColumn}>Company</div>
        <div className={styles.positionColumn}>Quantity</div>
        <div className={styles.positionColumn}>Current Price</div>
        <div className={styles.positionColumn}>Average Price</div>
        <div className={styles.positionColumn}>Profit</div>
        <div className={styles.positionColumn}>Percent</div>
        <div className={styles.positionColumn}>Equity</div>
    </div>

const renderPositions = () => data.map((position, index) => {
    const initialEquity = position.averagePrice * position.quantity
    const currentEquity = position.currentPrice * position.quantity
    const profit = currentEquity - initialEquity
    const percent = (profit/initialEquity * 100).toFixed(2)
    return (
        <div key={index} className={styles.positionRow}>
            <div className={styles.positionColumn}>{position.ticker}</div>
            <div className={styles.positionColumn}>{position.company}</div>
            <div className={styles.positionColumn}>{position.quantity}</div>
            <div className={styles.positionColumn}>${position.currentPrice}</div>
            <div className={styles.positionColumn}>${position.averagePrice}</div>
            <div className={styles.positionColumn}>{profit >= 0 ? `$${profit}` : `-$${profit * -1}`}</div>
            <div className={styles.positionColumn}>{percent}%</div>
            <div className={styles.positionColumn}>${currentEquity}</div>
        </div>
    )
})

export const Portfolio = () =>
    <div>
        <div className={styles.balance}>$6000</div>
        {renderColumnNames()}
        {renderPositions()}
    </div>