import { useState } from "react";
import { buttonSize, Theme } from "../themes";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import HamburgerButton from "./HamburgerButton";
import styles from "./Menu.module.css";
import { siteMap } from "../pages/SiteMap";

const Menu = ({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) => {
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? Theme.Light : Theme.Dark);

  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerButton open={open} setOpen={setOpen} />
      <nav className={`${styles.menu} ${open ? styles.opened : ""}`}>
        {siteMap.map((page, index) => (
          <a key={index} href={page.path || "?"}>
            {page.title}
          </a>
        ))}
        <div
          role="button"
          aria-label={
            isDarkTheme
              ? "Увімкнути світлу тему сайту"
              : "Увімкнути темну тему сайту"
          }
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
