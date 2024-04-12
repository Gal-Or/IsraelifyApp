import { SongList } from "./SongList";
import { StationActions } from "./StationActions";

export function StationContent({ station }) {
  return (
    <div className="station-content">
      <StationActions />
      <SongList station={station} />
    </div>
  );
}
