import { StationHeader } from "../cmps/StationHeader.jsx";
import { StationContent } from "../cmps/StationContent.jsx";
import { StationList } from "../cmps/StationList.jsx";

export function StationPage() {
  return (
    <section>
      <StationHeader />
      <StationContent />
      <ListOfStations />
    </section>
  );
}
