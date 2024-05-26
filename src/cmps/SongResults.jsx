import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { addSongToStation } from "../store/station.actions";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import addIcon from "../assets/icons/plusWithBorderIcon.svg";
import tickIcon from "../assets/icons/tickIcon.svg";
import DotsIcon from "../assets/icons/Ellipses.svg";
import { utilService } from "../services/util.service";

export function SongResults({ songResults, onAddSongToStation }) {
  const params = useParams();
  const [showAll, setShowAll] = useState(false);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);
  const [currentStation, setCurrentStation] = useState({ songs: [] });
  const [lastActiveSong, setLastActiveSong] = useState(null);

  useEffect(() => {
    let station;
    if (params.stationId) {
      station = stations.find((station) => station._id === params.stationId);
    } else {
      station = stations.find((station) => station._id === "liked-songs");
    }
    if (station) setCurrentStation(station);
  }, [params]);

  async function onAddToPlaylist(song, stationId = "liked-songs") {
    if (!song) return;
    song.addedAt = Date.now();
    song.stationIds = params.stationId
      ? [...song.stationIds, params.stationId]
      : [...song.stationIds, stationId];
    setCurrentStation((prevStation) => {
      return {
        ...prevStation,
        songs: [...prevStation.songs, song],
      };
    });
    if (params.stationId) {
      await addSongToStation(song, params.stationId);
    } else await addSongToStation(song);

    if (onAddSongToStation) onAddSongToStation(song);
  }

  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
    setLastActiveSong(song);
  }

  const displayedSongs = showAll ? songResults : songResults.slice(0, 4);
  if (!currentStation) return <h1>Loading...</h1>;
  return (
    <section className="song-results">
      <div className="songs-header">
        <h1>Songs</h1>
      </div>

      {displayedSongs.map((song) => (
        <article
          key={song.id}
          className={`song-result ${lastActiveSong === song ? "active" : ""}`}
          onClick={() => setLastActiveSong(song)}
        >
          <div className="song-img">
            <img src={song.img} alt="song-thumbnail" />
            <button onClick={() => onPlaySong(song)} className="play-btn">
              <ReactSVG
                src={
                  isPlaying && currentSong.id === song.id ? pauseIcon : playIcon
                }
              />
            </button>
          </div>
          <div className="song-info">
            <p>{song.name}</p>
            <small>{song.artist}</small>
          </div>
          <div className="song-actions">
            {currentStation.songs.find(
              (stationSong) => stationSong.id === song.id
            ) ? (
              <ReactSVG
                src={tickIcon}
                onClick={() => {
                  console.log("song already in station");
                }}
                className="added"
              />
            ) : (
              <ReactSVG src={addIcon} onClick={() => onAddToPlaylist(song)} />
            )}
            <span className="duration">
              {song.duration === 0
                ? "live"
                : utilService.formatTime(song.duration)}
            </span>
            <ReactSVG src={DotsIcon} />
          </div>
        </article>
      ))}
    </section>
  );
}
