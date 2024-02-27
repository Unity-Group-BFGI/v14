import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import ENDPOINTS from '../../../../includes/constants/routes';
import { update_menu } from "../../../../includes/redux/slices/menu.slice";
import { update_loader } from "../../../../includes/redux/slices/loader.slice";
import { MY_DOMAIN_OVERVIEW_DYNAMIC_MENU } from "../../../../includes/constants/domain";
import MyDomainOverview from "./MyDomain/MyDomainOverview";
import MyDomainApiKeys from "./MyDomain/MyDomainApiKeys";
import { MyDomainOverviewSkeleton } from "../../../../components/Skeletons/domains";
import { update_my_domain } from "../../../../includes/redux/slices/domain.slice";

const MyDomain = () => {
    const dispatch                                          = useDispatch();
    const { id }                                            = useParams();
    const { ENDPOINT }                                      = ENDPOINTS;
    const { ROUTES_LOADED, USER }                           = useSelector(state => state.auth);
    const { MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE }           = useSelector(state => state.constants);
    const { CURRENT_DYNAMIC_PARAM }                         = useSelector(state => state.menu);
    const { CURRENT_DYNAMIC_MENU }                          = useSelector( state => state.menu );
    const { DYNAMIC_MENU_LOADING }                          = useSelector( state => state.menu );
    const { MY_DOMAIN }                                     = useSelector(state => state.domain);
    const [dmenu, setDmenu]                                 = useState([]);
    const [context, currentContext]                         = useState(<>loading...</>);

    // update states inside request --------- [step 3]
    const loadDomain = () => {
        
        if (MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE.endpoint) {

            axios.get(`${ENDPOINT}${MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE.endpoint}/${id}`, {
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }, ).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { domain } = response.data.success.json;
                        dispatch(update_my_domain({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            DOMAIN: domain
                        }));

                        dispatch(update_menu({
                            CURRENT_PRIMARY_MENU: 'DOMAINS',
                            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MY-DOMAINS-OVERVIEW',
                            CURRENT_DYNAMIC_MENU: "MY-DOMAIN",
                            CURRENT_DYNAMIC_PARAM: 'MY-DOMAIN-OVERVIEW',

                            PRIMARY_MENU_LOADING: false,
                            SECONDARY_MENU_LOADING: false,

                            IS_DYNAMIC_MENU_ACTIVE: true,
                            DYNAMIC_MENU_LOADING: false,
                            HAS_DYNAMIC_MENU: true,
                            DYNAMIC_MENU_FOR: 'DOMAINS',


                            PAGE_HEADING: 'My Domain',
                            BREADCRUM_ONE: 'Dashboard',
                            BREADCRUM_TWO: 'Domains',
                            BREADCRUM_THREE: 'My Domain',
                            DYNAMIC_HEADER: 'MY-DOMAIN'
                        }));

                        dispatch(update_loader({
                            LOADER_LOADING: false
                        }));
                    }
                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    dispatch(update_my_domain({
                        LOADED: true,
                        LOADING: false,
                        FAILED: true,
                        DOMAIN: null
                    }));

                    
                }
            }).catch((error) => {

                if (axios.isCancel(error)) {
                    toast.info(error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                } else {
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                    dispatch(update_my_domain({
                        LOADED: true,
                        LOADING: false,
                        FAILED: true,
                        DOMAIN: null
                    }));
                    
                }
            });

        } else {
            toast.warning("Failed to get my domain endpoint", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            dispatch(update_my_domain({
                LOADED: true,
                LOADING: false,
                FAILED: true,
                DOMAIN: null
            }));
        }


    };

    // event when domain id found ------------- [step 1]
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'DOMAINS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MY-DOMAINS-OVERVIEW',
            CURRENT_DYNAMIC_MENU: 'MY-DOMAIN',
            CURRENT_DYNAMIC_PARAM: 'MY-DOMAIN-OVERVIEW',
            
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            IS_DYNAMIC_MENU_ACTIVE: true,
            DYNAMIC_MENU_LOADING: true,
            HAS_DYNAMIC_MENU: true,
            DYNAMIC_MENU_FOR: 'DOMAINS',

            PAGE_HEADING: 'My Domain',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Domains',
            BREADCRUM_THREE: 'My Domain',
            TAB_TITLE: 'My Domain | Domains | Dashboard',
            DYNAMIC_HEADER: 'MY-DOMAIN'
        }));
    },[id]);

    // event for load domain   ------------- [step 2]
    useEffect(() => {
        if (ROUTES_LOADED) {
            if (MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE) {
                loadDomain();
            } else {
                toast.warning("Failed to get my domain endpoint", {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                dispatch(update_loader({
                    LOADER_LOADING: false
                }));
            }
        } else {
            dispatch(update_loader({
                LOADER_LOADING: true
            }));
        }
    }, [ROUTES_LOADED]);

    useEffect(() => {
        if(CURRENT_DYNAMIC_MENU === "MY-DOMAIN"){
            setDmenu(MY_DOMAIN_OVERVIEW_DYNAMIC_MENU);
        } else {
            setDmenu([]);
        }
    },[CURRENT_DYNAMIC_MENU]);

    // on dynamic route change [switch tabs]
    useEffect(() => {
        if ( CURRENT_DYNAMIC_PARAM == "MY-DOMAIN-OVERVIEW" ) {
            currentContext(<MyDomainOverview />);
        } else if ( CURRENT_DYNAMIC_PARAM == "MY-DOMAIN-APIS" ) {
            currentContext(<MyDomainApiKeys />);
        } else {
            currentContext(<>404 {CURRENT_DYNAMIC_PARAM}</>);
        }
    }, [CURRENT_DYNAMIC_PARAM]);

    return (<>
        {MY_DOMAIN && <>
            {MY_DOMAIN.LOADED && <>
                {/* begin:: overview edit quiz */}
                <>
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            {/* begin::Details */}
                            <div className="d-flex flex-sm-nowrap">
                                {/* begin: Pic */}
                                <div className="me-7 mb-4">

                                    {MY_DOMAIN.DOMAIN && MY_DOMAIN.DOMAIN.metadata && <>
                                        {MY_DOMAIN.DOMAIN.metadata.site_logo_url? <div className="symbol symbol-50px symbol-fixed position-relative">

                                        </div> : <div className="symbol symbol-50px symbol-fixed position-relative" style={{ background: "#f3f3f3", padding: "10px 13px" }}>
                                            <i className="fa fa-globe" style={{ fontSize: '30px' }}></i>
                                        </div>}
                                    </>}

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
                                                    {MY_DOMAIN.DOMAIN && MY_DOMAIN.DOMAIN.metadata && <>
                                                        {MY_DOMAIN.DOMAIN.metadata.site_title}
                                                    </>}
                                                </a>
                                            </div>
                                            {/* end::Name */}

                                            {/* begin::Info */}
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {MY_DOMAIN.DOMAIN && MY_DOMAIN.DOMAIN.metadata && <>
                                                        {MY_DOMAIN.DOMAIN.metadata.site_description}
                                                    </>}
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
                            {(!DYNAMIC_MENU_LOADING) ? <>
                                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                                    {/* begin::Nav item */}
                                    {(dmenu && dmenu.length > 0 && dmenu.map((menu, index) => {
                                        const { meta, params, key } = menu;
                                        const { param3 } = params;
                                        return (<li className="nav-item mt-2" key={key}>
                                            <a
                                                type="button"
                                                className={`nav-link text-active-primary ms-0 me-10 py-5 ${(CURRENT_DYNAMIC_PARAM === param3) ? 'active' : ''}`}
                                                onClick={() => dispatch(update_menu({
                                                    CURRENT_DYNAMIC_PARAM: param3
                                                }))}
                                            >
                                                {meta.heading}
                                            </a>
                                        </li>)
                                    }))}
                                    {/* end::Nav item */}
                                </ul>
                            </> :
                                <></>}
                            {/* begin::Navs */}
                        </div>
                    </div>
                </>
                {/* end:: overview edit quiz */}

                {/* begin:: dynamic tabs edit quiz */}
                {context}
                {/* end:: dynamic tabs edit quiz */}
            </>}
            {MY_DOMAIN.LOADING && <>
                <MyDomainOverviewSkeleton />
            </>}
        </>}
    </>);
};

export default MyDomain;