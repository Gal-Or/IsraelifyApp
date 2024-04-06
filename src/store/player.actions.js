import { store } from "../store/store";

import { SET_CURRENT_SONG } from "./player.reducer";
import { SET_YOUTUBE_PLAYER } from "./player.reducer";
import { SET_SONG_DURATION } from "./player.reducer";

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
export function setSongDuration(duration) {
  try {
    store.dispatch({
      type: SET_SONG_DURATION,
      duration: duration,
    });
  } catch (err) {
    console.log("Cannot set song duration ", err);
  }
}
