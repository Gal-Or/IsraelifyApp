import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { uploadService } from "../services/upload.service"
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
  editStationInfo
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
  console.log("to save:", stationToSave);
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
  var filteredStations = stations.filter((station) => {
    return (
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.createdBy.fullname.toLowerCase().includes(query.toLowerCase()) ||
      station.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
    );
  });

  // If filteredStations is less than 6, fill the rest with random stations
  filteredStations = fillWithRandomStations(filteredStations, stations, 6);

  return filteredStations;
}

function fillWithRandomStations(filteredStations, allStations, minLength) {
  if (filteredStations.length >= minLength) return filteredStations;

  // Get stations that are not in the filteredStations
  const remainingStations = allStations.filter(
    (station) => !filteredStations.includes(station)
  );

  // Shuffle the remainingStations array
  for (let i = remainingStations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingStations[i], remainingStations[j]] = [
      remainingStations[j],
      remainingStations[i],
    ];
  }

  // Add random stations to fill up the filteredStations to the specified minLength
  while (filteredStations.length < minLength && remainingStations.length > 0) {
    filteredStations.push(remainingStations.pop());
  }

  return filteredStations;
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

async function editStationInfo(station) {

  console.log("in editStationInfo :", station);
  let newStation = await getById(station._id)
  newStation = { ...newStation, name: station.name, img: station.img, description: station.description }
  return await save(newStation);

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


