import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";


const AuthLayout = (props) => {
    const { AUTH_LOADED, AUTH_LOADING, AUTH_FAILED }    = useSelector( state => state.auth );
    const { IS_USER_LOGGED_IN, IS_VERIFIED }            = useSelector( state => state.auth );
    const { USER }                                      = useSelector( state => state.auth );
    return (<>
        
    </>);
};

export default AuthLayout;