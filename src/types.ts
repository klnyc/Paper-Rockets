export interface PortfolioStock {
  cost: number;
  quantity: number;
  ticker: string;
}

export interface User {
  balance: number;
  email: string;
  orders: any;
  portfolio: PortfolioStock[];
  userID: string;
  watchlist: string[];
}

export interface Stock {
  ticker: string;
  latestPrice: number;
  name: string;
}

export interface Position {
  cost: number;
  quantity: number;
  ticker: string;
}
