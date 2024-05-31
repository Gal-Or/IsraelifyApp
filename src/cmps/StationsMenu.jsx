import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateStations } from "../store/station.actions";


import Checkbox from '@mui/material/Checkbox';

export function StationsMenu({ song, closeModal }) {

    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    );
    //search station
    //create station
    //add song to stations - checkbox (add/remove song)

    const [checkedStations, setCheckedStations] = useState([]);

    useEffect(() => {
        console.log("stations changed:", stations);
        filterStationsBySong()

    }, [stations]);

    useEffect(() => {
        console.log("checkedStations changed:", checkedStations);
    }, [checkedStations]);


    async function filterStationsBySong() {

        const stationsWithSong = stations?.filter(station => {
            return station.songs.find(stationSong => stationSong.id === song.id);
        });
        setCheckedStations(stationsWithSong);
    }

    async function updateStationsSongs() {
        try {
            console.log('stations:->>>>>>>>>>>>>>>>>', stations);

            const updatedStations = stations.map((station) => {
                // if station is checked and song is not in station add it , else if station is not checked remove song from station
                if (checkedStations.find(checkedStation => checkedStation._id === station._id)) {
                    if (!station.songs.find(stationSong => stationSong.id === song.id)) {
                        song.order = station.songs.length + 1;
                        station.songs.push(song);
                    }
                } else {
                    station.songs = station.songs.filter(stationSong => stationSong.id !== song.id);
                }
                return station;

            });

            console.log('updatedStations:->>>>>>>>>>>>>>>>>', updatedStations);
            updateStations(updatedStations);

        } catch (err) {
            console.log('Error in updateStationsSongs:', err);
        }
        closeModal()

    }

    return (
        <section className="stations-menu-container">
            <header>
                add to station
            </header>
            <div>
                search station
            </div>
            <div>
                create station
            </div>
            <div className="optional-stations-list-container">

                {stations?.map(station => {
                    return (
                        <div key={station._id} className="station-item">
                            <Checkbox
                                checked={checkedStations.find(checkedStation => checkedStation._id === station._id) ? true : false}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckedStations([...checkedStations, station]);
                                    } else {
                                        setCheckedStations(checkedStations.filter(checkedStation => checkedStation._id !== station._id));
                                    }
                                }}
                            />
                            <span>{station.name}</span>
                        </div>
                    )
                })}

            </div>
            <div className="actions">
                <button onClick={() => updateStationsSongs()}>Save</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>

        </section>
    )

}