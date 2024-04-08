import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import { utilService } from "../services/util.service";

export function TimeBar({ percentage, handleTimeBarChange, endValue }) {
  function onTimeBarChange(event, newValue) {
    handleTimeBarChange(newValue);
  }

  return (
    <div className="time-bar">
      <Slider
        value={isNaN(percentage) ? 0 : percentage}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) =>
          utilService.formatTime((value * endValue) / 100)
        }
        onChange={onTimeBarChange}
        classes={{
          rail: "time-bar-rail",
          track: "time-bar-track",
          thumb: "time-bar-thumb",
        }}
      />
    </div>
  );
}
