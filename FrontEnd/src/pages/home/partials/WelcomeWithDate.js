import React from "react";
import { getState } from "../../../utils/storeState";

const WelcomeWithDate = () => {
  const auth = getState("auth");
  return (
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 col-xl-8">
            <h3 className="font-weight-bold">Welcome {auth.user.name}</h3>
            <h6 className="font-weight-normal mb-0 lh-base">
              All systems are running smoothly! You have <span className="text-primary">3 unread alerts!</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWithDate;
