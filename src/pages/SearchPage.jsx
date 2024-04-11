import { useParams } from "react-router";

import { youtubeService } from "../services/youtube.service.js";
import { stationService } from "../services/station.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { useEffect, useState } from "react";

export function SearchPage() {
  var params = useParams();

  const [songResults, setResults] = useState(null);
  const [stationResults, setStationResults] = useState(null);

  useEffect(() => {
    //replace + with spaces
    const formatedQuery = params.query ? params.query.split("+").join(" ") : "";

    getYoutubeResults(formatedQuery);
    getStationResults(formatedQuery);
  }, [params.query]);

  async function getYoutubeResults(query) {
    var res = await youtubeService.query(query);
    setResults(res);
  }
  async function getStationResults(query) {
    var res = await stationService.findStationWithQuery(query);
    setStationResults(res);
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!params.query && <BrowseAll />}
      {params.query && (
        <SearchResults
          songResults={songResults ? songResults : []}
          stationResults={stationResults}
        />
      )}
    </section>
  );
}
