import { utilService } from "../services/util.service";

export function GenrePreview({ genre }) {
  return (
    <div className="genre-preview" style={{ backgroundColor: genre.color }}>
      <span>{utilService.capitalize(genre.name)}</span>
      <div className="genre-img">
        <img src={genre.photo} alt={genre.name} />
      </div>
    </div>
  );
}
