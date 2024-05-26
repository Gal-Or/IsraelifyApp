import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import tickIcon from "../assets/icons/tick.svg";
export function Dropdown({
  options,
  onSelect,
  headline,
  toggle,
  className,
  toggleTick = false,
  closeOnSelect = true,
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
        {selectedOption.icon && (
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
                  option.value === selectedOption.value ? "selected" : ""
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
