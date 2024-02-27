import axios from "axios";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from "react-toastify";

import { update_menu } from "../../../../includes/redux/slices/menu.slice";
import ENDPOINTS from '../../../../includes/constants/routes';
import { update_loader } from "../../../../includes/redux/slices/loader.slice";
import { update_auth } from "../../../../includes/redux/slices/auth.slice";
import { update_market } from "../../../../includes/redux/slices/market.slice";


const DashboardMarketOverview = () => {
    const dispatch                          = useDispatch();
    const { ENDPOINT }                      = ENDPOINTS;
    const { ROUTES_LOADED, USER }           = useSelector( state => state.auth );
    const { MARKET_LOAD_PRODUCTS_ROUTE }    = useSelector(  state => state.constants );
    const { MARKET }                        = useSelector( state => state.market );


    const loadProductAndServices = (pagination = {}, where = {}, search = {}) => {
        if(MARKET_LOAD_PRODUCTS_ROUTE && MARKET_LOAD_PRODUCTS_ROUTE.endpoint){
            // set loading
            dispatch(update_loader({
                LOADER_LOADING: true
            }));
            axios.post(`${ENDPOINT}${MARKET_LOAD_PRODUCTS_ROUTE.endpoint}`, {
                pagination: {
                    currentPage: 1,
                    perPage: 10,
                    ...pagination
                },
                where: {
                    ...where
                },
                search: {
                    status: false,
                    query: '',
                    ...search
                }
            }, {
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {

                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { services } = response.data.success.json;
                        dispatch(update_market({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            PRODUCTS: services
                        }));
                    }
                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    dispatch(update_market({
                        LOADED: false,
                        LOADING: false,
                        FAILED: true,
                        PRODUCTS: []
                    }));
                }

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                dispatch(update_market({
                    LOADED: false,
                    LOADING: false,
                    FAILED: true,
                    PRODUCTS: []
                }));
            }).finally(() => {
                dispatch(update_loader({
                    LOADER_LOADING: false
                }));
            });
        } else {
            toast.warning("Failed to get market endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // event when route loaded ------------- [step 1]
    useEffect(() => {

        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'MARKET',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MARKET-OVERVIEW',
            CURRENT_DYNAMIC_MENU: 'MARKET',
            CURRENT_DYNAMIC_PARAM: 'MARKET-OVERVIEW',
            
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            IS_DYNAMIC_MENU_ACTIVE: false,
            DYNAMIC_MENU_LOADING: false,
            HAS_DYNAMIC_MENU: false,
            DYNAMIC_MENU_FOR: 'MARKET',

            PAGE_HEADING: 'Market',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Market',
            BREADCRUM_THREE: 'Product & Services',
            TAB_TITLE: 'Market | Market | Dashboard',
            DYNAMIC_HEADER: 'MARKET-OVERVIEW'
        }));
    },[]);

    // event for load market products
    useEffect(() => {
        dispatch(update_loader({
            LOADER_LOADING: true
        }));
        if (ROUTES_LOADED) {
            if(MARKET_LOAD_PRODUCTS_ROUTE && MARKET_LOAD_PRODUCTS_ROUTE.endpoint){
                if ( MARKET && MARKET.PRODUCTS && MARKET.PRODUCTS.length <= 0 ) {
                    loadProductAndServices();
                } else {
                    dispatch(update_loader({
                        LOADER_LOADING: false
                    }));
                }
            } else {
                toast.warning("Failed to get market endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            dispatch(update_loader({
                LOADER_LOADING: true
            }));
        }
    }, [ROUTES_LOADED]);

    return (<>
        {MARKET && MARKET.LOADED && <>
            {MARKET.PRODUCTS && MARKET.PRODUCTS.length <= 0 && <>
                {/* 0 products found */}
            </>}
            {MARKET.PRODUCTS && MARKET.PRODUCTS.length > 0 && <>
                <div className="row gx-9 gy-6">
                    {MARKET.PRODUCTS.map((product,index) => {
                        return <SingleProduct key={product._id} product={product} />
                    })}
                </div>
            </>}
        </>}
    </>);
};

// single product
const SingleProduct = ({ product }) => {
    return (<>
        <div className="col-xl-6" data-kt-billing-element="card">
            {/* begin::Card */}
            <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
            {/* begin::Info */}
            <div className="d-flex flex-column py-2">
                {/* begin::Owner */}
                <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                    {product.title}
                    <span className="badge badge-light-success fs-7 ms-2">Primary</span>
                </div>
                {/* end::Owner */}
                {/* begin::Wrapper */}
                <div className="d-flex align-items-center">
                    {/* begin::Icon */}
                    <img src={product.logo} alt={product.title} className="me-4" />
                    {/* end::Icon */}
                    {/* begin::Details */}
                    <div>
                        <div className="fs-6 fw-semibold text-gray-600">{product.description}</div>
                        <div className="fs-6 fw-bold">Platforms: {product.platforms.join(", ")}</div>
                    </div>
                    {/* end::Details */}
                </div>
                {/* end::Wrapper */}
            </div>
            {/* end::Info */}
            {/* begin::Actions */}
            <div className="d-flex align-items-center py-2">
                <button className="btn btn-sm btn-light-primary btn-active-light-primary me-3" data-kt-indicator="off">
                    {/* begin::Indicator label */}
                    <span className="indicator-label">
                        Activate
                    </span>
                    {/* end::Indicator label */}
                    {/* begin::Indicator progress */}
                    <span className="indicator-progress">
                        Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                    {/* end::Indicator progress */}
                </button>
            </div>
            {/* end::Actions */}
            </div>
            {/* end::Card */}
        </div>
    </>)
};


export default DashboardMarketOverview;