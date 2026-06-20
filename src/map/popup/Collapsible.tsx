import { type ReactNode, useState } from "react";
import styles from "./Collapsible.module.css";

const Collapsible = ({
  header,
  children,
  expanded,
}: {
  header: string;
  children: ReactNode;
  expanded?: boolean;
}) => {
  const [isExpanded, expand] = useState(expanded ?? false);
  return (
    <div className={`${isExpanded ? "" : styles.collapsed}`}>
      <div className={styles.header}>
        <button type="button" onClick={() => expand(!isExpanded)}>
          {header}
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Collapsible;
