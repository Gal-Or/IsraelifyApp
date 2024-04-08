export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";
export const SET_IS_PLAYING = "SET_IS_PLAYING";

const initialState = {
  currentSong: {
    duration: 0,
    id: "mMfxI3r_LyA",
    img: "https://i.ytimg.com/vi/mMfxI3r_LyA/hqdefault.jpg",
    name: "Modjo - Lady (Hear Me Tonight) (Official Video)",
    artist: "ModjoOfficial",
  },
  youtubePlayer: null,
  isPlaying: false,
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
    case SET_IS_PLAYING:
      newState = { ...state, isPlaying: action.isPlaying };
      break;
    default:
  }
  return newState;
}
