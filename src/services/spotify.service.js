import axios from "axios";
import qs from "qs";
import { getJson } from "serpapi";
import { youtubeService } from "./youtube.service";

import logoBlue3D from "../assets/imgs/logo-Blue3D.png";
const SPOTIFY_CLIENT_ID = "e87cf49e042f446ca8d49ee1b49653f0";
const SPOTIFY_CLIENT_SECRET = "bd49c32ee0b74d6dbdf0dafbcfc0a4a9";

import { utilService } from "./util.service";

export const spotifyService = {
  getArtistResults,
  getSongsByGenre,
  getSongBySearch,
  updateGenreSongsCache,
  updateSearchResultsCache,
  getSongRecommendations,
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
      limit: 10,
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
      return { ...song, id: `track${idx}-${utilService.makeId()}` };
    });
    return songs;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to clean up the song data
function cleanSongsData(songs) {
  return songs.map((song) => {
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

async function getSongRecommendations(song) {
  const apiKey = "API_KEY_HERE"; //process.env.REACT_APP_OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/completions";
  const songText =
    `${song.name}` +
    " " +
    `${
      song.artists
        ? song.artists.map((artist) => artist.name).join(" ")
        : song.artist.name
    }`;

  const requestBody = {
    model: "gpt-3.5-turbo-instruct",
    prompt: `Generate 20 song recommendations based on the song and artists: "${songText}"\n\ respond songs in this format - "Song1 Name" \n "Song1 Artist" \n "Song2 Name" \n "Song2 Artist" \n etc...`,
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log("response", response);

    const recommendations = response.data.choices[0].text;
    //for each 2 lines create a song object
    var songs = recommendations.split("\n").reduce((acc, line, idx) => {
      if (idx % 2 === 0) {
        acc.push({ name: line, artist: recommendations[idx + 1] });
      }
      return acc;
    }, []);
    //check format is correct
    songs = songs.filter((song) => song.name && song.artist);

    //search for each song in spotify and create a song object
    songs = await Promise.all(
      songs.map(async (song) => {
        const spotifySongs = await getSongBySearch(
          `${song.name} ${song.artist}`
        );
        if (spotifySongs.length === 0) return null;
        console.log("spotifySongs", spotifySongs);
        return spotifySongs[0];
      })
    );

    return songs
      .map((song, idx) => {
        return { ...song, addedAt: Date.now() };
      })
      .slice(0, 20);

    // Return the first 20 songs
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
