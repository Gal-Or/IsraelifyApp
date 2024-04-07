import { useEffect } from "react";

export function SongDetails({ song }) {

  useEffect(() => {
    if (song)
      console.log(song.name);
  }, [song])

  return (
    <div>
      <span></span>
    </div>
  );
}
