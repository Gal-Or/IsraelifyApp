import { Navigate } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";
import { StationPage } from "./pages/StationPage.jsx";
import { GenrePage } from "./pages/GenrePage.jsx";
import { SignInPage } from "./pages/SignInPage.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { LibraryMobile } from "./cmps/LibraryMobile.jsx";

// Routes accessible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    label: "Home",
  },
  {
    path: "/library",
    component: <LibraryMobile />,

    // component: <Library width={500} />,
    label: "Library",
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
    path: "/search/:query/:viewType",
    component: <SearchPage />,
    label: "Search",
  },
  {
    // Return to home page if no stationId
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
    path: "/genre",
    component: <Navigate to="/" replace />,
    label: "Genre",
  },
  {
    path: "/genre/:genreId",
    component: <GenrePage />,
    label: "Genre",
  },
];

export default routes;

export const authRoutes = [
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
