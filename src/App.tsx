import { useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Map from "./map/Map";
import { Theme } from "./themes";

function App() {
  const [theme, setTheme] = useState(Theme.Dark);
  const toggleTheme = (): void => {
    document.querySelector(".app")?.classList.toggle("dark-mode");
  };

  return (
    <div className="app dark-mode">
      <Header
        theme={theme}
        setTheme={(theme) => {
          setTheme(theme);
          toggleTheme();
        }}
      />
      <section className="map-container">
        <Map theme={theme} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
