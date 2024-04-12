import { useEffect } from "react";
import { useSelector } from "react-redux";

import { setIsPlaying } from "../store/player.actions";

export function useSpacebarPlayPause() {
  const isPlaying = useSelector((state) => state.playerModule.isPlaying);
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 32) {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);
}
