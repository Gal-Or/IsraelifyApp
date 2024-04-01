export function StationPreview({ station }) {

    return (
        <article className="station-preview">
            <img src={station.songs[0].imgUrl} />
            <span className="station-name">{station.name}</span>
            <span className="station-creator">{station.createdBy.fullname}</span>
        </article>
    )

}