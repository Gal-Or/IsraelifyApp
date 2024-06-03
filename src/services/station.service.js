import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import demo_stations from "../assets/data/stations.json";
import thumbnail from "../assets/imgs/likedSongs.jpeg";
import { spotifyService } from "./spotify.service";

const STORAGE_KEY = "stationsDB";
let stationsCount = 1;

export const stationService = {
  query,
  save,
  saveAll,
  remove,
  getById,
  getDefaultFilter,
  addSongToStation,
  createDefaultStation,
  findStationWithQuery,
  getStationIds,
  editStationInfo,
  updateSongOrder,
  getStationDuration,
  checkIfSongInExistInAnyStation,
  updateSongId,
};

_createStations();

async function query(filterBy) {
  let stations = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    stations = filterStations(stations, filterBy);
  }
  return stations;
}

async function save(stationToSave) {
  if (stationToSave._id) {
    return await storageService.put(STORAGE_KEY, stationToSave);
  } else {
    return await storageService.post(STORAGE_KEY, stationToSave);
  }
}

async function saveAll(updatedStations) {
  return await storageService.saveAll(STORAGE_KEY, updatedStations);
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
    const stations = await query();
    stationId = stations[0]._id;
  }
  const station = await getById(stationId);
  if (station.songs.find((stationSong) => stationSong.name === song.name)) {
    return;
  }
  song.order = station.songs.length + 1;
  station.songs.push(song);
  return await save(station);
}

async function findStationWithQuery(query) {
  const result = await storageService.query(STORAGE_KEY);
  if (!query || query.length < 1) return result;
  const stations = result;
  let filteredStations = stations.filter((station) => {
    return (
      station.name.toLowerCase().includes(query.toLowerCase()) ||
      station.createdBy.fullname.toLowerCase().includes(query.toLowerCase()) ||
      station.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
    );
  });
  filteredStations = fillWithRandomStations(filteredStations, stations, 10);
  return filteredStations;
}

function fillWithRandomStations(filteredStations, allStations, minLength) {
  if (filteredStations.length >= minLength) return filteredStations;
  const remainingStations = allStations.filter(
    (station) => !filteredStations.includes(station)
  );
  for (let i = remainingStations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingStations[i], remainingStations[j]] = [
      remainingStations[j],
      remainingStations[i],
    ];
  }
  while (filteredStations.length < minLength && remainingStations.length > 0) {
    filteredStations.push(remainingStations.pop());
  }
  return filteredStations;
}

function createDefaultStation(loggedInUser) {
  stationsCount++;
  if (loggedInUser) {
    return {
      name: `New Playlist ${stationsCount}`,
      type: "playlist",
      tags: [],
      backgroundColor: utilService.randomColor(),
      createdBy: {
        _id: loggedInUser._id,
        fullname: loggedInUser.fullname,
        imgUrl: loggedInUser.imgUrl,
      },
      likedByUsers: [],
      songs: [],
    };
  } else
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
  const stations = await query();
  const stationsWithSong = stations.filter((station) =>
    station.songs.some((stationSong) => stationSong.id === song.id)
  );
  return stationsWithSong;
}

async function editStationInfo(station) {
  let newStation = await getById(station._id);
  newStation = {
    ...newStation,
    name: station.name,
    img: station.img,
    description: station.description,
  };
  return await save(newStation);
}

function getStationDuration(songs) {
  let duration = 0;
  songs.forEach((song) => {
    if (song.duration / 60 > 50) {
      duration += song.duration / 1000;
    } else {
      duration += song.duration;
    }
  });
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes} min ${seconds < 10 ? "0" + seconds : seconds} sec`;
}

async function updateSongId(stationId = "liked-songs", songId, newSongId) {
  const station = await getById(stationId);
  const songIdx = station.songs.findIndex((song) => song.id === songId);
  if (songIdx === -1) {
    const stations = await query();
    const stationWithSong = stations.find((station) =>
      station.songs.find((stationSong) => stationSong.id === songId)
    );
    if (!stationWithSong) return;
    const songIdx = stationWithSong.songs.findIndex(
      (song) => song.id === songId
    );
    if (songIdx === -1) return;
    const song = stationWithSong.songs.splice(songIdx, 1)[0];
    song.id = newSongId;
    stationWithSong.songs.push(song);
    return await save(stationWithSong);
  } else {
    const song = station.songs[songIdx];
    song.id = newSongId;
    return await save(station);
  }
}

async function _createStations() {
  let stations = utilService.loadFromStorage(STORAGE_KEY);
  const demoDataCount = 1;

  if (!stations || !stations.length) {
    stations = [];
    for (let i = 0; i < demoDataCount; i++) stations.push(_createStation());
  }

  if (stations.length < 10) {
    for (const station of demo_stations.demo_stations) {
      for (const [idx, song] of station.songs.entries()) {
        // search for spotify song and get its album image
        const spotifySongs = await spotifyService.getSongBySearch(song.name);
        if (spotifySongs && spotifySongs.length > 0) {
          song.img = spotifySongs[0].img;
        }
        song.order = idx + 1;
        song.addedAt = Date.now() - Math.floor(Math.random() * 1000000000);
      }
      station.createdBy.imgUrl = `https://i.pravatar.cc/150?u=${station.createdBy._id}`;
      if (!stations.find((s) => s._id === station._id)) stations.push(station);
    }
  }

  utilService.saveToStorage(STORAGE_KEY, stations);
  return stations;
}

async function updateSongOrder(stationId, songId, newOrder) {
  const station = await getById(stationId);
  const songIdx = station.songs.findIndex((song) => song.id === songId);
  if (songIdx === -1) return;

  const song = station.songs.splice(songIdx, 1)[0];
  station.songs.splice(newOrder, 0, song);

  station.songs.forEach((song, index) => {
    song.order = index + 1;
  });

  return await save(station);
}

async function checkIfSongInExistInAnyStation(song) {
  const stations = await query();
  return stations.some((station) =>
    station.songs.find((stationSong) => stationSong.name === song.name)
  );
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
    img: thumbnail,
    songs: [],
  };
}
