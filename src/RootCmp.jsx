import React from "react";
import { Routes, Route } from "react-router";

import routes from "./routes";

import { SidePopUp } from "./cmps/SidePopUp";
import { AppFooter } from "./cmps/AppFooter";
import { NavBar } from "./cmps/NavBar";

export function RootCmp() {
  return (
    <div className="page-container">
      <main className="main-container">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
      <NavBar />
      <SidePopUp />
      <AppFooter />
    </div>
  );
}
