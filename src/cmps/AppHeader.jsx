import { useNavigate, useParams } from "react-router";
import { useState, useCallback } from "react";
import { ReactSVG } from "react-svg";
import { debounce } from "lodash";

import rightArrow from "../assets/icons/right_arrow.svg";
import leftArrow from "../assets/icons/left_arrow.svg";
import search from "../assets/icons/search.svg";

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();

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
    </header>
  );
}
