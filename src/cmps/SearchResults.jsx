import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { SongResults } from "./SongResults";
import { StationResults } from "./StationResults";
import { ArtistResults } from "./ArtistResults";
import { TopResult } from "./TopResult";

export function SearchResults({ songResults, stationResults, artistResults }) {
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const { viewType } = useParams();

  return (
    <>
      {viewType === "all" && (
        <section className="search-results">
          <ArtistResults artistResults={artistResults} />
          {songResults && songResults.length > 0 && (
            <TopResult song={songResults[0]} />
          )}
          <SongResults songResults={songResults} />
          <StationResults stationResults={stationResults} />
        </section>
      )}
      {viewType === "songs" && (
        <section className="songs-view">
          <SongResults songResults={songResults} />
        </section>
      )}
      {viewType === "stations" && (
        <section className="stations-view">
          <StationResults stationResults={stationResults} />
        </section>
      )}
      {viewType === "artists" && (
        <section className="artists-view">
          <ArtistResults artistResults={artistResults} />
        </section>
      )}
    </>
  );
}
