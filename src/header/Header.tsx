import "./Header.css";

import Legend from "./Legend";
import { Theme } from "../themes";
import { Filters } from "../map/Filters";
import Menu from "../menu/Menu";
import SearchBar from "../search/SearchBar";

const Header = ({
  theme,
  setTheme,
  filters,
  setFilters,
  showFilters,
  showSearch,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  showFilters: boolean;
  showSearch: boolean;
}) => {
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Menu theme={theme} setTheme={setTheme} />
        <h1>Архітектурна спадщина Коломиї</h1>
      </div>
      <hr />
      {showFilters && <Legend filters={filters} setFilters={setFilters} />}
      {showSearch && <SearchBar filters={filters} setFilters={setFilters} />}
    </div>
  );
};

export default Header;
