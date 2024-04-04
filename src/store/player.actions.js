import { store } from "../store/store";

import { SET_CURRENT_SONG } from "./player.reducer";
import { SET_YOUTUBE_PLAYER } from "./player.reducer";

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