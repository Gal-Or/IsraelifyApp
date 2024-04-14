import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";

export function MinimalSong() {
  const song = useSelector((state) => state.playerModule.currentSong);
  return (
    <section className="minimal-song">
      <div className="song-img">
        <img src={song.img} alt={song.name} />
      </div>
      <div className="song-info">
        <p>{song.name}</p>
        <small>{song.artist}</small>
      </div>
      <button className="add-to-playlist">
        <ReactSVG src={addToPlaylistIcon} />
      </button>
    </section>
  );
}
