import { SongContainer } from "./SongContainer";

export function SongList({ station }) {
  if (!station || !station.songs) return <div>Loading...</div>;
  return (
    <ul className="song-list">
      {station.songs.map((song) => (
        <li key={song.id}>
          <SongContainer song={song} />
        </li>
      ))}
    </ul>
  );
}
