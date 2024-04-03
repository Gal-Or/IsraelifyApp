export const LOAD_STATIONS = "LOAD_STATIONS";
export const REMOVE_STATION = "REMOVE_STATION";
export const ADD_SONG_TO_STATION = "ADD_SONG_TO_STATION";
export const ADD_STATION = "ADD_STATION";


const initialState = {
  stations: [],
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
      };
      break;
    case ADD_STATION:
      newState = { ...state, stations: [...state.stations, action.newStation] }
      break;
    case ADD_SONG_TO_STATION:
      newState = {
        ...state,
        stations: state.stations.map((station) => {
          if (station._id === action.stationId) {
            return { ...station, songs: [...station.songs, action.song] };
          }
          return station;
        }),
      };
    default:
  }
  return newState;
}
