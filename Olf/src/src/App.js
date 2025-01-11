import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import "./Assets/vendors/feather/feather.css";
import "./Assets/vendors/ti-icons/css/themify-icons.css";
import "./Assets/css/vendor.bundle.base.css";
import "./Assets/css/style.css";
import Logout from "./Components/Logout";

// Containers
const LoggedInLayout = lazy(() => import("./Layouts/LoggedInLayout"));

// Pages
const Login = lazy(() => import("./Pages/Login/Login"));
const Error = lazy(() => import("./Pages/Errors/404"));

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
