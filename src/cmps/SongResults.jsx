export function SongResults({ songResults }) {
  console.log("11111", songResults);

  if (!songResults) return <div>Loading...</div>;
  return (
    <div className="song-results">
      <h1>SongResults</h1>
      {songResults.map((song, idx) => (
        <div key={idx}>
          <h1>{song.title}</h1>
          <img src={song.img.url} alt="" />
          <h2>{song.artist}</h2>
        </div>
      ))}
    </div>
  );
}
