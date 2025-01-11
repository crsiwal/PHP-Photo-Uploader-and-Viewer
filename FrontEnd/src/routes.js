import { lazy } from "react";
import access from "./config/access";

const routes = [
  { permission: access.dashboard.view, path: "/", exact: true, name: "Home", element: lazy(() => import("./pages/home/Dashboard")) },
  { permission: access.dashboard.view, path: "/:page", exact: true, name: "Home", element: lazy(() => import("./pages/home/Dashboard")) },
];

export default routes;
