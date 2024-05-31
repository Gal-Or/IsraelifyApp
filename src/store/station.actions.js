import { stationService } from "../services/station.service";
import { store } from "../store/store.js";

import { LOAD_STATIONS } from "./station.reducer";
import { REMOVE_STATION, ADD_STATION } from "./station.reducer";
import { ADD_SONG_TO_STATION } from "./station.reducer";
import { SET_CURRENT_STATION } from "./station.reducer";
import { UPDATE_STATION } from "./station.reducer";
import { UPDATE_STATIONS } from "./station.reducer";


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
export async function addStation(newStation) {
  try {
    newStation = await stationService.save(newStation);
    store.dispatch({
      type: ADD_STATION,
      newStation,
    });
  } catch (err) {
    console.log("Cannot add station", err);
  }
  return newStation._id;
}

export async function addSongToStation(song, stationId = 0) {
  try {
    await stationService.addSongToStation(song, stationId);
    store.dispatch({
      type: ADD_SONG_TO_STATION,
      song,
      stationId,
    });
  } catch (err) {
    console.log("Cannot add song to station", err);
  }
}

export function setCurrentStation(station) {
  store.dispatch({
    type: SET_CURRENT_STATION,
    station,
  });
}

export async function updateStation(station) {
  try {
    await stationService.save(station);
    store.dispatch({
      type: UPDATE_STATION,
      station,
    });
  } catch (err) {
    console.log("Cannot update station", err);
  }
}

export async function updateStations(updatedStations) {
  try {

    await stationService.saveAll(updatedStations);
    store.dispatch({ type: UPDATE_STATIONS, updatedStations });
    console.log('updatedStations:', updatedStations);

  } catch (err) { console.log('Error in updateStationsSongs:', err); }

}