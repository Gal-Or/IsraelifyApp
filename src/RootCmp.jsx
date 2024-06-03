
import React, { useState, useEffect, useCallback, createContext } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useResizable } from "react-resizable-layout";
import { SidePopUp } from "./cmps/SidePopUp";
import { AppFooter } from "./cmps/AppFooter";
import { NavBar } from "./cmps/NavBar";
import routes, { authRoutes } from "./routes";
import { useSelector } from "react-redux";
import { userService } from "./services/user-local.service";

const PageContainer = ({ showSidePopUp, setShowSidePopUp }) => {
  const currentStation = useSelector(
    (state) => state.stationModule.currentStation
  );

  const handleResize = useCallback((position) => {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      const width = mainContainer.offsetWidth;

      const dynamicFontSize = `${width / 15}px`; // Adjust the divisor as needed
      const dynamicImageSize = `${width / 5}px`; // Adjust the divisor as needed
      mainContainer.style.setProperty("--dynamic-font-size", dynamicFontSize);
      mainContainer.style.setProperty("--dynamic-image-size", dynamicImageSize);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(0));
    handleResize(0);
    return () => window.removeEventListener("resize", () => handleResize(0));
  }, [currentStation, handleResize]);

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
        <div className="main-container-bg">
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
        </div>
      </main>
    );
  };

  const renderSidePopUp = (separatorPropsRight, positionRight) => {
    useEffect(() => {
      handleResize(positionRight);
    }, [showSidePopUp, handleResize]);
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
    const { position: positionRight, separatorProps: separatorPropsRight } =
      useResizable({
        axis: "x",
        initial: 400,
        min: 200,
        max: 600,
        reverse: true,
      });

    useEffect(() => {
      handleResize(positionRight);
    }, [positionRight, handleResize]);

    return (
      <div className="content-area">
        {renderMainContainer()}
        {renderSidePopUp(separatorPropsRight, positionRight)}
      </div>
    );
  };

  const { position, separatorProps, isDragging } = useResizable({
    axis: "x",
    initial: 360,
    min: 300,
  });

  useEffect(() => {
    handleResize(position);
  }, [position, handleResize]);

  return (
    <div className="page-container">
      <div className="main-content">
        {renderNavBar(position)}
        {renderSeperator(separatorProps, isDragging)}
        {renderContentArea()}
      </div>
      <AppFooter
        className="app-footer"
        setShowSidePopUp={setShowSidePopUp}
        showSidePopUp={showSidePopUp}
      />
    </div>
  );
};

export const UserContext = createContext();


export function RootCmp() {
  const [showSidePopUp, setShowSidePopUp] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

  useEffect(() => {
    if (!loggedinUser) {
      //navigate to login
    }
  }, []);

  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Routes>
        <Route
          path="/*"
          element={!loggedinUser ? <Navigate to={authRoutes[0].path} replace /> : <PageContainer showSidePopUp={showSidePopUp} setShowSidePopUp={setShowSidePopUp} />}
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
    </UserContext.Provider>
  );
}
