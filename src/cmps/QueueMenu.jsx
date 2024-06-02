import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export function QueueMenu() {
  const queue = useSelector((state) => state.playerModule.queue);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  useEffect(() => {
    if (queue) console.log("queue", queue);
  }, [queue]);

  if (!queue) return <div>Loading...</div>;
  return (
    <div className="queue-menu">
      <h2>Queue</h2>
      <div className="now-playing">
        <h3>Now Playing</h3>
        <div className="song-details">
          <img src={currentSong.img} alt={currentSong.name} />
          <div>
            <h4 className="current-song">{currentSong.name}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      </div>
      <div className="next-up">
        <h3>Next Up</h3>
        <ul>
          {queue.map((song, index) => (
            <li key={song.id + index} className="song-item">
              <img src={song.img} alt={song.name} />
              <div className="song-details">
                <h4>{song.name}</h4>
                <p>{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
