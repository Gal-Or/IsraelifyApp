import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();

  const [currentQuery, setCurrentQuery] = useState(
    params.query ? formatQuery(params.query) : ""
  );
  function formatQuery(query) {
    return query.split("+").join(" ");
  }
  function onInputChange(ev) {
    let { value } = ev.target;
    setCurrentQuery(value);
    value = formatQuery(value);

    navigate(`/search/${value}`);
  }

  return (
    <header className="app-header">
      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        value={currentQuery}
      />
    </header>
  );
}
