import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router";
import playIcon from "../assets/icons/PlayIcon.svg";
import pauseIcon from "../assets/icons/PauseIcon.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import addIcon from "../assets/icons/AddToQueue.svg";
import deleteIcon from "../assets/icons/Delete.svg";
import {
  setCurrentSong,
  setIsPlaying,
  addToQueue,
} from "../store/player.actions";
import { updateSongId } from "../store/station.actions";
import { updateStation } from "../store/station.actions";
import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service";
import { utilService } from "../services/util.service";
import { SongDetails } from "./SongDetails";
import { ContextMenu } from "./ContextMenu";
import { AddSongToStationButton } from "./AddSongToStationButton";
import { CustomTooltip } from "./CustomTooltip";

export function SongContainer({
  song,
  index,
  moveSong,
  className,
  onClick,
  isCompact,
  station,
}) {
  const [contextMenu, setContextMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const ref = useRef(null);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  const [{ handlerId }, drop] = useDrop({
    accept: "SONG",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSong(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "SONG",
    item: { type: "SONG", id: song.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  async function onPlaySong(song) {
    let songToPlay = { ...song };

    if (song.id.includes("track") || song.id.length === 22) {
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")} official audio`;
      const results = await youtubeService.query(searchStr, 1);
      if (results.length > 0) {
        songToPlay.id = results[0].id;
        updateSongId(params.stationId, song.id, songToPlay.id);
      }
    }

    if (currentSong.id === songToPlay.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    console.log("songToPlay", songToPlay);
    setCurrentSong(songToPlay);
    setIsPlaying(true);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX - 350, y: event.clientY - 30 },
      options: [
        {
          label: "Add to playlist",
          value: "open add to playlist modal",
          icon: <ReactSVG src={addToPlaylistIcon} />,
          onClick: () => console.log("Add to playlist"),
        },
        {
          label: "Add to queue",
          value: "add to queue",
          icon: <ReactSVG src={addIcon} />,
          onClick: () => addToQueue(song),
        },
        {
          label: "Remove",
          value: "remove",
          icon: <ReactSVG src={deleteIcon} />,
          onClick: () => {
            const newStation = {
              ...station,
              songs: station.songs.filter((s) => s.id !== song.id),
            };
            updateStation(newStation);
          },
        },
      ],
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      className={`${className} ${currentSong.id === song.id ? "playing" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onClick(song)}
      onContextMenu={handleContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="song-order-play">
        {currentSong.id !== song.id && (
          <button
            className="play-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              onPlaySong(song);
            }}
          >
            <ReactSVG src={playIcon} />
          </button>
        )}
        {isPlaying && currentSong.id === song.id ? (
          isHovered ? (
            <ReactSVG
              src={pauseIcon}
              className="pause-icon"
              onClick={(ev) => {
                ev.stopPropagation();
                onPlaySong(song);
              }}
            />
          ) : (
            <section className="equalizer">
              <img
                className="equalizer-img"
                src="https://res.cloudinary.com/dk9b84f0u/image/upload/v1664386983/Symphny/ezgif.com-gif-maker_cbbaoz.gif"
                alt="equalizer"
              />
            </section>
          )
        ) : currentSong.id === song.id ? (
          <ReactSVG
            src={playIcon}
            className="play-icon"
            onClick={(ev) => {
              ev.stopPropagation();
              onPlaySong(song);
            }}
          />
        ) : (
          <span className="song-order">{index + 1}</span>
        )}
      </div>
      <SongDetails song={song} isCompact={isCompact} />
      <div className="song-album">
        <span>{song.album || "Single"}</span>
      </div>
      <div className="song-date-added">
        <span>{utilService.formatDate(song.addedAt)}</span>
      </div>
      <div className="song-duration">
        <span>{utilService.formatTime(song.duration)}</span>
      </div>
      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          options={contextMenu.options}
          onClose={handleCloseContextMenu}
        />
      )}
    </li>
  );
}
