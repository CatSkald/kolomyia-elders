import { mappedVocabulary } from "../utils";
import styles from "./Page.module.css";

const Glossary = () => {
  return (
    <div className={styles.page}>
      <h2>Словник</h2>
      <ul>
        {mappedVocabulary
          .sort((a, b) => a.word.localeCompare(b.word, ["uk", "pl", "de"]))
          .map((item) => (
            <li key={item.id}>
              <span style={{ fontWeight: "bold" }}>{item.word}</span> —{" "}
              {item.definition}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Glossary;
