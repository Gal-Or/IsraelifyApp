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

  function returnColor(color) {
    return color.split("(")[1].split(")")[0];
  }

  if (!station) return <h1>Loading...</h1>;
  return (
    <div
      className="station-page-container"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${station.backgroundColor} 0%,rgba(18,18,18,0.1) 65%)`,
      }}
    >
      <AppHeader />
      <section className="station-page">
        <StationHeader station={station} onSetStation={onSetStation} />
        <StationContent station={station} />
        <AddSongs onAddSongToStation={onAddSongToStation} />
      </section>
    </div>
  );
}
