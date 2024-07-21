const BuildingHistory = ({ data }: { data: string }) => {
  const history = data.split(";");
  return (
    <div className="newline">
      <hr />
      {history.length <= 1 ? (
        <>
          <span style={{ fontWeight: "bold" }}>Історія: </span>
          <span>{history[0]}</span>
        </>
      ) : (
        <div className="newline">
          <span style={{ fontWeight: "bold" }}>Історія:</span>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuildingHistory;
