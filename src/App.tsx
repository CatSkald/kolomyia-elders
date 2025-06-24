import { useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Map from "./map/Map";
import { Theme } from "./themes";
import { Filters } from "./Filters";
import { periods } from "./data/periods";

function App() {
  const [theme, setTheme] = useState(Theme.Dark);
  const [filters, setFilters] = useState<Filters>({
    periods: periods,
    monuments: true,
    unknown: true,
    lost: false,
  });

  const toggleTheme = (): void => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="app">
      <Header
        theme={theme}
        setTheme={(theme) => {
          setTheme(theme);
          toggleTheme();
        }}
        filters={filters}
        setFilters={setFilters}
      />
      <section className="map-container">
        <Map theme={theme} filters={filters} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
