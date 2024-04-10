import { useRef } from "react";
import { useNavigate } from "react-router";

export function AppHeader() {
  const navigate = useNavigate();

  const qureyRef = useRef("");

  function onInputChange(ev) {
    let { value } = ev.target;
    qureyRef.current = value;
    //replace spaces with +
    value = value.split(" ").join("+");
    navigate(`/search/${value}`);
  }

  return (
    <header className="app-header">
      <h1>Israelify</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        value={qureyRef.current}
      />
    </header>
  );
}
