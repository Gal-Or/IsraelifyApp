import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";
import playIcon from "../assets/icons/playIcon.svg";
import { useVisibleCount } from "../customHooks/useVisibleCount";
import { Loader } from "./Loader";

export function ArtistResults({ artistResults }) {
  // Use the custom hook to get the container ref, visible count, and update function
  const [containerRef, visibleCount, updateVisibleCount] = useVisibleCount(
    150,
    16
  );

  // Recalculate the visible count when artistResults change
  useEffect(() => {
    updateVisibleCount();
  }, [artistResults, updateVisibleCount]);

  // Show loading message if artistResults are not available
  if (!artistResults) return <Loader />;

  return (
    <section className="artist-results">
      <h1>Artists</h1>
      <div className="artist-results-container" ref={containerRef}>
        {artistResults &&
          // Only show the number of items that fit in the visible count
          artistResults.slice(0, visibleCount).map((artist) => (
            <article key={artist.id} className="artist-card">
              <div className="artist-card-container">
                <div className="artist-img">
                  <img src={artist.imgUrl} alt={artist.name} />
                  <button
                    className="play-btn"
                    onClick={() => console.log(artist)}
                  >
                    <ReactSVG src={playIcon} />
                  </button>
                </div>
                <div className="artist-info">
                  <p>{artist.name}</p>
                  <small>Artist</small>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
