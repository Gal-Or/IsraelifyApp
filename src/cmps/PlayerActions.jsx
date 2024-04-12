import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { ReactSVG } from "react-svg";

import { useSpacebarPlayPause } from "../customHooks/useSpacebarPlayPause";

import speaker from "../assets/icons/speaker.svg";
import speakerMute from "../assets/icons/speakerMute.svg";
import Slider from "@mui/material/Slider";

export function PlayerActions() {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );

  const volumeRef = useRef(100);
  const [volume, setVolume] = useState(volumeRef.current);

  useSpacebarPlayPause();

  function onVolumeChange(event) {
    setVolume(event.target.value);
    youtubePlayer.setVolume(event.target.value);
  }

  function onToggleSpeaker() {
    if (volume === 0) {
      setVolume(volumeRef.current);
      youtubePlayer.unMute();
    } else {
      volumeRef.current = volume;
      setVolume(0);
      youtubePlayer.mute();
    }
  }

  return (
    <div className="player-actions">
      {volume === 0 ? (
        <ReactSVG src={speakerMute} onClick={() => onToggleSpeaker()} />
      ) : (
        <ReactSVG src={speaker} onClick={() => onToggleSpeaker()} />
      )}
      <div className="volume-bar">
        <Slider
          value={volume}
          aria-label="Volume"
          aria-labelledby="continuous-slider"
          valueLabelDisplay="off"
          onChange={onVolumeChange}
          classes={{
            rail: "volume-bar-rail",
            track: "volume-bar-track",
            thumb: "volume-bar-thumb",
          }}
        />
      </div>
    </div>
  );
}
