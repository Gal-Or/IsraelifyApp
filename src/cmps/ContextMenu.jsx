import React, { useEffect, useRef } from "react";

export function ContextMenu({ position, options, onClose }) {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={contextMenuRef}
      className="context-menu"
      style={{ top: position.y, left: position.x }}
    >
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={option.onClick}>
            {option.label}
            {option.icon}
          </li>
        ))}
      </ul>
    </div>
  );
}
