import { useEffect, useState, useContext } from "react";

import { stationService } from "../services/station.service";
import { loadStations, removeStation } from "../store/station.actions";

import { useVisibleCount } from "../customHooks/useVisibleCount";

import { LayoutContext } from "../RootCmp";

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export function StationList({
  width,
  isCompact,
  randomize = false,
  KeepInOneRow = false,
}) {
  const [layout, setLayout] = useContext(LayoutContext);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const [shuffledStations, setShuffledStations] = useState([]);

  // Use the custom hook to get the container ref, visible count, and update function
  const [containerRef, visibleCount, updateVisibleCount] = useVisibleCount(
    150,
    16
  );

  // Recalculate the visible count when artistResults change
  useEffect(() => {
    if (KeepInOneRow) updateVisibleCount();
  }, [shuffledStations, updateVisibleCount, layout]);

  useEffect(() => {
    loadStations();
  }, [stations]);

  useEffect(() => {
    if (!randomize) {
      setShuffledStations(stations);
      return;
    }
    console.log("shuffling");
    setShuffledStations([...stations].sort(() => Math.random() - 0.5));
  }, [stations]);

  function onDeleteStation(ev, stationId) {
    ev.stopPropagation();
    removeStation(stationId);
  }

  if (shuffledStations.length === 0) return <Loader />;
  return (
    <section
      className={`station-list ${isCompact ? " compact" : ""}`}
      ref={containerRef}
    >
      {KeepInOneRow &&
        shuffledStations?.slice(0, visibleCount).map((station, index) => (
          <article key={index}>
            <NavLink key={index} to={`/station/${station._id}`}>
              <StationPreview
                station={station}
                width={width}
                isCompact={isCompact}
              />
            </NavLink>
          </article>
        ))}

      {!KeepInOneRow &&
        shuffledStations?.map((station, index) => (
          <article key={index}>
            <NavLink key={index} to={`/station/${station._id}`}>
              <StationPreview
                station={station}
                width={width}
                isCompact={isCompact}
              />
            </NavLink>

            {/* <button
            className="delete-btn"
            key={station._id}
            onClick={(ev) => onDeleteStation(ev, station._id)}
          >
            Delete
          </button> */}
          </article>
        ))}
    </section>
  );
}
