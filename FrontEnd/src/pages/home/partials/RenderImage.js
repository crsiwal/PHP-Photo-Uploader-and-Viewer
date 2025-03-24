import { LazyLoadImage } from "react-lazy-load-image-component";
import { isDevelopment } from "../../../config/config";
import "react-lazy-load-image-component/src/effects/blur.css";

export const renderImage = (image, idx, handleRotateRight, setSingleImage) => {
    const download_url = image.download_url.replace("/1024/", "/256/");
    return (
        <div key={idx} className="col-12 col-md-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-people mt-auto">
                    <LazyLoadImage
                        key={image.id}
                        wrapperClassName="w-100"
                        alt={`lazyPhoto_${image.id}`}
                        src={isDevelopment ? `${download_url}?t=${Date.now()}` : download_url}
                        effect="blur" // Lazy loading effect
                        className="card-img-top hover-cursor"
                        onClick={() => setSingleImage(image)}
                    />
                    <div className="position-absolute top-0 end-0 p-1">
                        <div className="d-flex">
                            {/* {isDevelopment && ( */}
                            <div className="d-flex">
                                <div onClick={() => handleRotateRight(image.id, true)} className="mb-0 py-1 bg-icon-button ms-3 me-2 rounded-circle"><i className="icon-arrow-left"></i></div>
                                <div onClick={() => handleRotateRight(image.id, false)} className="mb-0 py-1 bg-icon-button rounded-circle"><i className="icon-reload"></i></div>
                            </div>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}