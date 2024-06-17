import { useEffect, useState, useContext } from "react";
import { loadStations, removeStation } from "../store/station.actions";
import { useVisibleCount } from "../customHooks/useVisibleCount";
import { LayoutContext } from "../RootCmp";
import { StationPreview } from "./StationPreview";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export function StationList({
  width,
  isCompact,
  randomize = false,
  KeepInOneRow = false,
}) {
  const [layout, setLayout] = useContext(LayoutContext);
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const [shuffledStations, setShuffledStations] = useState([]);
  const [hasShuffled, setHasShuffled] = useState(false);

  // Use the custom hook to get the container ref, visible count, and update function
  const [containerRef, visibleCount, updateVisibleCount] = useVisibleCount(
    167,
    16
  );

  // Recalculate the visible count when artistResults change
  useEffect(() => {
    if (KeepInOneRow) updateVisibleCount();
  }, [shuffledStations, updateVisibleCount, layout]);

  useEffect(() => {
    if (!stations || stations.length === 0) {
      loadStations();
    }
  }, [stations.length]);

  useEffect(() => {
    if (stations.length > 0 && randomize && !hasShuffled) {
      setShuffledStations([...stations].sort(() => Math.random() - 0.5));
      setHasShuffled(true);
    } else if (stations.length > 0 && !randomize) {
      setShuffledStations(stations);
    }
  }, [stations, randomize, hasShuffled]);

  function onDeleteStation(ev, stationId) {
    ev.stopPropagation();
    removeStation(stationId);
  }

  if (shuffledStations.length === 0) return <Loader />;
  return (
    <section
      className={`station-list ${isCompact ? " compact" : ""}`}
      ref={containerRef}
    >
      {KeepInOneRow &&
        shuffledStations?.slice(0, visibleCount).map((station, index) => (
          <article key={index}>
            <NavLink key={index} to={`/station/${station._id}`}>
              <StationPreview
                station={station}
                width={width}
                isCompact={isCompact}
              />
            </NavLink>
          </article>
        ))}

      {!KeepInOneRow &&
        shuffledStations?.map((station, index) => (
          <article key={index}>
            <NavLink key={index} to={`/station/${station._id}`}>
              <StationPreview
                station={station}
                width={width}
                isCompact={isCompact}
              />
            </NavLink>
          </article>
        ))}
    </section>
  );
}
