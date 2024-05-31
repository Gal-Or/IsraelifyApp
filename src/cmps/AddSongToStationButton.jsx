import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { CustomTooltip } from "./CustomTooltip";

import tickIcon from "../assets/icons/tickIcon.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";

const ADD_TO_LIKED_SONGS = "ADD_TO_LIKED_SONGS";
const ADD_TO_STATION = "ADD_TO_STATION";
const EXIST_IN_STATION = "EXIST_IN_STATION";

import { addSongToStation } from "../store/station.actions";
import { stationService } from "../services/station.service";
export function AddSongToStationButton({ song }) {
  const currentSong = song
    ? song
    : useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);
  const [buttonState, setButtonState] = useState(ADD_TO_LIKED_SONGS);

  useEffect(() => {
    console.log("buttonState :", buttonState);
  }, [buttonState]);

  async function checkSongExistInAnyStations() {
    if (!stations) return;
    if (stations.length === 0) return;
    const existInStations = await stationService.checkIfSongInExistInAnyStation(
      currentSong
    );
    console.log("=======> existInStations:", existInStations);
    if (existInStations !== null) {
      console.log("existInStations is null-station not found");
    }
    if (existInStations) {
      setButtonState(EXIST_IN_STATION);
    } else {
      setButtonState(ADD_TO_STATION);
    }
    return;
  }

  function onAddToStation(stationId) {
    console.log("Adding song to station:", stationId);
    //update the button state when clicling the button
    if (buttonState === EXIST_IN_STATION) setButtonState(ADD_TO_STATION);
    else setButtonState(EXIST_IN_STATION);

    addSongToStation(song, stationId);
  }

  function renderButtonStateSwitch(buttonState) {
    switch (buttonState) {
      case ADD_TO_LIKED_SONGS:
      case ADD_TO_STATION:
        return <ReactSVG src={addToPlaylistIcon} />;
        break;
      case EXIST_IN_STATION:
        return <ReactSVG src={tickIcon} />;
        break;
    }
  }

  function getTooltipText(buttonState) {
    switch (buttonState) {
      case ADD_TO_LIKED_SONGS:
        return "Add to Liked Songs";
        break;
      case ADD_TO_STATION:
        return "Add to Station";
        break;
      case EXIST_IN_STATION:
        return "Remove from Station";
        break;
    }
  }

  return (
    <CustomTooltip title={getTooltipText(buttonState)}>
      <button
        className="add-to-playlist"
        onClick={() => onAddToStation("liked-songs")}
      >
        {renderButtonStateSwitch(buttonState)}
      </button>
    </CustomTooltip>
  );
}

/* <button className="add-to-playlist" onClick={onAddToPlaylist}>
        {likedSongs &&
        likedSongs.find((likedSong) => likedSong.id === song.id) ? (
          <ReactSVG src={tickIcon} className="liked-icon" />
        ) : (
          <ReactSVG src={addToPlaylistIcon} />
        )}
      </button> */
