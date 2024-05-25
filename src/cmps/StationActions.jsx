export function StationActions({ station, setIsCompact, isCompact }) {
  return (
    <div className="station-actions">
      <button className="btn">Play</button>
      <button className="btn">...</button>
      <button
        className="btn"
        onClick={() => {
          console.log("edit");
          setIsCompact((prev) => !prev);
        }}
      >
        {isCompact ? "List" : "Compact"}{" "}
      </button>
    </div>
  );
}
