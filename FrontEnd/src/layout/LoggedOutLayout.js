import React from "react";
import { AppBody } from "../components";

const LoggedOutLayout = ({ children }) => {
  return <AppBody>{children}</AppBody>;
};

export default LoggedOutLayout;
