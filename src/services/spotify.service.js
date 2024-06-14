import axios from "axios";
import qs from "qs";
import { httpService } from "./http.service";

import logoBlue3D from "../assets/imgs/logo-Blue3D.png";
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID; //on production use - process.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET; //on production use - process.env.VITE_SPOTIFY_CLIENT_SECRET;
const openAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const spotifyService = {
  getArtistResults,
  getSongsByGenre,
  getSongBySearch,
  updateGenreSongsCache,
  updateSearchResultsCache,
  getRecommendedSongs,
};

// Function to generate a cache key based on the search query
function generateCacheKey(query) {
  return `spotify_artist_search_${query}`;
}

// Function to save results to the cache
function saveToCache(query, results, key) {
  const cacheKey = key || generateCacheKey(query);
  const cacheEntry = {
    query,
    time: new Date().getTime(), // Save current timestamp
    results,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
}

// Function to retrieve results from the cache
function getFromCache(query, key) {
  const cacheKey = key || generateCacheKey(query);
  const cachedData = localStorage.getItem(cacheKey);
  if (!cachedData) return null;
  const cacheEntry = JSON.parse(cachedData);
  // Check if cache entry has expired
  const currentTime = new Date().getTime();
  const expirationTime = cacheEntry.time + 24 * 60 * 60 * 1000; // 1 day expiration
  if (currentTime > expirationTime) {
    // Cache entry has expired, remove it from local storage
    localStorage.removeItem(cacheKey);
    return null;
  }
  return cacheEntry.results;
}

async function getSpotifyToken() {
  try {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const requestBody = qs.stringify({
      grant_type: "client_credentials",
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    });
    const response = await axios.post(tokenUrl, requestBody, {
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    throw error;
  }
}

async function getArtistResults(query) {
  if (!query || query.length < 1) return [];
  try {
    // Check if results are available in the cache
    const cachedResults = getFromCache(query);
    if (cachedResults) {
      return cachedResults;
    }

    const token = await getSpotifyToken();
    const url = `https://api.spotify.com/v1/search`;
    const params = {
      q: query,
      type: "artist",
      limit: 10,
    };
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const artists = cleanArtistsData(response.data.artists.items);

    // Save results to cache
    saveToCache(query, artists);

    return artists;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to clean up the artist data
function cleanArtistsData(artists) {
  //check if imgurl is available if so replace it with the logoBlue3D
  let artistsWithImg = artists.map((artist) => {
    if (artist.images.length === 0) {
      artist.images.push({ url: logoBlue3D });
    }
    return artist;
  });

  return artistsWithImg.map((artist) => {
    return {
      id: artist.id,
      name: artist.name,
      imgUrl: artist.images[0].url,
    };
  });
}

async function getSongBySearch(query) {
  if (!query || query.length < 1) return [];
  try {
    // Check if results are available in the cache
    const cachedResults = getFromCache(query, `spotify_song_search_${query}`);
    if (cachedResults) {
      return cachedResults;
    }

    const token = await getSpotifyToken();
    const url = `https://api.spotify.com/v1/search`;
    const params = {
      q: query,
      type: "track",
      limit: 15,
    };
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    var songs = cleanSongsData(response.data.tracks.items);

    // Save results to cache
    saveToCache(query, songs, `spotify_song_search_${query}`);
    songs = songs.map((song, idx) => {
      return { ...song, id: `track ${song.name} ${idx}` };
    });
    return songs;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to clean up the song data
function cleanSongsData(songs) {
  //remove dupicate names
  const filteredSongs = songs.filter(
    (song, index, self) => index === self.findIndex((t) => t.name === song.name)
  );
  return filteredSongs.map((song) => {
    return {
      id: song.id,
      name: song.name,
      artists: song.artists,
      img: song.album.images[0].url,
      album: song.album.name,
      tags: [],
      duration: song.duration_ms,
    };
  });
}

async function getSongsByGenre(genre) {
  if (!genre) return [];
  try {
    // Check if results are available in the cache
    const cachedResults = getFromCache(genre, `spotify_genre_songs_${genre}`);
    if (cachedResults) {
      return cachedResults;
    }

    const token = await getSpotifyToken();
    const url = `https://api.spotify.com/v1/recommendations?market=US&limit=25&min_popularity=50&seed_genres=${genre}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    var songs = response.data.tracks;
    //add youtube video id to each song
    // for (let song of songs) {
    //   const query = `${song.name} ${song.artists[0].name} lyrics`;
    //   const videoId = await youtubeService.getVideoId(query);
    //   if (!videoId) continue;
    //   song.videoId = videoId;
    // }

    //drop id from songs
    songs = songs.map((song, idx) => {
      return { ...song, id: `track${idx}` };
    });
    saveToCache(genre, response.data.tracks, `spotify_genre_songs_${genre}`);
    return songs;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//function to update song in cache
function updateGenreSongsCache(genre, updatedSong) {
  if (!updatedSong.img) updatedSong.img = updatedSong.album.images[0].url;
  const cachedResults = getFromCache(genre, `spotify_genre_songs_${genre}`);
  if (!cachedResults) return;

  const updatedSongs = cachedResults.map((song, idx) =>
    song.name === updatedSong.name ? updatedSong : song
  );

  saveToCache(genre, updatedSongs, `spotify_genre_songs_${genre}`);
}

//function to update song in cache
function updateSearchResultsCache(query, updatedSong) {
  const cachedResults = getFromCache(query, `spotify_song_search_${query}`);
  if (!cachedResults) return;

  const updatedSongs = cachedResults.map((song, idx) =>
    song.name === updatedSong.name ? updatedSong : song
  );

  saveToCache(query, updatedSongs, `spotify_song_search_${query}`);
}

// Function to get recommended songs based on user input - open ai
async function getRecommendedSongs(userPrompt) {
  try {
    const songsFromAI = await getSongsFromAI(userPrompt);
    const songPromises = songsFromAI.map(async (song) => {
      const query = `${song.name} ${song.artist}`;
      const results = await getSongBySearch(query);
      if (results.length > 0) return { ...results[0], addedAt: Date.now() };
      return null;
    });

    const songsToAdd = await Promise.all(songPromises);
    return songsToAdd.filter((song) => song !== null);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

async function getSongsFromAI(userPrompt) {
  const songs = await httpService.get("station/openai", { userPrompt });
  return songs;
}
