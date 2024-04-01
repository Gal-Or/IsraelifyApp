import React from "react";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { Recommendations } from "../cmps/Recommendations.jsx";
import { Catalog } from "../cmps/Catalog.jsx";

import { stationService } from "../services/station.service.js"

export function HomePage() {
  return (
    <section>
      <AppHeader />
      <Recommendations />
      <Catalog />
      {/*find other word for catalog*/}
    </section>
  );
}
