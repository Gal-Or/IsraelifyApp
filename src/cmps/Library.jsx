import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { stationService } from "../services/station.service";

import { addStation } from "../store/station.actions";

import { StationList } from "./StationList";
import { ReactSVG } from "react-svg";
import LibraryClose from "../assets/icons/libraryClose.svg";
import LibraryOpen from "../assets/icons/libraryOpen.svg";
export function Library({ width, setWidth }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  async function onCreateStation() {
    var newStation = stationService.createDefaultStation();
    const id = await addStation(newStation);
    navigate(`station/${id}`);
  }

  return (
    <section className="library-container">
      <section className="library-header">
        <ReactSVG
          src={isOpen ? LibraryOpen : LibraryClose}
          onClick={() => setIsOpen(!isOpen)}
        />
        Library Header
        <button onClick={() => onCreateStation()}>Create Playlist</button>
      </section>

      <StationList width={width} />
    </section>
  );
}
