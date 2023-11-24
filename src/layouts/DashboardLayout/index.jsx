import './dashboard.css';
import DashboardModalsLayout from "../DashboardModalsLayout";
import { bootstrapAccount } from "../../includes/rest-apis";
import { update_dashboard } from '../../includes/redux-store/Slices/Dashboard.slice';
import { update_theme } from '../../includes/redux-store/Slices/Theme.slice';
import { update_route } from '../../includes/redux-store/Slices/Route.slice';
import { update_my_account } from '../../includes/redux-store/Slices/MyAccount.slice';
import { RouterLayout } from "../../layouts";
import DashboardSidebar from "../../components/default/DashboardSidebar";
import DashboardHeaderLg from "../../components/default/DashboardHeaderLg";

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update_ielts_lms } from '../../includes/redux-store/Slices/ieltsLms.slice';




const DashboardLayout = ({children}) => {
    
    const dispatch      = useDispatch();
    const navigate      = useNavigate();

    const { SIDEBAR_EXPAND, WIDTH }                         = useSelector( state => state.theme );
    const { API_LOADING, API_LOADED, API_FAILED }           = useSelector( state => state.api );
    const { AUTH_APP_LOADING, AUTH_APP_LOADED, USER }       = useSelector( state => state.auth );
    const { VERIFY_FAILED, VERIFY_LOADING, VERIFY_LOADED }  = useSelector( state => state.auth );
    const { IS_USER_LOGGED_IN, IS_USER_VERIFIED }           = useSelector( state => state.auth );
    const { DASHBOARD_ROUTE_LOADING }                       = useSelector( state => state.dashboard );    

    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        // set permissions
        if( states.DASHBOARD ) {
            dispatch(update_dashboard({
                ...permissions.DASHBOARD
            }));
        }

        if( states.MY_ACCOUNT ) {
            dispatch(update_my_account({
                ...permissions.MY_ACCOUNT
            }));
        }

        if( states.MY_ACCOUNT_OVERVIEW ) {
            dispatch(update_my_account({
                MY_ACCOUNT_OVERVIEW: { 
                    ...permissions.MY_ACCOUNT_OVERVIEW
                }
            }));
        }

        if( states.IELTS_LMS ) {
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }

        if( states.ROUTE ) {
            dispatch(update_route({
                ...permissions.ROUTE
            }));
        }

        dispatch(update_dashboard({
            DASHBOARD_LOADING: false,
            DASHBOARD_LOADED: true,
            DASHBOARD_FAILED: false
        }));

    };

    // account api
    const bootstrapDashboard = () => {
        dispatch(update_dashboard({
            DASHBOARD_MENU_LOADING: true,
            DASHBOARD_SUBMENU_LOADING: true,
            DASHBOARD_ROUTE_LOADING: true,
            DASHBOARD_LOADING: true,
            DASHBOARD_LOADED: false,
            DASHBOARD_FAILED: false
        }));

        bootstrapAccount({
            'Authorization': 'Bearer '+USER.accessToken,
            'x-refresh-token': USER.refreshToken
        }).then((response) => {
            const { success, has_json, json, error, res } = response;
            if( success && has_json ) {
                updateStates(json);
            } else {
                console.warn(`[warning]: ${res}`);
                alert(`[warning]: ${res}`);
            }
        }).catch((err) => {
            const { success, error, error_type, error_message, error_code } = err;
            if( error ) {
                dispatch(update_dashboard({
                    DASHBOARD_FAILED: true,
                    DASHBOARD_ERROR_MESSAGE: error_message,
                    DASHBOARD_ERROR_TYPE: error_type,
                    DASHBOARD_ERROR_CODE: error_code,
                }));
                
            } else {
                console.error(err);
                alert(err.statusText);
            }
        });

    }


    useEffect(() => {
        if(SIDEBAR_EXPAND){
            document.body.className = 'header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-enabled'; 
        } else {
            document.body.className = 'header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-enabled aside-active'; 
        }
        return () => {
            document.body.className = '';
        };
    },[
        SIDEBAR_EXPAND
    ]);

    useEffect(() => {

        if(API_LOADED){
            // if auth is not in loading state
            // if auth is not loaded
            // return to main page
            if (!AUTH_APP_LOADING && !AUTH_APP_LOADED) {
                navigate("/");
                return;
            }


            // if auth is not in loading state
            // if auth - user is not logged in
            // if auth is also loaded - but user is not logged in
            if (!AUTH_APP_LOADING && !IS_USER_LOGGED_IN) {
                navigate("/");
                return;
            }
            

            if(!AUTH_APP_LOADING && IS_USER_LOGGED_IN && !VERIFY_LOADING && VERIFY_LOADED && !VERIFY_FAILED && IS_USER_VERIFIED ) {
                bootstrapDashboard();
                return;
            }

        }

        if(!API_LOADING && API_FAILED){
            //setApp(<CenterLoading text="API OFFLINE" />);
            return;
        }

    },[
        API_LOADING, 
        API_LOADED, 
        API_FAILED, 
        AUTH_APP_LOADING, 
        AUTH_APP_LOADED, 
        IS_USER_LOGGED_IN, 
        VERIFY_FAILED, 
        VERIFY_LOADING
    ]);

    return (<>
        <Helmet>
            <link href="/css/dashboard.layout.css" type="text/css" rel="stylesheet" />
        </Helmet>
        <DashboardModalsLayout>
            <RouterLayout>
                <div className="d-flex flex-column flex-root">
                    <div className="page d-flex flex-row flex-column-fluid">
                        <DashboardSidebar />
                        <div className={"wrapper d-flex flex-column flex-row-fluid"}>
                            {(DASHBOARD_ROUTE_LOADING)? <div className="linear-activity">
                                <div className="indeterminate"></div>
                            </div> : <></>}
                            {/*--BEGIN::HEADER--*/}
                            <DashboardHeaderLg />
                            {/*--END::HEADER--*/}

                            {/*--BEGIN::CONTENT-BOX--*/}
                            <div className="content d-flex flex-column flex-column-fluid">                     
                                <div className=" container-xxl">
                                    {children}
                                </div>  
                            </div>
                            {/*--END::CONTENT-BOX--*/}

                            {/*--BEGIN::FOOTER--*/}
                            <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
                                {/* Container */}
                                <div className="container-xxl d-flex flex-column flex-md-row flex-stack">
                                    {/* Copyright */}
                                    <div className="text-dark order-2 order-md-1">
                                        <span className="text-gray-400 fw-semibold me-1">Created by</span>
                                        <a href="https://keenthemes.com" target="_blank" className="text-muted text-hover-primary fw-semibold me-2 fs-6">Keenthemes</a>
                                    </div>
                                    {/* Copyright */}
                                    {/* Menu */}
                                    <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                                        <li className="menu-item"><a href="https://keenthemes.com" target="_blank" className="menu-link px-2">About</a></li>
                                        <li className="menu-item"><a href="https://devs.keenthemes.com" target="_blank" className="menu-link px-2">Support</a></li>
                                        <li className="menu-item"><a href="https://keenthemes.com/products/seven-html-pro" target="_blank" className="menu-link px-2">Purchase</a></li>
                                    </ul>
                                    {/* Menu */}
                                </div>
                                {/* Container */}
                            </div>
                            {/*--END::FOOTER--*/}

                        </div>
                    </div>
                </div>

                {(SIDEBAR_EXPAND) && WIDTH < 991 && <div className='drawer-overlay' onClick={() => dispatch(update_theme({
                    SIDEBAR_EXPAND: !SIDEBAR_EXPAND
                }))}></div>}
            </RouterLayout>
        </DashboardModalsLayout>
    </>);
};

export default DashboardLayout;