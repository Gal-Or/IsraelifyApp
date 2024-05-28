import { useEffect, useState, useRef } from "react";

import { stationService } from "../services/station.service";
import { loadStations, removeStation } from "../store/station.actions";

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function StationList({ width }) {
  //const [stations, setStations] = useState([])
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      const firstChild = containerRef.current.firstElementChild;
      const firstChildHeight = firstChild.offsetHeight;

      if (containerRef.current.parentElement.className !== "library-container") {
        containerRef.current.style.maxHeight = `${firstChildHeight}px`;
        console.log("firstChildHeight:", firstChildHeight);
      }
    }
    return () => {
      if (containerRef.current !== null)
        containerRef.current.style.maxHeight = "unset";
    };
  }, [stations]);

  useEffect(() => {
    loadStations();
  }, []);
  function onDeleteStation(ev, stationId) {
    ev.stopPropagation();
    removeStation(stationId);
  }

  return (
    <ul className="station-list" ref={containerRef}>
      {stations?.map((station, index) => (

        <article key={index}>
          <NavLink key={index} to={`/station/${station._id}`}>
            <StationPreview station={station} width={width} />
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
    </ul>
  );
}
