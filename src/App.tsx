import { useState } from "react";
import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Map from "./map/Map";
import { Theme } from "./themes";

function App() {
  const [theme, setTheme] = useState(Theme.Dark);

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} />
      <section className="map-container">
        <Map theme={theme} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
