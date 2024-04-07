import { useSelector } from "react-redux";

import { YouTubePlayer } from "./YouTubePlayer";
import { useEffect, useState } from "react";

export function Player() {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );

  function onPlay() {
    youtubePlayer.playVideo();
  }
  function onPause() {
    youtubePlayer.pauseVideo();
  }
  function onStop() {
    youtubePlayer.stopVideo();
  }

  return (
    <div className="player">
      <div className="player-actions">
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={onStop}>Stop</button>
      </div>
      <YouTubePlayer />
    </div>
  );
}
