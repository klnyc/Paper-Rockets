import { Link } from 'react-router-dom'

export const Account = (props) => {
    const { user, setUser } = props

    const signOut = () => {
        window.firebase.auth().signOut()
        .then(() => setUser({}))
        .catch((error) => console.log(error));
    }

    return (
        <div>
            <h5 className="p-4">{user.email}</h5>
            <button className="btn btn-secondary btn-sm mx-4" onClick={() => signOut()}><Link to="/">Sign Out</Link></button>
            <button className="btn btn-danger btn-sm mx-2">Reset Account</button>
        </div>
    )
}