export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const SET_QUEUE = "SET_QUEUE";
export const ADD_SONGS_TO_QUEUE_TOP = "ADD_SONGS_TO_QUEUE_TOP";
export const ADD_SONGS_TO_QUEUE_BOTTOM = "ADD_SONGS_TO_QUEUE_BOTTOM";

const initialState = {
  currentSong: {
    duration: 0,
    id: "mMfxI3r_LyA",
    img: "https://i.ytimg.com/vi/mMfxI3r_LyA/hqdefault.jpg",
    name: "Modjo - Lady (Hear Me Tonight) (Official Video)",
    artist: "ModjoOfficial",
  },
  youtubePlayer: null,
  queue: [],
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
    case ADD_TO_QUEUE:
      newState = { ...state, queue: [...state.queue, action.song] };
      break;
    case REMOVE_FROM_QUEUE:
      newState = {
        ...state,
        queue: state.queue.filter((song) => song.id !== action.songId),
      };
      break;
    case SET_QUEUE:
      newState = { ...state, queue: action.queue };
      break;

    case ADD_SONGS_TO_QUEUE_TOP:
      newState = { ...state, queue: [...action.songs, ...state.queue] };
      break;
    case ADD_SONGS_TO_QUEUE_BOTTOM:
      newState = { ...state, queue: [...state.queue, ...action.songs] };
      break;
    default:
  }
  return newState;
}
