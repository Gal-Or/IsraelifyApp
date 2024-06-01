import { useRef, useState } from "react";
import { youtubeService } from "../services/youtube.service.js";
import { ReactSVG } from "react-svg";
import search from "../assets/icons/search.svg";

import { SongResultsInStation } from "./SongResultsInStation";

export function AddSongs({ onAddSongToStation, station }) {
  const [songResults, setResults] = useState(null);
  const searchOffset = useRef(1);

  async function getYoutubeResults(queryTxt) {
    var res = await youtubeService.query(queryTxt);
    console.log("res:", res);
    setResults(res);
  }

  function onInputChange(ev) {
    let { value } = ev.target;
    getYoutubeResults(value);
  }
  function removeResult(song) {
    setResults((prevResults) => {
      return prevResults.filter((result) => result.id !== song.id);
    });
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
          <SongResultsInStation
            songResults={songResults}
            onAddSongToStation={onAddSongToStation}
            station={station}
            removeResult={removeResult}
          />
        )}
      </div>
    </>
  );
}
