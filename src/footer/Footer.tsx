import "./Footer.css";

const Footer = () => {
  const separator = " ⨳ ";

  return (
    <div className="footer">
      <span>
        Детектив-архіваріус: <b>Hans</b>
        {separator}Розробник-відьмар: <b>CatSkald</b>
      </span>
      <span className="footer-separator">{separator}</span>
      <span>
        <a
          href="https://openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; OpenStreetMap
        </a>
        {separator}
        <a
          href="https://openmaptiles.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; OpenMapTiles
        </a>
      </span>
    </div>
  );
};

export default Footer;
