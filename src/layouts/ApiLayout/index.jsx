import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { update_api } from '../../includes/redux-store/Slices/Api.slice';
import { checkApiStatus } from '../../includes/rest-apis';

const ApiLayout = ({children}) => {
    const dispatch              = useDispatch();
    const { API_LOAD_AGAIN }    = useSelector( state => state.api ); 

    useEffect(() => {
        // if auth is not in loading state
        // if auth is not loaded
        // return to main page
        dispatch(update_api({
            API_LOADING: true,
            API_LOADED: false,
            API_FAILED: false,
            API_ERROR_MESSAGE: "",
            API_ERROR_TYPE: "",
            API_ERROR_CODE: "",
            API_ERROR_MODAL: false
        }));

        console.log('[API]: loading...');
        checkApiStatus().then((response) => {
            console.log('[API]: loaded'); 
            const { success } = response;
            if( success ) {
                dispatch(update_api({
                    API_LOADING: false,
                    API_LOADED: true,
                    API_FAILED: false,
                    API_ERROR_MESSAGE: "",
                    API_ERROR_TYPE: "",
                    API_ERROR_CODE: "",
                    API_ERROR_MODAL: false
                })); 
            }
        }).catch((err) => {
            const { error, error_message, error_type, error_code } = err;
            if( error ){
                console.log('[API ERROR]: ',error_message);
                dispatch(update_api({
                    API_LOADING: false,
                    API_LOADED: false,
                    API_FAILED: true,
                    API_ERROR_MESSAGE: error_message,
                    API_ERROR_TYPE: error_type,
                    API_ERROR_CODE: error_code,
                    API_ERROR_MODAL: true
                }));
            } else {
                alert("Unknown error response by server");
                console.error(err);
            }
        });
        
    },[API_LOAD_AGAIN]);

    return (<>
        {children}
    </>);
};

export default ApiLayout;