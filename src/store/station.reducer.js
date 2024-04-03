export const LOAD_STATIONS = "LOAD_STATIONS";

const initialState = {
  stations: [],
};

export function stationReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case LOAD_STATIONS:
      newState = { ...state, stations: action.stations };
      break;
    default:
  }
  return newState;
}
