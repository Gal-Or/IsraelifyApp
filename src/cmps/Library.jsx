import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { Dropdown } from "./DropDownMenu";

import { stationService } from "../services/station.service";

import { addStation } from "../store/station.actions";

import { StationList } from "./StationList";
import { ReactSVG } from "react-svg";
import LibraryClose from "../assets/icons/LibraryClose.svg";
import LibraryOpen from "../assets/icons/LibraryOpen.svg";
import plus from "../assets/icons/plus.svg";
import rightArrow from "../assets/icons/full_right_arrow.svg";
import listIcon from "../assets/icons/list.svg";
import compactIcon from "../assets/icons/compact.svg";

import { UserContext } from "../RootCmp";

export function Library({ width }) {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [loggedInUser] = useContext(UserContext);

  const viewOptions = [
    { label: "List", value: false, icon: listIcon },
    { label: "Compact", value: true, icon: compactIcon },
  ];

  const handleViewSelect = (option) => {
    setIsCompact(option.value);
  };

  async function onCreateStation() {
    var newStation = stationService.createDefaultStation(loggedInUser);
    const id = await addStation(newStation);
    navigate(`station/${id}`);
  }

  function handleClickLibrary() {
    let nav = document.querySelector(".nav-bar-content");
    if (isOpen) {
      nav.classList.add("narrow-nav-bar");
      nav.style.width = "80px";
    } else {
      nav.classList.remove("narrow-nav-bar");
      nav.style.width = "360px";
    }
    setIsOpen(!isOpen);
  }

  return (
    <section className="library-container">
      <section className="library-header">
        <div className="icon-lable-div">
          <ReactSVG
            src={isOpen ? LibraryOpen : LibraryClose}
            onClick={() => {
              handleClickLibrary();
            }}
          />
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

        <div className="library-view-options">
          <Dropdown
            options={viewOptions}
            onSelect={handleViewSelect}
            headline="View as"
            key={"view"}
            toggleTick={true}
          />
        </div>
      </section>

      <div className="list-container">
        <StationList width={width} isCompact={isCompact} />
      </div>
    </section>
  );
}
