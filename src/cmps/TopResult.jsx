import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { setCurrentSong, setIsPlaying } from "../store/player.actions";
import playIcon from "../assets/icons/playIcon.svg";
import pauseIcon from "../assets/icons/pauseIcon.svg";
import { youtubeService } from "../services/youtube.service";
import { spotifyService } from "../services/spotify.service";
import { useParams } from "react-router";

export function TopResult({ song, updateResults }) {
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const params = useParams();
  async function onPlaySong(song) {
    var songToPlay = song;

    //if song id contains "track" or its length is 22
    if (song.id.includes("track") || song.id.length === 22) {
      // Fetch YouTube URL for the song
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")}`;
      const results = await youtubeService.query(searchStr, 1);
      if (results.length > 0) {
        songToPlay.id = results[0].id;
        spotifyService.updateSearchResultsCache(params.query, songToPlay);
      }
    }

    if (currentSong.id === songToPlay.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(songToPlay);
    setIsPlaying(true);
    updateResults(songToPlay);
  }

  if (!song) return <Loader />;

  return (
    <div className="top-song-result">
      <h1>Top result</h1>
      <div className="top-song-details">
        <div className="song-img">
          <img src={song.img} alt="song-thumbnail" />
        </div>
        <div className="song-info">
          <p>{song.name}</p>
          <small>
            <span className="type">Song</span>
            <span className="artist">{song.artists[0].name}</span>
          </small>
        </div>
        <button onClick={() => onPlaySong(song)} className="play-btn">
          <ReactSVG
            src={isPlaying && currentSong.id === song.id ? pauseIcon : playIcon}
          />
        </button>
      </div>
    </div>
  );
}
