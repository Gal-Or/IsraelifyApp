import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";
import { SongDetails } from "./SongDetails";
import { utilService } from "../services/util.service";
import { ContextMenu } from "./ContextMenu";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import addIcon from "../assets/icons/AddToQueue.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { AddSongToStationButton } from "./AddSongToStationButton";

import { CustomTooltip } from "./CustomTooltip";
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

export function SongContainer({
  song,
  index,
  moveSong,
  className,
  onClick,
  isCompact,
}) {
  const [contextMenu, setContextMenu] = useState(null);
  const ref = useRef(null);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  const [{ handlerId }, drop] = useDrop({
    accept: "SONG",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
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
  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      options,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      className={className}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onClick(song)}
      onContextMenu={handleContextMenu}
    >
      <div className="song-order-play">
        <button
          className="play-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            onPlaySong(song);
          }}
        >
          <ReactSVG
            src={isPlaying && currentSong.id === song.id ? pauseIcon : playIcon}
          />
        </button>
        <span className="song-order">{index + 1}</span>
      </div>
      <SongDetails song={song} isCompact={isCompact} />
      <div className="song-album">
        <span>album</span>
      </div>
      <div className="song-date-added">
        <span>{utilService.formatDate(song.addedAt)}</span>
      </div>
      <div className="song-duration">
        <AddSongToStationButton song={song} />

        <span>{utilService.formatTime(song.duration)}</span>
        <CustomTooltip title={`More options for ${song.name}`}>
          <span>...</span>
        </CustomTooltip>
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
