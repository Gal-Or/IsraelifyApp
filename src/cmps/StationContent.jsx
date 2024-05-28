import { useState } from "react";
import { DragAndDropContext } from "./DragAndDropContext";
import { SongList } from "./SongList";
import { StationActions } from "./StationActions";

export function StationContent({ station, openModal }) {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <DragAndDropContext>
      <div className="station-content">
        <StationActions
          station={station}
          setIsCompact={setIsCompact}
          isCompact={isCompact}
          openModal={openModal}
        />
        <SongList station={station} isCompact={isCompact} />
      </div>
    </DragAndDropContext>
  );
}
