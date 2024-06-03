import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { setQueue } from "../store/player.actions";
import { useDrop } from "react-dnd";
import QueueSongItem from "./QueueSongItem"; // Separate component for each song in the queue

export function QueueMenu() {
  const queue = useSelector((state) => state.playerModule.queue);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  const moveSong = useCallback(
    (dragIndex, hoverIndex) => {
      const dragSong = queue[dragIndex];
      const newQueue = [...queue];
      newQueue.splice(dragIndex, 1);
      newQueue.splice(hoverIndex, 0, dragSong);

      setQueue(newQueue);
    },
    [queue]
  );

  const [, drop] = useDrop({ accept: "QUEUE_SONG" });

  if (!queue) return <div>Loading...</div>;
  return (
    <div className="queue-menu" ref={drop}>
      <h2>Queue</h2>
      <div className="now-playing">
        <h3>Now Playing</h3>
        <div className="song-details">
          <img
            src={
              currentSong.img
                ? currentSong.img
                : currentSong.album.images[0].url
            }
            alt={currentSong.name}
          />
          <div>
            <h4 className="current-song">{currentSong.name}</h4>
            <p>
              {currentSong.artists
                ? currentSong.artists[0].name
                : currentSong.artist}
            </p>
          </div>
        </div>
      </div>
      <div className="next-up">
        <h3>Next Up</h3>
        <ul>
          {queue.map((song, index) => (
            <QueueSongItem
              key={song.id + index}
              index={index}
              song={song}
              moveSong={moveSong}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
