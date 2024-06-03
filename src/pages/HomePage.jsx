import React from "react";
import { useState } from "react";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { Recommendations } from "../cmps/Recommendations.jsx";
import { Catalog } from "../cmps/Catalog.jsx";

import { stationService } from "../services/station.service.js";

export function HomePage() {

  const [showAll, setShowAll] = useState(null)

  function onShowAll(value) {
    setShowAll(value)
  }

  return (
    <section className="home-page">
      <AppHeader />
      {!showAll &&
        <Recommendations />
      }
      <Catalog showAll={showAll} onShowAll={onShowAll} />
      {/*find other word for catalog*/}
    </section>
  );
}
