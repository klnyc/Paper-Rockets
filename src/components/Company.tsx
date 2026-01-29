import { type ChangeEvent, type JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/Company.module.scss";
import { type Stocks, type Stock, type Position } from "../types";
import { firestore } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  type DocumentData,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { displayNumber, colorCodeNumber } from "../utility";
import { Order } from "../constants";

interface CompanyProps {
  user: DocumentData;
  setUser: (user: DocumentData) => void;
  stockList?: Stocks;
}

export const Company = ({
  user,
  setUser,
  stockList,
}: CompanyProps): JSX.Element => {
  const [company, setCompany] = useState<Stock | undefined>();
  const [orderMode, setOrderMode] = useState<Order>(Order.BUY);
  const [quantity, setQuantity] = useState<string>("");
  const [position, setPosition] = useState<Position | undefined>();
  const { ticker } = useParams<{ ticker: string }>();

  useEffect(() => {
    // const version = process.env.REACT_APP_IEX_VERSION;
    // const token = process.env.REACT_APP_IEX_API_KEY;
    // const url = (ticker) =>
    //   `https://${version}.iexapis.com/stable/stock/${ticker}/quote?token=${token}`;
    // const response = await fetch(url(ticker));
    // const companyData = await response.json();
    // setCompany(companyData);

    if (!ticker || !stockList) return;
    setCompany(stockList[ticker]);
  }, [ticker, stockList]);

  useEffect(() => {
    if (!company) return;
    const userPosition = user.portfolio.find(
      (position: Position) => position.ticker === company.ticker,
    );
    userPosition ? setPosition(userPosition) : setPosition(undefined);
  }, [user.portfolio, company]);

  if (!company) return <></>;

  const cost: number = Number(quantity) * company.latestPrice;
  const userRef = doc(firestore, `users/${user.userID}`);

  const handleQuantityInput = (event: ChangeEvent<HTMLInputElement>): void =>
    setQuantity(event.target.value);

  const addToWatchlist = (): void => {
    updateDoc(userRef, {
      watchlist: arrayUnion(company.ticker),
    }).then(() => {
      getDoc(userRef).then((userData: DocumentData) => {
        if (userData) {
          setUser(userData.data());
        }
      });
    });
  };

  const removeFromWatchlist = (): void => {
    updateDoc(userRef, {
      watchlist: arrayRemove(company.ticker),
    }).then(() => {
      getDoc(userRef).then((userData: DocumentData) => {
        if (userData) {
          setUser(userData.data());
        }
      });
    });
  };

  const buy = (): void => {
    const buyOrder = {
      ticker: company.ticker,
      quantity: Number(quantity) + (position?.quantity || 0),
      cost: cost + (position?.cost || 0),
    };

    if (position) {
      updateDoc(userRef, {
        portfolio: arrayRemove(position),
      })
        .then(() => {
          updateDoc(userRef, {
            balance: user.balance - cost,
            portfolio: arrayUnion(buyOrder),
          });
        })
        .then(() => {
          getDoc(userRef).then((userData: DocumentData) => {
            if (userData) {
              setUser(userData.data());
            }
          });
        });
    } else {
      updateDoc(userRef, {
        balance: user.balance - cost,
        portfolio: arrayUnion(buyOrder),
      }).then(() => {
        getDoc(userRef).then((userData: DocumentData) => {
          if (userData) {
            setUser(userData.data());
          }
        });
      });
    }
  };

  const sell = (): void => {
    if (!position) return;

    const sellOrder = {
      ticker: company.ticker,
      quantity: position.quantity - Number(quantity),
      cost: position.cost - cost,
    };

    if (Number(quantity) === position.quantity) {
      updateDoc(userRef, {
        balance: user.balance + cost,
        portfolio: arrayRemove(position),
      }).then(() => {
        getDoc(userRef).then((userData: DocumentData) => {
          if (userData) {
            setUser(userData.data());
            setPosition(undefined);
          }
        });
      });
    } else {
      updateDoc(userRef, {
        portfolio: arrayRemove(position),
      })
        .then(() => {
          updateDoc(userRef, {
            balance: user.balance + cost,
            portfolio: arrayUnion(sellOrder),
          });
        })
        .then(() => {
          getDoc(userRef).then((userData: DocumentData) => {
            if (userData) {
              setUser(userData.data());
            }
          });
        });
    }
  };

  const submitOrder = (): void => {
    orderMode === Order.BUY ? buy() : sell();
    setQuantity("");
  };

  const disableSubmitOrder = (): boolean => {
    if (!quantity || Number(quantity) === 0) {
      return true;
    }

    if (orderMode === Order.BUY) {
      if (cost > user.balance) {
        return true;
      }
    }

    if (orderMode === Order.SELL) {
      if (!position) {
        return true;
      }
      if (position && Number(quantity) > position.quantity) {
        return true;
      }
    }

    return false;
  };

  const renderOrderBox = (): JSX.Element => {
    return (
      <div className={styles.buySellContainer}>
        <div className="d-flex">
          <div
            className={
              orderMode === Order.BUY
                ? styles.buySellTab
                : `${styles.buySellTab} ${styles.notActive}`
            }
            onClick={() => setOrderMode(Order.BUY)}
          >
            Buy
          </div>
          <div
            className={
              orderMode === Order.SELL
                ? styles.buySellTab
                : `${styles.buySellTab} ${styles.notActive}`
            }
            onClick={() => setOrderMode(Order.SELL)}
          >
            Sell
          </div>
        </div>
        <div className="pt-4">
          <input
            id="quantityInput"
            className={styles.quantityInput}
            type="number"
            value={quantity}
            placeholder="NUMBER"
            onChange={handleQuantityInput}
          />
          <div className="my-3">SHARES</div>
          <div>Total cost: {displayNumber(cost, "$")}</div>
          <div>Buying power: {displayNumber(user.balance, "$")}</div>
          <button
            className="btn btn-outline-info btn-sm my-4"
            onClick={() => submitOrder()}
            disabled={disableSubmitOrder()}
          >
            Submit Order
          </button>
        </div>
      </div>
    );
  };

  const renderPosition = (): JSX.Element => {
    if (!position) return <></>;
    const initialEquity = position.cost;
    const currentEquity = position.quantity * company.latestPrice;
    const averagePrice = position.cost / position.quantity;
    const profit = currentEquity - initialEquity;
    const percent = (profit / initialEquity) * 100;

    return (
      <div className={styles.positionContainer}>
        <div className={`${styles.positionRow} font-weight-bold`}>
          <div className={styles.positionColumn}>Quantity</div>
          <div className={styles.positionColumn}>Average Price</div>
          <div className={styles.positionColumn}>Profit</div>
          <div className={styles.positionColumn}>Percent</div>
          <div className={styles.positionColumn}>Equity</div>
        </div>
        <div className={styles.positionRow}>
          <div className={styles.positionColumn}>{position.quantity}</div>
          <div className={styles.positionColumn}>
            {displayNumber(averagePrice, "$")}
          </div>
          {colorCodeNumber(
            displayNumber(profit, "$"),
            profit,
            styles.positionColumn,
          )}
          {colorCodeNumber(
            displayNumber(percent, "%"),
            percent,
            styles.positionColumn,
          )}
          <div className={styles.positionColumn}>
            {displayNumber(currentEquity, "$")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-100">
      <h4 className="m-0">{company.name}</h4>
      <h5 className="m-0 pt-2">{displayNumber(company.latestPrice, "$")}</h5>
      {position?.ticker && renderPosition()}
      {renderOrderBox()}

      {user.watchlist.includes(company.ticker) ? (
        <div className={styles.watchlistButton}>
          <button
            className="btn btn-outline-info btn-sm mt-3"
            onClick={() => removeFromWatchlist()}
          >
            Remove from Watchlist
          </button>
        </div>
      ) : (
        <div className={styles.watchlistButton}>
          <button
            className="btn btn-outline-info btn-sm mt-3"
            onClick={() => addToWatchlist()}
          >
            Add to Watchlist
          </button>
        </div>
      )}
    </div>
  );
};
