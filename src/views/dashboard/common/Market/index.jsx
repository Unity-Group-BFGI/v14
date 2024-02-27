import React, { Suspense } from 'react';
import { Outlet } from "react-router-dom";


const DashboardMarket = () => {
    return (<>
        <Outlet />
    </>);
}

export default DashboardMarket;