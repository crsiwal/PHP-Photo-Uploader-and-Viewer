import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import testImage from "./assets/images/test.png";

const App = () => {
  const imageLimit = 5;
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // To track if there are more images to load
  const [loading, setLoading] = useState(false); // To track loading state

  // Fetch images from the API based on the current page
  const fetchImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`http://web6.adgyde.in/api.php?page=${page}&limit=${imageLimit}`);
      const data = await response.json();

      if (data.success) {
        // Append new images to the existing ones
        setImages(prevImages => [...prevImages, ...data.images]);
      }

      if (data?.images) {
        // Update the 'hasMore' flag based on the API response
        setHasMore(data.images.length === imageLimit);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Detect when the user scrolls to the bottom of the page
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;

    // Trigger next page of images when the user reaches the bottom
    setPage(prevPage => prevPage + 1);
  };

  // Initial image fetch on component mount
  useEffect(() => {
    fetchImages(); // Initial load
  }, [page]);

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="container mt-4">
      <div className="row gy-4">
        {images?.map(image => (
          <div key={`photo_${image.id}`} className="col-md-4 col-sm-6">
            <div className="card">
              <LazyLoadImage
                alt={`lazyPhoto_${image.id}`}
                height="auto"
                width="100%"
                src={testImage}
                // src={image.url} // Use actual image source
                effect="blur" // Lazy loading effect
                className="card-img-top"
              />
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!hasMore && (
        <div className="text-center my-4">
          <p>No more images to load.</p>
        </div>
      )}
    </div>
  );
};

export default App;
