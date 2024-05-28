import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import playIcon from "../assets/icons/playIcon.svg";


export function StationPreview({ station, width }) {
  var imgSrc = station.img
    ? station.img
    : station.songs.length > 0
      ? station.songs[0].img
      : tempStationImg;

  return (
    <article className="station-preview">

      <div className="img-container">
        <img src={imgSrc} alt={station.name} />
        <button
          className="play-btn"
          onClick={() => console.log(station)}
        >
          <ReactSVG src={playIcon} />
        </button>
      </div>

      <div className="info-container" style={width < 100 ? { display: "none" } : {}}>
        <span className="station-name"> {station.name ? station.name : "New Playlist"} </span>
        <span className="station-creator">{station.createdBy.fullname}</span>
      </div>
    </article>
  );
}
