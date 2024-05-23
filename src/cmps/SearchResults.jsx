import { useSelector } from "react-redux";

import { useState } from "react";
import { ReactSVG } from "react-svg";

import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import { SongResults } from "./SongResults";
import { StationResults } from "./StationResults";
import { ArtistResults } from "./ArtistResults";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";

export function SearchResults({ songResults, stationResults, artistResults }) {
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);

  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }

  return (
    <section className="search-results">
      <ArtistResults artistResults={artistResults} />
      <div className="top-song-result">
        <h1>Top result</h1>
        <div className="top-song-details">
          {songResults && songResults.length > 0 && (
            <>
              <div className="song-img">
                <img src={songResults[0].img} alt="song-thumbnail" />
              </div>
              <div className="song-info">
                <p>{songResults[0].name}</p>
                <small>
                  <span className="type">Song</span>
                  <span className="artist">{songResults[0].artist}</span>
                </small>
              </div>
              <button
                onClick={() => onPlaySong(songResults[0])}
                className="play-btn"
              >
                <ReactSVG
                  src={
                    isPlaying && currentSong.id === songResults[0].id
                      ? pauseIcon
                      : playIcon
                  }
                />
              </button>
            </>
          )}
        </div>
      </div>
      <SongResults songResults={songResults} />
      <StationResults stationResults={stationResults} />
    </section>
  );
}
