import axios from "axios";

import { stationService } from "./station.service";
function createResultObj(result) {
  return {
    id: result.id.videoId,
    artist: result.snippet.channelTitle,
    img: result.snippet.thumbnails.default.url,
    name: result.snippet.title,
    tags: [],
    duration: 0,
    url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
    stationIds: [],
  };
}

const demoResults = [
  {
    id: "Xty2gi5cMa8",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/Xty2gi5cMa8/default.jpg",
    name: "Drake - First Person Shooter ft. J. Cole",
    tags: [],
    duration: 301,
    url: "https://www.youtube.com/watch?v=Xty2gi5cMa8",
    stationIds: [],
  },
  {
    id: "UcsSdIXHCWM",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/UcsSdIXHCWM/default.jpg",
    name: "Drake ft. Sexyy Red &amp; SZA - Rich Baby Daddy (Official Music Video)",
    tags: [],
    duration: 391,
    url: "https://www.youtube.com/watch?v=UcsSdIXHCWM",
    stationIds: [],
  },
  {
    id: "xpVfcZ0ZcFM",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/xpVfcZ0ZcFM/default.jpg",
    name: "Drake - God&#39;s Plan",
    tags: [],
    duration: 357,
    url: "https://www.youtube.com/watch?v=xpVfcZ0ZcFM",
    stationIds: [],
  },
  {
    id: "uxpDa-c-4Mc",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/uxpDa-c-4Mc/default.jpg",
    name: "Drake - Hotline Bling",
    tags: [],
    duration: 296,
    url: "https://www.youtube.com/watch?v=uxpDa-c-4Mc",
    stationIds: [],
  },
  {
    id: "F7o0upORtCw",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/F7o0upORtCw/default.jpg",
    name: "Drake - Rich Baby Daddy (Audio) ft. Sexyy Red, SZA",
    tags: [],
    duration: 320,
    url: "https://www.youtube.com/watch?v=F7o0upORtCw",
    stationIds: [],
  },
  {
    id: "l0U7SxXHkPY",
    artist: "FutureVEVO",
    img: "https://i.ytimg.com/vi/l0U7SxXHkPY/default.jpg",
    name: "Future - Life Is Good (Official Music Video) ft. Drake",
    tags: [],
    duration: 336,
    url: "https://www.youtube.com/watch?v=l0U7SxXHkPY",
    stationIds: [],
  },
  {
    id: "JFm7YDVlqnI",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/JFm7YDVlqnI/default.jpg",
    name: "Drake - Laugh Now Cry Later (Official Music Video) ft. Lil Durk",
    tags: [],
    duration: 302,
    url: "https://www.youtube.com/watch?v=JFm7YDVlqnI",
    stationIds: [],
  },
  {
    id: "V7UgPHjN9qE",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/V7UgPHjN9qE/default.jpg",
    name: "Drake - Jimmy Cooks ft. 21 Savage",
    tags: [],
    duration: 219,
    url: "https://www.youtube.com/watch?v=V7UgPHjN9qE",
    stationIds: [],
  },
  {
    id: "9KkNORJhgck",
    artist: "Music Media",
    img: "https://i.ytimg.com/vi/9KkNORJhgck/default.jpg",
    name: "Drake RESPONDS to Kendrick Lamar DISS 😳🚨",
    tags: [],
    duration: 31,
    url: "https://www.youtube.com/watch?v=9KkNORJhgck",
    stationIds: [],
  },
  {
    id: "xWggTb45brM",
    artist: "DrakeVEVO",
    img: "https://i.ytimg.com/vi/xWggTb45brM/default.jpg",
    name: "Drake - Toosie Slide (Official Music Video)",
    tags: [],
    duration: 312,
    url: "https://www.youtube.com/watch?v=xWggTb45brM",
    stationIds: [],
  },
];

export const youtubeService = {
  query,
  cleanUpResults,
  demoResults,
};
const API_KEYS = ["AIzaSyD6hbCDfVeYioooW4yx-SMhId8qzT7G0xc"];
let apiIndex = 0;

async function query(searchStr, maxResults = 10) {
  if (!searchStr || searchStr.length < 3) return [];
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${API_KEYS[apiIndex]}&maxResults=${maxResults}&type=video`
    );
    const data = response.data;
    return await cleanUpResults(data.items);
  } catch (err) {
    if (err.response.status === 403) {
      apiIndex++;
      if (apiIndex === API_KEYS.length) apiIndex = 0;
      if (API_KEYS.length !== 1) return query(searchStr, maxResults);
      return demoResults;
    }
  }
}

async function cleanUpResults(results) {
  //console.log("before clean", results);
  var cleanResults = results.map((result) => createResultObj(result));
  cleanResults = await getDurations(cleanResults);
  cleanResults.stationIds = await stationService.getStationIds();
  return cleanResults;
}
async function getDurations(results) {
  // Use Promise.all to await all promises inside map function
  const resultsWithDurations = await Promise.all(
    results.map(async (result) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${result.id}&key=${API_KEYS[apiIndex]}`
        );
        const duration = await response.data.items[0].contentDetails.duration;
        result.duration = formatDuration(duration);
        return result;
      } catch (error) {
        console.error("Error fetching duration for video:", error);
        return result; // Return result object even if duration fetch fails
      }
    })
  );
  return resultsWithDurations;
}

function formatDuration(duration) {
  if (!duration) return 0;
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  //return the duration in seconds
  return hours * 3600 + minutes * 60 + seconds;
}
