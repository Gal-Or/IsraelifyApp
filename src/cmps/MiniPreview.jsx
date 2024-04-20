import tempImg from "../assets/imgs/logo-Blue3D.png";


export function MiniPreview() {

    return (
        <article className="mini-preview">
            <img src={tempImg} />
            <span>name</span>
        </article>)
}