import { store } from "../store/store";

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
