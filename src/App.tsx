import { lazy, Suspense, useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Theme } from "./themes";
import { Filters } from "./Filters";
import { periods } from "./data/periods";
import Loading from "./Loading";

const Map = lazy(() => import("./map/Map"));

function App() {
  const [theme, setTheme] = useState(Theme.Dark);
  const [filters, setFilters] = useState<Filters>({
    periods: periods,
    monuments: true,
    unknown: true,
    lost: [],
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
      <Suspense fallback={<Loading />}>
        <section className="map-container">
          <Map theme={theme} filters={filters} />
        </section>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
