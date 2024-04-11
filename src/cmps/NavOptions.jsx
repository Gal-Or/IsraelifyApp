import { Link } from "react-router-dom";

export function NavOptions() {
  return (
    <div className="nav-options">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link className="to-library" to="/library">
        Library
      </Link>
    </div>
  );
}
