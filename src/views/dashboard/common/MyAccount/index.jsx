import React, { Suspense } from 'react';
import { Outlet } from "react-router-dom";


const DashboardMyAccount = () => {
    return (<>
        <Outlet />
    </>);
}

export default DashboardMyAccount;