import styles from './Watchlist.module.scss'
import { useState, useEffect } from 'react'

export const Watchlist = (props) => {
    const { user } = props
    const [watchlist, setWatchlist] = useState([])

    const queryWatchlist = () => {
        // Cloud API
        // const token = process.env.REACT_APP_IEX_CLOUD_API_KEY
        // const companyURL = (ticker) => `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`

        // Sandbox API
        const token = process.env.REACT_APP_IEX_SANDBOX_API_KEY
        const companyURL = (ticker) => `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${token}`
        
        const watchlistRequests = user.watchlist.map(ticker => fetch(companyURL(ticker)))

        Promise.all(watchlistRequests)
        .then((companyPromises) => {
            return Promise.all(companyPromises.map((companyPromise) => {
                return companyPromise.json().then(data => data)
            }))
        })
        .then((companyData) => setWatchlist(companyData))
    }

    useEffect(queryWatchlist, [user.watchlist])

    return (
        <div className={styles.watchlist}>
            <div className={styles.watchlistHeader}>Watchlist</div>
            {watchlist.map((company, index) => (
                <div key={index} className={styles.watchlistRow}>
                    <div className={styles.watchlistRowSection}>{company.symbol}</div>
                    <div className={styles.watchlistRowSection}>${company.latestPrice}</div>
                </div>
            ))}
        </div>
    )
}