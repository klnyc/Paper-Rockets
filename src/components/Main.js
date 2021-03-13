import { Fragment } from 'react'
import { Header } from './Header'
import { Portfolio } from './Portfolio'
import { Watchlist } from './Watchlist'
import { Account } from './Account'
import { Route } from 'react-router-dom'

export const Main = (props) => {
    const { user, setUser } = props
    return (
        <Fragment>
            <Header setUser={setUser} />

            <Route exact path="/account">
                <Account user={user} setUser={setUser} />
            </Route>

            <Route exact path="/">
                <Portfolio user={user} />
                <Watchlist user={user} />
            </Route>

        </Fragment>
    )
}