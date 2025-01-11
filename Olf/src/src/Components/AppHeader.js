import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../Store/store";
import { NavLink, useLocation } from "react-router-dom";
import { loginAuth } from "../Store/Slices/authSlice";
import { setRecord, setTyping } from "../Store/Slices/searchSlice";
import logo from "../Assets/images/logo.svg";
import logo_mini from "../Assets/images/logo-mini.svg";
import defaultProfilePicture from "../Assets/images/faces/face23.jpg";
import { toggleSidebar } from "../Store/Slices/layout";

const AppHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [showMenuOption, setShowMenuOption] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const searchText = useSelector(state => state.search.text);
  const searchEnabled = useSelector(state => state.search.enabled);

  useEffect(() => {
    setShowMenuOption(false);
  }, [location]);

  useEffect(() => {
    // Check user profile picture and set it to header
    const userAuth = loginAuth(store.getState());
    if (userAuth.user.picture) {
      setProfilePicture(userAuth.user.picture);
    }
  }, []);

  const toggleCollapse = () => {
    setShowMenuOption(prevValue => !prevValue);
  };

  const handleInputText = e => {
    dispatch(setRecord(e.target.value));
    dispatch(setTyping(true));

    // Clear the previous timeout if the user is still typing
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to detect when user stops typing
    const newTimeout = setTimeout(() => {
      dispatch(setTyping(false));
    }, 800); // Wait 800ms before considering the user stopped typing

    setTypingTimeout(newTimeout);
  };

  const toggleSidebarMenu = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <NavLink className="navbar-brand brand-logo mr-5" to="/">
          <img src={logo} className="mr-2" alt="logo" />
        </NavLink>
        <NavLink className="navbar-brand brand-logo-mini" to="/">
          <img src={logo_mini} alt="logo" />
        </NavLink>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={toggleSidebarMenu}>
          <span className="icon-menu"></span>
        </button>
        {searchEnabled ? (
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" value={searchText} onChange={e => handleInputText(e)} aria-label="search" aria-describedby="search" />
              </div>
            </li>
          </ul>
        ) : (
          ""
        )}
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <div className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown" onClick={() => toggleCollapse()}>
              <img src={profilePicture} alt="profile" />
            </div>
            <div className={`dropdown-menu dropdown-menu-right navbar-dropdown ${showMenuOption ? "show" : ""}`} aria-labelledby="profileDropdown">
              <NavLink className="dropdown-item" to="/settings">
                <i className="ti-settings text-primary"></i>Settings
              </NavLink>

              <NavLink className="dropdown-item" to="/logout">
                <i className="ti-power-off text-primary"></i> Logout
              </NavLink>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={toggleSidebarMenu}>
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default AppHeader;
