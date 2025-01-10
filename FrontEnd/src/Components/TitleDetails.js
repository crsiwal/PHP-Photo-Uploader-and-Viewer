import React, { useEffect } from "react";

const TitleDetails = ({ title, summery }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 mb-4 mb-xl-0">
            <h3 className="font-weight-bold">{title}</h3>
            <h6 className="font-weight-normal mb-0">{summery}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleDetails;
