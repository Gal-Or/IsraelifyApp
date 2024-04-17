import { StationList } from "./StationList";

export function Catalog() {
  return (
    <div className="catalog">
      <h3>Made for you</h3>
      <div className="list-container">
        <StationList width={200} />
      </div>

      <h3>Yout top mixes</h3>
      <div className="list-container">
        <StationList />
      </div>

      <h3>Recently played</h3>
      <div className="list-container">
        <StationList />
      </div>
    </div>
  );
}
