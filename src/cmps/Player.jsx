import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { YouTubePlayer } from "./YouTubePlayer";

import { setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import NextSongIcon from "../assets/icons/NextSongIcon.svg";
import PrevSongIcon from "../assets/icons/LastSongIcon.svg";
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
        <button className="next-prev">
          <ReactSVG src={PrevSongIcon} />
        </button>
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
        <button className="next-prev">
          <ReactSVG src={NextSongIcon} />
        </button>
      </div>
      <YouTubePlayer />
    </div>
  );
}
