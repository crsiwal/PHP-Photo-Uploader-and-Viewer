import React, { Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Error404 from "../pages/error/404";

// Routing Configs
import routes from "../routes";
const AppContent = () => {
  const permissionList = useSelector(state => state.auth.permissions);
  const [permission, setPermission] = useState([]);
  useEffect(() => {
    setPermission(permissionList);
  }, [permissionList]);

  return (
    <>
      <Suspense>
        <Routes>
          {routes.map((route, idx) => {
            if (route.permission && Array.isArray(permission) && permission.includes(route.permission)) {
              return route.element && <Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.element />}></Route>;
            }
            return false;
          })}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppContent;
