import { Fragment, useState } from 'react'
import { Header } from './Header'
import { Portfolio } from './Portfolio'
import { Watchlist } from './Watchlist'
import { Account } from './Account'
import { Company } from './Company'
import { Route, Switch, useHistory } from 'react-router-dom'

export const Main = (props) => {
    const [company, setCompany] = useState({})
    const { user, setUser } = props
    const history = useHistory()

    const goToCompany = (ticker) => {
        const version = process.env.REACT_APP_IEX_VERSION
        const token = process.env.REACT_APP_IEX_API_KEY
        const url = (ticker) => `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`

        fetch(url(ticker))
        .then(response => response.json())
        .then(companyData => {
            setCompany(companyData)
            history.push(`/${companyData.symbol}`)
        })
    }

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
                    <Portfolio user={user} goToCompany={goToCompany} />
                </Route>
            </Switch>

            <Watchlist user={user} setCompany={setCompany} goToCompany={goToCompany} />
        </Fragment>
    )
}