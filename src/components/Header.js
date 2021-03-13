import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoIosRocket } from "react-icons/io"

export const Header = () => {
    const [input, setInput] = useState("")

    const handleInputChange = (event) => setInput(event.target.value.toUpperCase())

    return (
        <div className={styles.header}>
            <div><Link to="/"><IoIosRocket className={styles.rocketSymbol} /></Link></div>
            <span className={styles.headerLink}><Link to="/account">Account</Link></span>
            <input className={styles.searchInput} name="input" value={input} onChange={handleInputChange} />
            <div><BsSearch className={styles.searchSymbol} /></div>
        </div>
    )
}
    