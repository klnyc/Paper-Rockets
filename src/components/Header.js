import logo from './logo.svg';
import styles from './Header.module.scss';

export const Header = () =>
    <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <span className={styles.headerLink}>Account</span>
        <input className={styles.searchInput} />
    </div>