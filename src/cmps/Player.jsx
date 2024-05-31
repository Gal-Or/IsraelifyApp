import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { YouTubePlayer } from "./YouTubePlayer";
import { CustomTooltip } from "./CustomTooltip";

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
        <CustomTooltip title="Previous">
          <button className="next-prev">
            <ReactSVG src={PrevSongIcon} />
          </button>
        </CustomTooltip>
        <CustomTooltip title="Play">
          <div>
            {isPlaying ? (
              <button onClick={onPause}>
                <ReactSVG src={pauseIcon} />{" "}
              </button>
            ) : (
              <button onClick={onPlay} className="play-btn">
                {" "}
                <ReactSVG src={playIcon} />{" "}
              </button>
            )}
          </div>
        </CustomTooltip>
        <CustomTooltip title="Next">
          <button className="next-prev">
            <ReactSVG src={NextSongIcon} />
          </button>
        </CustomTooltip>
      </div>
      <YouTubePlayer />
    </div>
  );
}
