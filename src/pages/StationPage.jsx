import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { stationService } from "../services/station.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { StationHeader } from "../cmps/StationHeader.jsx";
import { StationContent } from "../cmps/StationContent.jsx";
import { AddSongs } from "../cmps/AddSongs.jsx";

export function StationPage() {
  const params = useParams();

  const [station, setStation] = useState(null);

  useEffect(() => {
    loadStation();
    return () => {
      const mainElement = document.querySelector(".main-container");
      if (!mainElement) return;
      mainElement.style.backgroundImage = "none";
    };
  }, [params.stationId]);

  async function onSetStation(fieldsToUpdate) {
    const updatedStation = { ...station, ...fieldsToUpdate };
    setStation(updatedStation);
    await stationService.editStationInfo(updatedStation);
  }

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId);
      setStation(station);
      setMainElementStyle(station.backgroundColor);

      console.log("Loaded station :", station);
    } catch (err) {
      console.log("Error in loadStation:", err);
    }
  }

  function onAddSongToStation(song) {
    song.addedAt = Date.now();
    console.log("Adding song to station:", song);
    if (!station) {
      console.log("Station is null. Aborting addition of song.");
      return;
    }
    if (station.songs.find((stationSong) => stationSong.id === song.id)) {
      console.log("Song already exists in the station. Aborting addition.");
      return;
    }

    const updatedStation = {
      ...station,
      songs: [...station.songs, song],
    };

    setStation(updatedStation);
  }

  function setMainElementStyle(backgroundColor) {
    const mainElement = document.querySelector(".main-container");
    if (!mainElement || !backgroundColor) return;
    mainElement.style.backgroundImage = `linear-gradient(to bottom, ${backgroundColor} 0%,rgba(18,18,18,0.1) 65%)`;
  }

  if (!station) return <h1>Loading...</h1>;
  return (
    <div className="station-page-container">
      <AppHeader />
      <section className="station-page">
        <StationHeader station={station} onSetStation={onSetStation} />
        <StationContent station={station} />
        <AddSongs onAddSongToStation={onAddSongToStation} />
      </section>
    </div>
  );
}
