export const youtubeService = {
  query,
  cleanUpResults,
};
const API_KEY = "AIzaSyCIEC-IUYCVUJMIO8J-2Yn7w_SF-jUeKRw";

async function query(searchStr, maxResults = 10) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${API_KEY}&maxResults=${maxResults}&type=video`
  );

  const data = await response.json();
  return data.items;
}

function cleanUpResults(results) {
  console.log("before clean", results);
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
