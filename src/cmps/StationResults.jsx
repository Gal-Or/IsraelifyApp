import { StationPreview } from "./StationPreview.jsx";

export function StationResults({ stationResults }) {
  if (!stationResults) return <div>Loading...</div>;
  return (
    <div>
      <h1>StationResults</h1>
      <ul className="station-results">
        {stationResults.map((station) => (
          <li key={station._id}>
            <StationPreview station={station} key={station.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
