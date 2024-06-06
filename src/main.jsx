import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import AuthProvider from "./providers/AuthProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PackageSingleDetail from "./components/packageDetailsPage/PackageSingleDetail";
import AllPackages from "./components/AllPackages/AllPackages";
import GuideSingleDetail from "./pages/Home/TabSection/Tab3Items/MeetOurGuides/GuideSingleDetail";
import TourTypeCatPage from "./components/TourType/TourTypeCatPage";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Profile from "./Dashboard/Shared/Profile";
import MyWishlist from "./Dashboard/User/MyWishlist";

import AddPackages from "./Dashboard/Admin/AddPackages";
import ManageUsers from "./Dashboard/Admin/ManageUsers";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/packages/:id",
        element: <PackageSingleDetail></PackageSingleDetail>,
      },
      {
        path: "/packages",
        element: <AllPackages></AllPackages>,
      },
      {
        path: "/tourGuides/:id",
        element: <GuideSingleDetail></GuideSingleDetail>,
      },
      {
        path: "/packages/tour-type/:tourType",
        element: <TourTypeCatPage></TourTypeCatPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/myWishlist",
        element: <MyWishlist></MyWishlist>,
      },
      {
        path: "/dashboard/admin/addPackage",
        element: <AddPackages></AddPackages>,
      },
      {
        path: "/dashboard/admin/manageUser",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
