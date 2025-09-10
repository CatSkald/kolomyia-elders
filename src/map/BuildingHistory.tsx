import { HistoryEntry } from "../types/types";
import Collapsible from "./Collapsible";

const BuildingHistory = ({ data }: { data: HistoryEntry[] }) => {
  return (
    <Collapsible header="Історія">
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.date && (
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                {item.date}
              </span>
            )}
            {item.date && item.description && " — "}
            <span style={{ whiteSpace: "pre-wrap" }}>
              {item.description}
              {item.sources && (
                <sup
                  className="has-tooltip"
                  title={item.sources.map((s) => s.title).join("; ")}
                >
                  {item.sources.map((s) => s.number).join(",")}
                </sup>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Collapsible>
  );
};

export default BuildingHistory;
