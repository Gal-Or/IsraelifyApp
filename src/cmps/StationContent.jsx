import { useState } from "react";
import { DragAndDropContext } from "./DragAndDropContext";
import { SongList } from "./SongList";
import { StationActions } from "./StationActions";

export function StationContent({ station }) {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <DragAndDropContext>
      <div className="station-content">
        <StationActions
          station={station}
          setIsCompact={setIsCompact}
          isCompact={isCompact}
        />
        <SongList station={station} isCompact={isCompact} />
      </div>
    </DragAndDropContext>
  );
}
