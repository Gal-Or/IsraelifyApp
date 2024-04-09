import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { addSongToStation } from "../store/station.actions";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import { SongDetails } from "./SongDetails";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import addIcon from "../assets/icons/addIcon.svg";
import tickIcon from "../assets/icons/tickIcon.svg";

export function SongResults({ songResults, onAddSongToStation }) {
  const params = useParams();
  const [showAll, setShowAll] = useState(false);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);

  useEffect(() => {
    console.log("songResults", songResults);
  }, [songResults]);
  async function onAddToPlaylist(song, stationId = 0) {
    song.stationIds = params.stationId
      ? [...song.stationIds, params.stationId]
      : [...song.stationIds, stationId];

    if (params.stationId) {
      await addSongToStation(song, params.stationId);
      onAddSongToStation(song);
    } else await addSongToStation(song); // TODO:  implement add from search page
  }

  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }

  const displayedSongs = showAll ? songResults : songResults.slice(0, 5);

  return (
    <section className="song-results">
      <h1>Songs</h1>
      {displayedSongs.map((song) => (
        <article key={song.id} className="song-result">
          <SongDetails song={song}>
            <button onClick={() => onPlaySong(song)} className="play-btn">
              <ReactSVG
                src={
                  isPlaying && currentSong.id === song.id ? pauseIcon : playIcon
                }
              />
            </button>
          </SongDetails>
          <div className="song-actions">
            <button onClick={() => onAddToPlaylist(song)}>
              {stations[0].songs.find(
                (stationSong) => stationSong.id === song.id
              ) ? (
                <ReactSVG src={tickIcon} />
              ) : (
                <ReactSVG src={addIcon} />
              )}
            </button>
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
