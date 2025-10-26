import styles from "./HamburgerButton.module.css";

const HamburgerButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div
      role="button"
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
