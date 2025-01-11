export const loadingImage = () => {
    return (
        <div className="col-md-6 grid-margin stretch-card justify-content-center p-5">
            <div style={{ height: "2000px" }}>
                <div className="d-flex align-items-center">
                    <div className="h3 me-2 text-primary">Loading</div>
                    <div className="dot-opacity-loader mt-2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}