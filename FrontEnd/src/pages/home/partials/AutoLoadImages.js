import FlatList from 'flatlist-react';
import { renderImage } from "./RenderImage";
import { loadingImage } from "./LoadingImage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SHOW_ITEMS_PER_PAGE } from "../../../config/config";
import { list, rotate } from "../../../services/home/photos";
import SinglePhotoModal from "./SinglePhotoModal";

const AutoLoadImages = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [photos, setPhotos] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [showModel, setShowModel] = React.useState(false);
  const [loading, setLoading] = useState(false); // To track loading state
  const [hasMore, setHasMore] = useState(true); // To track if there are more images to load
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  // Load more images when page changes or when currentPage changes
  const loadMoreImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await list({ page: currentPage });
      setPhotos(data);
      setHasMore(Object.keys(data).length >= SHOW_ITEMS_PER_PAGE);
      if (Object.keys(data).length > 0) {
        setSingleImage(data[0]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setPhotos([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate(`/${currentPage + 1}`);
    }, 1000);
  }, [loading, hasMore, currentPage, navigate]);

  const handleRotateRight = async (id, rotateRight = true) => {
    const data = await rotate({ id: id, left: !rotateRight });
    if (data?.urls) {
      const newUrl = `${data.urls["512"]}?t=${Date.now()}`;
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === id ? { ...photo, download_url: newUrl } : photo
        )
      );
    }
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      handleLoadMore();
    }
  }, [loading, handleLoadMore]);

  const handleDownloadImage = (imageUrl) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = imageUrl.split("/").pop(); // Extract filename from URL
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const setSwipeLeft = (swipeLeft) => {
    const idx = photos.findIndex((photo) => photo.id === singleImage.id);
    if (swipeLeft) { // Swiped Left
      if (idx < photos.length - 1) {
        setSingleImage(photos[idx + 1]);
      } else {
        if (currentPage >= 1 && hasMore) {
          setPhotos([]);
          setCurrentPage(prev => prev + 1);
        }
      }
    } else { // Swiped Right
      if (idx > 0) {
        setSingleImage(photos[idx - 1]);
      } else {
        if (currentPage > 1 && hasMore) {
          setPhotos([]);
          setCurrentPage(prev => prev - 1);
        }
      }
    }
  }

  const handleShowSingleImage = (image) => {
    setSingleImage(image);
    setShowModel(true);
  }

  useEffect(() => {
    loadMoreImages();
  }, [currentPage, loadMoreImages]);

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="row">
      {!showModel && (
        <>
          <FlatList
            list={photos}
            renderItem={(photo, idx) => renderImage(photo, idx, handleRotateRight, handleShowSingleImage)}
            renderWhenEmpty={loadingImage}
          />
          {hasMore && (
            <div className='col-12 text-center pt-5'>
              <button type="button" className="btn btn-outline-primary btn-icon-text btn-block" onClick={handleLoadMore}>
                <i className="icon-fast-forward btn-icon-prepend"></i> Load Next Photos</button>
            </div>
          )}
          {loading && (
            <div className='col-12'>
              <div>Loading...</div>
            </div>
          )}
        </>
      )}
      {singleImage && <SinglePhotoModal image={singleImage} handleDownloadImage={handleDownloadImage} showModel={showModel} setShowModel={setShowModel} setSwipeLeft={setSwipeLeft} />}
    </div>
  );
};

export default AutoLoadImages;
