import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { YouTubePlayer } from "./YouTubePlayer";
import { CustomTooltip } from "./CustomTooltip";

import {
  setIsPlaying,
  setCurrentSong,
  removeFromQueue,
  setQueue,
  setIsShuffled,
  shuffleQueue,
  setIsRepeat,
} from "../store/player.actions";
import playIcon from "../assets/icons/PlayIcon.svg";
import pauseIcon from "../assets/icons/PauseIcon.svg";
import NextSongIcon from "../assets/icons/NextSongIcon.svg";
import PrevSongIcon from "../assets/icons/LastSongIcon.svg";
import ShaffleIcon from "../assets/icons/ShuffleIcon.svg";
import OnRepeatIcon from "../assets/icons/OnRepeatIcon.svg";
export function Player() {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const queue = useSelector((state) => state.playerModule.queue);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isShuffled = useSelector((state) => state.playerModule.isShuffled);
  const isRepeat = useSelector((state) => state.playerModule.isRepeat);
  function onPlay() {
    setIsPlaying(true);
  }
  function onPause() {
    setIsPlaying(false);
  }
  function onNext() {
    if (queue.length > 0) {
      if (isRepeat) {
        youtubePlayer.seekTo(0);
        setIsPlaying(true);
      } else {
        const nextSong = queue[0];
        removeFromQueue(nextSong.id);
        setCurrentSong(nextSong);
      }
    } else {
      // Repeat the current song if the queue is empty
      youtubePlayer.seekTo(0);
      setIsPlaying(true);
    }
  }
  function onPrev() {
    // If the current song is playing for more than 3 seconds, restart it
    if (youtubePlayer.getCurrentTime() > 3) {
      youtubePlayer.seekTo(0);
      setIsPlaying(true);
    }
  }
  function onShuffle() {
    if (isShuffled) {
      setIsShuffled(false);
    } else {
      shuffleQueue(queue);
      setIsShuffled(true);
    }
  }

  function onRepeat() {
    setIsRepeat(!isRepeat);
  }

  return (
    <div className="player">
      <div className="player-controls">
        <CustomTooltip title="Repeat">
          <button
            className={`next-prev ${isRepeat ? "active" : ""}`}
            onClick={onRepeat}
          >
            <ReactSVG src={OnRepeatIcon} />
          </button>
        </CustomTooltip>
        <CustomTooltip title="Previous">
          <button className="next-prev" onClick={onPrev}>
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
          <button className="next-prev" onClick={onNext}>
            <ReactSVG src={NextSongIcon} />
          </button>
        </CustomTooltip>
        <CustomTooltip title="Shuffle">
          <button
            onClick={onShuffle}
            className={`next-prev ${isShuffled ? "active" : ""}`}
          >
            <ReactSVG src={ShaffleIcon} />
          </button>
        </CustomTooltip>
      </div>
      <YouTubePlayer />
    </div>
  );
}
