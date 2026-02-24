import { HistoryEntry } from "../../types/types";
import Collapsible from "./Collapsible";
import RichText from "./RichText";

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
            <RichText data={item.description} />
          </li>
        ))}
      </ul>
    </Collapsible>
  );
};

export default BuildingHistory;
