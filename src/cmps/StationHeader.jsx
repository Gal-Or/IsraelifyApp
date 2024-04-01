export function StationHeader({ station }) {

  return (
    <div className="station-header">
      <img src={station.songs[0].imgUrl} />
      <h1>StationHeader</h1>
    </div>
  );
}
