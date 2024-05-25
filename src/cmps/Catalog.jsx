import { StationList } from "./StationList";

export function Catalog() {
  return (
    <div className="catalog">
      <div className="title-container">
        <h3>Made for you</h3>
        <a className="show-all-link">Show all</a>
      </div>

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
