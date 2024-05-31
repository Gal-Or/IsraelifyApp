import React from "react";
import { useNavigate } from "react-router";
import { ReactSVG } from "react-svg";
import { Dropdown } from "./DropDownMenu";

import { removeStation } from "../store/station.actions";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import DotsIcon from "../assets/icons/Ellipses.svg";
import listIcon from "../assets/icons/list.svg";
import compactIcon from "../assets/icons/compact.svg";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/pencil.svg";
import addIcon from "../assets/icons/AddToQueue.svg";

import { CustomTooltip } from "./CustomTooltip";

export function StationActions({
  station,
  setIsCompact,
  isCompact,
  openModal,
}) {
  const navigate = useNavigate();
  const viewOptions = [
    { label: "List", value: false, icon: listIcon },
    { label: "Compact", value: true, icon: compactIcon },
  ];
  const moreOptions = [
    { label: "delete", value: "delete", icon: deleteIcon },
    { label: "edit", value: "edit", icon: editIcon },
    { label: "add to queue", value: "add to queue", icon: addIcon },
  ];

  const handleViewSelect = (option) => {
    setIsCompact(option.value);
  };

  const handleMoreSelect = async (option) => {
    switch (option.value) {
      case "delete":
        await removeStation(station._id);
        navigate("/");
        break;
      case "edit":
        openModal(); // Call openModal here
        break;
      case "add to queue":
        console.log("add to queue");
        break;
    }
  };

  return (
    <div className="station-actions">
      <button className="play-btn">
        <ReactSVG src={playIcon} />
      </button>
      <CustomTooltip title={`More options for ${station.name}`}>
        <div className="more-options">
          <Dropdown
            options={moreOptions}
            onSelect={handleMoreSelect}
            toggle={<ReactSVG src={DotsIcon} />}
            toggleTick={false}
            closeOnSelect={true}
            showSelected={false}
            key={station._id + "more"}
          />
        </div>
      </CustomTooltip>
      <div className="change-view">
        <Dropdown
          options={viewOptions}
          onSelect={handleViewSelect}
          headline="View as"
          key={station._id + "view"}
          toggleTick={true}
        />
      </div>
    </div>
  );
}
