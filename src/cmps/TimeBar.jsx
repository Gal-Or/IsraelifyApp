import React from "react";
import Slider from "@mui/material/Slider";

export function TimeBar({ percentage }) {
  return (
    <div className="time-bar">
      <Slider
        value={percentage}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
      />
    </div>
  );
}
