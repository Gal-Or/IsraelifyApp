import { store } from "../store/store";

export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const SET_QUEUE = "SET_QUEUE";
export const ADD_SONGS_TO_QUEUE_TOP = "ADD_SONGS_TO_QUEUE_TOP";
export const ADD_SONGS_TO_QUEUE_BOTTOM = "ADD_SONGS_TO_QUEUE_BOTTOM";

export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";
export const SET_IS_PLAYING = "SET_IS_PLAYING";

export async function playFirstSong(song) {
  var songToPlay = song;
  //if song contains "track" or its length is 22
  if (song.id.includes("track") || song.id.length === 22) {
    // Fetch YouTube URL for the song
    const searchStr = `${song.name} ${song.artists
      .map((artist) => artist.name)
      .join(" ")}`;
    const results = await youtubeService.query(searchStr, 1);
    if (results.length > 0) {
      songToPlay.id = results[0].id;
    }
  }
  try {
    store.dispatch({
      type: SET_CURRENT_SONG,
      song: songToPlay,
    });
    store.dispatch({
      type: SET_IS_PLAYING,
      isPlaying: true,
    });
  } catch (err) {
    console.log("Cannot play first song ", err);
  }
}

export function addSongsToQueueTop(songs) {
  try {
    store.dispatch({
      type: ADD_SONGS_TO_QUEUE_TOP,
      songs: songs,
    });
  } catch (err) {
    console.log("Cannot add songs to queue ", err);
  }
}

export function addSongsToQueueBottom(songs) {
  try {
    store.dispatch({
      type: ADD_SONGS_TO_QUEUE_BOTTOM,
      songs: songs,
    });
  } catch (err) {
    console.log("Cannot add songs to queue ", err);
  }
}

export function addToQueue(song) {
  try {
    store.dispatch({
      type: ADD_TO_QUEUE,
      song: song,
    });
  } catch (err) {
    console.log("Cannot add song to queue ", err);
  }
}

export function removeFromQueue(songId) {
  try {
    store.dispatch({
      type: REMOVE_FROM_QUEUE,
      songId: songId,
    });
  } catch (err) {
    console.log("Cannot remove song from queue ", err);
  }
}

export function setQueue(queue) {
  try {
    store.dispatch({
      type: SET_QUEUE,
      queue: queue,
    });
  } catch (err) {
    console.log("Cannot set queue ", err);
  }
}

export async function setCurrentSong(song) {
  try {
    store.dispatch({
      type: SET_CURRENT_SONG,
      song: song,
    });
  } catch (err) {
    console.log("Cannot set current song ID ", err);
  }
}

export async function setYoutubePlayer(youtubePlayer) {
  try {
    store.dispatch({
      type: SET_YOUTUBE_PLAYER,
      youtubePlayer: youtubePlayer,
    });
  } catch (err) {
    console.log("Cannot set youtube player ", err);
  }
}

export async function setIsPlaying(isPlaying) {
  try {
    store.dispatch({
      type: SET_IS_PLAYING,
      isPlaying: isPlaying,
    });
  } catch (err) {
    console.log("Cannot set is playing ", err);
  }
}
