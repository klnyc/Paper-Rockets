import type { JSX } from "react";

const randomNumberSign = (): number => {
  const randomNumber = Math.random();
  const randomSign = randomNumber < 0.5 ? -1 : 1;
  return randomNumber * randomSign; // ranges between -1 and 1
};

export const generateInitialPrice = (price: number): number => {
  const initialPercent = randomNumberSign() * 0.2; // ranges between -20% and 20%
  const initialPrice = Number.parseFloat(
    (price * (1 + initialPercent)).toFixed(2),
  );

  return initialPrice;
};

export const generatePriceChange = (): number => {
  return Number.parseFloat((randomNumberSign()).toFixed(2));
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
