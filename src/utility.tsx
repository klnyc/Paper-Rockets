import type { JSX } from "react";

const randomNumberSign = (): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  return randomNumber * randomSign; // ranges between -1 and 1
};

export const generatePriceChange = (price: number): number => {
  const precentChange = randomNumberSign() * 0.02; // ranges between -2% and 2%
  const priceChange = precentChange * price;
  const newPrice = Number.parseFloat((price + priceChange).toFixed(2));
  return newPrice;
};

export const displayNumber = (number: number, format?: string): string => {
  const displayText = number.toFixed(2);

  switch (format) {
    case "%":
      return displayText + "%";
    case "$":
      return "$" + displayText;
    default:
      return displayText;
  }
};

export const colorCodeNumber = (
  displayText: string,
  number: number,
  className: string,
): JSX.Element => {
  return (
    <div
      className={`${className} ${number < 0 ? "text-danger" : "text-success"}`}
    >
      {displayText}
    </div>
  );
};
