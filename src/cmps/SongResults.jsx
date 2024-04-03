import { addSongToStation } from "../store/station.actions";

export function SongResults({ songResults }) {
  //
  async function onAddToPlaylist(song) {
    await addSongToStation(song);
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
        </article>
      ))}
    </section>
  );
}
