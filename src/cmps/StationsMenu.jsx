import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { addStation, updateStation } from "../store/station.actions";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { ReactSVG } from "react-svg";
import checkIcon from "../assets/icons/tickIcon.svg";
import { stationService } from "../services/station.service";
import { useNavigate } from "react-router";
import { debounce } from "lodash";
import logoBlue3D from "../assets/imgs/logo-Blue3D.png";

import { UserContext } from "../RootCmp.jsx";

export function StationsMenu({ song, closeModal, position }) {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  );
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [checkedStations, setCheckedStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    filterStationsBySong();
  }, [stations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    setPosition(menuRef.current);
  }, [position]);

  async function filterStationsBySong() {
    const stationsWithSong = stations?.filter((station) => {
      return station.songs.find((stationSong) => stationSong.id === song.id);
    });
    setCheckedStations(stationsWithSong);
  }

  async function updateStationsSongs() {
    try {
      const updatedStations = stations.map((station) => {
        if (
          checkedStations.find(
            (checkedStation) => checkedStation._id === station._id
          )
        ) {
          if (
            !station.songs.find((stationSong) => stationSong.id === song.id)
          ) {
            song.order = station.songs.length + 1;
            station.songs.push(song);
          }
        } else {
          station.songs = station.songs.filter(
            (stationSong) => stationSong.id !== song.id
          );
        }
        return station;
      });
      closeModal();
      for (const station of updatedStations) {
        await updateStation(station);
      }
    } catch (err) {
      console.error("Error in updateStationsSongs:", err);
    }
  }

  const setPosition = (menu) => {
    if (menu) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;
      let { x, y } = position;

      const containerWidth = innerWidth;
      const containerHeight = innerHeight;

      const rightOverflow = x + offsetWidth > containerWidth;
      const bottomOverflow = y + offsetHeight > containerHeight;

      if (rightOverflow) {
        x = containerWidth - offsetWidth;
      }
      if (bottomOverflow) {
        y = containerHeight - offsetHeight;
      }

      menu.style.left = `${x - 25}px`;
      menu.style.top = `${y - 100}px`;
    }
  };

  async function onNewPlaylist() {
    var newStation = stationService.createDefaultStation(loggedInUser);
    newStation.songs = [song];
    const id = await addStation(newStation);
    navigate(`/station/${id}`);
    closeModal();
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedHandleChange(event.target.value);
  };

  const debouncedHandleChange = useCallback(
    debounce((value) => {
      const char = value.slice(-1);
      console.log(char);
    }, 300),
    []
  );

  return (
    <section ref={menuRef} className="stations-menu-container">
      <header>Add to playlist</header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Find a playlist"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="new-playlist" onClick={onNewPlaylist}>
        + New Playlist
      </div>
      <hr />
      <div className="optional-stations-list-container">
        {stations?.map((station) => (
          <div key={station._id} className="station-item">
            <img
              src={
                station.img
                  ? station.img
                  : station.songs[0]?.img
                  ? station.songs[0].img
                  : logoBlue3D
              }
              alt=""
            />
            <span>{station.name}</span>
            <div className="checkbox">
              <RadixCheckbox.Root
                className="CheckboxRoot"
                checked={
                  !!checkedStations.find(
                    (checkedStation) => checkedStation._id === station._id
                  )
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    setCheckedStations([...checkedStations, station]);
                  } else {
                    setCheckedStations(
                      checkedStations.filter(
                        (checkedStation) => checkedStation._id !== station._id
                      )
                    );
                  }
                }}
              >
                <RadixCheckbox.Indicator className="CheckboxIndicator">
                  <ReactSVG src={checkIcon} />
                </RadixCheckbox.Indicator>
              </RadixCheckbox.Root>
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="done" onClick={updateStationsSongs}>
          Done
        </button>
        <button className="cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </section>
  );
}
