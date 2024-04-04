import { legacy_createStore as createStore, combineReducers } from "redux";

import { userReducer } from "./user.reducer.js";
import { systemReducer } from "./system.reducer";
import { stationReducer } from "./station.reducer.js";
import { playerReducer } from "./player.reducer.js";

const rootReducer = combineReducers({
  userModule: userReducer,
  systemModule: systemReducer,
  stationModule: stationReducer,
  playerModule: playerReducer,
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined; //ask dore
export const store = createStore(rootReducer, middleware);

// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
