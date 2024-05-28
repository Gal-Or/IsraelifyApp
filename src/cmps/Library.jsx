import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { stationService } from "../services/station.service";

import { addStation } from "../store/station.actions";

import { StationList } from "./StationList";
import { ReactSVG } from "react-svg";
import LibraryClose from "../assets/icons/libraryClose.svg";
import LibraryOpen from "../assets/icons/libraryOpen.svg";
import plus from "../assets/icons/plus.svg";
import rightArrow from "../assets/icons/full_right_arrow.svg";

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
        <div className="icon-lable-div">
          <ReactSVG
            src={isOpen ? LibraryOpen : LibraryClose}
            onClick={() => setIsOpen(!isOpen)} />
          <span className="nav-page">Your Library</span>
        </div>

        <div className="library-header-right">
          <button className="plus-btn" onClick={() => onCreateStation()}>
            <ReactSVG src={plus} />
          </button>

          <button className="plus-btn">
            <ReactSVG src={rightArrow} />
          </button>
        </div>
      </section>

      <StationList width={width} />
    </section >
  );
}
