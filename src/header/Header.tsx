import { MoonStarsFill, SunFill } from "react-bootstrap-icons";
import Legend from "./Legend";
import { useState } from "react";
import { Theme } from "../types";

const Header = ({
  theme,
  onChangeTheme,
}: {
  theme: Theme;
  onChangeTheme: () => void;
}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const toggleSelectedTheme = () => {
    selectedTheme === Theme.Light
      ? setSelectedTheme(Theme.Dark)
      : setSelectedTheme(Theme.Light);
    onChangeTheme();
  };
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <div className="button" style={{ marginRight: "0.5rem" }}>
          <ListFill />
        </div> */}
        <h1>Історичні будівлі Коломиї</h1>
        <div
          className="button"
          style={{ marginRight: "0.5rem" }}
          onClick={toggleSelectedTheme}
        >
          {selectedTheme === "dark" ? <MoonStarsFill /> : <SunFill />}
        </div>
      </div>
      <hr />
      <Legend />
    </div>
  );
};

export default Header;
