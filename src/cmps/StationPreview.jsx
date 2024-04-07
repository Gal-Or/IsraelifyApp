import tempStationImg from '../assets/imgs/logo-Blue3D.png'

export function StationPreview({ station }) {

    return (
        <article className="station-preview">
            <img src={station.songs[0] ? station.songs[0].imgUrl : tempStationImg} />
            <div className="info-container">
                <span className="station-name">{station.name ? station.name : 'New Playlist'}</span>
                <span className="station-creator">{station.createdBy.fullname}</span>
            </div>
        </article>
    )

}