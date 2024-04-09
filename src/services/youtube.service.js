import axios from "axios";

import { stationService } from "./station.service";

export const youtubeService = {
  query,
  cleanUpResults,
};

const API_KEYS = [
  "AIzaSyAwiy248SpXDp5Y1K0kpkksR_8lv6U2iro",
  "AIzaSyCsiWL12-YD_3VZ3RpSfHPAFqkT-Yn2lOo",
  "AIzaSyAUugpSNUiVGYWSRyHy4n_WSQOGSxo0CTs",
  "AIzaSyCIEC-IUYCVUJMIO8J-2Yn7w_SF-jUeKRw",
  "AIzaSyBTFrKBmHVcN7G3OymN6mW_gMcbSVUxWFU",
];
let apiIndex = 0;

async function query(searchStr, maxResults = 10) {
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
      return query(searchStr, maxResults);
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
