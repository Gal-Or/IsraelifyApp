import React, { useState } from "react";
import { useParams } from "react-router";
import { addSongToStation } from "../store/station.actions";
import { setCurrentSong } from "../store/player.actions";
import { utilService } from "../services/util.service";
import { SongDetails } from "./SongDetails";

export function SongResults({ songResults, onAddSongToStation }) {
  const params = useParams();
  const [showAll, setShowAll] = useState(false);

  async function onAddToPlaylist(song, stationId = 0) {
    if (params.stationId) {
      console.log("stationId", params.stationId);
      await addSongToStation(song, params.stationId);
      onAddSongToStation(song);
    } else await addSongToStation(song); // TODO:  implement add from search page
  }

  function onPlaySong(song) {
    setCurrentSong(song);
  }

  const displayedSongs = showAll ? songResults : songResults.slice(0, 5);

  return (
    <section className="song-results">
      <h1>Songs</h1>
      {displayedSongs.map((song) => (
        <article key={song.id} className="song-result">
          <SongDetails song={song} />
          <div className="song-actions">
            <button onClick={() => onAddToPlaylist(song)}>+</button>
            <button onClick={() => onPlaySong(song)}>▶</button>
          </div>
        </article>
      ))}
      {songResults.length > 5 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide All" : "Show More"}
        </button>
      )}
    </section>
  );
}
