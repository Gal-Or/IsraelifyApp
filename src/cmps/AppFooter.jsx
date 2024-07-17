import { FullPlayer } from "./FullPlayer";
import { useLocation } from "react-router-dom";
import downIcon from "../assets/icons/down.svg";
import { ReactSVG } from "react-svg";

export function AppFooter({
  setShowSidePopUp,
  showSidePopUp,
  className,
  fullMobilePlayer,
  setFullMobilePlayer,
}) {
  //show footer only if it's not the in the sign pages , use react hook
  const isSignPage = useLocation();

  if (isSignPage.pathname === "/signin" || isSignPage.pathname === "/signup")
    return null;

  return (
    <footer className={`app-footer ${className}`}>
      {fullMobilePlayer && (
        <p
          className="full-player-btn"
          onClick={() => setFullMobilePlayer(false)}
        >
          <ReactSVG src={downIcon} />
        </p>
      )}
      <FullPlayer
        setShowSidePopUp={setShowSidePopUp}
        showSidePopUp={showSidePopUp}
        className={className}
      />
    </footer>
  );
}
