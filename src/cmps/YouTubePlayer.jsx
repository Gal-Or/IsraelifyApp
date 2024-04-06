import React, { useEffect, useRef } from "react";
import { setYoutubePlayer } from "../store/player.actions";
import { setSongDuration } from "../store/player.actions";
import { useSelector } from "react-redux";
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
          height: "200",
          width: "300",
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
              console.log("onStateChange", event);
            },
          },
        })
      );
    };

    function onPlayerReady(event) {
      event.target.cueVideoById(currentSong ? currentSong.id : "mMfxI3r_LyA");
      console.log("onPlayerReady");
    }

    function onPlayerStateChange(event) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          intervalRef.current = setInterval(() => {
            console.log("Current time: ", event.target.getCurrentTime());
            updateTimeBar(
              event.target.getCurrentTime(),
              event.target.getDuration()
            );
          }, 1000);
          break;
        case window.YT.PlayerState.PAUSED:
        case window.YT.PlayerState.ENDED:
          clearInterval(intervalRef.current);
          break;
        case window.YT.PlayerState.CUED:
          if (currentSong) {
            console.log("onPlayerStateChange-current song -->", currentSong);
          }
          if (
            !currentSong ||
            currentSong.duration !== event.target.getDuration()
          ) {
            setSongDuration(event.target.getDuration());
            console.log("onPlayerStateChange-setSongDuration -->", event);
          }
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

  useEffect(() => {
    if (youtubePlayer && currentSong) {
      youtubePlayer.cueVideoById(currentSong.id);
    }
  }, [currentSong]);

  function handleTimeBarChange(newPercentage) {
    const newTime = (newPercentage * youtubePlayer.getDuration()) / 100;
    youtubePlayer.seekTo(newTime);
    updateTimeBar(newTime, youtubePlayer.getDuration());
  }

  return (
    <div>
      <div className="youtube-player" id="player"></div>
      {currentSong && <h2>duration : {youtubePlayer.getDuration()}</h2>}
      {currentSong && <h2>current time : {youtubePlayer.getCurrentTime()}</h2>}

      <TimeBar
        percentage={PercentagePlayed}
        handleTimeBarChange={handleTimeBarChange}
      />
    </div>
  );
}
