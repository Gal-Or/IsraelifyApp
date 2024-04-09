import { useNavigate, useParams } from "react-router";

import logo_no_bg from "../assets/imgs/logo_no_bg.png";
import { useEffect } from "react";

export function AppHeader() {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);

  function onInputChange(ev) {
    let { value } = ev.target;
    navigate(`/search/${value}`);
  }

  return (
    <header className="app-header">
      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        value={params.query || ""}
      />
    </header>
  );
}
