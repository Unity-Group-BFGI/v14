import Placeholder from 'react-bootstrap/Placeholder';

// My Store
const StoreSkeleton = () => {
    return (<>
    
    </>);
};

const StoreCategoryOverviewSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-lg-10">
            {/* Card header */}
            <div className="card-header">
                {/* Heading */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar">
                    <div className="my-1 me-4">
                        {/* Select */}
                        <Placeholder.Button className={"btn btn-sm btn-light my-1"} style={{width: '100px'}} variant="secondary" />
                        {/* Select */}
                    </div>
                    
                    <Placeholder.Button className={"btn btn-sm btn-primary my-1"} style={{width: '76px'}} variant="primary" />
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
                                <th className="min-w-250px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-100px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fw-6 fw-semibold text-gray-600">
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-success fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-warning fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-danger fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-info fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
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
    </>);
};


export {
    StoreSkeleton,
    StoreCategoryOverviewSkeleton
};