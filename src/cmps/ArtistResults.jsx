import { ReactSVG } from "react-svg";

import playIcon from "../assets/icons/playIcon.svg";

export function ArtistResults({ artistResults }) {
  return (
    <section className="artist-results">
      <h1>Artists</h1>
      <div className="artist-results-container">
        {artistResults &&
          artistResults.map((artist) => (
            <article key={artist.id} className="artist-card">
              <div className="artist-card-container">
                <div className="artist-img">
                  <img src={artist.images[0].url} alt="artist-thumbnail" />
                  <button
                    className="play-btn"
                    onClick={() => console.log(artist)}
                  >
                    <ReactSVG src={playIcon} />
                  </button>
                </div>
                <div className="artist-info">
                  <p>{artist.name}</p>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
