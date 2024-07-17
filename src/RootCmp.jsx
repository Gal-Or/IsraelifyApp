import { useState, useEffect, useCallback, createContext } from "react";
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
  const [currentLayout, setCurrentLayout] = useState("desktop");
  const [fullMobilePlayer, setFullMobilePlayer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCurrentLayout(width < 760 ? "mobile" : "desktop");
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial layout
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (fullMobilePlayer) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [fullMobilePlayer]);

  const currentStation = useSelector(
    (state) => state.stationModule.currentStation
  );

  const handleResize = useCallback(() => {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      const width = mainContainer.offsetWidth;
      const dynamicFontSize = `${width / 15}px`;
      const dynamicImageSize = `${width / 5}px`;
      mainContainer.style.setProperty("--dynamic-font-size", dynamicFontSize);
      mainContainer.style.setProperty("--dynamic-image-size", dynamicImageSize);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(0));
    handleResize(0);
    return () => window.removeEventListener("resize", () => handleResize(0));
  }, [currentStation, handleResize]);

  const { position, separatorProps, isDragging } = useResizable({
    axis: "x",
    initial: 400,
    min: 300,
    max: 600,
  });

  const { position: positionRight, separatorProps: separatorPropsRight } =
    useResizable({
      axis: "x",
      initial: 300,
      min: 200,
      max: 500,
      reverse: true,
    });

  useEffect(() => {
    handleResize(position);
  }, [position, handleResize]);

  useEffect(() => {
    handleResize(positionRight);
  }, [positionRight, handleResize]);

  useEffect(() => {
    handleResize(positionRight);
  }, [showSidePopUp, handleResize, positionRight]);

  const renderNavBar = (position) => (
    <div className="nav-bar-content" style={{ width: position }}>
      <NavBar currentLayout={currentLayout} />
    </div>
  );

  const renderSeperator = (separatorProps, isDragging) => (
    <div
      className={`separator ${isDragging ? "dragging" : ""}`}
      {...separatorProps}
    />
  );

  const renderMainContainer = () => (
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

  const renderSidePopUp = () =>
    showSidePopUp && (
      <>
        <div className="separator" {...separatorPropsRight} />
        <div className="side-pop-up" style={{ width: positionRight }}>
          <SidePopUp />
        </div>
      </>
    );

  const renderContentArea = () => (
    <div className="content-area">
      {renderMainContainer()}
      {renderSidePopUp()}
    </div>
  );

  return (
    <>
      {currentLayout === "desktop" && (
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
            key="app-footer-resizable"
          />
        </div>
      )}
      {currentLayout === "mobile" && (
        <div className="page-container-mobile">
          {renderMainContainer()}
          <div
            className="mobile-footer "
            onClick={() => {
              if (!fullMobilePlayer) {
                setFullMobilePlayer(true);
              }
            }}
          >
            <AppFooter
              key="app-footer-mobile"
              className={` ${fullMobilePlayer ? "full-screen-player" : ""}`}
              fullMobilePlayer={fullMobilePlayer}
              setFullMobilePlayer={setFullMobilePlayer}
            />
            {renderNavBar()}
          </div>
        </div>
      )}
    </>
  );
};

export const UserContext = createContext();
export const LayoutContext = createContext();

export function RootCmp() {
  const [showSidePopUp, setShowSidePopUp] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedinUser()
  );
  const [layout, setLayout] = useState({
    nav: { width: 0 },
    sidePopUp: { width: 0 },
    main: { width: 0 },
  });

  useEffect(() => {
    if (!loggedinUser) {
      // navigate to login
    }
  }, [loggedinUser]);

  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <LayoutContext.Provider value={[layout, setLayout]}>
        <Routes>
          <Route
            path="/*"
            element={
              loggedinUser ? (
                <PageContainer
                  showSidePopUp={showSidePopUp}
                  setShowSidePopUp={setShowSidePopUp}
                />
              ) : (
                <Navigate to="/signin" />
              )
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
      </LayoutContext.Provider>
    </UserContext.Provider>
  );
}
