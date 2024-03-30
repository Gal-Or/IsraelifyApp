import { Player } from "./Player";
import { PlayerActions } from "./PlayerActions.jsx";
import { MinimalSong } from "./MinimalSong.jsx";
export function FullPlayer() {
  return (
    <div>
      <MinimalSong />
      <Player />
      <PlayerActions />
    </div>
  );
}
