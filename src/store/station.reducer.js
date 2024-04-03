export const LOAD_STATIONS = "LOAD_STATIONS";
export const REMOVE_STATION = "REMOVE_STATION";

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
    default:
  }
  return newState;
}
