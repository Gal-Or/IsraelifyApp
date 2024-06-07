import { useEffect, useState } from "react";

export const useScroll = (containerSelector, callback) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const container = document.querySelector(containerSelector);

    if (!container) return;

    const handleScroll = (event) => {
      setScrollPosition(container.scrollTop);
      if (callback) callback(event);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerSelector, callback]);

  return scrollPosition;
};
