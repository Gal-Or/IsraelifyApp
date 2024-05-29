import { useState } from "react";
import { Routes, Route } from "react-router";
import Resizable from "react-resizable-layout";

import routes from "./routes";
import { SidePopUp } from "./cmps/SidePopUp";
import { AppFooter } from "./cmps/AppFooter";
import { NavBar } from "./cmps/NavBar";

export function RootCmp() {
  const [showSidePopUp, setShowSidePopUp] = useState(false);

  const renderNavBar = (position) => {
    return (
      <div className="nav-bar" style={{ width: position }}>
        <NavBar />
      </div>
    );
  };
  const renderSeperator = (separatorProps) => {
    return <div className="separator" {...separatorProps} />;
  };

  const renderMainContainer = () => {
    return (
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
        {/* <button
                          className="toggle-button"
                          onClick={() => setShowSidePopUp((prev) => !prev)}
                        >
                          Toggle SidePopUp
                        </button> */}
      </main>
    );
  };
  const renderSidePopUp = (separatorPropsRight, positionRight) => {
    return (
      showSidePopUp && (
        <>
          <div className="separator" {...separatorPropsRight} />
          <div className="side-pop-up" style={{ width: positionRight }}>
            <SidePopUp />
          </div>
        </>
      )
    );
  };

  const renderContentArea = () => {
    //main + optional side pop up

    return (
      <div className="content-area">
        <Resizable axis="x" initial={0} min={0} reverse={true}>
          {({
            position: positionRight,
            separatorProps: separatorPropsRight,
          }) => (
            <>
              {renderMainContainer()}
              {renderSidePopUp(separatorPropsRight, positionRight)}
            </>
          )}
        </Resizable>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <Resizable axis="x" initial={250} min={50}>
          {({ position, separatorProps }) => (
            <>
              {renderNavBar(position)}
              {renderSeperator(separatorProps)}
              {renderContentArea()}
            </>
          )}
        </Resizable>
      </div>
      <AppFooter className="app-footer" />
    </div>
  );
}
