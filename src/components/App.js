import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { Home } from './Home'
import { Main } from './Main'
import { Account } from './Account'

export const App = () => {
  const [user, setUser] = useState({})

  const userRoutes = () =>
    <Switch>
      <Route exact path="/account"><Account user={user} /></Route>
      <Route path="/"><Main user={user} setUser={setUser} /></Route>
    </Switch>

  const nonUserRoutes = () =>
    <Switch>
      <Route path="/"><Home setUser={setUser} /></Route>
    </Switch>

  return (
    <Router>
      <div className={styles.app}>{user.userID ? userRoutes() : nonUserRoutes()}</div>
    </Router>
  )
}
