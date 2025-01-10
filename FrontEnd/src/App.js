import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import "./assets/vendors/feather/feather.css";
import "./assets/vendors/ti-icons/css/themify-icons.css";
import "./assets/css/vendor.bundle.base.css";
import "./assets/css/style.css";

// Pages
const Error = lazy(() => import("./Pages/error/404"));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
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
