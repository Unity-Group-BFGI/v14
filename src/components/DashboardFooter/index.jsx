import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardFooter = () => {
    const dispatch                          = useDispatch();
    const navigate                          = useNavigate();
    const { USER_LOADING, ROLE }            = useSelector( state => state.auth );
    const { USER_PERMISSIONS }              = useSelector( state => state.auth );
    const { USER_SERVICES }                 = useSelector( state => state.auth );
    const { NO_PRODUCT_NOTICE }             = useSelector( state => state.auth );
    const { NO_DOMAIN_NOTICE }              = useSelector( state => state.auth );
    const { MY_TOTAL_DOMAINS }              = useSelector( state => state.auth );



    return (<>
        <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
            {!USER_LOADING && ROLE == "customer" && MY_TOTAL_DOMAINS <= 0 &&
            <div className="container-xxl d-flex flex-column flex-md-row flex-stack">

                <Alert show={true} variant="warning" className='w-100 no-domain-notice'>
                    <Alert.Heading>
                        No Domain found
                    </Alert.Heading>
                    <p>
                        It looks like, your account dosn't have any Domain
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <button className='btn btn-sm btn-warning' onClick={() => navigate(`/dashboard/@${ROLE}/domains/domain/add`)}>
                            <i className="fa fa-plus"></i> Add Domain
                        </button>
                    </div>
                </Alert>

            </div>}
            {/* Container */}
            <div className="container-xxl d-flex flex-column flex-md-row flex-stack">
                {/* Copyright */}
                <div className="text-dark order-2 order-md-1">
                    <span className="text-gray-400 fw-semibold me-1">Created by</span>
                    <a href="https://spacetree.org" target="_blank" className="text-muted text-hover-primary fw-semibold me-2 fs-6">Spacetree</a>
                </div>
                {/* Copyright */}

                {/* Menu */}
                <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                    <li className="menu-item"><a href="https://spacetree.org/about" target="_blank" className="menu-link px-2">About</a></li>
                    <li className="menu-item"><a href="https://spacetree.org/support" target="_blank" className="menu-link px-2">Support</a></li>
                    <li className="menu-item"><a href="https://spacetree.org/purchase" target="_blank" className="menu-link px-2">Purchase</a></li>
                </ul>
                {/* Menu */}
            </div>
            {/* Container */}
        </div>
    </>);
};

export default DashboardFooter;