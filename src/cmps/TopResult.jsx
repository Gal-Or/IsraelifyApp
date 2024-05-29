import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";

export function TopResult({ song }) {
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);

  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }

  return (
    <div className="top-song-result">
      <h1>Top result</h1>
      <div className="top-song-details">
        <div className="song-img">
          <img src={song.img} alt="song-thumbnail" />
        </div>
        <div className="song-info">
          <p>{song.name}</p>
          <small>
            <span className="type">Song</span>
            <span className="artist">{song.artist}</span>
          </small>
        </div>
        <button onClick={() => onPlaySong(song)} className="play-btn">
          <ReactSVG
            src={isPlaying && currentSong.id === song.id ? pauseIcon : playIcon}
          />
        </button>
      </div>
    </div>
  );
}
