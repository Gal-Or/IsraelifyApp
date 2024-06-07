import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { CustomTooltip } from "./CustomTooltip";

import tickIcon from "../assets/icons/tickIcon.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";

const ADD_TO_LIKED_SONGS = "ADD_TO_LIKED_SONGS";
const ADD_TO_STATION = "ADD_TO_STATION";

import { addSongToStation, updateStation } from "../store/station.actions";
import { stationService } from "../services/station.service";
import { StationsMenu } from "./StationsMenu";

export function AddSongToStationButton({ song, containerRect }) {
  const stations = useSelector((state) => state.stationModule.stations);
  const [buttonState, setButtonState] = useState(ADD_TO_LIKED_SONGS);
  const [stationsMenuOpen, setStationsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  useEffect(() => {
    checkSongExistInAnyStations();
  }, [song, stationsMenuOpen, currentSong, stations]);

  async function checkSongExistInAnyStations() {
    console.log("checkSongExistInAnyStations", song, stations);
    if (!stations) return;
    if (stations.length === 0) return;
    try {
      const existInStations =
        await stationService.checkIfSongInExistInAnyStation(song);

      if (existInStations) {
        setButtonState(ADD_TO_STATION);
      } else {
        setButtonState(ADD_TO_LIKED_SONGS);
      }
    } catch (err) {
      console.log("Error in checkSongExistInAnyStations:", err);
    }

    return;
  }

  function handleClick(event) {
    switch (buttonState) {
      case ADD_TO_LIKED_SONGS:
        setButtonState(ADD_TO_STATION);
        addSongToLikedSongs();
        break;

      case ADD_TO_STATION:
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({ x: buttonRect.left, y: buttonRect.bottom });
        setStationsMenuOpen(true);
        break;
    }
  }

  async function addSongToLikedSongs() {
    try {
      const savedStation = await stationService.addSongToStation(
        { ...song, addedAt: Date.now() },
        "liked-songs"
      );
      updateStation(savedStation);
    } catch (err) {
      console.log("Error in addSongToLikedSongs:", err);
    }
  }

  function renderButtonStateSwitch(buttonState) {
    switch (buttonState) {
      case ADD_TO_LIKED_SONGS:
        return <ReactSVG src={addToPlaylistIcon} />;

      case ADD_TO_STATION:
        return <ReactSVG src={tickIcon} />;
    }
  }

  function getTooltipText(buttonState) {
    switch (buttonState) {
      case ADD_TO_LIKED_SONGS:
        return "Add to Liked Songs";
      case ADD_TO_STATION:
        return "Add to Station";
    }
  }

  function closeModal() {
    setStationsMenuOpen(false);
  }

  return (
    <>
      <CustomTooltip title={getTooltipText(buttonState)}>
        <button
          ref={buttonRef}
          className={`add-to-playlist ${
            buttonState === "ADD_TO_STATION" ? "active" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          {renderButtonStateSwitch(buttonState)}
        </button>
      </CustomTooltip>
      {stationsMenuOpen && (
        <StationsMenu
          song={song}
          closeModal={closeModal}
          position={menuPosition}
          containerRect={containerRect ? containerRect : null}
        />
      )}
    </>
  );
}
