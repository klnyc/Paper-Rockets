import type { JSX } from "react";

export const displayNumber = (number: number): string => number.toFixed(2);

export const colorCodeNumber = (
  displayText: string,
  number: number,
  className: string
): JSX.Element => {
  return (
    <div
      className={`${className} ${number < 0 ? "text-danger" : "text-success"}`}
    >
      {displayText}
    </div>
  );
};
