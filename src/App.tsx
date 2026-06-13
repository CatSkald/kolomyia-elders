import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import type { LatLngTuple } from "leaflet";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Loader from "./loader/Loader";
import type { Filters } from "./map/Filters";
import { getCurrentPage } from "./pages/SiteMap";
import { Theme } from "./themes";
import { UserPreferences } from "./UserPreferences";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Map is a sound name
const Map = lazy(() => import("./map/Map"));

function App() {
  const preferences = UserPreferences.load();

  const [theme, setTheme] = useState(preferences.theme);
  const selectTheme = (theme: Theme): void => {
    preferences.updateTheme(theme);

    setTheme(theme);
  };

  const updateZoomPreferences = (zoom: number) =>
    preferences.updateMap({
      ...preferences.map,
      zoom: zoom,
    });
  const updateCoordinatesPreferences = (coordinates: LatLngTuple) =>
    preferences.updateMap({
      ...preferences.map,
      center: coordinates,
    });

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

  const activePage = getCurrentPage();
  const activePageComponent = activePage.getComponent();
  useEffect(() => {
    document.title = `${activePage.title} - Архітектурна спадщина міста Коломиї`;
  }, [activePage]);

  return (
    <div className="app">
      <Header
        theme={theme}
        setTheme={selectTheme}
        filters={filters}
        setFilters={selectFilters}
        showFilters={activePage.title === "Мапа"}
        showSearch={activePage.path === "?search"}
      />
      <main>
        {activePageComponent ?? (
          <Suspense fallback={<Loader />}>
            <Map
              theme={theme}
              filters={filters}
              mapSettings={preferences.map}
              onZoom={updateZoomPreferences}
              onMarkerSelected={updateCoordinatesPreferences}
            />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
