import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

import tunmbnail from "../assets/imgs/logo-Blue3D.png";

const STORAGE_KEY = "stationsDB";

export const stationService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
  addSongToStation,
  createDefaultStation,
};

_createStations();

async function query(filterBy) {
  let stations = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    stations = filterEmails(stations, filterBy);
  }
  return stations;
}

async function save(stationToSave) {
  if (stationToSave._id)
    return await storageService.put(STORAGE_KEY, stationToSave);
  else return await storageService.post(STORAGE_KEY, stationToSave);
}

async function remove(id) {
  return await storageService.remove(STORAGE_KEY, id);
}

async function getById(id) {
  return await storageService.get(STORAGE_KEY, id);
}

function getDefaultFilter() {
  return {};
}
async function addSongToStation(song, stationId) {
  const station = await getById(stationId);
  station.songs.push(song);
  return await save(station);
}

function createDefaultStation() {
  return {
    type: "playlist",
    tags: [],
    createdBy: {
      _id: "u101",
      fullname: "Puki Ben David",
      imgUrl: "http://some-photo/",
    },
    likedByUsers: [],
    songs: [],
  };
}

function _createStations() {
  var stations = utilService.loadFromStorage(STORAGE_KEY);
  const demoDataCount = 10;

  if (!stations || !stations.length) {
    stations = [];
    for (var i = 0; i < demoDataCount; i++) stations.push(_createStation());
  }

  utilService.saveToStorage(STORAGE_KEY, stations);

  return stations;
}

function _createStation() {
  return {
    _id: utilService.makeId(),
    name: "Funky Monks",
    type: "playlist",
    tags: ["Funk", "Happy"],
    createdBy: {
      _id: "u101",
      fullname: "Puki Ben David",
      imgUrl: "http://some-photo/",
    },
    likedByUsers: ["{minimal-user}", "{minimal-user}"],
    songs: [
      {
        id: "s1001",
        title: "The Meters - Cissy Strut",
        url: "youtube/song.mp4",
        img: tunmbnail,
        addedBy: "{minimal-user}",
        addedAt: 162521765262,
        tags: ["Funk", "Happy", "hip-hop"],
      },
      {
        id: "mUkfiLjooxs",
        title: "The JB's - Pass The Peas",
        url: "youtube/song.mp4",
        img: tunmbnail,
        addedBy: {},
        addedAt: 162521765262,
        tags: ["Funk", "Happy", "rock"],
      },
    ],
  };
}
