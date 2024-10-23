import styles from "./styles/Header.module.scss";
import { Link, useHistory } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { Stock, Stocks } from "../types";

interface HeaderProps {
  stockList?: Stocks;
  setCompany: (company: Stock) => void;
}

export const Header = ({ stockList, setCompany }: HeaderProps): JSX.Element => {
  const [input, setInput] = useState("");
  const history = useHistory();

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
    //     history.push(`/${companyData.symbol}`);
    //   })
    //   .catch(() => setInput("Invalid Symbol"));

    if (!stockList) return;
    if (!stockList[input]) {
      console.log("Stock not found");
      return;
    }
    setCompany(stockList[input]);
    history.push(`/${input}`);
  };

  const enterKeyOnPress = () => {
    document.addEventListener("keydown", function (event) {
      const simulateClick = (element: any) => {
        const click = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        element.dispatchEvent(click);
      };

      if (event.key === "Enter")
        simulateClick(document.getElementsByClassName(styles.searchSymbol)[0]);
    });
  };

  useEffect(() => {
    if (input) {
      enterKeyOnPress();
    }
  }, [input]);

  return (
    <div className={styles.header}>
      <IoIosRocket className={styles.rocketSymbol} />
      <span className={styles.headerLink}>
        <Link to="/">Portfolio</Link>
      </span>
      <span className={styles.headerLink}>
        <Link to="/account">Account</Link>
      </span>
      <input
        className={styles.searchInput}
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
  );
};
