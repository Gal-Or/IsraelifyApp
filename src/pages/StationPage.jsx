import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { stationService } from "../services/station.service.js";

import { StationHeader } from "../cmps/StationHeader.jsx";
import { StationContent } from "../cmps/StationContent.jsx";
import { AddSongs } from "../cmps/AddSongs.jsx";

export function StationPage() {
  const params = useParams();

  const [station, setStation] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadStation();
  }, [params.stationId]);

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId);
      setEditMode(!station.name);
      setStation(station);
    } catch (err) {
      console.log("error in loadStation", err);
    }
  }

  function onAddSongToStation(song) {
    console.log("song", song);
    setStation((prevStation) => ({
      ...prevStation,
      songs: [...prevStation.songs, song],
    }));
  }

  if (!station) return <h1>loading...</h1>;
  return (
    <section className="station-page">
      <StationHeader station={station} />
      <StationContent station={station} />

      {editMode && <AddSongs onAddSongToStation={onAddSongToStation} />}
    </section>
  );
}
