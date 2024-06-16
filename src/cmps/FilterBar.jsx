import { useNavigate, useParams } from "react-router";

export function FilterBar() {
  const { type, query } = useParams();
  const navigate = useNavigate();
  const handleFilterClick = (filter) => {
    if (type === filter) return;
    if (filter === "all") {
      navigate(`/search/${query}/all`);
      return;
    }
    // Change the URL to reflect the new filter
    navigate(`/search/${query}/${filter}`);
  };

  return (
    <div className="filter-bar-container">
      <ul className="filter-bar">
        <li
          className={type === "all" ? "selected" : ""}
          onClick={() => handleFilterClick("all")}
        >
          All
        </li>
        <li
          className={type === "songs" ? "selected" : ""}
          onClick={() => handleFilterClick("songs")}
        >
          songs
        </li>
        <li
          className={type === "stations" ? "selected" : ""}
          onClick={() => handleFilterClick("stations")}
        >
          stations
        </li>
        <li
          className={type === "artists" ? "selected" : ""}
          onClick={() => handleFilterClick("artists")}
        >
          artists
        </li>
      </ul>
    </div>
  );
}
