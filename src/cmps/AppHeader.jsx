import logo_no_bg from "../assets/imgs/logo_no_bg.png";

export function AppHeader() {
  return (
    <header className="app-header">
      <h1>header</h1>
      <img src={logo_no_bg} alt="logo" className="logo" />
    </header>
  );
}
