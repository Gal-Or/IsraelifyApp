import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { addSongToStation } from "../store/station.actions";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import { spotifyService } from "../services/spotify.service";
import { youtubeService } from "../services/youtube.service";
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
  updateResults,
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
    setCurrentStation((prevStation) => ({
      ...prevStation,
      songs: [...prevStation.songs, song],
    }));
    await addSongToStation(song, params.stationId || stationId);

    if (onAddSongToStation) onAddSongToStation(song);
    removeResult(song);
  }

  async function onPlaySong(song) {
    var songToPlay = song;
    console.log("songToPlay from station page", songToPlay);
    //if song id contains "track" or its length is 22
    if (song.id.includes("track") || song.id.length === 22) {
      // Fetch YouTube URL for the song
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")}`;
      const results = await youtubeService.query(searchStr, 1);
      if (results.length > 0) {
        songToPlay.id = results[0].id;
        spotifyService.updateSearchResultsCache(
          `${params.query}-${song.name}`,
          songToPlay
        );
      }
    }
    if (currentSong.id === songToPlay.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(songToPlay);
    setIsPlaying(true);
    setLastActiveSong(songToPlay);
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
  if (!songResults || !songResults.length) return <div>No songs found</div>;

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
