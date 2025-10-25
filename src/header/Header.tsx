import "./Header.css";

import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import Legend from "./Legend";
import InfoPopup from "../info/InfoPopup";
import { buttonSize, Theme } from "../themes";
import { Filters } from "../Filters";
import HamburgerButton from "./HamburgerButton";
import { ReactNode, useState } from "react";
import AboutUs from "../info/AboutUs";
import Sources from "../info/Sources";

const Header = ({
  theme,
  setTheme,
  filters,
  setFilters,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? Theme.Light : Theme.Dark);
  const [openMenu, setOpenMenu] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(undefined);

  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <HamburgerButton open={openMenu} setOpen={setOpenMenu} />
        <h1>Архітектурна спадщина Коломиї</h1>
        <nav className={openMenu ? "open" : ""}>
          <div
            role="button"
            onClick={() => {
              setOpenMenu(false);
              setPopupContent(<AboutUs />);
            }}
          >
            Про нас
          </div>
          <div
            role="button"
            onClick={() => {
              setOpenMenu(false);
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
      </div>
      <hr />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <div className="captioned">
          <div>Герб міста Коломия</div>
          <img
            className="preview"
            src={CoatOfArmsUrl}
            alt="Герб міста Коломия"
            style={{
              maxWidth: "5vh",
            }}
          />
        </div> */}
        <Legend filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default Header;
