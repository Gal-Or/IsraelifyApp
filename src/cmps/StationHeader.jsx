import React, { useState } from "react";
import { StationEditModal } from "./StationEditModal";
import { StationPreview } from "./StationPreview";

import tempStationImg from "../assets/imgs/logo-Blue3D.png";


export function StationHeader({ station, onSetStation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("isModalOpen", isModalOpen);
  };

  const closeModal = () => {
    console.log("isModalOpen:", isModalOpen);
    setIsModalOpen(false);
  };

  return (
    <div className="station-header" onClick={openModal}>
      <div className="station-header-grid">
        <div className="station-header-img">
          {" "}
          <img src={station.img
            ? station.img
            : station.songs.length > 0
              ? station.songs[0].img
              : tempStationImg} alt="" />
        </div>
        <div className="station-header-info">
          <span className="station-type">Playlist</span>
          <span className="station-name">
            {station.name ? station.name : "New Playlist"}
          </span>
          <span className="station-creator">{station.createdBy.fullname}</span>
        </div>
      </div>
      {isModalOpen && (
        <StationEditModal station={station} closeModal={closeModal} onSetStation={onSetStation} />
      )}
    </div>
  );
}
