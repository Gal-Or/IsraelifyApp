import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { spotifyService } from "../services/spotify.service";
import { youtubeService } from "../services/youtube.service"; // Import youtubeService
import { Loader } from "../cmps/Loader";
import { ReactSVG } from "react-svg";
import tempStationImg from "../assets/imgs/logo-Blue3D.png";
import pencil from "../assets/icons/Pencil.svg";
import clockIcon from "../assets/icons/clock.svg";
import playIcon from "../assets/icons/PlayIcon.svg";
import pauseIcon from "../assets/icons/PauseIcon.svg";
import {
  addSongsToQueueTop,
  playFirstSong,
  setIsPlaying,
  setCurrentSong,
} from "../store/player.actions";
import { utilService } from "../services/util.service";
import addToPlaylistIcon from "../assets/icons/plusWithBorderIcon.svg";
import addIcon from "../assets/icons/AddToQueue.svg";
import deleteIcon from "../assets/icons/Delete.svg";
import compactIcon from "../assets/icons/Compact.svg";
import listIcon from "../assets/icons/List.svg";
import DotsIcon from "../assets/icons/Ellipses.svg";
import { Dropdown } from "../cmps/DropDownMenu";
import { AppHeader } from "../cmps/AppHeader";
import { genresService } from "../services/genres.service";
import { CustomTooltip } from "../cmps/CustomTooltip";

export function GenrePage() {
  const [genreSongs, setGenreSongs] = useState(null);
  const [genreStations, setGenreStations] = useState([]);
  const [isCompact, setIsCompact] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const stations = useSelector((state) => state.stationModule.stations);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const currentSong = useSelector((state) => state.playerModule.currentSong);

  useEffect(() => {
    if (!params.genreId) return;
    loadGenreSongs(params.genreId);
    setGenreStations(
      stations.filter((station) => station.tags.includes(params.genreId))
    );
    return () => {
      const mainElement = document.querySelector(".main-container-bg");
      if (!mainElement) return;
      mainElement.style.backgroundImage = "none";
    };
  }, [params]);

  async function loadGenreSongs(genreId) {
    const songs = await spotifyService.getSongsByGenre(genreId);
    const color = await genresService.getGenreColor(genreId);
    setGenreSongs(songs);
    setMainElementStyle(color);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onPlaySong = async (song) => {
    var songToPlay = song;

    // If song id contains "track" or its length is 22
    if (song.id.includes("track") || song.id.length === 22) {
      // Fetch YouTube URL for the song
      const searchStr = `${song.name} ${song.artists
        .map((artist) => artist.name)
        .join(" ")}`;
      const results = await youtubeService.query(searchStr, 1);
      if (results.length > 0) {
        songToPlay.id = results[0].id;
        spotifyService.updateGenreSongsCache(params.genreId, songToPlay);
      }
    }

    if (currentSong.id === songToPlay.id) {
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentSong(songToPlay);

    setIsPlaying(true);

    setGenreSongs((prevSongs) => {
      return prevSongs.map((prevSong) => {
        if (prevSong.id === songToPlay.id) {
          return songToPlay;
        }
        return prevSong;
      });
    });
  };

  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (genreSongs && genreSongs.length > 0) {
        // Add remaining songs to the queue top
        addSongsToQueueTop(genreSongs.slice(1));
        // Play the first song
        playFirstSong(genreSongs[0]);
      }
    }
  };

  const viewOptions = [
    { label: "List", value: false, icon: listIcon },
    { label: "Compact", value: true, icon: compactIcon },
  ];

  const handleViewSelect = (option) => {
    setIsCompact(option.value);
  };

  function setMainElementStyle(backgroundColor) {
    const mainElement = document.querySelector(".main-container-bg");
    if (!mainElement || !backgroundColor) return;
    mainElement.style.backgroundImage = `linear-gradient(to bottom, ${backgroundColor} 0%,rgba(18,18,18,0.1) 400px)`;
  }

  if (!genreSongs) {
    return <Loader />;
  }

  return (
    <div className="station-page-container">
      <AppHeader />
      <section className="station-page">
        <div className="station-header">
          <div className="station-header-grid">
            <div className="station-header-img">
              <img src={genreSongs[0].album.images[0].url} alt="" />
            </div>
            <div className="station-header-info">
              <span className="station-type">Genre</span>
              <span className="station-name">
                {utilService.capitalize(params.genreId)}
              </span>
              <div className="station-info">
                <div className="station-creator">
                  <img src={tempStationImg} alt="" />
                  <span>Various Artists</span>
                </div>
                <div className="station-stats">
                  <span>{genreSongs.length} Songs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="station-actions">
          <button className="play-btn" onClick={handlePlayClick}>
            <ReactSVG src={isPlaying ? pauseIcon : playIcon} />
          </button>
          <CustomTooltip title={`More options `}>
            <div className="more-options">
              <Dropdown
                options={[
                  {
                    label: "Add to Playlist",
                    value: "add to playlist",
                    icon: addToPlaylistIcon,
                  },
                  {
                    label: "Add to Queue",
                    value: "add to queue",
                    icon: addIcon,
                  },
                  { label: "Delete", value: "delete", icon: deleteIcon },
                ]}
                onSelect={(option) => {
                  console.log(option);
                }}
                toggle={<ReactSVG src={DotsIcon} />}
                toggleTick={false}
                closeOnSelect={true}
                showSelected={false}
                key={genreSongs[0].id + "more"}
              />
            </div>
          </CustomTooltip>
          <div className="change-view">
            <Dropdown
              options={viewOptions}
              onSelect={handleViewSelect}
              headline="View as"
              key={genreSongs[0].id + "view"}
              toggleTick={true}
            />
          </div>
        </div>
        <div className="station-content">
          <ul className={`song-list ${isCompact ? "compact" : ""}`}>
            <li className="song-header">
              <div className="song-order">#</div>
              <div className="song-title">Title</div>
              <div className="song-album">Album</div>
              <div className="song-date-added">Date Added</div>
              <div className="song-duration">
                <ReactSVG
                  src={clockIcon}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </li>
            <hr />
            {genreSongs.map((song, index) => (
              <li
                key={song.id}
                className={`song-container ${
                  song.id === currentSong?.id ? "active" : ""
                }`}
                onClick={() => onPlaySong(song)}
              >
                <div className="song-order-play">
                  <button
                    className="play-btn"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onPlaySong(song);
                    }}
                  >
                    <ReactSVG
                      src={
                        isPlaying && currentSong.id === song.id
                          ? pauseIcon
                          : playIcon
                      }
                    />
                  </button>
                  <span className="song-order">{index + 1}</span>
                </div>
                <div className="song-details">
                  {!isCompact && (
                    <div className="song-img">
                      <img
                        src={
                          song.album.images && song.album.images.length > 0
                            ? song.album.images[0].url
                            : tempStationImg
                        }
                        alt={song.name}
                      />
                    </div>
                  )}
                  <div className="song-info">
                    <p>{song.name}</p>
                    {!isCompact && (
                      <small>
                        {song.artists && song.artists.length > 0
                          ? song.artists[0].name
                          : "Unknown Artist"}
                      </small>
                    )}
                  </div>
                </div>
                <div className="song-album">
                  <span>{song.album?.name || "Unknown Album"}</span>
                </div>
                <div className="song-date-added">
                  <span>
                    {song.album.release_date
                      ? utilService.formatDate(song.album.release_date)
                      : "Unknown Date"}
                  </span>
                </div>
                <div className="song-duration">
                  <span>{utilService.formatTime(song.duration_ms)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
