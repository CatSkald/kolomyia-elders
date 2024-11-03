import { HistoryEntry } from "../types/types";

const BuildingHistory = ({ data }: { data: HistoryEntry[] }) => {
  // TODO Show dynamically
  return (
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
  );
};

export default BuildingHistory;
