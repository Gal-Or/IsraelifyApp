import { MiniPreview } from "./MiniPreview";
import { genresService } from "../services/genres.service";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function Recommendations() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    loadGenres();
    return () => {
      removeMainElementStyle({ display: "none" });
    };
  }, []);

  function setMainElementStyle(backgroundColor) {
    const mainElement = document.querySelector(".main-container-bg");
    if (!mainElement || !backgroundColor) return;
    const lowOpacityColor = backgroundColor;

    mainElement.style.backgroundImage = `linear-gradient(to bottom, ${backgroundColor} 0%, rgba(18, 18, 18, 0.1) 40%)`;
  }

  function removeMainElementStyle({ display }) {
    if (display === "none") {
      const mainElement = document.querySelector(".main-container-bg");
      if (!mainElement) return;
      mainElement.style.backgroundImage = "none";
      return;
    }
    const mainElement = document.querySelector(".main-container-bg");
    if (!mainElement) return;
    mainElement.style.backgroundImage = `linear-gradient(to bottom,  rgba(18, 18, 200, 0.1) 0%,  rgba(18, 18, 18, 0.1) 40%)`;
  }

  function loadGenres() {
    const genres = genresService.query();
    var shuffledGenres = genres.sort(() => Math.random() - 0.5);
    // Slice 8 random genres
    shuffledGenres = shuffledGenres.slice(0, 8);
    setGenres(shuffledGenres);
  }

  return (
    <div className="recommendations-container">
      <div className="content">
        {genres.map((genre) => (
          <NavLink
            to={`/genre/${genre.name}`}
            key={genre.name}
            onMouseEnter={() => setMainElementStyle(genre.color)}
            onMouseLeave={removeMainElementStyle}
          >
            <MiniPreview key={genre._id} genre={genre} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
