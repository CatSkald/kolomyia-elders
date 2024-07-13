import "./App.css";
import Header from "./header/Header";
import Map from "./map/Map";

function App() {
  return (
    <div className="app">
      <Header />
      <section className="map-container">
        <Map />
      </section>
    </div>
  );
}

export default App;
