import React from "react";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { Recommendations } from "../cmps/Recommendations.jsx";
import { Catalog } from "../cmps/Catalog.jsx";

import { stationService } from "../services/station.service.js";
import { useSelector } from "react-redux";

export function HomePage() {
  const user = useSelector((storeState) => storeState.user);
  console.log(user);
  return (
    <section className="home-page">
      <AppHeader />
      <Recommendations />
      <Catalog />
      {/*find other word for catalog*/}
    </section>
  );
}
