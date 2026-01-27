import { type ChangeEvent, type JSX, useEffect, useState } from "react";
import styles from "./styles/Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { type Stocks } from "../types";

interface HeaderProps {
  stockList?: Stocks;
}

export const Header = ({ stockList }: HeaderProps): JSX.Element => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value.toUpperCase());

  const searchCompany = () => {
    // const version = process.env.REACT_APP_IEX_VERSION;
    // const token = process.env.REACT_APP_IEX_API_KEY;
    // const url = (ticker) =>
    //   `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    // fetch(url(input))
    //   .then((response) => response.json())
    //   .then((companyData) => {
    //     setCompany(companyData);
    //     setInput("");
    //     navigate(`/ticker/${companyData.symbol}`);
    //   })
    //   .catch(() => setInput("Invalid Symbol"));

    if (!stockList || !input) return;
    if (!stockList[input]) {
      alert(`${input} is not supported!`);
      return;
    }
    navigate(`/stock/${input}`);
  };

  useEffect(() => {
    const enterKeyOnPress = (event: KeyboardEvent): void => {
      const simulateClick = (element: Element) => {
        const click = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        element.dispatchEvent(click);
      };

      if (event.key === "Enter")
        simulateClick(document.getElementsByClassName(styles.searchSymbol)[0]);
    };

    document.addEventListener("keydown", enterKeyOnPress);
    return () => document.removeEventListener("keydown", enterKeyOnPress);
  }, []);

  return (
    <div className={styles.header}>
      <div className="px-3">
        <IoIosRocket className={styles.rocketLogo} />
        <span className={styles.headerLink}>
          <Link to="/">Market</Link>
        </span>
        <span className={styles.headerLink}>
          <Link to="/portfolio">Portfolio</Link>
        </span>
        <span className={styles.headerLink}>
          <Link to="/account">Account</Link>
        </span>
      </div>
      <div className="d-flex gap-2 pe-3">
        <input
          className={`${styles.searchInput} ${
            stockList && input && !stockList[input] ? styles.error : ""
          }`}
          name="input"
          value={input}
          onChange={handleInputChange}
          placeholder="Ticker Symbol"
        />
        <div>
          <BsSearch
            className={styles.searchSymbol}
            onClick={() => searchCompany()}
          />
        </div>
      </div>
    </div>
  );
};
