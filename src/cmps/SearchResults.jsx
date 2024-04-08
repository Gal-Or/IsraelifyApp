import { SongResults } from "./SongResults";
import { StationResults } from "./StationResults";

export function SearchResults({ songResults, stationResults }) {
  return (
    <div>
      <SongResults songResults={songResults} />
      <StationResults stationResults={stationResults} />
    </div>
  );
}
