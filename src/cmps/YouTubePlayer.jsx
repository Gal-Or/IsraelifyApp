import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  setYoutubePlayer,
  setIsPlaying,
  setCurrentSong,
  removeFromQueue,
  addSongsToQueueTop,
  addSongsToQueueBottom,
} from "../store/player.actions";
import { utilService } from "../services/util.service";
import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service";
import { TimeBar } from "./TimeBar";
import { useParams } from "react-router";
import { updateSongId } from "../store/station.actions";

export function YouTubePlayer() {
  const params = useParams();
  const intervalRef = useRef(null);
  const playerRef = useRef(null); // Use a ref to store the player instance
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const queue = useSelector((state) => state.playerModule.queue);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const playFirstSong = (song) => {
    setCurrentSong(song);

    setIsPlaying(true);
  };

  const onNext = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setCurrentSong(nextSong);
      removeFromQueue(nextSong.id);

      setIsPlaying(true);
    } else {
      // Repeat the current song if the queue is empty
      playerRef.current.seekTo(0);

      setIsPlaying(true);
    }
  }, [queue]);

  useEffect(() => {
    console.log("currentSong", currentSong);
    console.log("isPlaying", isPlaying);
    if (playerRef.current && isPlaying) {
      playerRef.current.playVideo();
    } else if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        playerRef.current = new YT.Player("player", {
          height: "0",
          width: "0",
          videoId: currentSong.id,
          playerVars: {
            controls: 0,
          },
          events: {
            onReady: (event) => {
              onPlayerReady(event);
            },
            onStateChange: (event) => {
              onPlayerStateChange(event);
            },
          },
        });
        setYoutubePlayer(playerRef.current);
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

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
          // onNext(); // Call the onNext function when the song ends
          break;
        case window.YT.PlayerState.CUED:
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

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, [currentSong, onNext]);

  useEffect(() => {
    if (percentagePlayed > 99) {
      if (queue.length > 0) {
        const nextSong = queue[0];
        removeFromQueue(nextSong.id);
        setCurrentSong(nextSong);
      } else {
        // Repeat the current song if the queue is empty
        youtubePlayer.seekTo(0);

        setIsPlaying(true);
      }
    }
  }, [percentagePlayed]);

  useEffect(() => {
    if (playerRef.current && currentSong) {
      checkYoutubeId(currentSong);
    }
  }, [currentSong]);

  async function checkYoutubeId(song) {
    var songToPlay = song;
    if (song.id.includes("track") || song.id.length === 22) {
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")}`;
      const results = await youtubeService.query(searchStr, 1);
      if (results.length > 0) {
        songToPlay.id = results[0].id;
        if (params.stationId)
          await updateSongId(params.stationId, song.id, songToPlay.id);
      }
    }
    playerRef.current.loadVideoById(currentSong.id);
    setDuration(playerRef.current.getDuration());
  }
  function handleFullScreenChange() {
    //TODO: to check by bar
  }

  function handleTimeBarChange(newPercentage) {
    const newTime = (newPercentage * duration) / 100;
    playerRef.current.seekTo(newTime);
    setPercentagePlayed(newPercentage);
  }

  return (
    <div className="youtube-player">
      <div id="player" className="yt"></div>
      {playerRef.current && playerRef.current.getCurrentTime ? (
        <span className="current-time">
          {utilService.formatTime(playerRef.current.getCurrentTime())}
        </span>
      ) : (
        <span className="current-time">0:00</span>
      )}
      <div className="time-bar">
        <TimeBar
          percentage={percentagePlayed}
          handleTimeBarChange={handleTimeBarChange}
          endValue={duration}
        />
      </div>
      {playerRef.current && playerRef.current.getDuration ? (
        <span className="duration">
          {utilService.formatTime(playerRef.current.getDuration())}
        </span>
      ) : (
        <span className="duration">0:00</span>
      )}
    </div>
  );
}
