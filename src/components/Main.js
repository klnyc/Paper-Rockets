import { Fragment } from 'react';
import { Header } from './Header';
import { Portfolio } from './Portfolio';
import { Watchlist } from './Watchlist';

export const Main = (props) => {
    const { setUser } = props
    return (
        <Fragment>
            <Header setUser={setUser} />
            <Portfolio />
            <Watchlist />
        </Fragment>
    )
}