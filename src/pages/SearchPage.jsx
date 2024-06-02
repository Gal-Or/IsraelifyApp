import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { youtubeService } from "../services/youtube.service.js";
import { spotifyService } from "../services/spotify.service.js";
import { stationService } from "../services/station.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { FilterBar } from "../cmps/FilterBar.jsx";

export function SearchPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState(params.viewType || "all"); // Default to "all"
  const [songResults, setResults] = useState(null);
  const [stationResults, setStationResults] = useState(null);
  const [artistResults, setArtistResults] = useState(null);

  useEffect(() => {
    // Replace + with spaces
    const formattedQuery = params.query
      ? params.query.split("+").join(" ")
      : "";

    setViewType(params.viewType || "all");
    getSpotifySongResults(formattedQuery);
    getStationResults(formattedQuery);
    getArtistResults(formattedQuery);
  }, [params.query, params.viewType]);

  // On view type change navigate to the new URL
  useEffect(() => {
    if (viewType !== params.viewType) {
      navigate(`/search/${params.query}/${viewType}`);
      if (!params.query) navigate(`/search`);
    }
  }, [viewType, params.query]);

  async function getSpotifySongResults(query) {
    var res = await spotifyService.getSongBySearch(query);
    console.log("res", res);
    setResults(res);
  }

  async function getStationResults(query) {
    var res = await stationService.findStationWithQuery(query);
    setStationResults(res);
  }

  async function getArtistResults(query) {
    var res = await spotifyService.getArtistResults(query);
    setArtistResults(res);
  }
  function updateSongResults(song) {
    setResults((prevResults) => {
      return prevResults.map((result) => {
        if (result.id === song.id) return song;
        return result;
      });
    });
  }
  return (
    <section className="search-page">
      <AppHeader />
      <div className="search-container">
        {!params.query && <BrowseAll />}

        {params.query && (
          <>
            <FilterBar />
            <SearchResults
              songResults={songResults || []}
              stationResults={stationResults}
              artistResults={artistResults}
              updateResults={updateSongResults}
            />
          </>
        )}
      </div>
    </section>
  );
}
