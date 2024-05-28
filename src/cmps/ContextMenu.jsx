import React, { useEffect, useRef } from "react";

export function ContextMenu({ position, options, onClose }) {
  const contextMenuRef = useRef(null);

  const setPosition = (menu) => {
    if (menu) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;
      let { x, y } = position;

      const rightOverflow = x + offsetWidth > innerWidth;
      const bottomOverflow = y + offsetHeight > innerHeight;

      if (rightOverflow && bottomOverflow) {
        x = x - offsetWidth;
        y = y - offsetHeight;
      } else if (rightOverflow) {
        x = x - offsetWidth;
      } else if (bottomOverflow) {
        y = y - offsetHeight;
      }

      menu.style.left = `${x}px`;
      menu.style.top = `${y}px`;
    }
  };

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
      ref={(el) => {
        contextMenuRef.current = el;
        setPosition(el);
      }}
      className="context-menu"
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
