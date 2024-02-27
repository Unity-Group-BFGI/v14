import React, { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";


const DashboardIeltsLms = () => {
    const { USER_LOADING } = useSelector(state => state.auth );
    return (<>
        {USER_LOADING? <>Loading...</> : <Outlet />}
    </>);
}

export default DashboardIeltsLms;