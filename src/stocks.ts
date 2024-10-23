import { Stocks } from "./types";

export const generateInitialPrice = (price: number): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  const initialPercent = randomNumber * randomSign * 0.2; // ranges between -20% and 20%

  const initialPrice = Number.parseFloat(
    (price * (1 + initialPercent)).toFixed(2)
  );

  return initialPrice;
};

export const generatePriceChange = (): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  return Number.parseFloat((randomNumber * randomSign).toFixed(2));
};

export const stocks: Stocks = {
  tesla: {
    ticker: "TSLA",
    latestPrice: 260,
    name: "Tesla",
  },
  apple: {
    ticker: "AAPL",
    latestPrice: 262,
    name: "Apple",
  },
  google: {
    ticker: "GOOGL",
    latestPrice: 158,
    name: "Google",
  },
  microsoft: {
    ticker: "MSFT",
    latestPrice: 228,
    name: "Microsoft",
  },
  nvidia: {
    ticker: "NVDA",
    latestPrice: 142,
    name: "Nvidia",
  },
  sofi: {
    ticker: "SOFI",
    latestPrice: 11,
    name: "Sofi",
  },
  spy: {
    ticker: "SPY",
    latestPrice: 584,
    name: "S&P 500",
  },
};
