import React, { useState } from "react";
import { StationEditModal } from "./StationEditModal";
import { StationPreview } from "./StationPreview";

export function StationHeader({ station }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("isModalOpen", isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="station-header" onClick={openModal}>
      <div className="station-header-grid">
        <div className="station-header-img">img here</div>
        <div className="station-header-info">
          <span className="station-type">Playlist</span>
          <span className="station-name">
            {station.name ? station.name : "New Playlist"}
          </span>
          <span className="station-creator">{station.createdBy.fullname}</span>
        </div>
      </div>
      {isModalOpen && (
        <StationEditModal station={station} closeModal={closeModal} />
      )}
    </div>
  );
}
