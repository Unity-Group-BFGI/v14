import './api.navbar.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load_api_again } from "../../../includes/redux-store/Slices/Api.slice";
import { call_auth_verify } from "../../../includes/redux-store/Slices/Auth.slice";


const ApiNavbarSetup = () => {
    const navigate      = useNavigate();
    const dispatch      = useDispatch();
    const { AUTH_APP_LOADED, AUTH_APP_LOADING, AUTH_APP_FAILED, AUTH_APP_ERROR_MESSAGE } = useSelector( state => state.auth );
    const { IS_USER_LOGGED_IN, IS_USER_VERIFIED, USER  }                            = useSelector( state => state.auth );
    const { VERIFY_FAILED, VERIFY_LOADING, VERIFY_LOADED, VERIFY_ERROR_MESSAGE }    = useSelector( state => state.auth );
    const { API_LOADING, API_LOADED, API_FAILED, API_ERROR_MESSAGE }                = useSelector( state => state.api );

    return (<>
        {/* all for api */}
        {!API_LOADED? <>
            <section>
                <nav className={(API_FAILED)? 'd-block px-7 py-2 bg-red' : 'flex items-center justify-between px-7 py-2 bg-black'}>
                    <div className="w-auto">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="font-small text-white hover:text-white-700">

                                {/* on api loading */}
                                {API_LOADING && !API_FAILED? <>
                                    Please hold on, while API is loading...
                                </> : <></>}

                                {/* on api failed error */}    
                                {!API_LOADING && API_FAILED? <>
                                    {API_ERROR_MESSAGE}
                                </> : <></>}

                            </div>
                            <div className="">
                                {!API_LOADING && API_FAILED? <>
                                    <button className="btn-api-try-again" type="button" onClick={() => dispatch(load_api_again())}>Try again</button>
                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </nav>
            </section>

            {(API_LOADING)?
            <div className="linear-activity">
                <div className="indeterminate"></div>
            </div> : ''}
        </> : <></>}

        {/* auth app */}
        {API_LOADED && !AUTH_APP_LOADED? <>
            <section>
                <nav className={(AUTH_APP_FAILED)? 'd-block px-7 py-2 bg-red' : 'flex items-center justify-between px-7 py-2 bg-black'}>
                    <div className="w-auto">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="font-small text-white hover:text-white-700">

                                {/* on auth loading */}
                                {AUTH_APP_LOADING && !AUTH_APP_FAILED? <>
                                    Please hold on, while API is loading...
                                </> : <></>}

                                {/* on auth failed error */}    
                                {!AUTH_APP_LOADING && AUTH_APP_FAILED? <>
                                    {AUTH_APP_ERROR_MESSAGE}
                                </> : <></>}
                            </div>
                            <div className="">
                                {AUTH_APP_FAILED? <>
                                    <button className="btn-api-try-again" type="button" onClick={() => window.location.reload() }>Try again</button>
                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </nav>
            </section>

            {(API_LOADING)?
            <div className="linear-activity">
                <div className="indeterminate"></div>
            </div> : ''}
        </> : <></>}

        {/* verify loading */}        
        {API_LOADED && AUTH_APP_LOADED && IS_USER_LOGGED_IN && !VERIFY_LOADED? <>
            <section>
                <nav className={(VERIFY_FAILED)? 'd-block px-7 py-2 bg-red' : 'flex items-center justify-between px-7 py-2 bg-black'}>
                    <div className="w-auto">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="font-small text-white hover:text-white-700">

                                {/* on verify loading */}
                                {VERIFY_LOADING && !VERIFY_FAILED? <>
                                    Please hold on, while your Account is verifing...
                                </> : <></>}

                                {/* on verify failed */}
                                {!VERIFY_LOADING && VERIFY_FAILED? <>
                                    {VERIFY_ERROR_MESSAGE}
                                </> : <></>}
 
                            </div>
                            <div className="">
                                {VERIFY_FAILED? <>
                                    <button className="btn-api-try-again" type="button" onClick={() => dispatch(call_auth_verify())}>Try again</button>
                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </nav>
            </section>

            {(VERIFY_LOADING)?
            <div className="linear-activity">
                <div className="indeterminate"></div>
            </div> : ''}
        </> : <></>}

        {/* if verified */}
        {API_LOADED && AUTH_APP_LOADED && IS_USER_LOGGED_IN && VERIFY_LOADED && !IS_USER_VERIFIED? <>
            <section>
                <nav className={'flex items-center justify-between px-7 py-2 bg-black'}>
                    <div className="w-100">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="font-small text-white hover:text-white-700">

                                {/* on verify loading */}
                                {!IS_USER_VERIFIED? <>
                                    Your profile is not completed yet, please complete your profile, before entering to Dashboard
                                </> : <></>}  
                            </div>
                            <div className="">
                                {!IS_USER_VERIFIED? <>
                                    <button className="btn-api-try-again" type="button" onClick={() => navigate("/complete-profile")}>Complete profile</button>
                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
            
        </> : <></>}

    </>);
};

export default ApiNavbarSetup;