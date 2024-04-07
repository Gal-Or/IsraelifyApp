import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";

export function TimeBar({ percentage, handleTimeBarChange }) {
  function onTimeBarChange(event) {
    handleTimeBarChange(event.target.value);
  }

  return (
    <div className="time-bar">
      <Slider
        value={isNaN(percentage) ? 0 : percentage}
        //aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
        onChange={onTimeBarChange}
      />
    </div>
  );
}
