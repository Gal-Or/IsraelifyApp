import { useSelector } from "react-redux";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";
import { SongResults } from "./SongResults";
import { StationResults } from "./StationResults";
import { ArtistResults } from "./ArtistResults";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import { TopResult } from "./TopResult";

export function SearchResults({
  songResults,
  stationResults,
  artistResults,
  type,
}) {
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);

  return (
    <section className="search-results">
      <ArtistResults artistResults={artistResults} />
      {songResults && songResults.length > 0 && (
        <TopResult song={songResults[0]} />
      )}
      <SongResults songResults={songResults} />
      <StationResults stationResults={stationResults} />
    </section>
  );
}
