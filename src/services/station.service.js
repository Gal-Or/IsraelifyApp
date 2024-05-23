import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import demo_stations from "../assets/data/stations.json";

import tunmbnail from "../assets/imgs/likedSongs.jpeg";

const STORAGE_KEY = "stationsDB";
let stationsCount = 1;

export const stationService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter,
  addSongToStation,
  createDefaultStation,
  findStationWithQuery,
  getStationIds,
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
  if (stationId === 0) {
    //add to first station
    const stations = await query();
    stationId = stations[0]._id;
  }
  const station = await getById(stationId);
  //if song already in station
  if (station.songs.find((stationSong) => stationSong.id === song.id)) {
    return;
  }
  station.songs.push(song);
  return await save(station);
}

async function findStationWithQuery(query) {
  const result = await storageService.query(STORAGE_KEY);
  if (!query || query.length < 1) return result;
  const stations = result;
  return stations.filter((station) => {
    return (
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.createdBy.fullname.toLowerCase().includes(query.toLowerCase()) ||
      station.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
    );
  });
}

function createDefaultStation() {
  stationsCount++;
  return {
    name: `New Playlist ${stationsCount}`,
    type: "playlist",
    tags: [],
    backgroundColor: utilService.randomColor(),
    createdBy: {
      _id: "u101",
      fullname: "Puki Ben David",
      imgUrl: "http://some-photo/",
    },
    likedByUsers: [],
    songs: [],
  };
}

async function getStationIds(song) {
  //get all station ids  with the song id as array
  const stations = await query();
  const stationsWithSong = stations.filter((station) => {
    return station.songs.some((song) => song.id === song.id);
  });
  return stationsWithSong;
}

function _createStations() {
  var stations = utilService.loadFromStorage(STORAGE_KEY);
  const demoDataCount = 1;

  if (!stations || !stations.length) {
    stations = [];
    for (var i = 0; i < demoDataCount; i++) stations.push(_createStation());
  }

  if (stations.length < 10) {
    console.log("Adding demo stations", demo_stations);
    //add more stations from ../assets/data/stations.json
    demo_stations.demo_stations.forEach((station) => {
      stations.push(station);
    });
  }

  utilService.saveToStorage(STORAGE_KEY, stations);

  return stations;
}

function _createStation() {
  return {
    _id: "liked-songs",
    name: "Liked Songs",
    type: "playlist",
    tags: ["liked"],
    backgroundColor: "#d8bfd8",
    createdBy: {
      _id: "u101",
      fullname: "Bar and Gal",
      imgUrl: "http://some-photo/",
    },
    likedByUsers: ["{minimal-user}", "{minimal-user}"],
    img: tunmbnail,
    songs: [],
  };
}
