import { useEffect, useState } from "react";

import { stationService } from "../services/station.service";
import { loadStations, removeStation } from "../store/station.actions";

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function StationList(headline = "ListOfStations", subject = "mixes") {
  //const [stations, setStations] = useState([])
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStations();
  }, []);
  function onDeleteStation(ev, stationId) {
    ev.stopPropagation();
    removeStation(stationId);
  }

  return (
    <div>
      <ul className="station-list">
        {stations?.map((station, index) => (
          <article key={index}>
            <NavLink key={index} to={`/station/${station._id}`}>
              <li key={station._id} className="">
                <StationPreview station={station} />
              </li>
            </NavLink>
            <button
              className="delete-btn"
              key={station._id}
              onClick={(ev) => onDeleteStation(ev, station._id)}
            >
              Delete
            </button>
          </article>
        ))}
      </ul>
    </div>
  );
}
