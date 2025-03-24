import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { isDevelopment } from '../../../config/config';
import "react-lazy-load-image-component/src/effects/blur.css";
import loadingIcon from "../../../assets/images/icons/loading.webp";

const SinglePhotoModal = ({ image, handleDownloadImage, showModel, setShowModel, setSwipeLeft }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [bgImage, setBgImage] = useState(loadingIcon);
    const imageUrl = isDevelopment ? `${image.download_url}?t=${Date.now()}` : image.download_url;

    const [touchPosition, setTouchPosition] = useState(null);

    const handleTouchStart = useCallback((e) => {
        setTouchPosition(e.touches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback(
        (e) => {
            if (!touchPosition) return;
            const distance = touchPosition - e.changedTouches[0].clientX;
            if (Math.abs(distance) > 50) {
                setImageLoaded(false);
                if (distance > 0) {
                    setSwipeLeft(true); // "Swiped Left!"
                } else {
                    setSwipeLeft(false); // "Swiped Right!"
                }
            }
            setTouchPosition(null);
        },
        [touchPosition, setSwipeLeft]
    );

    useEffect(() => {
        if (imageLoaded) {
            const bgImage = image.download_url.replace("/1024/", "/256/");
            setTimeout(() => {
                setBgImage(bgImage);
                setShowLoading(false);
            }, 200);
        } else {
            setBgImage(loadingIcon);
            setShowLoading(true);
        }
    }, [imageLoaded, image.download_url]);

    return (
        <>
            <div className={`modal ${showModel ? "fade show d-block" : "fade"} p-0 m-0`}>
                <div className="modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-body p-0">
                            <div
                                style={{
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundRepeat: showLoading ? "no-repeat" : "repeat",
                                    backgroundPosition: "center",
                                    backgroundColor: "rgb(236 240 241)"
                                }}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div className="d-flex justify-content-center align-items-center vh-100"
                                    style={{ backgroundColor: showLoading ? "transparent" : "rgba(0 0 0 / 85%)" }}>
                                    <LazyLoadImage
                                        key={image.id}
                                        wrapperClassName="w-100"
                                        alt={`lazyPhoto_${image.id}`}
                                        src={imageUrl}
                                        effect="blur"
                                        className="w-100 p-0"
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    {imageLoaded && (
                                        <>
                                            <div className="position-absolute top-0 start-0 p-3 hover-cursor">
                                                <button className="bg-download-button py-1" onClick={() => handleDownloadImage(image.download_url)}>
                                                    <i className="icon-download"></i>
                                                </button>
                                            </div>
                                            <div className="position-absolute top-0 end-0 p-3 me-2 hover-cursor">
                                                <button className="bg-download-button py-1" onClick={() => setShowModel(false)}>
                                                    <i className="icon-circle-cross"></i>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SinglePhotoModal;