import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './styles/App.module.scss'
import { Home } from './Home'
import { Main } from './Main'

export const App = () => {
  const [user, setUser] = useState({})

  const checkSessionForUserID = () => {
    const sessionUserID = window.sessionStorage.getItem('userID')
    if (sessionUserID && !user.userID) {
      console.log(sessionUserID)
      window.firebase.firestore().collection('users').doc(sessionUserID).get()
      .then((userData) => setUser(userData.data()))
      .catch((error) => { console.log(error.message) })
    }
  }

  useEffect(checkSessionForUserID, [user.userID])

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