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

export interface User {
  balance: number;
  email: string;
  orders: any;
  portfolio: Position[];
  userID: string;
  watchlist: string[];
}

export interface Stocks {
  [stock: string]: Stock;
}
