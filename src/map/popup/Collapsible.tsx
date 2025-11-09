import "./Collapsible.css";

import { useState, ReactNode } from "react";

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
    <div className={`collapsible${isExpanded ? "" : " collapsed"}`}>
      <h2 className="collapsible-header" onClick={() => expand(!isExpanded)}>
        {header}
      </h2>
      <div className="collapsible-content">{children}</div>
    </div>
  );
};

export default Collapsible;
