import { PageContainer } from "./cmps/PageContainer.jsx";
import React, { useState, useEffect, useCallback, createContext } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";

import { authRoutes } from "./routes";

import { userService } from "./services/user-local.service";

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
      //navigate to login
    }
  }, []);

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
