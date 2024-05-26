import React, { useState, useRef, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { StationEditModal } from "./StationEditModal";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import pencil from "../assets/icons/pencil.svg";
import { stationService } from "../services/station.service";

export function StationHeader({ station, onSetStation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stationHeaderRef = useRef(null);
  const stationNameRef = useRef(null);
  const stationImgRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const adjustFontSize = () => {
    const headerWidth = stationHeaderRef.current.offsetWidth;
    const imgWidth =
      stationImgRef.current.offsetWidth || stationImgRef.current.width;
    const stationNameElement = stationNameRef.current;

    const getTextWidth = (fontSize) => {
      const span = document.createElement("span");
      span.style.fontSize = `${fontSize}px`;
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.textContent = station.name || "New Playlist";
      document.body.appendChild(span);
      const width = span.offsetWidth;
      document.body.removeChild(span);
      return width;
    };

    let low = 10;
    let high = 100;
    let optimalFontSize = parseFloat(
      window.getComputedStyle(stationNameElement).fontSize
    );

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (getTextWidth(mid) + imgWidth + 100 <= headerWidth) {
        optimalFontSize = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    stationNameElement.style.fontSize = `${optimalFontSize}px`;
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [station]);

  return (
    <div className="station-header" ref={stationHeaderRef}>
      <div className="station-header-grid" onClick={openModal}>
        <div className="station-header-img" ref={stationImgRef}>
          <img
            src={
              station.img ||
              (station.songs.length > 0 ? station.songs[0].img : tempStationImg)
            }
            alt=""
          />
          <div className="overlay">
            <ReactSVG src={pencil} />
            <h6>Choose Photo</h6>
          </div>
        </div>
        <div className="station-header-info">
          <span className="station-type">Playlist</span>
          <span className="station-name" ref={stationNameRef}>
            {station.name || "New Playlist"}
          </span>
          <span className="station-description">
            {station.description || "No description"}
          </span>
          <div className="station-info">
            <div className="station-creator">
              <img src={station.createdBy.img || tempStationImg} alt="" />
              <span>{station.createdBy.fullname}</span>
            </div>
            <div className="station-stats">
              <span>{station.songs.length} Songs</span>
              <span>{stationService.getStationDuration(station.songs)}</span>
            </div>
          </div>
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
  );
}
