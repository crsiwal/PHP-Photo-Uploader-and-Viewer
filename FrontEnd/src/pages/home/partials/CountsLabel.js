import React from "react";
import { SHOW_ITEMS_PER_PAGE, TOTAL_ITEMS_COUNT } from "../../../config/config";
import { useParams } from "react-router-dom";

const ImageWithCounts = () => {
  const { page } = useParams();

  const visitedPhotos = ((page || 1) - 1) * SHOW_ITEMS_PER_PAGE;

  const visitedPercentage = (visitedPhotos > 0 ? ((visitedPhotos / TOTAL_ITEMS_COUNT) * 100) : 0).toFixed(2);

  return (
    <div className="row">
      <div className="col-md-6 grid-margin transparent">
        <div className="card card-tale">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="mb-4">Already Viewed</p>
              <p className="mb-4">Current Page: {`${page || 1}`}</p>
            </div>
            <p className="h3 mb-3">{`${visitedPhotos}`} Photos ({visitedPercentage}%)</p>
            <p>Total Photos: {TOTAL_ITEMS_COUNT}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithCounts;
