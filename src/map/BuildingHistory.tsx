import { HistoryEntry } from "../types/types";
import Collapsible from "./Collapsible";
import Sources from "./Sources";

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
              {item.sources && <Sources data={item.sources} />}
            </span>
          </li>
        ))}
      </ul>
    </Collapsible>
  );
};

export default BuildingHistory;
