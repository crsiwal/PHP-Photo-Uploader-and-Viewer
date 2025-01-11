import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="content-wrapper d-flex align-items-center text-center error-page">
      <div className="row flex-grow">
        <div className="col-lg-7 mx-auto">
          <div className="row align-items-center d-flex flex-row">
            <div className="col-lg-6 text-lg-right pr-lg-4 text-primary">
              <h1 className="display-1 mb-0">404</h1>
            </div>
            <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
              <h2>SORRY!</h2>
              <h3 className="font-weight-light">The page you’re looking for was not found.</h3>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center mt-xl-2">
              <button className="btn btn-outline-primary font-weight-medium pointer" onClick={() => navigate("/")}>
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
