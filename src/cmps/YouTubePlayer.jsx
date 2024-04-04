import React, { useEffect, useRef } from "react";

export function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API script asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // This function creates the YouTube player when the API code downloads
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      });
    };
  }, [videoId]);

  return <div id="player"></div>;
}
