import React, { useEffect, useRef } from "react";

export function ContextMenu({
  position,
  containerRect = null,
  options,
  onClose,
}) {
  const contextMenuRef = useRef(null);

  const setPosition = (menu) => {
    if (menu) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;
      let { x, y } = position;

      const containerWidth = containerRect ? containerRect.width : innerWidth;
      const containerHeight = containerRect
        ? containerRect.height
        : innerHeight;

      const rightOverflow = x + offsetWidth > containerWidth;
      const bottomOverflow = y + offsetHeight > containerHeight;

      if (rightOverflow) {
        x = containerWidth - offsetWidth;
      }
      if (bottomOverflow) {
        y = containerHeight - offsetHeight;
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
