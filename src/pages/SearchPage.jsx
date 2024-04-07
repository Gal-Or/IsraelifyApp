import { useParams } from "react-router";

import { youtubeService } from "../services/youtube.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { useEffect, useState } from "react";

export function SearchPage() {
  var params = useParams();

  const [songResults, setResults] = useState(null);

  useEffect(() => {
    getYoutubeResults();
  }, [params.query]);

  async function getYoutubeResults() {
    var res = await youtubeService.query(params.query);
    res = youtubeService.cleanUpResults(res);
    setResults(res);
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!params.query && <BrowseAll />}
      {params.query && songResults && (
        <SearchResults songResults={songResults} />
      )}
    </section>
  );
}
