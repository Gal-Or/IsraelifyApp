import axios from "axios";

export const youtubeService = {
  query,
  cleanUpResults,
};

const API_KEYS = ["AIzaSyAUugpSNUiVGYWSRyHy4n_WSQOGSxo0CTs", "AIzaSyCIEC-IUYCVUJMIO8J-2Yn7w_SF-jUeKRw", "AIzaSyBTFrKBmHVcN7G3OymN6mW_gMcbSVUxWFU"];
let apiIndex = 0

async function query(searchStr, maxResults = 10) {

  try {

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${API_KEYS[apiIndex]}&maxResults=${maxResults}&type=video`
    );
    const data = await response.json();
    return data.items;

  } catch (err) {

    if (err.response.status === 403) {
      apiIndex++
      if (apiIndex === API_KEYS.length)
        apiIndex = 0
    }
    console.log("in catch->", err);
  }
}

function cleanUpResults(results) {
  //console.log("before clean", results);
  var cleanResults = results.map((result) => createResultObj(result));

  return cleanResults;
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
  };
}
