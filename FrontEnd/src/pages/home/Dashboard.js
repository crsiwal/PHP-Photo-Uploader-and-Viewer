import React, { useEffect } from "react";
import WelcomeWithDate from "./partials/WelcomeWithDate";
import ImageWithCounts from "./partials/CountsLabel";
import AutoLoadImages from "./partials/AutoLoadImages";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Wedding Photos";
  }, []);

  return (
    <div className="content-wrapper">
      {/* Welcome message with selected date */}
      <WelcomeWithDate />

      {/* Specific Numbers Counts */}
      <ImageWithCounts />

      {/* Specific Numbers Counts */}
      <AutoLoadImages />

    </div>
  );
};

export default Dashboard;
