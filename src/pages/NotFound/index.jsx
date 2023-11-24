import { Helmet } from "react-helmet";

const NotFound = () => {
    return (<>
        <Helmet>
            <link href="/css/dashboard.layout.css" type="text/css" rel="stylesheet" />
        </Helmet>
        <div className="d-flex flex-column flex-center">
            <img src="/img/illustrations/sketchy-1/5.png" className="mw-400px" />
            <div className="fs-1 fw-bolder text-dark mb-4">No items found.</div>
            <div className="fs-6">Start creating new folders or uploading a new file!</div>
        </div>
    </>);
};
export default NotFound;