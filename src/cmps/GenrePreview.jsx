import { utilService } from "../services/util.service";

export function GenrePreview({ genre }) {
  return (
    <div className="genre-preview" style={{ backgroundColor: genre.color }}>
      <span>{genre.name}</span>
      <img src={genre.picture} alt="" />
    </div>
  );
}
