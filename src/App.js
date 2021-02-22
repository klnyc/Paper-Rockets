import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.applink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="card" style={{ color: "black" }}>This is a test card</div>
        <button className="btn btn-primary">Test Button</button>
      </header>
    </div>
  );
}

export default App;
