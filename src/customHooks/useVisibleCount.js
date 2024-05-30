import { useState, useEffect, useRef } from "react";
import { throttle } from "lodash";

// Custom hook to calculate the number of visible items in a grid
export const useVisibleCount = (cardWidth, gapWidth) => {
  // Reference to the container element
  const containerRef = useRef(null);
  // State to hold the number of visible items
  const [visibleCount, setVisibleCount] = useState(0);

  // Function to update the visible count based on the container's width
  const updateVisibleCount = () => {
    if (containerRef.current) {
      // Get the width of the container
      const containerWidth = containerRef.current.offsetWidth;
      // Calculate the number of items that fit in the container
      const count = Math.floor(containerWidth / (cardWidth + gapWidth + 2));
      // Update the state with the new count
      setVisibleCount(count);
    }
  };

  // Throttled version of the update function to limit how often it runs , 1000ms = 1.0s
  const throttledUpdateVisibleCount = throttle(updateVisibleCount, 20);

  // useEffect to set up the initial visible count and add a resize event listener
  useEffect(() => {
    // Calculate the initial visible count
    throttledUpdateVisibleCount();
    // Add an event listener to update the count on window resize
    window.addEventListener("resize", throttledUpdateVisibleCount);
    // Cleanup function to remove the event listener when the component unmounts
    return () =>
      window.removeEventListener("resize", throttledUpdateVisibleCount);
  }, [throttledUpdateVisibleCount]);

  // Return the container reference, visible count, and update function
  return [containerRef, visibleCount, updateVisibleCount];
};
