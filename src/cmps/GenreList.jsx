import { useEffect } from "react";
import { genres } from "../services/genres.service.js";

import { GenrePreview } from "./GenrePreview.jsx";

export function GenreList() {
  if (!genres) return <div>Loading...</div>;
  return (
    <section className="genre-list">
      {genres.map((genre) => (
        <GenrePreview key={genre.id} genre={genre} />
      ))}
    </section>
  );
}
