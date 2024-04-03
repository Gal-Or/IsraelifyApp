export const youtubeService = {
  query,
  cleanUpResults
};

async function query(searchStr, maxResults = 10) {
  const apiKey = "AIzaSyDyENi9CUDP6AY90P7xZm3x326KlwI_d2Q"; // Replace with your actual API key
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${apiKey}&maxResults=${maxResults}&type=video`
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
    url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
  };
}
