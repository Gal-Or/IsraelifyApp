import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";

export function SongActions({ song }) {
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
    <div className="song-actions">
      <button onClick={() => onPlaySong(song)}>
        <ReactSVG
          src={isPlaying && currentSong.id === song.id ? pauseIcon : playIcon}
        />
      </button>
    </div>
  );
}
