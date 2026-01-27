import { type Stocks } from "./types";

export const generateInitialPrice = (price: number): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  const initialPercent = randomNumber * randomSign * 0.2; // ranges between -20% and 20%

  const initialPrice = Number.parseFloat(
    (price * (1 + initialPercent)).toFixed(2),
  );

  return initialPrice;
};

export const generatePriceChange = (): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  return Number.parseFloat((randomNumber * randomSign).toFixed(2));
};

export const stocks: Stocks = {
  TSLA: {
    ticker: "TSLA",
    latestPrice: 260,
    name: "Tesla",
  },
  AAPL: {
    ticker: "AAPL",
    latestPrice: 262,
    name: "Apple",
  },
  GOOGL: {
    ticker: "GOOGL",
    latestPrice: 158,
    name: "Google",
  },
  MSFT: {
    ticker: "MSFT",
    latestPrice: 228,
    name: "Microsoft",
  },
  NVDA: {
    ticker: "NVDA",
    latestPrice: 142,
    name: "Nvidia",
  },
  SOFI: {
    ticker: "SOFI",
    latestPrice: 11,
    name: "Sofi",
  },
  SPY: {
    ticker: "SPY",
    latestPrice: 584,
    name: "S&P 500",
  },
  DIS: {
    ticker: "DIS",
    latestPrice: 108,
    name: "Disney",
  },
  AMC: {
    ticker: "AMC",
    latestPrice: 5,
    name: "AMC Entertainment",
  },
  META: {
    ticker: "META",
    latestPrice: 600,
    name: "Meta Platforms",
  },
  JPM: {
    ticker: "JPM",
    latestPrice: 192,
    name: "JP Morgan & Chase",
  },
  VZ: {
    ticker: "VZ",
    latestPrice: 42,
    name: "Verizon",
  },
  NIO: {
    ticker: "NIO",
    latestPrice: 5,
    name: "Nio",
  },
  LCID: {
    ticker: "LCID",
    latestPrice: 6,
    name: "Lucid",
  },
  CRM: {
    ticker: "CRM",
    latestPrice: 228,
    name: "Salesforce",
  },
  AMD: {
    ticker: "AMD",
    latestPrice: 250,
    name: "Advanced Micro Devices",
  },
  WMT: {
    ticker: "WMT",
    latestPrice: 116,
    name: "Walmart",
  },
  PLTR: {
    ticker: "PLTR",
    latestPrice: 170,
    name: "Palantir",
  },
  ORCL: {
    ticker: "ORCL",
    latestPrice: 170,
    name: "Oracle",
  },
  MU: {
    ticker: "MU",
    latestPrice: 400,
    name: "Micron Technology",
  },
  INTC: {
    ticker: "INTC",
    latestPrice: 40,
    name: "Intel",
  },
  BA: {
    ticker: "BA",
    latestPrice: 200,
    name: "Boeing",
  },
  HOOD: {
    ticker: "HOOD",
    latestPrice: 100,
    name: "Robinhood",
  },
};
