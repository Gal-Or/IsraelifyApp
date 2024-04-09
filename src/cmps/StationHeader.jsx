import { useEffect } from "react";
import { StationPreview } from "./StationPreview";

export function StationHeader({ station }) {
  return (
    <div
      className="station-header"
      style={{ backgroundColor: station.backgroundColor }}
    >
      <StationPreview station={station} />
    </div>
  );
}
