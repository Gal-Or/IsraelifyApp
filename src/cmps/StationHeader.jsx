import { StationPreview } from "./StationPreview";

export function StationHeader({ station }) {

  return (
    <div className="station-header">
      <StationPreview station={station} />
    </div>
  );
}
