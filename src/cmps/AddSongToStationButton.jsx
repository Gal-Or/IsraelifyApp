import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { CustomTooltip } from "./CustomTooltip";

import tickIcon from "../assets/icons/tickIcon.svg";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";

const ADD_TO_LIKED_SONGS = "ADD_TO_LIKED_SONGS"; // initial state - if the song not exist in any station add it to liked songs
const ADD_TO_STATION = "ADD_TO_STATION"; // secondary state - if the song  exist in any station -> open "add to station" menu(modal)


import { addSongToStation, updateStation } from "../store/station.actions";
import { stationService } from "../services/station.service";
import { StationsMenu } from "./StationsMenu";

export function AddSongToStationButton({ song }) {

  const stations = useSelector((state) => state.stationModule.stations);
  const [buttonState, setButtonState] = useState(ADD_TO_LIKED_SONGS);
  const [stationsMenuOpen, setStationsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Current song changed in AddSongToStationButton:", song);
    checkSongExistInAnyStations();
  }, [song, stationsMenuOpen]);


  async function checkSongExistInAnyStations() {
    if (!stations) return;
    if (stations.length === 0) return;
    try {

      const existInStations = await stationService.checkIfSongInExistInAnyStation(
        song
      );

      if (existInStations) {
        setButtonState(ADD_TO_STATION);
      } else {
        setButtonState(ADD_TO_LIKED_SONGS);
      }


    } catch (err) {
      console.log('Error in checkSongExistInAnyStations:', err);
    }


    return;
  }

  function handleClick() {

    switch (buttonState) {

      case ADD_TO_LIKED_SONGS:
        setButtonState(ADD_TO_STATION)
        addSongToLikedSongs();
        console.log("Adding song to liked songs");
        break;

      case ADD_TO_STATION:
        setStationsMenuOpen(true);
        console.log("open modal ");
        break;

    }


  }
  async function addSongToLikedSongs() {
    try {

      console.log("Adding song to liked songs");

      const savedStation = await stationService.addSongToStation({ ...song, addedAt: Date.now() }, "liked-songs")
      // update store
      updateStation(savedStation);

    } catch (err) {
      console.log('Error in addSongToLikedSongs:', err);
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
          className="add-to-playlist"
          onClick={() => handleClick()}
        >
          {renderButtonStateSwitch(buttonState)}
        </button>
      </CustomTooltip>
      {stationsMenuOpen && <StationsMenu song={song} closeModal={closeModal} />}
    </>
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
