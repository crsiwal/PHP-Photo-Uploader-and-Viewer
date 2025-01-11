import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const renderImage = (image, idx) => {
    return (
        <div key={idx} className="col-md-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-people mt-auto">
                    <LazyLoadImage
                        key={image.id}
                        alt={`lazyPhoto_${image.id}`}
                        src={image.download_url} // Use actual image source
                        effect="blur" // Lazy loading effect
                        className="card-img-top"
                    />
                    <div className="weather-info">
                        <div className="d-flex">
                            <div>
                                <h2 className="mb-0 font-weight-normal h5" style={{
                                    background: "#ffffff59",
                                    border: "#000",
                                    borderRadius: "17px",
                                    padding: "10px"
                                }}>
                                    <i className="icon-image me-2"></i>{image.id}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}