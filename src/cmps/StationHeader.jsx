import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { StationEditModal } from "./StationEditModal";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import pencil from "../assets/icons/pencil.svg";

export function StationHeader({ station, onSetStation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="station-header">
        <div className="station-header-grid" onClick={openModal}>
          <div className="station-header-img">
            {station.img ? (
              <img src={station.img} alt="" />
            ) : station.songs.length > 0 ? (
              <img src={station.songs[0].img} alt="" />
            ) : (
              <img src={tempStationImg} alt="" />
            )}
            <div className="overlay">
              <ReactSVG src={pencil} />
              <h6>Choose Photo</h6>
            </div>
          </div>
          <div className="station-header-info">
            <span className="station-type">Playlist</span>
            <span className="station-name">
              {station.name ? station.name : "New Playlist"}
            </span>
            <span className="station-creator">
              {station.createdBy.fullname}
            </span>
          </div>
        </div>
        {isModalOpen && (
          <StationEditModal
            station={station}
            closeModal={closeModal}
            onSetStation={onSetStation}
          />
        )}
      </div>
    </>
  );
}
