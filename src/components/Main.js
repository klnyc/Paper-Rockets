import { Fragment } from 'react';
import { Header } from './Header';
import { Portfolio } from './Portfolio';
import { Watchlist } from './Watchlist';

export const Main = (props) => {
    const { user, setUser } = props
    return (
        <Fragment>
            <Header setUser={setUser} />
            <Portfolio user={user} />
            <Watchlist user={user} />
        </Fragment>
    )
}