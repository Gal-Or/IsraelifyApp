import { SongDetails } from "./SongDetails";
import { SongActions } from "./SongActions";
export function SongContainer({ song }) {
  return (
    <div className="song-container">
      <SongDetails song={song} />
      <SongActions />
    </div>
  );
}
