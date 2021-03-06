import styles from './Watchlist.module.scss'

export const Watchlist = (props) => {
    const { user } = props
    return (
        <div className={styles.watchlist}>
            <div className={styles.watchlistHeader}>Watchlist</div>
            {user.watchlist.map((company, index) => (
                <div key={index} className={styles.watchlistRow}>
                    <div className={styles.watchlistRowSection}>{company.ticker}</div>
                    <div className={styles.watchlistRowSection}>${company.currentPrice}</div>
                </div>
            ))}
        </div>
    )
}