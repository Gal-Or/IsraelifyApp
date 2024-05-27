import { useState } from "react";
import { youtubeService } from "../services/youtube.service.js";
import { ReactSVG } from "react-svg";
import search from "../assets/icons/search.svg";

import { SongResults } from "./SongResults.jsx";

export function AddSongs({ onAddSongToStation }) {
  const [songResults, setResults] = useState(null);

  async function getYoutubeResults(queryTxt) {
    var res = await youtubeService.query(queryTxt);
    console.log("res:", res);
    setResults(res);
  }

  function onInputChange(ev) {
    let { value } = ev.target;
    getYoutubeResults(value);
  }

  return (
    <>
      <div className="add-songs-header-line">
        <hr />
      </div>
      <div className="add-songs">
        <h1>Let's find something for your playlist</h1>

        <div className="search-container">
          <ReactSVG src={search} />
          <input
            type="text"
            placeholder="Search for songs"
            onChange={onInputChange}
          />
        </div>
        {songResults && (
          <SongResults
            songResults={songResults}
            onAddSongToStation={onAddSongToStation}
          />
        )}
      </div>
    </>
  );
}
