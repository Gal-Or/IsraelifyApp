import { useParams } from "react-router";

import { addSongToStation } from "../store/station.actions";
import { setCurrentSong } from "../store/player.actions";

import { utilService } from "../services/util.service";

export function SongResults({ songResults, onAddSongToStation }) {
  const { stationId } = useParams();

  async function onAddToPlaylist(song) {
    console.log(stationId);
    if (stationId) {
      await addSongToStation(song, stationId);
      onAddSongToStation(song);
    } else await addSongToStation(song); // TODO:  implement add from search page
  }
  function onPlaySong(song) {
    setCurrentSong(song);
  }

  return (
    <section className="song-results">
      {songResults.map((song) => (
        <article key={song.id} className="song-result">
          <img src={song.img} alt={song.name} style={{ width: "100px" }} />
          <h3>{song.name}</h3>
          <p>{song.artist}</p>
          <p>{utilService.formatTime(song.duration)}</p>

          <button
            className="add-to-playlist"
            onClick={() => onAddToPlaylist(song)}
          >
            Add to playlist
          </button>
          <button className="play-song" onClick={() => onPlaySong(song)}>
            Play song
          </button>
        </article>
      ))}
    </section>
  );
}
