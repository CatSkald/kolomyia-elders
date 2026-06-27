import "./Footer.css";

const Footer = () => {
  const separator = " ⨳ ";

  return (
    <div className="footer">
      <span>
        Детектив-архіваріус: <b>Hans</b>
        {separator}Розробник-відьмар: <b>CatSkald</b>
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
