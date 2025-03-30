import { HistoryEntry } from "../types/types";
import Collapsible from "./Collapsible";

const BuildingHistory = ({ data }: { data: HistoryEntry[] }) => {
  return (
    <Collapsible header="Історія">
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <span
              style={
                item.description
                  ? { fontWeight: "bold", fontStyle: "italic" }
                  : {}
              }
            >
              {item.date}
            </span>
            {item.date && item.description && " — "}
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </Collapsible>
  );
};

export default BuildingHistory;
