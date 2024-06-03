import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function QueueSongItem({ song, index, moveSong }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "QUEUE_SONG",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
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
    type: "QUEUE_SONG",
    item: { type: "QUEUE_SONG", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="song-item"
    >
      <img src={song.img} alt={song.name} />
      <div className="song-details">
        <h4>{song.name}</h4>
        <p>{song.artists ? song.artists[0].name : song.artist}</p>
      </div>
    </li>
  );
}
