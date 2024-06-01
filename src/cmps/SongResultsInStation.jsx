import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { addSongToStation } from "../store/station.actions";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import addIcon from "../assets/icons/plusWithBorderIcon.svg";
import deleteIcon from "../assets/icons/delete.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import { ContextMenu } from "./ContextMenu";
import { Loader } from "./Loader";

const options = [
  {
    label: "Add to playlist ",
    value: "open add to playlist modal",
    icon: <ReactSVG src={addToPlaylistIcon} />,
    onClick: () => console.log("Add to playlist"),
  },
  {
    label: "Add to queue",
    value: "add to queue",
    icon: <ReactSVG src={addIcon} />,
    onClick: () => console.log("Add to queue"),
  },
  {
    label: "Remove",
    value: "remove",
    icon: <ReactSVG src={deleteIcon} />,
    onClick: () => console.log("Remove"),
  },
];

export function SongResultsInStation({
  songResults,
  removeResult,
  onAddSongToStation,
}) {
  const params = useParams();
  const [showAll, setShowAll] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);
  const [currentStation, setCurrentStation] = useState({ songs: [] });
  const [lastActiveSong, setLastActiveSong] = useState(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    let station;
    if (params.stationId) {
      station = stations.find((station) => station._id === params.stationId);
    } else {
      station = stations.find((station) => station._id === "liked-songs");
    }
    if (station) setCurrentStation(station);
  }, [params, stations]);

  async function onAddToPlaylist(song, stationId = "liked-songs") {
    if (!song) return;
    song.addedAt = Date.now();
    song.stationIds = params.stationId
      ? [...song.stationIds, params.stationId]
      : [...song.stationIds, stationId];
    setCurrentStation((prevStation) => ({
      ...prevStation,
      songs: [...prevStation.songs, song],
    }));
    await addSongToStation(song, params.stationId || stationId);

    if (onAddSongToStation) onAddSongToStation(song);
    removeResult(song);
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

  const handleContextMenu = (event, song) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      options,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const displayedSongs = songResults;
  if (!currentStation) return <Loader />;
  if (!songResults || !songResults.length) return <Loader />;

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
          onContextMenu={(event) => handleContextMenu(event, song)}
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
            <button
              className="add-to-playlist"
              onClick={() => onAddToPlaylist(song)}
            >
              Add
            </button>
          </div>
        </article>
      ))}
      {contextMenu && (
        <ContextMenu
          ref={contextMenuRef}
          position={contextMenu.position}
          options={contextMenu.options}
          onClose={handleCloseContextMenu}
        />
      )}
    </section>
  );
}
