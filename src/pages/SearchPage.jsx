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
  var params = useParams();
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

    if (params.viewType) {
      setViewType(params.viewType);
    } else {
      setViewType("all");
    }

    getYoutubeResults(formattedQuery);
    getStationResults(formattedQuery);
    getArtistResults(formattedQuery);
  }, [params.query, params.viewType]);

  // On view type change navigate to the new URL
  useEffect(() => {
    if (viewType !== params.viewType) {
      navigate(`/search/${params.query}/${viewType}`);
      if (!params.query) navigate(`/search`);
    }
  }, [viewType]);

  async function getYoutubeResults(query) {
    var res = await youtubeService.query(query);
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

  return (
    <section className="search-page">
      <AppHeader />
      <div className="search-container">
        {!params.query && <BrowseAll />}

        {params.query && (
          <>
            <FilterBar />
            <SearchResults
              songResults={songResults ? songResults : []}
              stationResults={stationResults}
              artistResults={artistResults}
            />
          </>
        )}
      </div>
    </section>
  );
}
