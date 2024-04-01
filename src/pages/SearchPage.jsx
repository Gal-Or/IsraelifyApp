import { useParams } from "react-router";

import { youtubeService } from "../services/youtube.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { useEffect, useState } from "react";

export function SearchPage() {


  var params = useParams()

  const [results, setResults] = useState(null)

  useEffect(() => {

    getYoutubeResults()
    // console.log(s);

  }, [params.query])

  async function getYoutubeResults() {

    var res = await youtubeService.query(params.query)
    res = cleanUpResults(res)
    console.log(res)
    setResults(res)

  }

  function cleanUpResults(results) {
    var cleanResults = results.map(result => createResultObj(result))

    return cleanResults
  }

  function createResultObj(result) {

    return {
      id: result.id.videoId,
      artist: result.snippet.channelTitle,
      img: result.snippet.thumbnails.default
    }
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!params.query && <BrowseAll />}
      {(params.query && results) && <SearchResults />}
    </section>
  );
}
