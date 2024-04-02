import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { youtubeService } from "../services/youtube.service.js";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { BrowseAll } from "../cmps/BrowseAll.jsx";
import { SearchResults } from "../cmps/SearchResults.jsx";

export function SearchPage() {
  const { query } = useParams();

  const [songResults, setSongResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      getYoutubeResults(query);
    }
  }, [query]);

  async function getYoutubeResults(query) {
    try {
      const res = await youtubeService.query(query);
      const cleanedResults = cleanUpResults(res);
      setSongResults(cleanedResults);
    } catch (error) {
      console.error("Error fetching YouTube results:", error);
    } finally {
      setLoading(false);
    }
  }

  function cleanUpResults(results) {
    return (
      results?.map((result) => ({
        id: result.id.videoId,
        title: result.snippet.title,
        artist: result.snippet.channelTitle,
        img: result.snippet.thumbnails.default,
      })) || []
    );
  }

  return (
    <section className="search-page">
      <AppHeader />
      {!query && <BrowseAll />}
      {loading && <p>Loading...</p>}
      {query && !loading && songResults && (
        <SearchResults
          songResults={songResults}
          stationResults={null} // Add station results if available
        />
      )}
      {query && !loading && !songResults && <p>No results found.</p>}
    </section>
  );
}
