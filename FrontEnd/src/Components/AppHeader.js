import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { loginAuth } from "../store/features/auth/authSlice";
import logo from "../assets/images/logo.svg";
import store from "../store/store";
import logo_mini from "../assets/images/logo-mini.svg";
import defaultProfilePicture from "../assets/images/icons/profile.png";

const AppHeader = () => {
  const location = useLocation();
  const [showMenuOption, setShowMenuOption] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  useEffect(() => {
    setShowMenuOption(false);
  }, [location]);

  useEffect(() => {
    // Check user profile picture and set it to header
    const userAuth = loginAuth(store.getState());
    console.log(userAuth);
    setProfilePicture(defaultProfilePicture);
    // if (userAuth.user.picture) {
    // setProfilePicture(userAuth.user.picture);
    // }
  }, []);

  const toggleCollapse = () => {
    setShowMenuOption(prevValue => !prevValue);
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a href="/" className="navbar-brand brand-logo mr-5">
          <img src={logo} className="mr-2" alt="logo" />
        </a>
        <a href="/" className="navbar-brand brand-logo-mini">
          <img src={logo_mini} alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <div className="nav-link dropdown-toggle" onClick={() => toggleCollapse()}>
              <img src={profilePicture} alt="profile" />
            </div>
            <div className={`dropdown-menu dropdown-menu-right navbar-dropdown ${showMenuOption ? "show" : ""}`}>
              <NavLink className="dropdown-item" to="/settings">
                <i className="ti-settings text-primary"></i>Settings
              </NavLink>

              <NavLink className="dropdown-item" to="/logout">
                <i className="ti-power-off text-primary"></i> Logout
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppHeader;
