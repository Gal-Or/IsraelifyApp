import React from "react";
import { ReactSVG } from "react-svg";
import { Dropdown } from "./DropDownMenu";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import DotsIcon from "../assets/icons/Ellipses.svg";
import listIcon from "../assets/icons/list.svg";
import compactIcon from "../assets/icons/compact.svg";
export function StationActions({ station, setIsCompact, isCompact }) {
  const options = [
    { label: "List", value: false, icon: listIcon },
    { label: "Compact", value: true, icon: compactIcon },
  ];

  const handleSelect = (option) => {
    setIsCompact(option.value);
  };

  return (
    <div className="station-actions">
      <button className="play-btn">
        <ReactSVG src={playIcon} />
      </button>
      <button className="more-btn">
        {" "}
        <ReactSVG src={DotsIcon} />{" "}
      </button>
      <div className="change-view">
        <Dropdown
          options={options}
          onSelect={handleSelect}
          headline="View as"
        />
      </div>
    </div>
  );
}
