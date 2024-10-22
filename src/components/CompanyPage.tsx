import { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles/CompanyPage.module.scss";
import { Company, Position } from "../types";
import { firestore } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { roundNumber } from "../utility";

interface CompanyPageProps {
  company: Company;
  user: DocumentData;
  setUser: (user: DocumentData) => void;
}

export const CompanyPage = ({ company, user, setUser }: CompanyPageProps): JSX.Element => {
  const [orderMode, setOrderMode] = useState<string>("buy");
  const [quantity, setQuantity] = useState<string>("");
  const [position, setPosition] = useState<Position | undefined>();

  const cost = roundNumber(Number(quantity) * company.latestPrice);

  const userRef = doc(firestore, `users/${user.userID}`);

  const handleQuantityInput = (event: ChangeEvent<HTMLInputElement>) =>
    setQuantity(event.target.value);

  const selectInput = () => {
    const input = document.getElementById("quantityInput");
    input?.focus();
    // input?.select();
  };

  const findPosition = () => {
    const userPosition = user.portfolio.filter(
      (position: Position) => position.ticker === company.ticker
    );
    if (userPosition.length) setPosition(userPosition[0]);
  };

  const addToWatchlist = () => {
    updateDoc(userRef, {
      watchlist: arrayUnion(company.ticker),
    }).then(() => {
      const ref = doc(firestore, `users/${user.userID}`);
      getDoc(ref).then((userData: DocumentData) => {
        if (userData) {
          setUser(userData.data());
        }
      });
    });
  };

  const removeFromWatchlist = () => {
    updateDoc(userRef, {
      watchlist: arrayRemove(company.ticker),
    }).then(() => {
      const ref = doc(firestore, `users/${user.userID}`);
      getDoc(ref).then((userData: DocumentData) => {
        if (userData) {
          setUser(userData.data());
        }
      });
    });
  };

  const buy = () => {
    const buyOrder = {
      ticker: company.ticker,
      quantity: Number(quantity) + (position?.quantity || 0),
      cost: cost + (position?.cost || 0),
    };

    if (position) {
      updateDoc(userRef, {
        watchlist: arrayRemove(position),
      })
        .then(() => {
          const ref = doc(firestore, `users/${user.userID}`);
          updateDoc(ref, {
            balance: roundNumber(user.balance - cost),
            portfolio: arrayUnion(buyOrder),
          });
        })
        .then(() => {
          const ref = doc(firestore, `users/${user.userID}`);
          getDoc(ref).then((userData: DocumentData) => {
            if (userData) {
              setUser(userData.data());
            }
          });
        });
    } else {
      updateDoc(userRef, {
        balance: roundNumber(user.balance - cost),
        portfolio: arrayUnion(buyOrder),
      }).then(() => {
        const ref = doc(firestore, `users/${user.userID}`);
        getDoc(ref).then((userData: DocumentData) => {
          if (userData) {
            setUser(userData.data());
          }
        });
      });
    }
  };

  const sell = () => {
    if (!position) return;

    const sellOrder = {
      ticker: company.ticker,
      quantity: position.quantity - Number(quantity),
      cost: position.cost - cost,
    };

    if (Number(quantity) === position.quantity) {
      updateDoc(userRef, {
        balance: roundNumber(user.balance + cost),
        portfolio: arrayRemove(position),
      }).then(() => {
        const ref = doc(firestore, `users/${user.userID}`);
        getDoc(ref).then((userData: DocumentData) => {
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
          const ref = doc(firestore, `users/${user.userID}`);
          updateDoc(ref, {
            balance: roundNumber(user.balance + cost),
            portfolio: arrayUnion(sellOrder),
          });
        })
        .then(() => {
          const ref = doc(firestore, `users/${user.userID}`);
          getDoc(ref).then((userData: DocumentData) => {
            if (userData) {
              setUser(userData.data());
            }
          });
        });
    }
  };

  const submitOrder = () => {
    orderMode === "buy" ? buy() : sell();
    setQuantity("");
  };

  const renderOrderBox = () => (
    <div className={styles.buySellContainer}>
      <div className={styles.buySellTabContainer}>
        <div
          className={
            orderMode === "buy"
              ? styles.buySellTab
              : `${styles.buySellTab} ${styles.notActive}`
          }
          onClick={() => setOrderMode("buy")}
        >
          Buy
        </div>
        <div
          className={
            orderMode === "sell"
              ? styles.buySellTab
              : `${styles.buySellTab} ${styles.notActive}`
          }
          onClick={() => setOrderMode("sell")}
        >
          Sell
        </div>
      </div>
      <div>
        <input
          id="quantityInput"
          className={styles.quantityInput}
          type="number"
          value={quantity}
          placeholder="NUMBER"
          onChange={handleQuantityInput}
          onClick={() => selectInput()}
        />
        <div className="my-3">SHARES</div>
        <div>${cost}</div>
        {position?.quantity !== undefined &&
        Number(quantity) > position.quantity &&
        orderMode === "sell" ? (
          <button className="btn btn-secondary btn-sm my-4">
            Invalid Order
          </button>
        ) : (
          <button
            className="btn btn-outline-info btn-sm my-4"
            onClick={() => submitOrder()}
          >
            Submit Order
          </button>
        )}
      </div>
    </div>
  );

  const renderPosition = () => {
    if (!position) return <></>;
    const initialEquity = position.cost;
    const currentEquity = roundNumber(position.quantity * company.latestPrice);
    const averagePrice = roundNumber(position.cost / position.quantity);
    const profit = roundNumber(currentEquity - initialEquity);
    const percent = roundNumber((profit / initialEquity) * 100);
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
          <div className={styles.positionColumn}>{averagePrice}</div>
          <div className={styles.positionColumn}>{profit}</div>
          <div className={styles.positionColumn}>{percent}</div>
          <div className={styles.positionColumn}>{currentEquity}</div>
        </div>
      </div>
    );
  };

  useEffect(findPosition, [user.portfolio, company.ticker]);

  return (
    <div>
      <h4 className="p-4">{company.name}</h4>
      <h5 className="px-4">${roundNumber(company.latestPrice)}</h5>
      {position?.ticker && renderPosition()}
      {renderOrderBox()}
      {user.watchlist.includes(company.ticker) ? (
        <div className={styles.watchlistButton}>
          <button
            className="btn btn-outline-info btn-sm m-4"
            onClick={() => removeFromWatchlist()}
          >
            Remove from Watchlist
          </button>
        </div>
      ) : (
        <div className={styles.watchlistButton}>
          <button
            className="btn btn-outline-info btn-sm m-4"
            onClick={() => addToWatchlist()}
          >
            Add to Watchlist
          </button>
        </div>
      )}
    </div>
  );
};
