import { useParams } from "react-router";

import { youtubeService } from "../services/youtube.service.js";
import { stationService } from "../services/station.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { useEffect, useRef, useState } from "react";

export function SearchPage() {
  var params = useParams();
  const queryLengthRef = useRef(0);

  const [songResults, setResults] = useState(null);
  const [stationResults, setStationResults] = useState(null);

  useEffect(() => {
    //replace + with spaces
    const formatedQuery = params.query ? params.query.split("+").join(" ") : "";
    queryLengthRef.current = formatedQuery.length;
    if (queryLengthRef.current % 5 == 0) {
      getYoutubeResults();
      getStationResults();
    }
  }, [params.query]);

  async function getYoutubeResults() {
    var res = await youtubeService.query(params.query);
    setResults(res);
  }
  async function getStationResults() {
    var res = await stationService.findStationWithQuery(params.query);
    setStationResults(res);
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!params.query && <BrowseAll />}
      {params.query && songResults && (
        <SearchResults
          songResults={songResults}
          stationResults={stationResults}
        />
      )}
    </section>
  );
}
