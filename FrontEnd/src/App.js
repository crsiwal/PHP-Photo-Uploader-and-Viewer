import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./assets/vendors/feather/feather.css";
import "./assets/vendors/ti-icons/css/themify-icons.css";
import "./assets/css/vendor.bundle.base.css";
import "./assets/css/style.css";
import Logout from "./components/Logout";

// Containers
const LoggedInLayout = lazy(() => import("./layout/LoggedInLayout"));

// Pages
const Login = lazy(() => import("./pages/login/Login"));
const Error = lazy(() => import("./pages/error/404"));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route exact path="/login" name="Login User" element={<Login />}></Route>
          <Route exact path="/logout" name="Logout User" element={<Logout />}></Route>
          <Route exact path="/error" name="Error Page" element={<Error />}></Route>
          <Route element={<PrivateRoute />}>
            <Route exact path="*" name="User Logged In" element={<LoggedInLayout />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
