import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORAGE_KEY = 'stations'

export const stationService = {
  query,
  save,
  remove,
  getById,
  getDefaultFilter
}

var stations = _createStations()
console.log(stations);

async function query(filterBy) {
  let stations = await storageService.query(STORAGE_KEY)
  if (filterBy) {
    stations = filterEmails(stations, filterBy)
  }
  return stations
}

function save(stationToSave) {
  if (stationToSave.id)
    return storageService.put(STORAGE_KEY, stationToSave)
  else
    return storageService.post(STORAGE_KEY, stationToSave)
}


function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}


function getDefaultFilter() {
  return {}
}

function _createStations() {
  var stations = utilService.loadFromStorage(STORAGE_KEY)
  const demoDataCount = 10

  if (!stations || !stations.length) {
    stations = []
    for (var i = 0; i < demoDataCount; i++)
      stations.push(_createStation())
  }

  return stations
}

function _createStation() {
  return (
    {
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
          imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
          addedBy: "{minimal-user}",
          addedAt: 162521765262,
          tags: ["Funk", "Happy", "hip-hop"]
        },
        {
          id: "mUkfiLjooxs",
          title: "The JB's - Pass The Peas",
          url: "youtube/song.mp4",
          imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
          addedBy: {},
          addedAt: 162521765262,
          tags: ["Funk", "Happy", "rock"],
        },
      ],
    })
}