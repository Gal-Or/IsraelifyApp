export const LOAD_STATIONS = "LOAD_STATIONS";
export const REMOVE_STATION = "REMOVE_STATION";
export const ADD_SONG_TO_STATION = "ADD_SONG_TO_STATION";
export const ADD_STATION = "ADD_STATION";
export const SET_CURRENT_STATION = "SET_CURRENT_STATION";
export const UPDATE_STATION = "UPDATE_STATION";
export const UPDATE_STATIONS = "UPDATE_STATIONS";

const initialState = {
  stations: [],
  currentStation: null,
};

export function stationReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case LOAD_STATIONS:
      newState = { ...state, stations: action.stations };
      break;
    case REMOVE_STATION:
      newState = {
        ...state,
        stations: state.stations.filter(
          (station) => station._id !== action.stationId
        ),
        currentStation:
          state.currentStation && state.currentStation._id === action.stationId
            ? null
            : state.currentStation,
      };
      break;
    case ADD_STATION:
      newState = { ...state, stations: [...state.stations, action.newStation] };
      break;
    case ADD_SONG_TO_STATION:
      newState = {
        ...state,
        stations: state.stations.map((station) => {
          if (station._id === action.stationId) {
            if (
              station.songs.find(
                (stationSong) => stationSong.id === action.song.id
              )
            ) {
              console.log(
                "Song already exists in the station. Aborting addition."
              );
              return station;
            } else
              return { ...station, songs: [...station.songs, action.song] };
          }
          return station;
        }),
        currentStation:
          state.currentStation && state.currentStation._id === action.stationId
            ? state.currentStation.songs.find(
              (stationSong) => stationSong.id === action.song.id
            )
              ? state.currentStation
              : {
                ...state.currentStation,
                songs: [...state.currentStation.songs, action.song],
              }
            : state.currentStation,
        // ? {
        //     ...state.currentStation,
        //     songs: [...state.currentStation.songs, action.song],
        //   }
        // : state.currentStation,
      };

      console.log("New state:", newState);

      break;
    case SET_CURRENT_STATION:
      newState = { ...state, currentStation: action.station };
      console.log("SET_CURRENT_STATION-New state:", newState);
      break;

    case UPDATE_STATION:
      newState = {
        ...state,
        stations: state.stations.map((station) => {
          if (station._id === action.station._id) {
            return { ...station, ...action.station };
          }
          return station;
        }),
        currentStation:
          state.currentStation &&
            state.currentStation._id === action.station._id
            ? { ...state.currentStation, ...action.station }
            : state.currentStation,
      };
      break;
    case UPDATE_STATIONS:
      newState = {
        ...state,
        stations: action.updatedStations
      }
      break;

    default:
  }
  return newState;
}
