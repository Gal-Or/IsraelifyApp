import { StationList } from "./StationList";

export function Catalog() {
  return (
    <div className="catalog">
      <div className="title-container">
        <h3>Made for you</h3>
        <a className="show">Show all</a>
      </div>
      <StationList width={200} />

      <div className="title-container">
        <h3>Yout top mixes</h3>
        <a className="show">Show all</a>
      </div>
      <StationList />

      <div className="title-container">
        <h3>Recently played</h3>
        <a className="show">Show all</a>
      </div>
      <StationList />

    </div>
  );
}
