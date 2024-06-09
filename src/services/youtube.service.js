import axios from "axios";

import { stationService } from "./station.service";

export const youtubeService = {
  query,
};

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

const API_KEYS = [import.meta.env.VITE_YOUTUBE_API_KEY]; //on production use process.env.VITE_YOUTUBE_API_KEY
let apiIndex = 0;

const CACHE_KEY_PREFIX = "youtube_search_cache_";

// Function to generate a cache key based on the search string
function generateCacheKey(searchStr) {
  return `${CACHE_KEY_PREFIX}${searchStr}`;
}

// Function to save results to the cache
function saveToCache(searchStr, results) {
  const cacheKey = generateCacheKey(searchStr);
  const cacheEntry = {
    query: searchStr,
    time: new Date().getTime(), // Save current timestamp
    results: results,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
}

// Function to retrieve results from the cache
function getFromCache(searchStr) {
  const cacheKey = generateCacheKey(searchStr);
  const cachedData = localStorage.getItem(cacheKey);
  if (!cachedData) return null;
  const cacheEntry = JSON.parse(cachedData);
  // Check if cache entry has expired
  const currentTime = new Date().getTime();
  const expirationTime = cacheEntry.time + 7 * 24 * 60 * 60 * 1000; // 1 week expiration
  if (currentTime > expirationTime) {
    // Cache entry has expired, remove it from local storage
    localStorage.removeItem(cacheKey);
    return null;
  }
  return cacheEntry.results;
}

async function query(searchStr, maxResults = 10) {
  if (!searchStr || searchStr.length < 1) return [];
  // Check if results are available in the cache
  const cachedResults = getFromCache(searchStr);
  if (cachedResults) {
    return cachedResults;
  }
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchStr}&key=${API_KEYS[apiIndex]}&maxResults=${maxResults}&type=video`
    );
    const data = response.data;
    const cleanedResults = await cleanUpResults(data.items);
    // Save results to cache
    saveToCache(searchStr, cleanedResults);
    return cleanedResults;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      apiIndex++;
      if (apiIndex === API_KEYS.length) apiIndex = 0;
      if (API_KEYS.length !== 1) return query(searchStr, maxResults);
      return []; // No API keys available, return empty array
    } else {
      console.error("Error fetching YouTube data:", err);
      return []; // Return empty array in case of other errors
    }
  }
}

async function cleanUpResults(results) {
  var cleanResults = results.map((result) => createResultObj(result));
  cleanResults = await getDurations(cleanResults);
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
        if (duration === "P0D") {
          // Skip if duration is 0
          return result;
        }
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
