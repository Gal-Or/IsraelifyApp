import { StationList } from "./StationList";

export function Catalog() {
  return (
    <div className="catalog">
      <div className="title-container">
        <h3>Made for you</h3>
        <a className="show-all-link">Show all</a>
      </div>
      <StationList width={200} randomize={true} />

      <div className="title-container">
        <h3>Yout top mixes</h3>
        <a className="show-all-link">Show all</a>
      </div>
      <StationList randomize={true} />

      <div className="title-container">
        <h3>Recently played</h3>
        <a className="show-all-link">Show all</a>
      </div>
      <StationList randomize={true} />
    </div>
  );
}
