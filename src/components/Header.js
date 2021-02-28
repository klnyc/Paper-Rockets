import logo from './logo.svg';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
            <span className={styles["header-link"]}>Account</span>
            <input className={styles["search-input"]} />
        </div>
    )
}