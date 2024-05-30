import { useEffect, useState } from "react";
import { genresService } from "../services/genres.service.js";

import { GenrePreview } from "./GenrePreview.jsx";
import { Link } from "react-router-dom";
import { Loader } from "./Loader.jsx";

export function GenreList() {
  const [genres, setGenres] = useState(null);
  useEffect(() => {
    loadGenres();
  }, []);
  async function loadGenres() {
    const genres = await genresService.query();
    setGenres(genres);
  }
  if (!genres) return <Loader />;
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
