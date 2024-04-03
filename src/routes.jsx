import { Navigate } from "react-router";

import { HomePage } from "./pages/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { StationPage } from "./pages/StationPage.jsx";
import { SignInPage } from "./pages/SignInPage.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";

//home-page,signup-page,signin-page,search-page,station-page

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "Home",
  },
  {
    path: "/search",
    component: <SearchPage />,
    label: "Search",
  },
  {
    path: "/search/:query",
    component: <SearchPage />,
    label: "Search",
  },
  {
    //return to home page if no stationId
    path: "/station",
    component: <Navigate to="/" replace />,
    label: "Station",
  },
  {
    path: "/station/:stationId",
    component: <StationPage />,
    label: "Station",
  },
  {
    path: "/signin",
    component: <SignInPage />,
    label: "Sign In",
  },
  {
    path: "/signup",
    component: <SignUpPage />,
    label: "Sign Up",
  },
];

export default routes;
