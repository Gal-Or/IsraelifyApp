import { ReactSVG } from "react-svg";
import tempImg from "../assets/imgs/logo-Blue3D.png";
import playIcon from "../assets/icons/playIcon.svg";


export function MiniPreview() {

    return (
        <article className="mini-preview">
            <img src={tempImg} />
            <span>name</span>
            <button
                className="play-btn"
                onClick={() => console.log("play")}
            >
                <ReactSVG src={playIcon} />
            </button>
        </article>)
}