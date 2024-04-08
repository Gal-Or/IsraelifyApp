export function GenrePreview({ genre }) {
  return (
    <div className="genre-preview">
      <img src={genre.picture} alt="" />
      <h2>{genre.name}</h2>
    </div>
  );
}
