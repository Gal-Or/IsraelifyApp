import { useNavigate, useParams } from "react-router";
import { useState, useCallback, useContext } from "react";
import { ReactSVG } from "react-svg";
import { debounce } from "lodash";
import { UserContext } from '../RootCmp.jsx'
import { userService } from "../services/user-local.service.js";

import rightArrow from "../assets/icons/right_arrow.svg";
import leftArrow from "../assets/icons/left_arrow.svg";
import search from "../assets/icons/search.svg";
import { ContextMenu } from "./ContextMenu.jsx";

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();
  const [contextMenu, setContextMenu] = useState(null);
  const [loggedinUser, setLoggedinUser] = useContext(UserContext)

  const [currentQuery, setCurrentQuery] = useState(
    params.query ? formatQuery(params.query) : ""
  );

  function formatQuery(query) {
    return query.split("+").join(" ");
  }

  const debouncedNavigate = useCallback(
    debounce((value) => {
      navigate(`/search/${value}`);
    }, 300), // Adjust the debounce delay as needed
    []
  );

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
            await userService.logout()
            navigate('/signin')
          },
        }
      ],
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <header className="app-header">
      <button className="left-arrow-btn" onClick={() => navigate(-1)}>
        <ReactSVG src={leftArrow} />
      </button>
      <button className="right-arrow-btn" onClick={() => navigate(1)}>
        <ReactSVG src={rightArrow} />
      </button>

      <div className="input-wrapper">
        <ReactSVG src={search} />
        <input
          type="text"
          placeholder="What do you want to play?"
          onChange={onInputChange}
          value={formatQuery(currentQuery)}
        />
      </div>


      <button className="profile-btn" onClick={handleContextMenu}><img src={loggedinUser.imgUrl} alt="profile" /></button>

      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          options={contextMenu.options}
          onClose={handleCloseContextMenu}
        />
      )}

    </header>
  );
}
