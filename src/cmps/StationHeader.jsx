import React, { useRef, forwardRef } from "react";
import { ReactSVG } from "react-svg";
import { StationEditModal } from "./StationEditModal";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import pencil from "../assets/icons/pencil.svg";
import { stationService } from "../services/station.service";

export const StationHeader = forwardRef(
  ({ station, onSetStation, openModal }, ref) => {
    const stationHeaderRef = ref;
    const stationNameRef = useRef(null);
    const stationImgRef = useRef(null);

    return (
      <div className="station-header" ref={stationHeaderRef}>
        <div className="station-header-grid" onClick={openModal}>
          <div className="station-header-img" ref={stationImgRef}>
            <img
              src={
                station.img ||
                (station.songs.length > 0
                  ? station.songs[0].img
                  : tempStationImg)
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
                <img src={station.createdBy.imgUrl} alt="creator-img" />
                <span>{station.createdBy.fullname}</span>
              </div>
              <div className="station-stats">
                <span>{station.songs.length} Songs</span>
                <span>{stationService.getStationDuration(station.songs)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
