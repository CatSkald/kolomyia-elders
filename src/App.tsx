import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Map from "./map/Map";
import { Theme } from "./themes";

function App() {
  const toggleTheme = (): void => {
    document.querySelector(".app")?.classList.toggle("dark-mode");
  };

  return (
    <div className="app dark-mode">
      <Header theme={Theme.Dark} onChangeTheme={toggleTheme} />
      <section className="map-container">
        <Map />
      </section>
      <Footer />
    </div>
  );
}

export default App;
