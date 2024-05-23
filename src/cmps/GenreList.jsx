import { useEffect, useState } from "react";
import { genresService } from "../services/genres.service.js";

import { GenrePreview } from "./GenrePreview.jsx";
import { Link } from "react-router-dom";

export function GenreList() {
  const [genres, setGenres] = useState(null);
  useEffect(() => {
    loadGenres();
  }, []);
  async function loadGenres() {
    const genres = await genresService.query();
    setGenres(genres);
  }
  if (!genres) return <div>Loading...</div>;
  return (
    <section className="genre-list">
      {genres.map((genre) => (
        <Link to={`/genre/${genre.name}`} key={genre.name}>
          <GenrePreview key={genre.name} genre={genre} />
        </Link>
      ))}
    </section>
  );
}
