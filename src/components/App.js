import styles from './App.module.scss';
import { Header } from './Header';
import { Portfolio } from './Portfolio';
import { Watchlist } from './Watchlist';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Portfolio />
      <Watchlist />
    </div>
  )
}
