import "./App.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Map from "./map/Map";

function App() {
  return (
    <div className="app">
      <Header />
      <section className="map-container">
        <Map />
      </section>
      <Footer />
    </div>
  );
}

export default App;
