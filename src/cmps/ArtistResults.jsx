import { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";

import playIcon from "../assets/icons/playIcon.svg";

export function ArtistResults({ artistResults }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && containerRef.current.firstElementChild) {
      const firstChild = containerRef.current.firstElementChild;
      const firstChildHeight = firstChild.offsetHeight;
      containerRef.current.style.maxHeight = `${firstChildHeight}px`;
    }
  }, [artistResults]);
  if (!artistResults) return <div>Loading...</div>;
  return (
    <section className="artist-results">
      <h1>Artists</h1>
      <div className="artist-results-container" ref={containerRef}>
        {artistResults &&
          artistResults.map((artist) => (
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
