import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { Home } from './Home'
import { Main } from './Main'

export const App = () => {
  const [user, setUser] = useState({})

  return (
    <Router>
      <div className={styles.app}>
      <Switch>
        <Route path='/'>{user.userID ? <Main user={user} setUser={setUser} /> : <Home setUser={setUser} />}</Route>
      </Switch>
      </div>
    </Router>
  )
}
