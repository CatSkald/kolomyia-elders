import { useState } from "react";
import styles from "./HamburgerButton.module.css";

const HamburgerButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.button} ${open ? styles.opened : ""}`}
      onClick={() => setOpen(!open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerButton;
