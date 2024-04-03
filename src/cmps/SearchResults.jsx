import { SongResults } from "./SongResults";
import { StationResults } from "./StationResults";

export function SearchResults({ songResults }) {
  return (
    <div>
      <SongResults songResults={songResults} />
      <StationResults />
    </div>
  );
}
