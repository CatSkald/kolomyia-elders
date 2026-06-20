import styles from "./HamburgerButton.module.css";

const HamburgerButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div className={styles.menu}>
      <button
        type="button"
        aria-label="Меню"
        className={open ? styles.opened : ""}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default HamburgerButton;
