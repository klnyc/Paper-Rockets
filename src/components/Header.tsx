import { type ChangeEvent, type JSX, useEffect, useState } from "react";
import styles from "./styles/Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { type Stock, type Stocks } from "../types";

interface HeaderProps {
  stockList?: Stocks;
  setCompany: (company: Stock) => void;
}

export const Header = ({ stockList, setCompany }: HeaderProps): JSX.Element => {
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
    //     navigate(`/${companyData.symbol}`);
    //   })
    //   .catch(() => setInput("Invalid Symbol"));

    if (!stockList) return;
    if (!stockList[input]) {
      alert(`This stock ${input} is not supported!`);
      return;
    }
    setCompany(stockList[input]);
    navigate(`/${input}`);
  };

  const enterKeyOnPress = (): void => {
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
      <div>
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
    </div>
  );
};
