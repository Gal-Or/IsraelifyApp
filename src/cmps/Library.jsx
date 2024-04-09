import { useSelector } from "react-redux";

import { stationService } from "../services/station.service";

import { addStation } from "../store/station.actions";

import { StationList } from "./StationList";
import { useNavigate } from "react-router";

export function Library() {
  const navigate = useNavigate();

  async function onCreateStation() {
    var newStation = stationService.createDefaultStation();
    const id = await addStation(newStation);
    navigate(`station/${id}`);
  }

  return (
    <section className="library-container">
      <section className="library-header">
        Library Header
        <button onClick={() => onCreateStation()}>Create Playlist</button>
      </section>

      <StationList />
    </section>
  );
}
