import styles from "./Page.module.css";
import { mappedSources } from "../utils";

const Sources = () => {
  return (
    <div className={styles.page}>
      <h2>Використані джерела</h2>
      <ol>
        {mappedSources.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Sources;
