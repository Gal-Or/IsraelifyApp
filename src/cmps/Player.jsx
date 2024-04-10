import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { YouTubePlayer } from "./YouTubePlayer";

import { setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
export function Player() {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);

  function onPlay() {
    youtubePlayer.playVideo();
  }
  function onPause() {
    youtubePlayer.pauseVideo();
    setIsPlaying(false);
  }

  return (
    <div className="player">
      <div className="player-controls">
        {isPlaying ? (
          <button onClick={onPause}>
            <ReactSVG src={pauseIcon} />{" "}
          </button>
        ) : (
          <button onClick={onPlay}>
            {" "}
            <ReactSVG src={playIcon} />{" "}
          </button>
        )}
      </div>
      <YouTubePlayer />
    </div>
  );
}
