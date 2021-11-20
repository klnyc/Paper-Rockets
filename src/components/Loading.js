import styles from './styles/Loading.module.scss'

export const Loading = () => {
    return (
        <div className={styles.reactLogo}>
            <span className={styles.reactSpinner}><span className={styles.reactNucleus}></span></span>
        </div>
    )
}