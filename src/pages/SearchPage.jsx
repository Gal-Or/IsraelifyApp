import { useParams } from "react-router";

import { youtubeService } from "../services/youtube.service.js";

import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";
import { useEffect } from "react";

export function SearchPage() {

  var params = useParams()

  useEffect(() => {

    let s = getYoutubeResults()
    // console.log(s);

  }, [params.query])

  async function getYoutubeResults() {

    var res = await youtubeService.query(params.query)
    console.log(res);
    return res
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!params.query && <BrowseAll />}
      {params.query && <SearchResults />}
    </section>
  );
}
