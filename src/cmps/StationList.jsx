import { useEffect, useState } from "react";

import { stationService } from "../services/station.service";
import { loadStations } from "../store/station.actions";

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function StationList(headline = "ListOfStations", subject = "mixes") {
  //const [stations, setStations] = useState([])
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );

  useEffect(() => {
    loadStations();
  }, []);

  return (
    <div>
      <ul className="station-list">
        {stations?.map((station, index) => (
          <NavLink key={index} to={`/station/${station._id}`}>
            <li key={station._id} className="">
              <StationPreview station={station} />
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
