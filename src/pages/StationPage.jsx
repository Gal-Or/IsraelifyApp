import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { stationService } from "../services/station.service.js";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { StationHeader } from "../cmps/StationHeader.jsx";
import { StationContent } from "../cmps/StationContent.jsx";
import { AddSongs } from "../cmps/AddSongs.jsx";
import { setCurrentStation, updateStation } from "../store/station.actions.js";
import { StationEditModal } from "../cmps/StationEditModal";
import { Loader } from "../cmps/Loader.jsx";
import { socketService } from "../services/socket.service.js";
import { SOCKET_EVENT_RENDER_STATION } from "../services/socket.service.js";

export function StationPage() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentStation = useSelector(
    (state) => state.stationModule.currentStation
  );
  const stationHeaderRef = useRef(null);

  useEffect(() => {}, []);

  useEffect(() => {
    setIsLoading(true);
    loadStation();
    // socketService.on(SOCKET_EVENT_RENDER_STATION, loadStation);

    return () => {
      // socketService.off(SOCKET_EVENT_RENDER_STATION, loadStation);
      const mainElement = document.querySelector(".main-container-bg");
      if (!mainElement) return;
      mainElement.style.backgroundImage = "none";
    };
  }, [params.stationId]);

  async function onSetStation(fieldsToUpdate) {
    const updatedStation = { ...currentStation, ...fieldsToUpdate };
    await updateStation(updatedStation);
  }

  async function loadStation() {
    console.log("Loading station");
    try {
      const station = await stationService.getById(params.stationId);
      setCurrentStation(station);
      setMainElementStyle(station.backgroundColor);
    } catch (err) {
      console.log("Error in loadStation:", err);
    } finally {
      // Ensure the loader shows for at least 1 second
      setTimeout(() => setIsLoading(false), 1);
    }
  }

  function onAddSongToStation(song) {
    song.addedAt = Date.now();
    if (!currentStation) {
      console.log("Station is null. Aborting addition of song.");
      return;
    }
    if (
      currentStation.songs.find((stationSong) => stationSong.id === song.id)
    ) {
      console.log("Song already exists in the station. Aborting addition.");
      return;
    }

    const updatedStation = {
      ...currentStation,
      songs: [...currentStation.songs, song],
    };

    setCurrentStation(updatedStation);
  }

  function setMainElementStyle(backgroundColor) {
    const mainElement = document.querySelector(".main-container-bg");
    if (!mainElement || !backgroundColor) return;
    mainElement.style.backgroundImage = `linear-gradient(to bottom, ${backgroundColor} 0%,rgba(18,18,18,0.1) 350px)`;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;

  return (
    <div className="station-page-container">
      <AppHeader
        stationHeaderRef={stationHeaderRef}
        backgroundColor={
          currentStation ? currentStation.backgroundColor : "transparent"
        }
        station={currentStation}
      />
      <section className="station-page">
        <StationHeader
          station={currentStation}
          onSetStation={onSetStation}
          openModal={openModal}
          ref={stationHeaderRef}
        />
        <StationContent station={currentStation} openModal={openModal} />
        <AddSongs onAddSongToStation={onAddSongToStation} />
        {isModalOpen && (
          <StationEditModal
            station={currentStation}
            closeModal={closeModal}
            onSetStation={onSetStation}
          />
        )}
      </section>
    </div>
  );
}
