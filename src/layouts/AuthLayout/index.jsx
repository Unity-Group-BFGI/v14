import './auth.css';
import { onAuthStateChanged, auth, authError }  from '../../includes/middlewares/Firebase/Firebase.middleware';
import { call_auth_verify, update_auth } from '../../includes/redux-store/Slices/Auth.slice';
import { validateAccount } from '../../includes/rest-apis';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_dashboard } from "../../includes/redux-store/Slices/Dashboard.slice";
import { update_route } from "../../includes/redux-store/Slices/Route.slice";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch(); 
    const { API_LOADING, API_LOADED, API_FAILED } = useSelector( state => state.api );
    const { IS_USER_LOGGED_IN, IS_USER_VERIFIED, AUTH_APP_LOADED, CALL_AUTH_VERIFY, USER } = useSelector( state => state.auth );

    useEffect(() => {
        if( !API_LOADING && API_LOADED && !API_FAILED ) {

            dispatch(update_auth({
                AUTH_APP_LOADING: true,
                AUTH_APP_LOADED: false,
                AUTH_APP_FAILED: false,
                AUTH_APP_ERROR_MESSAGE: "",
                AUTH_APP_ERROR_TYPE: "",
                AUTH_APP_ERROR_CODE: "",
                AUTH_APP_ERROR_MODAL: false,


                IS_USER_LOGGED_IN: false,
                IS_USER_VERIFIED: false,

                VERIFY_LOADING: true,
                VERIFY_FAILED:false,
                VERIFY_LOADED: false,

                VERIFY_ERROR_MESSAGE: "",
                VERIFY_ERROR_TYPE: "",
                VERIFY_ERROR_CODE: "",
                VERIFY_ERROR_MODAL: false,


                USER: {}
                
            }));
            console.log('[Auth] - loading');

            onAuthStateChanged(auth, (user) => {
                try{
                    if(!authError){
                        if(user){ 
                            dispatch(update_auth({
                                AUTH_APP_LOADING: false,
                                AUTH_APP_LOADED: true,
                                AUTH_APP_FAILED: false,
                                AUTH_APP_ERROR_MESSAGE: "",
                                AUTH_APP_ERROR_TYPE: "",
                                AUTH_APP_ERROR_CODE: "",
                                AUTH_APP_ERROR_MODAL: false,
                
                
                                IS_USER_LOGGED_IN: true,
                                IS_USER_VERIFIED: false,
                
                                VERIFY_LOADING: true,
                                VERIFY_FAILED:false,
                                VERIFY_LOADED: false,

                                VERIFY_ERROR_MESSAGE: "",
                                VERIFY_ERROR_TYPE: "",
                                VERIFY_ERROR_CODE: "",
                                VERIFY_ERROR_MODAL: false,


                                USER: {
                                    status: true,
                                    displayName: user.reloadUserInfo.displayName,
                                    email: user.reloadUserInfo.email,
                                    uid: user.reloadUserInfo.localId,
                                    photoUrl: user.reloadUserInfo.photoUrl,
                                    accessToken: user.stsTokenManager.accessToken,
                                    refreshToken: user.stsTokenManager.refreshToken
                                }
                                
                            }));
                            
                            console.log('[Auth] - loaded');
                            console.info('[Auth]: User is logged in');
                            dispatch(call_auth_verify());



                        } else {     
                            
                            dispatch(update_auth({
                                AUTH_APP_LOADING: false,
                                AUTH_APP_LOADED: true,
                                AUTH_APP_FAILED: false,
                                AUTH_APP_ERROR_MESSAGE: "",
                                AUTH_APP_ERROR_TYPE: "",
                                AUTH_APP_ERROR_CODE: "",
                                AUTH_APP_ERROR_MODAL: false,
                
                
                                IS_USER_LOGGED_IN: false,
                                IS_USER_VERIFIED: false,
                
                                VERIFY_LOADING: true,
                                VERIFY_FAILED:false,
                                VERIFY_LOADED: false,

                                VERIFY_ERROR_MESSAGE: "",
                                VERIFY_ERROR_TYPE: "",
                                VERIFY_ERROR_CODE: "",
                                VERIFY_ERROR_MODAL: false,



                                USER: {}
                                
                            }));

                            console.log('[Auth] - loaded');
                            console.info('[Auth]: User is not logged in');
                        } 
                    }else {
                        dispatch(update_auth({
                            AUTH_APP_LOADING: false,
                            AUTH_APP_LOADED: false,
                            AUTH_APP_FAILED: true,
                            AUTH_APP_ERROR_MESSAGE: "Authorization failed",
                            AUTH_APP_ERROR_TYPE: "error",
                            AUTH_APP_ERROR_CODE: "AUTH_ERR::Firebase-connect-failed",
                            AUTH_APP_ERROR_MODAL: true,
            
            
                            IS_USER_LOGGED_IN: false,
                            IS_USER_VERIFIED: false,
            
                            VERIFY_LOADING: true,
                            VERIFY_FAILED:false,
                            VERIFY_LOADED: false,

                            VERIFY_ERROR_MESSAGE: "",
                            VERIFY_ERROR_TYPE: "",
                            VERIFY_ERROR_CODE: "",
                            VERIFY_ERROR_MODAL: false,


                            USER: {}
                            
                        }));
                    } 
                } catch(err){
                    dispatch(update_auth({
                        AUTH_APP_LOADING: false,
                        AUTH_APP_LOADED: false,
                        AUTH_APP_FAILED: true,
                        AUTH_APP_ERROR_MESSAGE: "Authorization failed",
                        AUTH_APP_ERROR_TYPE: "error",
                        AUTH_APP_ERROR_CODE: "AUTH_ERR::Firebase-connect-failed",
                        AUTH_APP_ERROR_MODAL: true,
        
        
                        IS_USER_LOGGED_IN: false,
                        IS_USER_VERIFIED: false,
        
                        VERIFY_LOADING: true,
                        VERIFY_FAILED:false,
                        VERIFY_LOADED: false,

                        VERIFY_ERROR_MESSAGE: "",
                        VERIFY_ERROR_TYPE: "",
                        VERIFY_ERROR_CODE: "",
                        VERIFY_ERROR_MODAL: false,


                        USER: {}
                        
                    }));
                }
            });
        }
    },[API_LOADING, API_LOADED, API_FAILED]);


    useEffect(() => {
        if(AUTH_APP_LOADED && IS_USER_LOGGED_IN && !IS_USER_VERIFIED){
            console.log('[ACCOUNT VERIFY]: verify user calling...');
            dispatch(update_auth({
                VERIFY_LOADING: true,
                IS_USER_VERIFIED: false,
                VERIFY_FAILED: false,
                VERIFY_LOADED: false,

                VERIFY_ERROR_MESSAGE: "",
                VERIFY_ERROR_TYPE: "",
                VERIFY_ERROR_CODE: "",
                VERIFY_ERROR_MODAL: false,
            }));

            validateAccount({
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken
            },{}).then((response) => {
                console.log('[ACCOUNT VERIFY]: verify user loaded');
                const { success, has_json, json } = response;
                
                if( success && has_json && json.get ) {
                    if(json.verified) {
                        console.log("USER VERIFIED", json.verified);
                        

                        dispatch(update_auth({
                            VERIFY_LOADING: false,
                            IS_USER_VERIFIED: true,
                            VERIFY_FAILED: false,
                            VERIFY_LOADED: true,
                            VERIFY_ERROR_MESSAGE: "",
                            VERIFY_ERROR_TYPE: "",
                            VERIFY_ERROR_CODE: "",
                            VERIFY_ERROR_MODAL: false
                        }));

                    } else {
                        dispatch(update_auth({
                            VERIFY_LOADING: false,
                            IS_USER_VERIFIED: false,
                            VERIFY_FAILED: false,
                            VERIFY_LOADED: true,
                            VERIFY_ERROR_MESSAGE: "",
                            VERIFY_ERROR_TYPE: "",
                            VERIFY_ERROR_CODE: "",
                            VERIFY_ERROR_MODAL: false
                        }));
                    }

                } else {
                    // user not found
                    dispatch(update_auth({
                        VERIFY_LOADING: false,
                        IS_USER_VERIFIED: false,
                        VERIFY_FAILED: false,
                        VERIFY_LOADED: true,
                        VERIFY_ERROR_MESSAGE: "",
                        VERIFY_ERROR_TYPE: "",
                        VERIFY_ERROR_CODE: "",
                        VERIFY_ERROR_MODAL: false
                    }));
                }
                
            }).catch((err) => {
                
                const { 
                    success, 
                    has_json, 
                    json, 
                    error, 
                    error_type, 
                    error_code, 
                    error_message,
                    show_error_modal
                } = err;

                console.log('[AUTH - VERIFY ACCOUNT - ERROR]: ',err);

                dispatch(update_auth({
                
                    VERIFY_LOADING: false,
                    IS_USER_VERIFIED: false,
                    VERIFY_FAILED: true,
                    VERIFY_LOADED: false,
                    AUTH_APP_LOADED: true,
                    AUTH_APP_FAILED: false,
                    AUTH_APP_LOADING: false,

                    VERIFY_ERROR_MESSAGE: error_message,
                    VERIFY_ERROR_TYPE: error_type,
                    VERIFY_ERROR_CODE: error_code,
                    VERIFY_ERROR_MODAL: false,

                }));

            });
            
    
        } 
    },[CALL_AUTH_VERIFY]);


    return (<>
        {children}
    </>);
};

export default AuthLayout;