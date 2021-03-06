import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.module.scss'
import { Home } from './Home'
import { Main } from './Main'
import { Account } from './Account'

export const App = () => {
  const [user, setUser] = useState({})
  return (
    <Router>
      <div className={styles.app}>

      {user.userID && 
      <Switch>
        <Route exact path="/account"><Account user={user} /></Route>
        <Route path="/"><Main user={user} setUser={setUser} /></Route>
      </Switch>}

      {!user.userID && <Route path="/"><Home setUser={setUser} /></Route>}

      </div>
    </Router>
  )
}
