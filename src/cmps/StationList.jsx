import { useEffect, useState, useRef } from "react";

import { stationService } from "../services/station.service";
import { loadStations, removeStation } from "../store/station.actions";

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export function StationList({ width, isCompact, randomize = false }) {
  //const [stations, setStations] = useState([])
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const [shuffledStations, setShuffledStations] = useState([]);

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      const firstChild = containerRef.current.firstElementChild;
      const firstChildHeight = firstChild.offsetHeight;

      if (containerRef.current.parentElement.className !== "library-container") {
        containerRef.current.style.maxHeight = `${firstChildHeight}px`;
      }
    }
    return () => {
      if (containerRef.current !== null) {
        containerRef.current.style.maxHeight = "unset";
      }
    };
  }, [shuffledStations]);

  useEffect(() => {
    loadStations();
  }, []);

  useEffect(() => {
    if (!randomize) {
      setShuffledStations(stations);
      return;
    }
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
      {shuffledStations?.map((station, index) => (
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
