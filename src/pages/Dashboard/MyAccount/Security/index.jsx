import { MyAccountSecuritySkeleton } from '../../../../components/default/Skeletons';

const Security = () => {
    const loading = true;
    return (<>
        {loading? <MyAccountSecuritySkeleton /> :
        <>
        <div className="card mb-5 mb-lg-10">
            {/* Card header */}
            <div className="card-header">
                {/* Heading */}
                <div className="card-title">
                    <h3>Login Sessions</h3>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar" data-select2-id="select2-data-146-v6gh">
                    <div className="my-1 me-4" data-select2-id="select2-data-145-fd6d">
                        {/* Select */}
                        <select className="form-select form-select-sm form-select-solid w-125px select2-hidden-accessible">
                            <option value="1" selected="" data-select2-id="select2-data-11-sajg">
                                1 Hour
                            </option>
                            <option value="2" data-select2-id="select2-data-150-fcwv">
                                6 Hours
                            </option>
                            <option value="3" data-select2-id="select2-data-151-i9wu">
                                12 Hours
                            </option>
                            <option value="4" data-select2-id="select2-data-152-g39m">
                                24 Hours
                            </option>
                        </select>
                        {/* Select */}
                    </div>
                    <a href="#" className="btn btn-sm btn-primary my-1">
                        View All
                    </a>
                </div>
                {/* Toolbar */}
            </div>
            {/* Card header */}
            {/* Card body */}
            <div className="card-body p-0">
                {/* Table wrapper */}
                <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                        {/* Thead */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="min-w-250px">Location</th>
                                <th className="min-w-100px">Status</th>
                                <th className="min-w-150px">Device</th>
                                <th className="min-w-150px">IP Address</th>
                                <th className="min-w-150px">Time</th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fw-6 fw-semibold text-gray-600">
                            <tr>
                                <td>
                                <a href="#" className="text-hover-primary text-gray-600">
                                    USA(5)
                                </a>
                                </td>
                                <td>
                                <span className="badge badge-light-success fs-7 fw-bold">OK</span>
                                </td>
                                <td>Chrome - Windows</td>
                                <td>236.125.56.78</td>
                                <td>2 mins ago</td>
                            </tr>
                            <tr>
                                <td>
                                <a href="#" className="text-hover-primary text-gray-600">
                                    United Kingdom(10)
                                </a>
                                </td>
                                <td>
                                <span className="badge badge-light-success fs-7 fw-bold">OK</span>
                                </td>
                                <td>Safari - Mac OS</td>
                                <td>236.125.56.78</td>
                                <td>10 mins ago</td>
                            </tr>
                            <tr>
                                <td>
                                <a href="#" className="text-hover-primary text-gray-600">
                                    Norway(-)
                                </a>
                                </td>
                                <td>
                                <span className="badge badge-light-danger fs-7 fw-bold">ERR</span>
                                </td>
                                <td>Firefox - Windows</td>
                                <td>236.125.56.10</td>
                                <td>20 mins ago</td>
                            </tr>
                            <tr>
                                <td>
                                <a href="#" className="text-hover-primary text-gray-600">
                                    Japan(112)
                                </a>
                                </td>
                                <td>
                                <span className="badge badge-light-success fs-7 fw-bold">OK</span>
                                </td>
                                <td>iOS - iPhone Pro</td>
                                <td>236.125.56.54</td>
                                <td>30 mins ago</td>
                            </tr>
                            <tr>
                                <td>
                                <a href="#" className="text-hover-primary text-gray-600">
                                    Italy(5)
                                </a>
                                </td>
                                <td>
                                <span className="badge badge-light-warning fs-7 fw-bold">WRN</span>
                                </td>
                                <td>Samsung Noted 5- Android</td>
                                <td>236.100.56.50</td>
                                <td>40 mins ago</td>
                            </tr>
                        </tbody>
                        {/* Tbody */}
                    </table>
                    {/* Table */}
                </div>
                {/* Table wrapper */}
            </div>
            {/* Card body */}
        </div>
        </>}
    </>);
};

export default Security;