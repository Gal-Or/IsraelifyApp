import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { ReactSVG } from "react-svg";

import rightArrow from "../assets/icons/right_arrow.svg"
import leftArrow from "../assets/icons/left_arrow.svg"

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();

  const [currentQuery, setCurrentQuery] = useState(
    params.query ? formatQuery(params.query) : ""
  );
  function formatQuery(query) {
    return query.split(" ").join("+");
  }
  function onInputChange(ev) {
    let { value } = ev.target;

    value = formatQuery(value);
    setCurrentQuery(value);

    navigate(`/search/${value}`);
  }

  return (
    <header className="app-header">

      <button className="left-arrow-btn">
        <ReactSVG src={leftArrow} />
      </button>
      <button className="right-arrow-btn">
        <ReactSVG src={rightArrow} />
      </button>

      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        value={currentQuery} //formatQuery(currentQuery)}
      />


    </header>
  );
}
