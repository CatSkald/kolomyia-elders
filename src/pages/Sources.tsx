import { mappedSources } from "../utils";
import styles from "./Page.module.css";

const Sources = () => {
  return (
    <div className={styles.page}>
      <h2>Використані джерела</h2>
      <ol>
        {mappedSources.map((item) => (
          <li key={item.number}>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Sources;
