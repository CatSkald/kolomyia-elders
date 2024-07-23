import { parseHistory } from "../utils";

const BuildingHistory = ({ data }: { data: string }) => {
  const history = parseHistory(data);
  // TODO Show dynamically
  return (
    <ul>
      {history.map((item, index) => (
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
          {item.date && item.description && " - "}
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default BuildingHistory;
