import React, { useEffect } from "react";

export function SongDetails({ song, children, isCompact }) {
  useEffect(() => {
    console.log("SongDetails rendered", isCompact);
  }, [isCompact]);
  if (!song) return <div>Loading...</div>;
  return (
    <div className="song-details">
      {!isCompact && (
        <div className="song-img">
          <img src={song.img} alt={song.name} />
          {children}
        </div>
      )}

      <div className="song-info">
        <p>{(song && song.name) || "Song Name"}</p>
        {!isCompact && <small>{(song && song.artist) || "Artist"}</small>}
      </div>
    </div>
  );
}
