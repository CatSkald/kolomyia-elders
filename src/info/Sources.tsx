import { mappedSources } from "../utils";

const Sources = () => {
  return (
    <>
      <span style={{ fontWeight: "bold" }}>Використані джерела:</span>
      <ol style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
        {mappedSources.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Sources;
