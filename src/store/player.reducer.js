export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";
export const SET_SONG_DURATION = "SET_SONG_DURATION";

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
    case SET_SONG_DURATION:
      newState = {
        ...state,
        currentSong: { ...state.currentSong, duration: action.duration },
      };
      break;
    default:
  }

  return newState;
}
