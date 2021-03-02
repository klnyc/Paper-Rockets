import styles from './Watchlist.module.scss'

const data = [
    { ticker: "PLTR", currentPrice: 25 },
    { ticker: "GOOG", currentPrice: 2000 },
    { ticker: "SQ", currentPrice: 240 },
    { ticker: "JPM", currentPrice: 150 },
    { ticker: "DIS", currentPrice: 170 },
    { ticker: "NIO", currentPrice: 50 }
]

export const Watchlist = () =>
    <div className={styles.watchlist}>
        <div className={styles.watchlistHeader}>Watchlist</div>
        {data.map(company => (
            <div className={styles.watchlistRow}>
                <div className={styles.watchlistRowSection}>{company.ticker}</div>
                <div className={styles.watchlistRowSection}>${company.currentPrice}</div>
            </div>
        ))}
    </div>