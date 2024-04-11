import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();

  const [currentQuery, setCurrentQuery] = useState(params.query || "");

  function onInputChange(ev) {
    let { value } = ev.target;
    setCurrentQuery(value);
    //replace spaces with +
    value = value.split(" ").join("+");
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
