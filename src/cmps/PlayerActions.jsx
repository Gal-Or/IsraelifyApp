import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { useSpacebarPlayPause } from "../customHooks/useSpacebarPlayPause";
import speaker from "../assets/icons/speaker.svg";
import queueIcon from "../assets/icons/QueueIcon.svg";
import speakerMute from "../assets/icons/speakerMute.svg";
import Slider from "@mui/material/Slider";
import expandIcon from "../assets/icons/ExpendIcon.svg";
import { CustomTooltip } from "./CustomTooltip";
export function PlayerActions({ setShowSidePopUp, showSidePopUp }) {
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );

  const volumeRef = useRef(100);
  const [volume, setVolume] = useState(volumeRef.current);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  function handleFullScreen() {
    const iframe = youtubePlayer.getIframe();

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }

  return (
    <div className="player-actions">
      <CustomTooltip title="open-queue">
        <div className={`${showSidePopUp ? "active" : ""}`}>
          <ReactSVG
            src={queueIcon}
            onClick={() => setShowSidePopUp(!showSidePopUp)}
          />
        </div>
      </CustomTooltip>
      <CustomTooltip title={volume === 0 ? "Unmute" : "Mute"}>
        <div>
          {volume === 0 ? (
            <ReactSVG src={speakerMute} onClick={() => onToggleSpeaker()} />
          ) : (
            <ReactSVG src={speaker} onClick={() => onToggleSpeaker()} />
          )}
        </div>
      </CustomTooltip>
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
      <CustomTooltip
        title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        arrow
      >
        <button
          onClick={handleFullScreen}
          className="ytp-fullscreen-button ytp-button"
        >
          <ReactSVG src={expandIcon} />
        </button>
      </CustomTooltip>
    </div>
  );
}
