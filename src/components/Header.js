import logo from './logo.svg';
import styles from './Header.module.scss';

export const Header = (props) => {
    const { setUser } = props

    const signOut = () => {
        window.firebase.auth().signOut()
        .then(() => {
            setUser({})
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
            <span className={styles.headerLink}>Account</span>
            <span className={styles.headerLink} onClick={() => signOut()}>Sign Out</span>
            <input className={styles.searchInput} />
        </div>
    )
}
    