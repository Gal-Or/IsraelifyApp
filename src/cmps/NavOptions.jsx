import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";

import homeClicked from "../assets/icons/home_clicked.svg"
import home from "../assets/icons/home.svg"
import search from "../assets/icons/search.svg"
import searchClicked from "../assets/icons/search_clicked.svg"


export function NavOptions() {

  const location = useLocation()

  return (
    <div className="nav-options">
      <Link to="/">
        {location.pathname === '/'
          ?
          <><ReactSVG src={homeClicked} className="clicked" />
            <span className="nav-page clicked">Home</span></>
          :
          <><ReactSVG src={home} />
            <span className="nav-page">Home</span></>}
      </Link>

      <Link to="/search">
        {location.pathname === '/search'
          ?
          <><ReactSVG src={searchClicked} className="clicked" />
            <span className="nav-page clicked">Search</span></>
          :
          <><ReactSVG src={search} />
            <span className="nav-page">Search</span></>}
      </Link>

      <Link className="to-library" to="/">
        Library
      </Link>
    </div>
  );
}
