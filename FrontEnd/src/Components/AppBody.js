import React from "react";
import { useSelector } from "react-redux";

const AppBody = ({ children }) => {
  const sidebarOpen = useSelector(state => state.layout.sidebarOpen);
  return <div className={`container-scroller ${sidebarOpen ? "" : "sidebar-icon-only"}`}>{children}</div>;
};

export default AppBody;
