import { ReactNode, useState } from "react";
import AboutUs from "../info/AboutUs";
import Sources from "../info/Sources";
import { buttonSize, Theme } from "../themes";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import InfoPopup from "../info/InfoPopup";
import HamburgerButton from "./HamburgerButton";
import styles from "./Menu.module.css";

const Menu = ({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) => {
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? Theme.Light : Theme.Dark);

  const [popupContent, setPopupContent] = useState<ReactNode>(undefined);

  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerButton open={open} setOpen={setOpen} />
      <nav className={`${styles.menu} ${open ? styles.opened : ""}`}>
        <div
          role="button"
          onClick={() => {
            setOpen(false);
            setPopupContent(<AboutUs />);
          }}
        >
          Про нас
        </div>
        <div
          role="button"
          onClick={() => {
            setOpen(false);
            setPopupContent(<Sources />);
          }}
        >
          Використані джерела
        </div>
        <div role="button" onClick={toggleTheme}>
          {isDarkTheme ? (
            <MoonStarsFill size={buttonSize} />
          ) : (
            <SunFill size={buttonSize} />
          )}
        </div>
      </nav>
      <InfoPopup
        open={!!popupContent}
        onClose={() => setPopupContent(undefined)}
      >
        {popupContent}
      </InfoPopup>
    </>
  );
};

export default Menu;
