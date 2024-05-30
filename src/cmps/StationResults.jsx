import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import playIcon from "../assets/icons/playIcon.svg";
import { useVisibleCount } from "../customHooks/useVisibleCount";
import { Loader } from "./Loader";

export function StationResults({ stationResults }) {
  // Use the custom hook to get the container ref, visible count, and update function
  const [containerRef, visibleCount, updateVisibleCount] = useVisibleCount(
    150,
    16
  );

  // Recalculate the visible count when stationResults change
  useEffect(() => {
    updateVisibleCount();
  }, [stationResults, updateVisibleCount]);

  // Show loading message if stationResults are not available
  if (!stationResults) return <Loader />;

  return (
    <section className="station-results">
      <h1>Stations</h1>
      <div className="station-results-container" ref={containerRef}>
        {stationResults &&
          // Only show the number of items that fit in the visible count
          stationResults.slice(0, visibleCount).map((station, index) => (
            <article key={station._id} className="station-card">
              <NavLink to={`/station/${station._id}`}>
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
