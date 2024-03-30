import { StationHeader } from "../cmps/StationHeader.jsx";
import { StationContent } from "../cmps/StationContent.jsx";
import { ListOfStations } from "../cmps/ListOfStations.jsx";

export function StationPage() {
  return (
    <section>
      <StationHeader />
      <StationContent />
      <ListOfStations />
    </section>
  );
}
