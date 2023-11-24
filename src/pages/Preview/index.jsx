import { Outlet } from "react-router-dom";
import { IeltsTestPreview, IeltsSolutionPreview } from './Ielts';
import { LayoutSwitcher } from "../../layouts";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Preview = () => {
    const { API_LOADING, API_LOADED, API_FAILED }           = useSelector( state => state.api );
    const { AUTH_APP_LOADING, AUTH_APP_LOADED }             = useSelector( state => state.auth );
    const { VERIFY_FAILED, VERIFY_LOADING, VERIFY_LOADED }  = useSelector( state => state.auth );
    const { IS_USER_LOGGED_IN, IS_USER_VERIFIED }           = useSelector( state => state.auth );
    const [loading,setLoading]                              = useState(true);

    const bootstrapPreview = () => {
        setLoading(false);
    };


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
                bootstrapPreview();
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
        {loading? <> Preview loading... </> :
        <LayoutSwitcher type={"preview"}>
            <Outlet />
        </LayoutSwitcher>}  
    </>)
};

export { Preview, IeltsTestPreview, IeltsSolutionPreview };