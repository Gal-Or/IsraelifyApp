import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import { utilService } from "../services/util.service";

export function TimeBar({ percentage, handleTimeBarChange, endValue }) {
  function onTimeBarChange(event) {
    handleTimeBarChange(event.target.value);
  }

  return (
    <div className="time-bar">
      <Slider
        value={isNaN(percentage) ? 0 : percentage}
        //aria-labelledby="continuous-slider"
        valueLabelDisplay={percentage === 0 ? "off" : "on"}
        valueLabelFormat={(value) =>
          utilService.formatTime((value * endValue) / 100)
        }
        onChange={onTimeBarChange}
      />
    </div>
  );
}
