import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { Home } from './Home'
import { Main } from './Main'

const portfolio = [
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

const watchlist = ["DIS", "JPM", "GOOG"]

const data =  {
  userID: "123",
  email: "hello@test.com",
  balance: 100000,
  portfolio: portfolio,
  orders: [],
  watchlist: watchlist
}

export const App = () => {
  const [user, setUser] = useState(data)

  return (
    <Router>
      <div className={styles.app}>
      <Switch>
        <Route path="/">{user.userID ? <Main user={user} setUser={setUser} /> : <Home setUser={setUser} />}</Route>
      </Switch>
      </div>
    </Router>
  )
}
