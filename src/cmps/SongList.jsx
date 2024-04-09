import { useEffect } from "react";
import { SongContainer } from "./SongContainer";

export function SongList({ songList }) {
  if (!songList) return <h1>loading...</h1>;
  return (
    <ul className="song-list">
      {songList?.map((song, index) => (
        <li key={song.id}>
          <SongContainer song={song} />
        </li>
      ))}
    </ul>
  );
}
