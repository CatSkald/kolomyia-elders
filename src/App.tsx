import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Theme } from "./themes";
import { Filters } from "./Filters";
import Loader from "./loader/Loader";
import { SiteMap } from "./pages/SiteMap";
import AboutUs from "./pages/AboutUs";
import Sources from "./pages/Sources";
import { UserPreferences } from "./UserPreferences";

const Map = lazy(() => import("./map/Map"));

function App() {
  const preferences = UserPreferences.load();

  const [theme, setTheme] = useState(preferences.theme);
  const selectTheme = (theme: Theme): void => {
    preferences.updateTheme(theme);

    setTheme(theme);
  };

  useEffect(() => {
    switch (theme) {
      case Theme.Dark:
        document.body.classList.add("dark-mode");
        break;
      case Theme.Light:
        document.body.classList.remove("dark-mode");
        break;
    }
  }, [theme]);

  const [filters, setFilters] = useState<Filters>(preferences.filters);
  const selectFilters = (filters: Filters): void => {
    preferences.updateFilters(filters);
    setFilters(filters);
  };

  const [activePage, setActivePage] = useState<SiteMap>(SiteMap.Map);

  return (
    <div className="app">
      <Header
        theme={theme}
        setTheme={selectTheme}
        filters={filters}
        setFilters={selectFilters}
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
