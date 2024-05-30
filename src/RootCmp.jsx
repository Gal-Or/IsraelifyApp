import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Resizable from "react-resizable-layout";
import { SidePopUp } from "./cmps/SidePopUp";
import { AppFooter } from "./cmps/AppFooter";
import { NavBar } from "./cmps/NavBar";
import routes, { authRoutes } from "./routes";

const PageContainer = ({ showSidePopUp, setShowSidePopUp }) => {
  const renderNavBar = (position) => {
    return (
      <div className="nav-bar-content" style={{ width: position }}>
        <NavBar />
      </div>
    );
  };

  const renderSeperator = (separatorProps, isDragging) => {
    const className = `separator ${isDragging ? "dragging" : ""}`;
    return <div className={className} {...separatorProps} />;
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
          {({ position, separatorProps, isDragging }) => (
            <>
              {renderNavBar(position)}
              {renderSeperator(separatorProps, isDragging)}
              {renderContentArea()}
            </>
          )}
        </Resizable>
      </div>
      <AppFooter className="app-footer" />
    </div>
  );
};

export function RootCmp() {
  const [showSidePopUp, setShowSidePopUp] = useState(false);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PageContainer
            showSidePopUp={showSidePopUp}
            setShowSidePopUp={setShowSidePopUp}
          />
        }
      />
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          exact={true}
          element={route.component}
          path={route.path}
        />
      ))}
    </Routes>
  );
}
