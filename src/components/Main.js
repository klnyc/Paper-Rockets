import { useState } from 'react'
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
    const roundNumber = (number) => Number(number.toFixed(2))

    const goToCompany = async (ticker) => {
        const version = process.env.REACT_APP_IEX_VERSION
        const token = process.env.REACT_APP_IEX_API_KEY
        const url = (ticker) => `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`
        const response = await fetch(url(ticker))
        const companyData = await response.json()
        setCompany(companyData)
        history.push(`/${companyData.symbol}`)
    }

    return (
        <>
            <Header setUser={setUser} setCompany={setCompany} />

            <Switch>
                {company.symbol && <Route exact path={`/${company.symbol}`}>
                    <Company company={company} user={user} setUser={setUser} roundNumber={roundNumber} />
                </Route>}

                <Route exact path='/account'>
                    <Account user={user} setUser={setUser} />
                </Route>

                <Route path='/'>
                    <Portfolio user={user} goToCompany={goToCompany} roundNumber={roundNumber} />
                </Route>
            </Switch>

            <Watchlist user={user} setCompany={setCompany} goToCompany={goToCompany} />
        </>
    )
}