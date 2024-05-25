import { DragAndDropContext } from "./DragAndDropContext";
import { SongList } from "./SongList";
import { StationActions } from "./StationActions";

export function StationContent({ station }) {
  return (
    <DragAndDropContext>
      <div className="station-content">
        <StationActions />
        <SongList station={station} />
      </div>
    </DragAndDropContext>
  );
}
