import { addSongToStation } from "../store/station.actions";
import { setCurrentSong } from "../store/player.actions";
import { useEffect } from "react";
import { useParams } from "react-router";

export function SongResults({ songResults, onAddSongToStation }) {

  const { stationId } = useParams()

  useEffect(() => {
    console.log("SongResults ---->", songResults);
  }, []);
  //
  async function onAddToPlaylist(song) {
    console.log(stationId);
    if (stationId) {
      await addSongToStation(song, stationId);
      onAddSongToStation(song)
    }
    else
      await addSongToStation(song); // TODO:  implement add from search page

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
