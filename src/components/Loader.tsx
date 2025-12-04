import type { JSX } from "react";
import styles from "./styles/Loader.module.scss";

export const Loader = (): JSX.Element => {
  return (
    <div className={styles.reactLogo}>
      <span className={styles.reactSpinner}>
        <span className={styles.reactNucleus}></span>
      </span>
    </div>
  );
};
