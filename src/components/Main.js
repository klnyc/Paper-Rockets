import { Fragment, useState } from 'react'
import { Header } from './Header'
import { Portfolio } from './Portfolio'
import { Watchlist } from './Watchlist'
import { Account } from './Account'
import { Company } from './Company'
import { Route, Switch } from 'react-router-dom'

export const Main = (props) => {
    const [company, setCompany] = useState({})
    const { user, setUser } = props

    return (
        <Fragment>
            <Header setUser={setUser} setCompany={setCompany} />

            <Switch>
                {company.symbol && <Route exact path={`/${company.symbol}`}>
                    <Company company={company} user={user} setUser={setUser} />
                </Route>}

                <Route exact path="/account">
                    <Account user={user} setUser={setUser} />
                </Route>

                <Route path="/">
                    <Portfolio user={user} />
                </Route>
            </Switch>

            <Watchlist user={user} />
        </Fragment>
    )
}