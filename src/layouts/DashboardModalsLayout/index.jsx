import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_dashboard } from "../../includes/redux-store/Slices/Dashboard.slice";

const DashboardModalsLayout = ({children}) => {
    const dispatch = useDispatch();
    const { API_FAILED, API_LOADED, API_LOADING}                        = useSelector( state => state.api );
    const { AUTH_APP_LOADING, AUTH_APP_FAILED, AUTH_APP_LOADED }        = useSelector( state => state.auth );
    const { VERIFY_LOADING, VERIFY_FAILED, VERIFY_LOADED }              = useSelector( state => state.auth );
    const { DASHBOARD_FAILED, DASHBOARD_LOADED, DASHBOARD_LOADING }     = useSelector( state => state.dashboard );

    // handle errors states
    const { API_ERROR_MESSAGE,API_ERROR_TYPE,API_ERROR_CODE }                       = useSelector( state => state.api );
    const { AUTH_APP_ERROR_MESSAGE, AUTH_APP_ERROR_TYPE, AUTH_APP_ERROR_CODE }      = useSelector( state => state.auth );
    const { VERIFY_ERROR_MESSAGE, VERIFY_ERROR_TYPE, VERIFY_ERROR_CODE }            = useSelector( state => state.auth );
    const { DASHBOARD_ERROR_MESSAGE, DASHBOARD_ERROR_TYPE, DASHBOARD_ERROR_CODE }   = useSelector( state => state.dashboard );

    
    const [apiModal,setApiModal]                = useState(false);
    const [authModal,setAuthModal]              = useState(false);
    const [verifyModal,setVerifyModal]          = useState(false);
    const [dashboardModal,setDashboardModal]    = useState(false);

    useEffect(() => {
        dispatch(update_dashboard({
            DASHBOARD_OVERALL_LOADED: false,
            DASHBOARD_OVERALL_LOADING: true,
            DASHBOARD_OVERALL_FAILED: false
        }));


        if(!API_LOADING && API_FAILED){ 
            dispatch(update_dashboard({
                DASHBOARD_OVERALL_ERROR_MESSAGE: API_ERROR_MESSAGE,
                DASHBOARD_ERROR_TYPE: API_ERROR_TYPE,
                DASHBOARD_ERROR_CODE: API_ERROR_CODE,
                DASHBOARD_OVERALL_LOADING: true,
                DASHBOARD_OVERALL_FAILED: true,
                DASHBOARD_OVERALL_LOADED: false
            }));
            setApiModal(true); 
            return;
        }

        if(AUTH_APP_FAILED && !AUTH_APP_LOADING){ 
            dispatch(update_dashboard({
                DASHBOARD_OVERALL_ERROR_MESSAGE: AUTH_APP_ERROR_MESSAGE,
                DASHBOARD_ERROR_TYPE: AUTH_APP_ERROR_TYPE,
                DASHBOARD_ERROR_CODE: AUTH_APP_ERROR_CODE,
                DASHBOARD_OVERALL_LOADING: true,
                DASHBOARD_OVERALL_FAILED: true,
                DASHBOARD_OVERALL_LOADED: false
            }));
            setAuthModal(true); 
            return;
        }

        if(VERIFY_FAILED && !VERIFY_LOADING) {
            dispatch(update_dashboard({
                DASHBOARD_OVERALL_ERROR_MESSAGE: VERIFY_ERROR_MESSAGE,
                DASHBOARD_ERROR_TYPE: VERIFY_ERROR_TYPE,
                DASHBOARD_ERROR_CODE: VERIFY_ERROR_CODE,
                DASHBOARD_OVERALL_LOADING: true,
                DASHBOARD_OVERALL_FAILED: true,
                DASHBOARD_OVERALL_LOADED: false
            }));
            setVerifyModal(true);
            return;
        }

        if(DASHBOARD_FAILED && !DASHBOARD_LOADING){
            dispatch(update_dashboard({
                DASHBOARD_OVERALL_ERROR_MESSAGE: DASHBOARD_ERROR_MESSAGE,
                DASHBOARD_ERROR_TYPE: DASHBOARD_ERROR_TYPE,
                DASHBOARD_ERROR_CODE: DASHBOARD_ERROR_CODE,
                DASHBOARD_OVERALL_LOADING: true,
                DASHBOARD_OVERALL_FAILED: true,
                DASHBOARD_OVERALL_LOADED: false
            }));
            setDashboardModal(true);
            return;
        }


    },[API_FAILED, AUTH_APP_FAILED, VERIFY_FAILED, DASHBOARD_FAILED]);


    useEffect(() => {
        if(API_LOADED && AUTH_APP_LOADED && VERIFY_LOADED && DASHBOARD_LOADED){
            dispatch(update_dashboard({
                DASHBOARD_OVERALL_LOADED: true,
                DASHBOARD_OVERALL_LOADING: false,
                DASHBOARD_OVERALL_FAILED: false
            }));
        }
    },[API_LOADED,AUTH_APP_LOADED,VERIFY_LOADED,DASHBOARD_LOADED]);

    return (<>
        {children}

    </>);
};

export default DashboardModalsLayout;
