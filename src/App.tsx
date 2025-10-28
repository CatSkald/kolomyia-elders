import { lazy, Suspense, useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Theme } from "./themes";
import { Filters } from "./Filters";
import { periods } from "./data/periods";
import Loader from "./loader/Loader";
import { SiteMap } from "./pages/SiteMap";
import AboutUs from "./pages/AboutUs";
import Sources from "./pages/Sources";

const Map = lazy(() => import("./map/Map"));

function App() {
  const [theme, setTheme] = useState(Theme.Dark);
  const toggleTheme = (): void => {
    document.body.classList.toggle("dark-mode");
  };

  const [filters, setFilters] = useState<Filters>({
    periods: periods,
    monuments: true,
    unknown: true,
    lost: [],
  });

  const [activePage, setActivePage] = useState<SiteMap>(SiteMap.Map);

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
        activePage={activePage}
        setActivePage={(page) => setActivePage(page ?? SiteMap.Map)}
      />
      <main>
        {(activePage === SiteMap.Map || activePage === SiteMap.Search) && (
          <Suspense fallback={<Loader />}>
            <Map theme={theme} filters={filters} />
          </Suspense>
        )}
        {activePage === SiteMap.AboutUs && <AboutUs />}
        {activePage === SiteMap.Sources && <Sources />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
