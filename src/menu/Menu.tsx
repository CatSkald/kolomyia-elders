import { useState } from "react";
import { buttonSize, Theme } from "../themes";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import HamburgerButton from "./HamburgerButton";
import styles from "./Menu.module.css";
import { SiteMap } from "../pages/SiteMap";

const Menu = ({
  theme,
  setTheme,
  setActivePage,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setActivePage: (page?: SiteMap) => void;
}) => {
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? Theme.Light : Theme.Dark);

  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerButton open={open} setOpen={setOpen} />
      <nav className={`${styles.menu} ${open ? styles.opened : ""}`}>
        {Object.entries(SiteMap).map(([key, value]: [string, SiteMap]) => (
          <div
            key={key}
            role="button"
            onClick={() => {
              setOpen(false);
              setActivePage(value);
            }}
          >
            {value}
          </div>
        ))}
        <div
          role="button"
          onClick={() => {
            setOpen(false);
            toggleTheme();
          }}
        >
          {isDarkTheme ? (
            <MoonStarsFill size={buttonSize} />
          ) : (
            <SunFill size={buttonSize} />
          )}
        </div>
      </nav>
    </>
  );
};

export default Menu;
