import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { setYoutubePlayer } from "../store/player.actions";
import { utilService } from "../services/util.service";

import { TimeBar } from "./TimeBar";

export function YouTubePlayer() {
  const intervalRef = useRef(null);
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const [PercentagePlayed, setPercentagePlayed] = React.useState(0);

  useEffect(() => {
    //initiate the youtube player
    const onYouTubeIframeAPIReady = () => {
      setYoutubePlayer(
        new YT.Player("player", {
          height: "0",
          width: "0",
          videoId: null,
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
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          intervalRef.current = setInterval(() => {
            updateTimeBar(
              event.target.getCurrentTime(),
              event.target.getDuration()
            );
          }, 1000);
          break;
        case window.YT.PlayerState.PAUSED:
          clearInterval(intervalRef.current);
          break;
        case window.YT.PlayerState.ENDED:
          clearInterval(intervalRef.current);
          setPercentagePlayed(0);
          break;
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
    const newTime = (newPercentage * youtubePlayer.getDuration()) / 100;
    youtubePlayer.seekTo(newTime);
    setPercentagePlayed(newPercentage);
    //updateTimeBar(newTime, youtubePlayer.getDuration());
  }

  useEffect(() => {
    if (youtubePlayer && currentSong) {
      youtubePlayer.loadVideoById(currentSong.id);
    }
  }, [currentSong]);

  return (
    <div>
      <div className="youtube-player" id="player"></div>

      {youtubePlayer && youtubePlayer.getCurrentTime ? (
        <h2 className="current-time">
          current time :{" "}
          {utilService.formatTime(youtubePlayer.getCurrentTime())}
        </h2>
      ) : (
        <h2>current time : 0:00</h2>
      )}
      <div className="time-bar">
        <TimeBar
          percentage={PercentagePlayed}
          handleTimeBarChange={handleTimeBarChange}
          endValue={youtubePlayer && youtubePlayer.getDuration()}
        />
      </div>
      {youtubePlayer && youtubePlayer.getDuration ? (
        <h2 className="duration">
          duration : {utilService.formatTime(youtubePlayer.getDuration())}
        </h2>
      ) : (
        <h2 className="duration">duration : 0:00</h2>
      )}
    </div>
  );
}
