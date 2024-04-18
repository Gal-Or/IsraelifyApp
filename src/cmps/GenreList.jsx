import { useEffect } from "react";
import { genres } from "../services/genres.service.js";

import { GenrePreview } from "./GenrePreview.jsx";
import { Link } from "react-router-dom";

export function GenreList() {
  if (!genres) return <div>Loading...</div>;
  return (
    <section className="genre-list">
      {genres.map((genre) => (
        <Link to={`/genre/${genre.id}`} key={genre.id}>
          <GenrePreview key={genre.id} genre={genre} />
        </Link>
      ))}
    </section>
  );
}
