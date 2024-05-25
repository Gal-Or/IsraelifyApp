import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";
import { SongDetails } from "./SongDetails";
import { SongActions } from "./SongActions";
import { utilService } from "../services/util.service";

export function SongContainer({ song, index, moveSong }) {
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

  useEffect(() => {
    if (song) console.log(`Song added at `, song.addedAt);
  });

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      className="song-container"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="song-order">
        <span>{index + 1}</span>
      </div>
      <SongDetails song={song}></SongDetails>
      <div className="song-album">
        <span>album</span>
      </div>
      <div className="song-date-added">
        <span>{utilService.formatDate(song.addedAt)}</span>
      </div>
      <div className="song-duration">
        <span>{utilService.formatTime(song.duration)}</span>
      </div>
    </li>
  );
}
