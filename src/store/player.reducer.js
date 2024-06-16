export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_YOUTUBE_PLAYER = "SET_YOUTUBE_PLAYER";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const ADD_TO_QUEUE = "ADD_TO_QUEUE";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const SET_QUEUE = "SET_QUEUE";
export const ADD_SONGS_TO_QUEUE_TOP = "ADD_SONGS_TO_QUEUE_TOP";
export const ADD_SONGS_TO_QUEUE_BOTTOM = "ADD_SONGS_TO_QUEUE_BOTTOM";
export const SHUFFLE_QUEUE = "SHUFFLE_QUEUE";
export const SET_IS_SHUFFLED = "SET_IS_SHUFFLED";
export const SET_IS_REPEAT = "SET_IS_REPEAT";

const initialState = sessionStorage.getItem("player")
  ? { ...JSON.parse(sessionStorage.getItem("player")), youtubePlayer: null }
  : {
      currentSong: sessionStorage.getItem("currentSong")
        ? JSON.parse(sessionStorage.getItem("currentSong"))
        : {
            id: "ZkXG3ZrXlbc",
            artist: "Drake",
            img: "https://i.scdn.co/image/ab67616d0000b273a0ac23f4b446a7264e67bf0e",
            name: "DRAKE - FAMILY MATTERS",
            tags: [],
            duration: 458,
            url: "https://www.youtube.com/watch?v=ZkXG3ZrXlbc",
            stationIds: ["T3qSs"],
            order: 1,
            addedAt: 1717682537505,
          },
      youtubePlayer: null,
      queue: [],
      originalQueue: [],
      isPlaying: false,
      isShuffled: false,
    };

export function playerReducer(state = initialState, action) {
  var newState = state;

  switch (action.type) {
    case SET_CURRENT_SONG:
      newState = { ...state, currentSong: action.song };
      sessionStorage.setItem("currentSong", JSON.stringify(action.song));
      break;
    case SET_YOUTUBE_PLAYER:
      if (!action.youtubePlayer) {
        newState = { ...state, youtubePlayer: null };
        break;
      }
      newState = { ...state, youtubePlayer: action.youtubePlayer };
      break;
    case SET_IS_PLAYING:
      newState = { ...state, isPlaying: action.isPlaying };
      break;
    case ADD_TO_QUEUE:
      newState = {
        ...state,
        queue: [...state.queue, action.song],
        originalQueue: [...state.queue, action.song],
      };
      break;
    case REMOVE_FROM_QUEUE:
      newState = {
        ...state,
        queue: state.queue.filter((song) => song.id !== action.songId),
        originalQueue: state.originalQueue.filter(
          (song) => song.id !== action.songId
        ),
      };
      break;
    case SET_QUEUE:
      newState = { ...state, queue: action.queue };
      break;
    case ADD_SONGS_TO_QUEUE_TOP:
      newState = {
        ...state,
        queue: [...action.songs, ...state.queue],
        originalQueue: [...action.songs, ...state.queue],
      };
      break;
    case ADD_SONGS_TO_QUEUE_BOTTOM:
      newState = {
        ...state,
        queue: [...state.queue, ...action.songs],
        originalQueue: [...state.queue, ...action.songs],
      };
      break;
    case SHUFFLE_QUEUE:
      newState = {
        ...state,
        queue: state.queue.sort(() => Math.random() - 0.5),
        isShuffled: true,
      };
      break;
    case SET_IS_SHUFFLED:
      newState = {
        ...state,
        isShuffled: action.isShuffled,
        queue: action.isShuffled ? [...state.queue] : [...state.originalQueue],
      };
      break;

    case SET_IS_REPEAT:
      newState = {
        ...state,
        isRepeat: action.isRepeat,
      };
      break;

    default:
  }

  sessionStorage.setItem(
    "player",
    JSON.stringify({ ...newState, youtubePlayer: null, isPlaying: false })
  );
  return newState;
}
