import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import playIcon from "../assets/icons/playIcon.svg";

export function StationResults({ stationResults }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      const firstChild = containerRef.current.firstElementChild;
      const firstChildHeight = firstChild.offsetHeight;
      containerRef.current.style.maxHeight = `${firstChildHeight}px`;
    }
  }, [stationResults]);

  if (!stationResults) return <div>Loading...</div>;

  return (
    <section className="station-results">
      <h1>Stations</h1>
      <div className="station-results-container" ref={containerRef}>
        {stationResults &&
          stationResults.map((station, index) => (
            <article key={station._id} className="station-card">
              <NavLink key={index} to={`/station/${station._id}`}>
                <div className="station-card-container">
                  <div className="station-img">
                    <img
                      src={
                        station.img
                          ? station.img
                          : station.songs.length > 0
                          ? station.songs[0].img
                          : tempStationImg
                      }
                      alt={station.name}
                    />
                    <button
                      className="play-btn"
                      onClick={() => console.log(station)}
                    >
                      <ReactSVG src={playIcon} />
                    </button>
                  </div>
                  <div className="station-info">
                    <p className="station-name">
                      {station.name ? station.name : "New Playlist"}
                    </p>
                    <small className="station-creator">
                      {station.createdBy.fullname}
                    </small>
                  </div>
                </div>
              </NavLink>
            </article>
          ))}
      </div>
    </section>
  );
}
