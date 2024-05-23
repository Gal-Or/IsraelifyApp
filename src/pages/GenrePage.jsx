import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { spotifyService } from "../services/spotify.service";
import { useSelector } from "react-redux";

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
  }, [params]);

  async function loadGenreSongs(genreId) {
    const songs = await spotifyService.getSongsByGenre(genreId);
    console.log("songs", songs);
    setGenreSongs(songs);
  }

  if (!genreSongs) return <div>Loading...</div>;
  return (
    <section className="genre-page">
      <h1>{params.genreId}</h1>
      <ul>
        {genreSongs.map((song) => (
          <li key={song.id}>{song.name + " - " + song.artists[0].name}</li>
        ))}
      </ul>
    </section>
  );
}
//
