import { FullPlayer } from "./FullPlayer";
import { useLocation } from "react-router-dom";

export function AppFooter({ setShowSidePopUp, showSidePopUp }) {
  //show footer only if it's not the in the sign pages , use react hook
  const isSignPage = useLocation();

  if (isSignPage.pathname === "/signin" || isSignPage.pathname === "/signup")
    return null;

  return (
    <footer className="app-footer">
      <FullPlayer
        setShowSidePopUp={setShowSidePopUp}
        showSidePopUp={showSidePopUp}
      />
    </footer>
  );
}
