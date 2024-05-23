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
    // Ensure station is not null before accessing its songs property
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
    console.log("Adding song to station. Updated station:", updatedStation);
    setStation(updatedStation);
  }

  if (!station) return <h1>Loading...</h1>;
  return (
    <div
      className="station-page-container"
      style={{
        backgroundImage: `linear-gradient(to bottom,${station.backgroundColor} , rgba(255, 0, 0, 0))`,
      }}
    >
      <AppHeader />
      <section className="station-page">
        <StationHeader station={station} />
        <StationContent station={station} />
        <AddSongs onAddSongToStation={onAddSongToStation} />
      </section>
    </div>
  );
}

// .station-page-container {
//   background-image: linear-gradient(
//     to bottom,
//     rgba(255, 0, 0, 1),
//     rgba(255, 0, 0, 0)
//   ); /* Red to transparent gradient */
//   height: 500px; /* Adjust height as per your design */
// }
