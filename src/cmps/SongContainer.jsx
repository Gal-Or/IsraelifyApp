import { useSelector } from "react-redux";

import { ReactSVG } from "react-svg";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";

import { setCurrentSong, setIsPlaying } from "../store/player.actions";

import { SongDetails } from "./SongDetails";
import { SongActions } from "./SongActions";
export function SongContainer({ song }) {
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  function onPlaySong(song) {
    if (currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  }

  return (
    <section className="song-container">
      <SongDetails song={song}>
        <button onClick={() => onPlaySong(song)} className="play-btn">
          <ReactSVG
            src={isPlaying && currentSong.id === song.id ? pauseIcon : playIcon}
          />
        </button>
      </SongDetails>
      <SongActions song={song} />
    </section>
  );
}
