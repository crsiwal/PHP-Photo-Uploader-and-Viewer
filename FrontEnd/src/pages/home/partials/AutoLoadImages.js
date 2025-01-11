import React, { useEffect, useState } from "react";
import { list } from "../../../services/home/photos";
import FlatList from 'flatlist-react';
import { renderImage } from "./RenderImage";
import { useNavigate, useParams } from "react-router-dom";
import { SHOW_ITEMS_PER_PAGE } from "../../../config/config";
import { loadingImage } from "./LoadingImage";

const AutoLoadImages = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state
  const [hasMore, setHasMore] = useState(true); // To track if there are more images to load
  const currentPage = Number(page) || 1;

  const fetchPhotos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await list();
      setPhotos(data);
      console.log(Object.keys(data).length);
      setHasMore(Object.keys(data).length == SHOW_ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);


  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setPhotos([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        navigate(`/${currentPage + 1}`);
      }, 1500);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, loading]);

  return (
    <div className="row">
      <FlatList
        list={photos}
        renderItem={renderImage}
        renderWhenEmpty={loadingImage}
      />
    </div>
  );
};

export default AutoLoadImages;
