import "./Footer.css";

const Footer = () => {
  const separator = " ⨳ ";

  return (
    <div className="footer">
      <span>
        Детектив-архіваріус: <b>Hans</b>
        {separator}Розробник-відьмар:{" "}
        <a
          href="https://github.com/CatSkald"
          target="_blank"
          rel="noopener noreferrer"
        >
          CatSkald
        </a>
      </span>
      <span>
        <a
          href="https://www.maptiler.com/copyright/"
          target="_blank"
          rel="noopener"
        >
          &copy; MapTiler
        </a>
        {separator}
        <a
          href="https://openstreetmap.org/copyright"
          target="_blank"
          rel="noopener"
        >
          &copy; OpenStreetMap
        </a>
      </span>
      <span>
        Оновлено у <b>червні&nbsp;2025</b>
      </span>
    </div>
  );
};

export default Footer;
