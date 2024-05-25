import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { SongContainer } from "./SongContainer";
import { stationService } from "../services/station.service";

export function SongList({ station }) {
  const [songs, setSongs] = useState(station.songs || []);

  const moveSong = useCallback(
    async (dragIndex, hoverIndex) => {
      const dragSong = songs[dragIndex];
      const newSongs = [...songs];
      newSongs.splice(dragIndex, 1);
      newSongs.splice(hoverIndex, 0, dragSong);

      // Update the order property of songs
      newSongs.forEach((song, index) => {
        song.order = index + 1;
      });

      setSongs(newSongs);

      // Call the service to update the order in the database
      await stationService.updateSongOrder(
        station._id,
        dragSong.id,
        hoverIndex
      );
    },
    [songs, station._id]
  );

  const [, drop] = useDrop({ accept: "SONG" });

  return (
    <ul ref={drop} className="song-list">
      {songs.map((song, index) => (
        <SongContainer
          key={song.id}
          index={index}
          song={song}
          moveSong={moveSong}
        />
      ))}
    </ul>
  );
}
