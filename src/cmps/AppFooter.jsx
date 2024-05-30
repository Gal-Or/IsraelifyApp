import { FullPlayer } from "./FullPlayer";
import { useLocation } from "react-router-dom";

export function AppFooter() {
  //show footer only if it's not the in the sign pages , use react hook
  const isSignPage = useLocation().pathname.includes("sign");

  if (isSignPage) return null;

  return (
    <footer className="app-footer">
      <FullPlayer />
    </footer>
  );
}
