import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Advertisements from "./components/Advertisements/Advertisements.jsx";
import AdvertisementDetails from "./components/AdvertisementDetails/AdvertisementDetails.jsx";
import Login from "./components/Login/Login.jsx";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/authContext.jsx";
import Create from "./components/Create/Create.jsx";
import { DataProvider } from "./context/dataContext.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import URL from './consts/consts'
import "typeface-roboto";

const RedirectToDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(URL.dashboardURL);
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    path: URL.homeURL,
    element: <RedirectToDashboard />,
  },
  {
    path: URL.dashboardURL,
    element: <App />,
    children: [
      {
        path: "",
        element: <Advertisements />,
      },
      {
        path: `${URL.advertisementsURL}/:id`,
        element: <AdvertisementDetails />,
      },
      {
        path: URL.createURL,
        element: <Create />,
      },
    ],
  },
  {
    path: URL.loginURL,
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <SnackbarProvider maxSnack={5} >
      <AuthProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </AuthProvider>
    </SnackbarProvider>
);
