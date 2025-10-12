import "./Footer.css";

const Footer = () => {
  const separator = " ⨳ ";

  return (
    <div className="footer">
      <span>
        Детектив-архіваріус: <b>Hans</b>
        {separator}Розробник-відьмар: <b>CatSkald</b>
      </span>
      <span>
        <a
          href="https://www.maptiler.com/copyright/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; MapTiler
        </a>
        {separator}
        <a
          href="https://openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; OpenStreetMap
        </a>
      </span>
    </div>
  );
};

export default Footer;
