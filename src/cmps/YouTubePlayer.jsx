import React, { useEffect, useRef } from "react";
import { setYoutubePlayer } from "../store/player.actions";
import { useSelector } from "react-redux";
import { TimeBar } from "./TimeBar";

export function YouTubePlayer() {
  const intervalRef = useRef(null);
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const [timeBarWidth, setTimeBarWidth] = React.useState(0);

  useEffect(() => {
    // This function creates the YouTube player when the API code downloads
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
      event.target.loadVideoById(currentSong ? currentSong.id : "UfQHEpf2q8k");
      console.log("onPlayerReady", event);
      console.log("onPlayerReady duration", event.target.getDuration());
    }
    function onPlayerStateChange(event) {
      if (event.data == window.YT.PlayerState.PLAYING) {
        console.log("onPlayerStateChange PLAYING", event);
        intervalRef.current = setInterval(() => {
          console.log("Current time: ", event.target.getCurrentTime());
          updateTimeBar(
            event.target.getCurrentTime(),
            event.target.getDuration()
          );
        }, 1000);
      }
      if (
        event.data == window.YT.PlayerState.PAUSED ||
        event.data == window.YT.PlayerState.ENDED
      ) {
        console.log("onPlayerStateChange pause/stop", event);
        clearInterval(intervalRef.current);
      }
    }
    function updateTimeBar(currentTime, duration) {
      const percentage = (currentTime / duration) * 100;
      setTimeBarWidth(percentage);
    }

    // Load YouTube API script asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, [currentSong]);

  return (
    <div>
      <div className="youtube-player" id="player"></div>
      <TimeBar percentage={timeBarWidth} />
    </div>
  );
}
