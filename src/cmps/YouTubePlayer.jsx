import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { setYoutubePlayer, setIsPlaying } from "../store/player.actions";

import { utilService } from "../services/util.service";

import { TimeBar } from "./TimeBar";

export function YouTubePlayer() {
  const intervalRef = useRef(null);
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const [PercentagePlayed, setPercentagePlayed] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  useEffect(() => {
    if (youtubePlayer && isPlaying) {
      youtubePlayer.playVideo();
    } else if (youtubePlayer) {
      youtubePlayer.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    //initiate the youtube player
    const onYouTubeIframeAPIReady = () => {
      setYoutubePlayer(
        new YT.Player("player", {
          height: "0",
          width: "0",
          videoId: currentSong.id,
          playerVars: {
            controls: 1,
          },
          events: {
            onReady: (event) => {
              onPlayerReady(event);
            },
            onStateChange: (event) => {
              onPlayerStateChange(event);
            },
          },
        })
      );
    };
    function onPlayerReady(event) {
      event.target.cueVideoById(currentSong.id);
    }

    function onPlayerStateChange(event) {
      setDuration(event.target.getDuration());
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          intervalRef.current = setInterval(() => {
            updateTimeBar(
              event.target.getCurrentTime(),
              event.target.getDuration()
            );
          }, 1000);
          setIsPlaying(true);
          break;
        case window.YT.PlayerState.PAUSED:
          clearInterval(intervalRef.current);
          break;
        case window.YT.PlayerState.ENDED:
          clearInterval(intervalRef.current);
          setPercentagePlayed(0);
          setIsPlaying(false);
          break;

        case window.YT.PlayerState.CUED:
        default:
          break;
      }
    }
    function updateTimeBar(currentTime, duration) {
      const percentage = (currentTime / duration) * 100;
      setPercentagePlayed(percentage);
    }

    // Load YouTube API script asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, []);

  function handleTimeBarChange(newPercentage) {
    const newTime = (newPercentage * duration) / 100;
    youtubePlayer.seekTo(newTime);
    setPercentagePlayed(newPercentage);
    //updateTimeBar(newTime, youtubePlayer.getDuration());
  }

  useEffect(() => {
    if (youtubePlayer && currentSong) {
      youtubePlayer.loadVideoById(currentSong.id);
      setDuration(youtubePlayer.getDuration());
    }
  }, [currentSong]);

  return (
    <div className="youtube-player">
      <div id="player"></div>

      {youtubePlayer && youtubePlayer.getCurrentTime ? (
        <span className="current-time">
          {utilService.formatTime(youtubePlayer.getCurrentTime())}
        </span>
      ) : (
        <span className="current-time">0:00</span>
      )}
      <div className="time-bar">
        <TimeBar
          percentage={PercentagePlayed}
          handleTimeBarChange={handleTimeBarChange}
          endValue={duration}
        />
      </div>
      {youtubePlayer && youtubePlayer.getDuration ? (
        <span className="duration">
          {utilService.formatTime(youtubePlayer.getDuration())}
        </span>
      ) : (
        <span className="duration">0:00</span>
      )}
    </div>
  );
}
