import { store } from "../store/store";

import { ADD_TO_QUEUE } from "./player.reducer";
import { REMOVE_FROM_QUEUE } from "./player.reducer";
import { SET_QUEUE } from "./player.reducer";
import { ADD_SONGS_TO_QUEUE_TOP } from "./player.reducer";
import { ADD_SONGS_TO_QUEUE_BOTTOM } from "./player.reducer";
import { SHUFFLE_QUEUE } from "./player.reducer";
import { SET_IS_SHUFFLED } from "./player.reducer";
import { SET_IS_REPEAT } from "./player.reducer";

import { SET_CURRENT_SONG } from "./player.reducer";
import { SET_YOUTUBE_PLAYER } from "./player.reducer";
import { SET_IS_PLAYING } from "./player.reducer";

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
export async function playFirstSong(song) {
  try {
    store.dispatch({
      type: SET_CURRENT_SONG,
      song: song,
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

export function shuffleQueue() {
  try {
    store.dispatch({
      type: SHUFFLE_QUEUE,
    });
  } catch (err) {
    console.log("Cannot shuffle queue ", err);
  }
}

export function setIsShuffled(isShuffled) {
  try {
    store.dispatch({
      type: SET_IS_SHUFFLED,
      isShuffled: isShuffled,
    });
  } catch (err) {
    console.log("Cannot set is shuffled ", err);
  }
}

export function setIsRepeat(isRepeat) {
  try {
    store.dispatch({
      type: SET_IS_REPEAT,
      isRepeat: isRepeat,
    });
  } catch (err) {
    console.log("Cannot set is repeat ", err);
  }
}
