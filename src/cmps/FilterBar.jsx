import React, { useState } from "react";

export function FilterBar() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    console.log(`Selected filter: ${filter}`);
  };

  return (
    <div className="filter-bar-container">
      <ul className="filter-bar">
        <li
          className={selectedFilter === "All" ? "selected" : ""}
          onClick={() => handleFilterClick("All")}
        >
          All
        </li>
        <li
          className={selectedFilter === "songs" ? "selected" : ""}
          onClick={() => handleFilterClick("songs")}
        >
          songs
        </li>
        <li
          className={selectedFilter === "stations" ? "selected" : ""}
          onClick={() => handleFilterClick("stations")}
        >
          stations
        </li>
      </ul>
    </div>
  );
}
