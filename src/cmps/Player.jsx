import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { YouTubePlayer } from "./YouTubePlayer";
import { CustomTooltip } from "./CustomTooltip";

import {
  setIsPlaying,
  setCurrentSong,
  removeFromQueue,
  setQueue,
} from "../store/player.actions";
import { utilService } from "../services/util.service";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import NextSongIcon from "../assets/icons/NextSongIcon.svg";
import PrevSongIcon from "../assets/icons/LastSongIcon.svg";
export function Player() {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const queue = useSelector((state) => state.playerModule.queue);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  function onPlay() {
    youtubePlayer.playVideo();
    setIsPlaying(true);
  }
  function onPause() {
    youtubePlayer.pauseVideo();
    setIsPlaying(false);
  }
  function onNext() {
    if (queue.length > 0) {
      const nextSong = queue[0];
      removeFromQueue(nextSong.id);
      setCurrentSong(nextSong);
    } else {
      // Repeat the current song if the queue is empty
      youtubePlayer.seekTo(0);
      youtubePlayer.playVideo();
      setIsPlaying(true);
    }
  }
  function onPrev() {
    // If the current song is playing for more than 3 seconds, restart it
    if (youtubePlayer.getCurrentTime() > 3) {
      youtubePlayer.seekTo(0);
      youtubePlayer.playVideo();
    }
  }
  function onShuffle() {
    // Shuffle the queue
    console.log("111queue", queue);
    const shuffledQueue = shuffleQueue(queue);
    console.log("shuffledQueue", shuffledQueue);
    setQueue(shuffledQueue);
  }

  function shuffleQueue(queue) {
    let shuffledQueue = [...queue];
    for (let i = shuffledQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQueue[i], shuffledQueue[j]] = [
        shuffledQueue[j],
        shuffledQueue[i],
      ];
    }
    return shuffledQueue;
  }

  return (
    <div className="player">
      <div className="player-controls">
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
      </div>
      <YouTubePlayer />
    </div>
  );
}
