import logo from './logo.svg'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Header = (props) => {
    const [input, setInput] = useState("")
    const { setUser } = props

    const signOut = () => {
        window.firebase.auth().signOut()
        .then(() => setUser({}))
        .catch((error) => { console.log(error) });
    }

    const handleInputChange = (event) => {
        setInput(event.target.value.toUpperCase())
    }

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
            <span className={styles.headerLink}><Link to="/account">Account</Link></span>
            <span className={styles.headerLink} onClick={() => signOut()}>Sign Out</span>
            <input className={styles.searchInput} name="input" value={input} onChange={handleInputChange} />
        </div>
    )
}
    