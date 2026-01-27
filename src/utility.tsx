import type { JSX } from "react";

export const generatePriceChange = (price: number): number => {
  const randomNumber = Math.random() * 2 - 1; // -1 to 1
  const percentChange = randomNumber * 0.001; // +/- 0.1%
  const priceChange = percentChange * price;
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
