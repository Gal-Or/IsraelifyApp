export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";

const initialState = {
  currentSong: null,
  youtubePlayer: null,
};

export function playerReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case SET_CURRENT_SONG:
      newState = { ...state, currentSong: action.song };
      break;
    case SET_YOUTUBE_PLAYER:
      newState = { ...state, youtubePlayer: action.youtubePlayer };
      break;
    default:
  }

  return newState;
}
