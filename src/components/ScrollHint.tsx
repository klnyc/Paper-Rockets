import styles from "./styles/ScrollHint.module.scss";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export const ScrollHint = () => {
  return (
    <div className={styles.scrollHint}>
      <MdKeyboardDoubleArrowDown className={styles.scrollHintIcon} />
    </div>
  );
};

export function scrollHintHandler(
  element: HTMLDivElement | null,
  tolerance = 4,
): boolean {
  if (!element) return false;

  const isOverflowing = element.scrollHeight > element.clientHeight;
  const isBottom =
    element.scrollTop + element.clientHeight >=
    element.scrollHeight - tolerance;

  return isOverflowing && !isBottom;
}
