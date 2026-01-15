import type { JSX } from "react";

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
