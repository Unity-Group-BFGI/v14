import { MyAccountSkeleton } from '../../../components/default/Skeletons';
import Overview from './Overview';
import Settings from './Settings';

import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const MyAccount = () => {
    const [loading,setLoading] = useState(true);
    const { PARAM2 }                                                    = useSelector( state => state.route);
    const { DASHBOARD_SUBMENUS, DASHBOARD_SUBMENU_LOADING }             = useSelector ( state => state.dashboard );
    const { MY_ACCOUNT_LOADING, MY_ACCOUNT_LOADED, MY_ACCOUNT_BASIC }   = useSelector( state => state.myAccount );
    
    useEffect(() => {
        if(MY_ACCOUNT_LOADED && !MY_ACCOUNT_LOADING){
            setLoading(false);
        } else if(!MY_ACCOUNT_LOADED && MY_ACCOUNT_LOADING){
            setLoading(true);
        }
    },[MY_ACCOUNT_LOADED,MY_ACCOUNT_LOADING]);


    return (<>
        {(loading)? <MyAccountSkeleton /> : <>
            {(MY_ACCOUNT_LOADED && !MY_ACCOUNT_LOADING) ? <>     
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        {/* begin::Details */}
                        <div className="d-flex flex-sm-nowrap">
                            {/* begin: Pic */}
                            <div className="me-7 mb-4">
                                <div className="symbol symbol-90px symbol-fixed position-relative">                          
                                    <img src={MY_ACCOUNT_BASIC.photoUrl} alt={MY_ACCOUNT_BASIC.displayName} width={90} height={90} />
                                </div>
                            </div>
                            {/* end::Pic */}
                            {/* begin::Info */}
                            <div className="flex-grow-1">
                                {/* begin::Title */}
                                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                    {/* begin::User */}
                                    <div className="d-flex flex-column">
                                        {/* begin::Name */}
                                        <div className="d-flex align-items-center mb-2">
                                            
                                            <a className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                                                {MY_ACCOUNT_BASIC.displayName}
                                            </a>
                                        </div>
                                        {/* end::Name */}

                                        {/* begin::Info */}
                                        <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                            
                                            <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                <i className="ki-duotone ki-profile-circle fs-4 me-1">
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                    <span className="path3"></span>
                                                </i> 
                                                {MY_ACCOUNT_BASIC.role === "customer"? 'CUSTOMER' : ''}
                                                {MY_ACCOUNT_BASIC.role === "owner"? 'OWNER' : ''}
                                            </a>
                                            <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                <i className="ki-duotone ki-geolocation fs-4 me-1">
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                    <span className="path3"></span>
                                                </i> {MY_ACCOUNT_BASIC.state}{" ," + MY_ACCOUNT_BASIC.country }
                                            </a>
                                            <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                <i className="ki-duotone ki-sms fs-4 me-1">
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                    <span className="path3"></span>
                                                </i> {MY_ACCOUNT_BASIC.email}
                                            </a>
                                        </div>
                                        {/* end::Info */}
                                        
                                    </div>
                                    {/* end::User */}
                                    {/* begin::Actions */}
                                    {/* end::Actions */}
                                </div>
                                {/* end::Title */}
                                
                            </div>
                            {/* end::Info */}
                        </div>
                        {/* end::Details */}

                        {/* begin::Navs */}
                        {(DASHBOARD_SUBMENUS && DASHBOARD_SUBMENUS.length > 0)?
                        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                            {/* begin::Nav item */}
                            {(DASHBOARD_SUBMENUS.map((submenu, index) => {
                                const { meta, router, params }  = submenu;
                                const { param2, param1 }        = params;

                                if( param1 === "my-account"){
                                    return (<li className="nav-item mt-2" key={index}>
                                        <Link className={`nav-link text-active-primary ms-0 me-10 py-5 ${(PARAM2 === param2)? 'active': ''}`} to={router.redirectTo}>
                                            {meta.menuTitle}
                                        </Link>
                                    </li>)
                                } else {
                                    return (<React.Fragment key={index} />)
                                }
                            }))}
                            {/* end::Nav item */}
                            
                        </ul> : <></>}
                        {/* begin::Navs */}
                    </div>
                </div>
            </> : <></>}
        </>}
        <Outlet />
    </>);
};

export {
    MyAccount,
    Overview as MyAccountOverview,
    Settings as MyAccountSettings
};