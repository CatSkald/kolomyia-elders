import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { Filters } from "../Filters";

const SearchBar = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  const [value, setValue] = useState(filters.searchTerm ?? "");
  useEffect(() => {
    if (value.length > 1) setFilters({ ...filters, searchTerm: value });
  });
  return (
    <div className={styles.container}>
      <input
        type="text"
        name="search"
        placeholder="Шукати на карті..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className="buttons">
        <div className="button-search"></div>
        <div
          className="button-close"
          role="button"
          onClick={() => setValue("")}
        >
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
