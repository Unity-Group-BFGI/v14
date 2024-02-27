import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";


const DashboardDomains = () => {
    const { USER_LOADING } = useSelector(state => state.auth );
    return (<>
        {USER_LOADING? <>Loading...</> : <Outlet />}
    </>);
};

export default DashboardDomains;