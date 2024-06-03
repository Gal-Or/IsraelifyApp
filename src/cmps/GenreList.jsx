import { useEffect, useState } from "react";
import { genresService } from "../services/genres.service.js";

import { GenrePreview } from "./GenrePreview.jsx";
import { Link } from "react-router-dom";
import { Loader } from "./Loader.jsx";
import { utilService } from "../services/util.service.js";

export function GenreList() {
  const [genres, setGenres] = useState(null);
  useEffect(() => {
    loadGenres();
  }, []);
  async function loadGenres() {
    const genres = genresService.query();
    console.log("genres:", genres);
    utilService.shuffle(genres);
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
