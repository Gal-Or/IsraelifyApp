import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import tickIcon from "../assets/icons/tick.svg";

// Dropdown component
export function Dropdown({
  options, // Array of objects representing the dropdown options.
  onSelect, // Callback function triggered when an option is selected.
  headline, // Optional string to display as a headline at the top of the dropdown menu.
  toggle, // Optional element or string for customizing the dropdown toggle button.
  className, // Optional string for custom CSS classes.
  toggleTick = false, // Boolean to show a tick icon next to the selected option.
  closeOnSelect = true, // Boolean to close the dropdown menu after an option is selected.
  showSelected = true, // Boolean to display the selected option in the dropdown toggle button.
}) {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown open/closed state.
  const [selectedOption, setSelectedOption] = useState(options[0]); // State to manage the selected option.
  const [dropdownPosition, setDropdownPosition] = useState("right"); // State to manage dropdown position.
  const dropdownRef = useRef(null); // Reference to the dropdown element to detect clicks outside.

  // Toggle the dropdown's open/closed state.
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle the selection of an option.
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    if (closeOnSelect) setIsOpen(false);
  };

  // Close the dropdown when clicking outside of it.
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for detecting clicks outside the dropdown.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate dropdown position based on overflow.
  useEffect(() => {
    if (isOpen) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const container = document.querySelector(".main-container-bg");
      const containerRect = container.getBoundingClientRect();

      if (dropdownRect.right > containerRect.right) {
        setDropdownPosition("left");
      } else if (dropdownRect.left - 150 < containerRect.left) {
        setDropdownPosition("right");
      } else {
        setDropdownPosition("left");
      }
    }
  }, [isOpen]);

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
        <div className={`dropdown-menu-container ${dropdownPosition}`}>
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

// PropTypes to validate props
Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      icon: PropTypes.string, // Optional icon property.
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  headline: PropTypes.string,
  toggle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  toggleTick: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  showSelected: PropTypes.bool,
};
