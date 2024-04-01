import { useEffect, useState } from "react";

import { stationService } from "../services/station.service"

import { StationPreview } from "./StationPreview";

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
        {stations?.map(station =>
          <li key={station._id} className="">
            <StationPreview station={station} />
          </li>
        )}
      </ul>
    </div>
  );
}
