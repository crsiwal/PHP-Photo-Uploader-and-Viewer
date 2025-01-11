import { lazy } from "react";
import access from "./Config/access";

const routes = [
  { permission: access.dashboard.view, path: "/", exact: true, name: "Home", element: lazy(() => import("./Pages/Home/Home")) },

  /* Users Routing */
  /*   { permission: access.user.view, path: "/users", exact: true, name: "Users", element: lazy(() => import("./Pages/users/List")) },
    { permission: access.user.add, path: "/users/add", exact: true, name: "Create Users", element: lazy(() => import("./Pages/users/Create")) },
    { permission: access.user.update, path: "/users/:id/update", exact: true, name: "Update User", element: lazy(() => import("./pages/users/Update")) }, */

];

export default routes;
