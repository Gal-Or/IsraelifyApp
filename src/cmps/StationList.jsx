import { useEffect, useState } from "react";

import { stationService } from "../services/station.service"

import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";

export function StationList(headline = "ListOfStations", subject = "mixes") {

  const [stations, setStations] = useState([])

  useEffect(() => {
    loadStations()
  }, [])

  async function loadStations() {

    const stations = await stationService.query()
    console.log("stations->", stations);
    setStations(stations)
  }

  return (
    <div>
      <ul className="station-list">
        {stations?.map((station, index) =>
          <NavLink key={index} to={`/station/${station._id}`}>
            <li key={station._id} className="">
              <StationPreview station={station} />
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
}
