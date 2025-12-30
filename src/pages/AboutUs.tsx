import { updatedOn } from "../data/updatedOn";
import styles from "./Page.module.css";

const AboutUs = () => {
  return (
    <div className={styles.page}>
      <h2>Про нас</h2>
      <span>
        Наш сайт створено з метою популяризації історії міста Коломиї.
        Інформація постійно доповнюється і допрацьовується. Оновлено у{" "}
        <b>
          {updatedOn.month}&nbsp;{updatedOn.year}
        </b>
        .
      </span>
      <br />
      <br />
      <span>
        Знайшли помилку або маєте запитання?{" "}
        <a
          href="https://forms.gle/DkXKWuTNAay6YG3k9"
          title="Зв'яжіться з нами"
          target="_blank"
          rel="noopener noreferrer"
        >
          Зв&apos;яжіться&nbsp;з&nbsp;нами
        </a>
      </span>
      <br />
      <br />
      <br />
      <div style={{ fontStyle: "italic" }}>
        <span>Ідея сайту навіяна проектами</span> “
        <a
          href="https://map.klym.uk/"
          rel="external noopener noreferrer"
          target="_blank"
        >
          Вік&nbsp;будинків&nbsp;Станиславова
        </a>
        ” та “
        <a
          href="https://kolobramy.com.ua/"
          rel="external noopener noreferrer"
          target="_blank"
        >
          коло&nbsp;брами
        </a>
        ”.
      </div>
    </div>
  );
};

export default AboutUs;
