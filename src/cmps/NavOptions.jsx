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
          <div className="icon-lable-div">
            <ReactSVG src={homeClicked} className="clicked" />
            <span className="clicked">Home</span>
          </div>
          :
          <div className="icon-lable-div"><ReactSVG src={home} />
            <span >Home</span>
          </div>}
      </Link>

      <Link to="/search">
        {location.pathname === '/search'
          ?
          <div className="icon-lable-div">
            <ReactSVG src={searchClicked} className="clicked" />
            <span className="clicked">Search</span>
          </div>
          :
          <div className="icon-lable-div">
            <ReactSVG src={search} />
            <span >Search</span>
          </div>}
      </Link>

      {/* <Link className="to-library" to="/">
        Library
      </Link> */}
    </div>
  );
}
