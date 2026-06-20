import { useEffect, useState } from "react";
import { Search, XLg } from "react-bootstrap-icons";
import type { Filters } from "../map/Filters";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) => {
  const [value, setValue] = useState(filters.searchTerm ?? "");

  useEffect(() => {
    if (value === "") setFilters({ ...filters, searchTerm: undefined });
    setFilters({ ...filters, searchTerm: value });
  }, [value]); // warning expected, filters are not expected to change on this page other than the search term

  return (
    <div className={styles.container}>
      <input
        // biome-ignore lint/a11y/noAutofocus: We want to focus on search
        autoFocus={true}
        type="search"
        name="search"
        placeholder="Шукати на карті..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={styles.searchIcon}>
        {value ? (
          <button
            type="button"
            aria-label="Очистити поле пошуку"
            onClick={() => setValue("")}
          >
            <XLg />
          </button>
        ) : (
          <Search />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
