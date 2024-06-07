import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { youtubeService } from "../services/youtube.service";
import { spotifyService } from "../services/spotify.service";
import { addSongToStation } from "../store/station.actions";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/PlayIcon.svg";
import pauseIcon from "../assets/icons/PauseIcon.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import addToQueueIcon from "../assets/icons/AddToQueue.svg";
import DotsIcon from "../assets/icons/Ellipses.svg";
import { utilService } from "../services/util.service";

import { ContextMenu } from "./ContextMenu";
import { Loader } from "./Loader";
import { CustomTooltip } from "./CustomTooltip";
import { AddSongToStationButton } from "./AddSongToStationButton";

const options = [
  {
    label: "Add to playlist",
    value: "open add to playlist modal",
    icon: <ReactSVG src={addToPlaylistIcon} />,
    onClick: () => console.log("Add to playlist"),
  },
  {
    label: "Add to queue",
    value: "add to queue",
    icon: <ReactSVG src={addToQueueIcon} />,
    onClick: () => console.log("Add to queue"),
  },
];

export function SongResults({
  songResults,
  onAddSongToStation,
  updateResults,
  fullList: fulllist,
}) {
  const params = useParams();
  const [contextMenu, setContextMenu] = useState(null);
  const [stationMenu, setStationMenu] = useState(null);
  const [currentStation, setCurrentStation] = useState({ songs: [] });
  const [lastActiveSong, setLastActiveSong] = useState(null);
  const songResultsRef = useRef(null);

  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);

  const [displayedSongs, setDisplayedSongs] = useState(songResults);

  useEffect(() => {
    setDisplayedSongs(fulllist ? songResults : songResults.slice(0, 4));
  }, [fulllist, songResults]);

  useEffect(() => {
    let station = params.stationId
      ? stations.find((station) => station._id === params.stationId)
      : stations.find((station) => station._id === "liked-songs");

    if (station) setCurrentStation(station);
  }, [params, stations]);

  const onAddToPlaylist = async (song, stationId = "liked-songs") => {
    if (!song) return;

    song.addedAt = Date.now();
    song.stationIds = params.stationId
      ? [...song.stationIds, params.stationId]
      : [...song.stationIds, stationId];

    setCurrentStation((prevStation) => ({
      ...prevStation,
      songs: [...prevStation.songs, song],
    }));

    if (params.stationId) {
      await addSongToStation(song, params.stationId);
    } else {
      await addSongToStation(song);
    }

    if (onAddSongToStation) onAddSongToStation(song);
  };

  const onPlaySong = async (song) => {
    let songToPlay = song;

    if (song.id.includes("track") || song.id.length === 22) {
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")}`;
      const results = await youtubeService.query(searchStr, 1);

      if (results.length > 0) {
        songToPlay.id = results[0].id;
        spotifyService.updateSearchResultsCache(params.query, songToPlay);
      }
    }

    if (currentSong.id === songToPlay.id) {
      setIsPlaying(!isPlaying);
      return;
    }

    setCurrentSong(songToPlay);
    setIsPlaying(true);
    setLastActiveSong(songToPlay);
    updateResults(songToPlay);
  };

  const handleContextMenu = (event, song) => {
    event.preventDefault();

    const { clientX, clientY } = event;
    const rect = songResultsRef.current.getBoundingClientRect();

    setContextMenu({
      position: { x: clientX, y: clientY },
      containerRect: rect,
      options: options.map((option) => ({
        ...option,
        onClick: () => {
          option.onClick();
          handleCloseContextMenu();
        },
      })),
      song,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  if (!currentStation) return <Loader />;
  if (!songResults || !songResults.length)
    return <div className="no-results">No results found</div>;

  return (
    <section className="song-results" ref={songResultsRef}>
      <div className="songs-header">
        <h1>Songs</h1>
      </div>
      <ul>
        {displayedSongs.map((song) => (
          <li
            key={song.id}
            className={`song-result ${lastActiveSong === song ? "active" : ""}`}
            onClick={() => {
              const rect = songResultsRef.current.getBoundingClientRect();
              setStationMenu({ rect });
              setLastActiveSong(song);
            }}
            onContextMenu={(event) => handleContextMenu(event, song)}
          >
            <div className="song-img">
              <img src={song.img} alt="song-thumbnail" />
              <button onClick={() => onPlaySong(song)} className="play-btn">
                <ReactSVG
                  src={
                    isPlaying && currentSong.id === song.id
                      ? pauseIcon
                      : playIcon
                  }
                />
              </button>
            </div>
            <div className="song-info">
              <p>{song.name}</p>
              <small>{song.artists[0].name}</small>
            </div>
            <div className="song-actions">
              <AddSongToStationButton
                song={song}
                containerRect={stationMenu?.rect}
              />
              <span className="duration">
                {song.duration === 0
                  ? "live"
                  : utilService.formatTime(song.duration)}
              </span>
              <CustomTooltip title={`More options for ${song.name}`}>
                <div>
                  <ReactSVG
                    src={DotsIcon}
                    onClick={(event) => handleContextMenu(event, song)}
                  />
                </div>
              </CustomTooltip>
            </div>
          </li>
        ))}
      </ul>
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          options={contextMenu.options}
          onClose={handleCloseContextMenu}
        />
      )}
    </section>
  );
}
