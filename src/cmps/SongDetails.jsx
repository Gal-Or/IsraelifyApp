import React, { useEffect } from "react";

export function SongDetails({ song, children }) {
  if (!song) return <div>Loading...</div>;
  return (
    <div className="song-details">
      <p>{(song && song.order) || "Order"}</p>
      <div className="song-img">
        <img src={song.img} alt={song.name} />
        {children}
      </div>
      <div className="song-info">
        <p>{(song && song.name) || "Song Name"}</p>
        <small>{(song && song.artist) || "Artist"}</small>
      </div>
    </div>
  );
}
