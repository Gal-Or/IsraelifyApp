import { useState } from "react";
import { youtubeService } from "../services/youtube.service.js";

import { SongResults } from "./SongResults.jsx";

export function AddSongs() {
    const [songResults, setResults] = useState(null);

    async function getYoutubeResults(queryTxt) {
        var res = await youtubeService.query(queryTxt);
        res = youtubeService.cleanUpResults(res);
        console.log(res);
        setResults(res);
    }

    function onInputChange(ev) {
        let { value } = ev.target
        getYoutubeResults(value)
    }

    return (
        <>
            <input type="text" placeholder="Search" onChange={onInputChange} />
            {songResults && <SongResults songResults={songResults} />}
        </>
    )
}