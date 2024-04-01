export const youtubeService = {
  query,
};

async function query(searchStr) {
  const apiKey = "AIzaSyDexrW1icUvoT85OYB-vDlsxAs4UQkpcfw"; // Replace with your actual API key
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${apiKey}&maxResults=50&type=video`
  );
  const data = await response.json();
  return data.items;
}
