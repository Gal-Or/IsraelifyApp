import { StationActions } from "./StationActions.jsx";
import { SongList } from "./SongList.jsx";

export function StationContent({ station }) {
  return (
    <div className="station-content">
      <StationActions />
      <SongList songList={station.songs} />
    </div>
  );
}
