import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { spotifyService } from "../services/spotify.service";

export function GenrePage() {
  const [genreSongs, setGenreSongs] = useState(null);
  const [genreStations, setGenreStations] = useState(null);
  const stations = useSelector((state) => state.stationModule.stations);
  const params = useParams();

  useEffect(() => {
    if (!params.genreId) return;
    loadGenreSongs(params.genreId);
    setGenreStations(
      stations.filter((station) => station.tags.includes(params.genreId))
    );
  }, [params, stations]);

  async function loadGenreSongs(genreId) {
    const songs = await spotifyService.getSongsByGenre(genreId);
    setGenreSongs(songs);
  }

  if (!genreSongs) return <div>Loading...</div>;

  return (
    <section className="genre-page">
      <h1>{params.genreId}</h1>
      <div className="content">
        <div className="songs">
          <h2>Songs</h2>
          <ul>
            {genreSongs.map((song) => (
              <li key={song.id}>
                {song.name} - {song.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
        <div className="stations">
          <h2>Stations</h2>
          {genreStations.length ? (
            <ul>
              {genreStations.map((station) => (
                <li key={station.id}>{station.name}</li>
              ))}
            </ul>
          ) : (
            <p>No stations available for this genre</p>
          )}
        </div>
      </div>
    </section>
  );
}
