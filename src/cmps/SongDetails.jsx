import React, { useEffect } from "react";
import { Loader } from "./Loader";

export function SongDetails({ song, children, isCompact }) {
  if (!song) return <Loader />;

  return (
    <div className="song-details">
      {!isCompact && (
        <div className="song-img">
          <img src={song.img} alt={song.name} />
          {children}
        </div>
      )}

      <div className="song-info">
        <p className="song-name">{(song && song.name) || "Song Name"}</p>
        {!isCompact && (
          <small>{song.artists ? song.artists[0].name : song.artist}</small>
        )}
      </div>
    </div>
  );
}
