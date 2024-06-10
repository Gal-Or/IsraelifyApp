import { utilService } from "./util.service";
import thumbnail from "../assets/imgs/likedSongs.jpeg";
import { httpService } from "../services/http.service";
import { localStationService } from "./station-local.service";
const STORAGE_KEY = "stationsDB";
let stationsCount = 1;
var stationService;
if (import.meta.env.VITE_NODE_ENV === "development") {
  stationService = { ...localStationService };
} else
  stationService = {
    query,
    save,
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

export { stationService };

async function query(filterBy) {
  let stations = await httpService.get("station");
  if (filterBy) {
    stations = filterStations(stations, filterBy);
  }
  return stations;
}

async function save(stationToSave) {
  if (stationToSave._id) {
    return await httpService.put("station", stationToSave);
  } else {
    return await httpService.post("station", stationToSave);
  }
}

async function remove(id) {
  return await httpService.delete(`station/${id}`);
}

async function getById(id) {
  return await httpService.get(`station/${id}`);
}

function getDefaultFilter() {
  return {};
}

async function addSongToStation(song, stationId) {
  if (stationId === "liked-songs") {
    const stations = await query();
    stationId = stations[0]._id;
  }
  const station = await getById(stationId);
  if (
    station.songs.find(
      (stationSong) =>
        stationSong.id === song.id && stationSong.name === song.name
    )
  ) {
    return;
  }
  song.order = station.songs.length + 1;
  station.songs.push(song);
  return await save(station);
}

async function findStationWithQuery(query) {
  const result = await httpService.get("station");
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
  let station = await getById(stationId);
  const songIdx = station.songs.findIndex((song) => song.id === songId);
  if (songIdx === -1) return;
  var song = station.songs[songIdx];
  song.id = newSongId;
  var updatedSongs = station.songs;
  updatedSongs[songIdx] = song;
  station.songs = updatedSongs;
  return await save(station);
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
