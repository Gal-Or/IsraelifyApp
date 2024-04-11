import { useSelector } from "react-redux";
import { SongDetails } from "./SongDetails";

export function MinimalSong() {
  const song = useSelector((state) => state.playerModule.currentSong);
  return (
    <>
      <SongDetails song={song} />
    </>
  );
}
