import { Player } from "./Player";
import { PlayerActions } from "./PlayerActions.jsx";
import { MinimalSong } from "./MinimalSong.jsx";
export function FullPlayer({ setShowSidePopUp, showSidePopUp }) {
  return (
    <div className="full-player">
      <MinimalSong />
      <Player />
      <PlayerActions
        setShowSidePopUp={setShowSidePopUp}
        showSidePopUp={showSidePopUp}
      />
    </div>
  );
}
