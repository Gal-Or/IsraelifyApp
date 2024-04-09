import { setCurrentSong } from "../store/player.actions";

export function SongActions({ song }) {
  function onPlaySong() {
    setCurrentSong(song);
  }

  return (
    <div className="song-actions">
      <button className="play-song" onClick={onPlaySong}>
        Play song
      </button>
    </div>
  );
}
