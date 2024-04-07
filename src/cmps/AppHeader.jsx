import { useNavigate } from "react-router";

import logo_no_bg from "../assets/imgs/logo_no_bg.png";

export function AppHeader() {
  const navigate = useNavigate();

  function onInputChange(ev) {
    let { value } = ev.target;
    navigate(`/search/${value}`);
  }

  return (
    <header className="app-header">
      <h1>header</h1>
      <input type="text" placeholder="Search" onChange={onInputChange} />
      <img src={logo_no_bg} alt="logo" className="logo" />
    </header>
  );
}
