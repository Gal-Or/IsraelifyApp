import { useEffect } from "react";

export function SongDetails({ song }) {
  useEffect(() => {
    if (song) console.log(song.name);
  }, [song]);

  if (!song) return <div>Loading...</div>;
  return (
    <div className="song-details flex align-center">
      <div className="artist-img">
        <img src={song.img} alt={song.name} />
      </div>
      <div className="song-info">
        <p>{(song && song.name) || "Song Name"}</p>
        <small>{(song && song.artist) || "Artist"}</small>
      </div>
    </div>
  );
}
