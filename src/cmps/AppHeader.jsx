import { useNavigate, useParams } from "react-router";
import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useScroll } from "../customHooks/useScroll.js";
import { ReactSVG } from "react-svg";
import { debounce } from "lodash";
import { UserContext } from "../RootCmp.jsx";
import { userService } from "../services/user-local.service.js";
import {
  playFirstSong,
  addSongsToQueueTop,
  setIsPlaying,
} from "../store/player.actions";

import playIcon from "../assets/icons/PlayIcon.svg";
import clockIcon from "../assets/icons/clock.svg";
import pauseIcon from "../assets/icons/PauseIcon.svg";
import rightArrow from "../assets/icons/right_arrow.svg";
import leftArrow from "../assets/icons/left_arrow.svg";
import search from "../assets/icons/search.svg";
import { ContextMenu } from "./ContextMenu.jsx";

export function AppHeader({ station, stationHeaderRef, backgroundColor } = {}) {
  const navigate = useNavigate();
  const params = useParams();
  const currentSong = useSelector((state) => state.playerModule.currentSong);
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  const youtubePlayer = useSelector(
    (state) => state.playerModule.youtubePlayer
  );
  const [contextMenu, setContextMenu] = useState(null);
  const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  const [showPlayBtn, setShowPlayBtn] = useState(false);

  const [currentQuery, setCurrentQuery] = useState(
    params.query ? formatQuery(params.query) : ""
  );

  const headerRef = useRef(null);
  const songsHeaderRef = useRef(null);

  function formatQuery(query) {
    return query.split("+").join(" ");
  }
  const handlePlayClick = () => {
    if (!station.songs.length) return;
    // Play the first song and add remaining songs to the top of the queue
    addSongsToQueueTop(station.songs.slice(1));

    // Play the first song
    playFirstSong(station.songs[0]);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const debouncedNavigate = useCallback(
    debounce((value) => {
      navigate(`/search/${value}`);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const scrollPosition = useScroll(".main-container", (event) => {});

  useEffect(() => {
    if (!headerRef) return;
    if (!stationHeaderRef) return;
    if (!songsHeaderRef) return;
    const headerElement = headerRef.current;
    const stationHeaderElement = stationHeaderRef.current;

    if (headerElement && stationHeaderElement) {
      if (scrollPosition > stationHeaderElement.offsetHeight + 110) {
        headerElement.style.backgroundColor = `${backgroundColor}`;
        songsHeaderRef.current.style.display = "grid";

        setShowPlayBtn(true);
      } else {
        headerElement.style.backgroundColor = "transparent";
        songsHeaderRef.current.style.display = "none";

        setShowPlayBtn(false);
      }
    }
  }, [scrollPosition]);

  function onInputChange(ev) {
    let { value } = ev.target;
    setCurrentQuery(value);

    value = formatQuery(value);

    debouncedNavigate(value);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX - 450, y: event.clientY + 25 },
      options: [
        {
          label: "Log out",
          value: "log out",
          onClick: async () => {
            await userService.logout();
          },
        },
      ],
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="app-header-container">
      <header className="app-header" ref={headerRef}>
        <button className="left-arrow-btn" onClick={() => navigate(-1)}>
          <ReactSVG src={leftArrow} />
        </button>
        <button className="right-arrow-btn" onClick={() => navigate(1)}>
          <ReactSVG src={rightArrow} />
        </button>
        {showPlayBtn && (
          <button className="play-btn" onClick={handlePlayClick}>
            <ReactSVG
              src={
                isPlaying && currentSong.id === station.songs[0].id
                  ? pauseIcon
                  : playIcon
              }
            />
          </button>
        )}

        <div className="input-wrapper">
          <ReactSVG src={search} />
          <input
            type="text"
            placeholder="What do you want to play?"
            onChange={onInputChange}
            value={formatQuery(currentQuery)}
          />
        </div>
        {loggedinUser.fullname === "Guest" && (
          <button className="login-btn" onClick={() => navigate("/signin")}>
            Sign in
          </button>
        )}
        {loggedinUser.fullname !== "Guest" && (
          <button className="profile-btn" onClick={handleContextMenu}>
            <img src={loggedinUser.imgUrl} alt="profile" />
          </button>
        )}

        {contextMenu && (
          <ContextMenu
            position={contextMenu.position}
            options={contextMenu.options}
            onClose={handleCloseContextMenu}
          />
        )}
      </header>
      {params.stationId && (
        <li className="song-header" ref={songsHeaderRef}>
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
      )}
    </div>
  );
}
