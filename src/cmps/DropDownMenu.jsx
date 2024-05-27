import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import tickIcon from "../assets/icons/tick.svg";
export function Dropdown({
  options, // An array of objects representing the dropdown options. Each object should have 'label' and 'value' properties, and optionally an 'icon' property.
  onSelect, // A callback function that is triggered when an option is selected. Receives the selected option as an argument.
  headline, // An optional string that, if provided, will be displayed as a headline at the top of the dropdown menu.
  toggle, // An optional element or string to customize the dropdown toggle button. If not provided, the selected option's label or value will be used.
  className, // An optional string for custom CSS classes to style the dropdown component.
  toggleTick = false, // A boolean that determines whether to show a tick icon next to the selected option in the dropdown menu.
  closeOnSelect = true, // A boolean that determines whether the dropdown menu should close after an option is selected.
  showSelected = true, // A boolean that determines whether the selected option should be displayed in the dropdown toggle button.
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    if (closeOnSelect) setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleToggle}>
        {toggle
          ? toggle
          : selectedOption
          ? selectedOption.label
          : selectedOption.value}
        {selectedOption.icon && !toggle && (
          <ReactSVG src={selectedOption.icon} className="dropdown-icon" />
        )}
      </button>
      {isOpen && (
        <div className="dropdown-menu-container">
          {headline && <h3>{headline}</h3>}
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={
                  option.value === selectedOption.value && showSelected
                    ? "selected"
                    : ""
                }
              >
                {option.icon && (
                  <ReactSVG src={option.icon} className="dropdown-icon" />
                )}
                {option.label}
                {toggleTick && option.value === selectedOption.value && (
                  <ReactSVG src={tickIcon} className="tick-icon" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      icon: PropTypes.string, // icon is now optional
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
