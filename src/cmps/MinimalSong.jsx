import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { AddSongToStationButton } from "./AddSongToStationButton";
import { addSongToStation } from "../store/station.actions";

import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import tickIcon from "../assets/icons/tickIcon.svg";
import { useEffect, useState } from "react";

export function MinimalSong() {
  const song = useSelector((state) => state.playerModule.currentSong);
  const stations = useSelector((state) => state.stationModule.stations);
  const [likedSongs, setLikedSongs] = useState(null);

  useEffect(() => {
    if (!stations) return;
    if (stations.length === 0) return;
    //find station with id "liked-songs"
    const likedSongsStation = stations.find(
      (station) => station._id === "liked-songs"
    );
    if (!likedSongsStation) return;
    setLikedSongs(likedSongsStation.songs);
  }, [stations]);

  function onAddToPlaylist() {
    if (likedSongs.find((likedSong) => likedSong.id === song.id)) {
      return;
    }
    addSongToStation(song, "liked-songs");
  }

  return (
    <section className="minimal-song">
      <div className="song-img">
        <img src={song.img} alt={song.name} />
      </div>
      <div className="song-info">
        <p>{song.name}</p>
        <small>{song.artists ? song.artists[0].name : song.artist}</small>
      </div>
      <AddSongToStationButton song={song} />
      {/* <button className="add-to-playlist" onClick={onAddToPlaylist}>
        {likedSongs &&
        likedSongs.find((likedSong) => likedSong.id === song.id) ? (
          <ReactSVG src={tickIcon} className="liked-icon" />
        ) : (
          <ReactSVG src={addToPlaylistIcon} />
        )}
      </button> */}
    </section>
  );
}
