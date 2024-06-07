import { ReactSVG } from "react-svg";
import playIcon from "../assets/icons/PlayIcon.svg";

export function MiniPreview({ genre }) {
  return (
    <article className="mini-preview">
      <img src={genre.photo} alt={genre.name} />
      <span>{genre.name}</span>
      <button className="play-btn" onClick={() => console.log("play")}>
        <ReactSVG src={playIcon} />
      </button>
    </article>
  );
}
