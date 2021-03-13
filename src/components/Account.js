import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const Account = (props) => {
    const { user, setUser } = props

    const signOut = () => {
        window.firebase.auth().signOut()
        .then(() => setUser({}))
        .catch((error) => console.log(error));
    }

    return (
        <Fragment>
            <div>
                <div>{user.email}</div>
                <div onClick={() => signOut()}><Link to="/">Sign Out</Link></div>
                <div>Reset Account</div>
            </div>
        </Fragment>
    )
}