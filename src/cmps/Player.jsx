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
    <div>
      <h1>Player</h1>
      <YouTubePlayer />
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );
}
