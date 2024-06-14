import { useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { SongContainer } from "./SongContainer";
import { stationService } from "../services/station.service";
import { socketService } from "../services/socket.service";
import { SOCKET_EMIT_UPDATE_STATION } from "../services/socket.service";
import { ReactSVG } from "react-svg";
import clockIcon from "../assets/icons/clock.svg";

export function SongList({ station, isCompact }) {
  const [songs, setSongs] = useState(station.songs || []);
  const [lastActiveSong, setLastActiveSong] = useState(null);

  const moveSong = useCallback(
    async (dragIndex, hoverIndex) => {
      const dragSong = songs[dragIndex];
      const newSongs = [...songs];
      newSongs.splice(dragIndex, 1);
      newSongs.splice(hoverIndex, 0, dragSong);

      newSongs.forEach((song, index) => {
        song.order = index + 1;
      });

      setSongs(newSongs);

      await stationService.updateSongOrder(
        station._id,
        dragSong.id,
        hoverIndex
      );
      socketService.emit(SOCKET_EMIT_UPDATE_STATION, station);
      console.log("station.songs changed, emitting update-station");
    },
    [songs, station._id]
  );

  const [, drop] = useDrop({ accept: "SONG" });

  useEffect(() => {
    setSongs(station.songs || []);
  }, [station, isCompact]);

  return (
    <ul ref={drop} className={`song-list ${isCompact ? "compact" : ""}`}>
      <li className="song-header">
        <div className="song-order">#</div>
        <div className="song-title">Title</div>
        <div className="song-album">Album</div>
        <div className="song-date-added">Date Added</div>
        <div className="song-duration">
          <ReactSVG src={clockIcon} style={{ width: "20px", height: "20px" }} />
        </div>
      </li>
      <hr />
      {songs.map((song, index) => (
        <SongContainer
          onClick={() => setLastActiveSong(song)}
          key={song.id + index}
          index={index}
          song={song}
          className={`song-container ${
            song.id === lastActiveSong?.id ? "active" : ""
          }`}
          moveSong={moveSong}
          station={station}
          isCompact={isCompact}
        />
      ))}
    </ul>
  );
}
