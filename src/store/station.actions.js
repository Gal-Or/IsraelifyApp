import { stationService } from "../services/station.service";
import { store } from "../store/store.js";

import { LOAD_STATIONS } from "./station.reducer";
import { REMOVE_STATION } from "./station.reducer";

export async function loadStations() {
  try {
    //const { filterBy } = store.getState().stationModule;
    const stations = await stationService.query();
    store.dispatch({
      type: LOAD_STATIONS,
      stations,
    });
  } catch (err) {
    console.log("Cannot load stations", err);
  }
}

export async function removeStation(stationId) {
  try {
    await stationService.remove(stationId);
    store.dispatch({
      type: REMOVE_STATION,
      stationId,
    });
  } catch (err) {
    console.log("Cannot remove station", err);
  }
}
