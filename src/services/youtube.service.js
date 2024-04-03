export const youtubeService = {
  query,
};

async function query(searchStr, maxResults = 10) {
  const apiKey = "AIzaSyDyENi9CUDP6AY90P7xZm3x326KlwI_d2Q"; // Replace with your actual API key
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${apiKey}&maxResults=${maxResults}&type=video`
  );
  const data = await response.json();
  return data.items;
}
