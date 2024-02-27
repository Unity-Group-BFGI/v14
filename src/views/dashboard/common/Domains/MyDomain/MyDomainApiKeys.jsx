import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { MyDomainApiKeyTrSkeleton } from "../../../../../components/Skeletons/domains";
import ENDPOINTS from '../../../../../includes/constants/routes';
import { update_menu } from "../../../../../includes/redux/slices/menu.slice";
import { useParams } from "react-router-dom";
import {
    update_my_domain,
    update_my_domain_api_keys,
    update_my_domain_services
} from "../../../../../includes/redux/slices/domain.slice";
import { update_market } from "../../../../../includes/redux/slices/market.slice";


const MyDomainApiKeys = () => {
    const { ENDPOINT } = ENDPOINTS;
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { MY_DOMAIN } = useSelector(state => state.domain);
    const { MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE } = useSelector(state => state.constants);
    const { MY_DOMAINS_MY_DOMAIN_ACTIVATE_LICENSE_ROUTE } = useSelector(state => state.constants);
    const [fetching, setFetching] = useState(false);

    const loadApiKeys = (where = {}, pagination = {}, search = {}) => {
        if (MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE && MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE.endpoint) {
            // set loading
            setFetching(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE.endpoint}/${id}`, {
                pagination: {
                    currentPage: 1,
                    perPage: 10,
                    ...pagination
                },
                where: {
                    status: MY_DOMAIN.API_KEYS.SELECTED_STATUS,
                    service: MY_DOMAIN.API_KEYS.SELECTED_SERVICE,
                    ...where
                },
                search: {
                    status: false,
                    query: '',
                    ...search
                }
            }, {
                headers: {
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {

                if (response.data.success) {
                    if (response.data.success.has_json) {
                        dispatch(update_my_domain_api_keys({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            API_KEYS: [...response.data.success.json.apiServices]
                        }));
                        setFetching(false);
                    }
                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setFetching(false);
            });
        } else {
            toast.warning("Failed to get load api keys endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // readable time
    const readableTime = (milliseconds) => {
        // Create a new Date object with the milliseconds
        const dateObject = new Date(milliseconds);

        // Get the parts of the date (day, month, year, hours, minutes, seconds)
        const year = dateObject.getFullYear();
        const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObject.getDate()).slice(-2);
        const hours = ('0' + dateObject.getHours()).slice(-2);
        const minutes = ('0' + dateObject.getMinutes()).slice(-2);
        const seconds = ('0' + dateObject.getSeconds()).slice(-2);

        // Construct the readable time format
        return `${day}/${month}/${year}`;

    };

    // generate keys
    const generateKeys = (item) => {
        if(MY_DOMAINS_MY_DOMAIN_ACTIVATE_LICENSE_ROUTE && MY_DOMAINS_MY_DOMAIN_ACTIVATE_LICENSE_ROUTE.endpoint){
            const confirmT = confirm("Are you sure you want to activate this license? after activating it will start expire time and this process is undoable.");
            if( confirmT ) {
                axios.post(`${ENDPOINT}${MY_DOMAINS_MY_DOMAIN_ACTIVATE_LICENSE_ROUTE.endpoint}/${item._id}`, {
                    license:{
                        ...item
                    }
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {

                    if (response.data.success) {
                        if (response.data.success.has_json) {
                            loadApiKeys();
                        }
                    }

                    if (response.data.error) {
                        toast.error(response.data.error.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                    }

                }).catch(error => {
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }).finally(() => {
                    
                }); 
            }
        } else {
            toast.warning("Failed to get activate api keys endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // event when domain id found ------------- [step 1]
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'DOMAINS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MY-DOMAINS-OVERVIEW',
            CURRENT_DYNAMIC_MENU: 'MY-DOMAIN',
            CURRENT_DYNAMIC_PARAM: 'MY-DOMAIN-APIS',

            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            PAGE_HEADING: 'My Domain Apis',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Domains',
            BREADCRUM_THREE: 'My Domain',
            TAB_TITLE: 'Apis | My Domain | Domains | Dashboard',
            DYNAMIC_HEADER: 'MY-DOMAIN-APIS'
        }));
    }, [id]);

    // event for load domain   ------------- [step 2]
    useEffect(() => {
        if (ROUTES_LOADED) {
            if (MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE && MY_DOMAINS_MY_DOMAIN_GET_API_KEYS_ROUTE.endpoint) {
                // load api keys
                loadApiKeys();
            } else {
                toast.warning("Failed to get api keys endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {

        }
    }, [ROUTES_LOADED]);

    return (<>


        {/* begin:: Apis keys by services */}
        <div className="card mb-6">
            {/* Card Header */}
            <div className="card-header card-header-stretch">
                {/* Card Title */}
                <div className="card-title">
                    <h3>API Keys</h3>
                </div>
                {/* End Card Title */}
            </div>
            {/* End Card Header */}
            {/* Card Body */}
            <div className="card-body p-0">
                {/* Table Wrapper */}
                <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9" id="kt_api_keys_table">
                        {/* Table Head */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="ps-9">Service</th>
                                <th className="min-w-100px">Created</th>
                                <th className="min-w-100px">Status</th>
                                <th className=""></th>

                            </tr>
                        </thead>
                        {/* End Table Head */}
                        {/* Table Body */}
                        <tbody className="fs-6 fw-semibold text-gray-600">
                            {<>
                                {MY_DOMAIN.LOADED && MY_DOMAIN.API_KEYS && <>
                                    {MY_DOMAIN.API_KEYS.LOADING && <>
                                        <MyDomainApiKeyTrSkeleton />
                                    </>}
                                    {MY_DOMAIN.API_KEYS.LOADED && MY_DOMAIN.API_KEYS.API_KEYS && <>
                                        {MY_DOMAIN.API_KEYS.API_KEYS.length <= 0 && <>
                                            <tr>
                                                <td colSpan={4} className="ps-9 text-center">
                                                    0 Services found
                                                </td>

                                            </tr>
                                        </>}
                                        {MY_DOMAIN.API_KEYS.API_KEYS.length > 0 && MY_DOMAIN.API_KEYS.API_KEYS.map((item, index) => {
                                            const { _serviceKey , apiKey, createdAt, 
                                                expiresAt, status, _id } = item;
                                            return (<tr key={index}>
                                                <td className="ps-9">
                                                    {_serviceKey === "ieltslms-wp" && "IELTS LMS WP"}
                                                </td>
                                                <td>
                                                    {readableTime(createdAt)} - 
                                                    {readableTime(expiresAt)}
                                                </td>
                                                <td>
                                                    <span className="badge badge-light-primary fs-7 fw-semibold">
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="pe-9 d-flex">
                                                    {status === "pending" && <>
                                                        <button onClick={() => generateKeys(item)} type="button" className="btn btn-sm btn-light-primary">
                                                            <i className="fa fa-key"></i> Generate key
                                                        </button>
                                                    </>}
                                                    {status === "activated" && <>
                                                        <button data-action="copy" className="btn btn-color-gray-500 btn-active-color-primary btn-icon btn-sm btn-outline-light">
                                                            <i className="fa fa-copy fs-3"></i>
                                                        </button> &nbsp; &nbsp;
                                                        <div className="w-100px position-relative">
                                                            <select
                                                                className="form-select form-select-sm form-select-solid"
                                                                value={status}
                                                            >
                                                                <option value="disable">Disable</option>
                                                                <option value="active">Active</option>
                                                            </select>
                                                        </div>
                                                    </>}
                                                    
                                                </td>
                                            </tr>)
                                        })}
                                    </>}
                                </>}
                            </>}
                        </tbody>
                        {/* End Table Body */}
                    </table>
                    {/* End Table */}
                </div>
                {/* End Table Wrapper */}
            </div>
            {/* End Card Body */}
        </div>

        {/* begin:: Redeem services */}
        <RedeemServices />
        {/* end:: Redeem services */}


    </>);
};


const RedeemServices = () => {
    const { ENDPOINT } = ENDPOINTS;
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { MY_DOMAIN } = useSelector(state => state.domain);
    const { MY_DOMAIN_GET_SERVICES_ROUTE } = useSelector(state => state.constants);
    const [servicesModal, setServicesModal] = useState(false);

    // handle close service modal
    const handleCloseServiceModal = () => {
        setServicesModal(false);
    };

    // add domain service modal
    const addDomainServiceModal = () => {
        setServicesModal(true);
    };


    const loadServices = () => {
        if (MY_DOMAIN_GET_SERVICES_ROUTE && MY_DOMAIN_GET_SERVICES_ROUTE.endpoint) {
            axios.post(`${ENDPOINT}${MY_DOMAIN_GET_SERVICES_ROUTE.endpoint}/${id}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        dispatch(update_my_domain_services({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            MY_SERVICES: [...response.data.success.json.myServices]
                        }));

                    }
                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {

            });
        } else {
            toast.warning("Failed to get domain services endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    useEffect(() => {
        if (ROUTES_LOADED) {
            if (MY_DOMAIN_GET_SERVICES_ROUTE && MY_DOMAIN_GET_SERVICES_ROUTE.endpoint) {
                if (MY_DOMAIN && MY_DOMAIN.LOADED) {
                    if (MY_DOMAIN.SERVICES && MY_DOMAIN.SERVICES.MY_SERVICES && MY_DOMAIN.SERVICES.MY_SERVICES.length <= 0) {
                        // load domain based services
                        loadServices();
                    }
                }
            } else {
                toast.warning("Failed to get domain services endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    }, [ROUTES_LOADED]);

    return (<>
        {MY_DOMAIN && MY_DOMAIN.LOADED && <>
            <div className="card mb-6">
                {/* Card Header */}
                <div className="card-header card-header-stretch">
                    {/* Card Title */}
                    <div className="card-title">
                        <h3>Redeem Service</h3>
                    </div>
                    {/* End Card Title */}
                </div>
                {/* End Card Header */}
                {/* Card Body */}
                <div className="card-body">
                    {/* Row */}
                    <div className="row gx-9 gy-6">
                        {MY_DOMAIN.SERVICES && MY_DOMAIN.SERVICES.LOADING && <>

                        </>}
                        {MY_DOMAIN.SERVICES && MY_DOMAIN.SERVICES.LOADED && <>
                            {MY_DOMAIN.SERVICES.MY_SERVICES && MY_DOMAIN.SERVICES.MY_SERVICES.length > 0 && <>
                                {MY_DOMAIN.SERVICES.MY_SERVICES.map((service, index) => {
                                    return <div>Service {index}</div>
                                })}
                            </>}
                        </>}

                        <div className="col-xl-12">
                            {/* Notice */}
                            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed h-lg-100 p-6">
                                {/* Wrapper */}
                                <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                    {/* Content */}
                                    <div className="mb-3 mb-md-0 fw-semibold">
                                        <h4 className="text-gray-900 fw-bold">Important Note!</h4>
                                        <div className="fs-6 text-gray-700 pe-7">Please carefully read <a href="#" className="fw-bold me-1">Product Terms</a> adding <br /> your new payment card</div>
                                    </div>
                                    {/* End Content */}
                                    {/* Action */}
                                    <button onClick={addDomainServiceModal} type="button" className="btn btn-primary px-6 align-self-center text-nowrap">
                                        Add Service
                                    </button>
                                    {/* End Action */}
                                </div>
                                {/* End Wrapper */}
                            </div>
                            {/* End Notice */}
                        </div>


                    </div>
                    {/* End Row */}
                </div>
                {/* End Card Body */}
            </div>
            {servicesModal && <GetServicesList servicesModal={servicesModal} handleClose={handleCloseServiceModal} />}
        </>}
    </>)
};


const GetServicesList = ({ servicesModal, handleClose }) => {
    const dispatch = useDispatch();
    const { ENDPOINT }  = ENDPOINTS;
    const { id }        = useParams();
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { MARKET_LOAD_PRODUCTS_ROUTE } = useSelector(state => state.constants);
    const { MY_DOMAIN_ADD_SERVICE_ROUTE } = useSelector(state => state.constants);
    const { MARKET } = useSelector(state => state.market);
    const { MY_DOMAIN } = useSelector(state => state.domain);

    const loadProductAndServices = (pagination = {}, where = {}, search = {}) => {
        if (MARKET_LOAD_PRODUCTS_ROUTE && MARKET_LOAD_PRODUCTS_ROUTE.endpoint) {

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
                headers: {
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

    // add service to domain
    const addServiceToDomain = (event) => {
        event.preventDefault();
        if(MY_DOMAIN_ADD_SERVICE_ROUTE && MY_DOMAIN_ADD_SERVICE_ROUTE.endpoint){
            
            axios.post(`${ENDPOINT}${MY_DOMAIN_ADD_SERVICE_ROUTE.endpoint}/${id}`, {
                service:{
                    _serviceId: MY_DOMAIN.SELECTED_SERVICE._id,
                    _serviceKey: MY_DOMAIN.SELECTED_SERVICE._key,
                    _serviceRedeemCode: MY_DOMAIN.SELECTED_SERVICE._code,
                    _domainId: id,
                    platforms: MY_DOMAIN.SELECTED_SERVICE.platforms,
                    title: MY_DOMAIN.SELECTED_SERVICE.title,
                }
            }, {
                headers: {
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {

                if (response.data.success) {
                    if (response.data.success.has_json) {
                        
                    }
                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                
            }).finally(() => {
                
                
            });
        } else {
            toast.warning("Failed to get add service to domain endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    };

    // event for load market products
    useEffect(() => {
        if (ROUTES_LOADED) {
            if (MARKET_LOAD_PRODUCTS_ROUTE && MARKET_LOAD_PRODUCTS_ROUTE.endpoint) {
                if (MARKET && MARKET.PRODUCTS && MARKET.PRODUCTS.length <= 0) {
                    loadProductAndServices();
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
        }
    }, [ROUTES_LOADED]);

    return (
        <Modal
            show={servicesModal}
            centered
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            {/* begin::Modal header */}
            <div className="modal-header">
                {/* begin::Modal title */}
                <h2>Add Service to Domain</h2>
                {/* end::Modal title */}
                {/* begin::Close */}
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </div>
                {/* end::Close */}
            </div>
            {/* end::Modal header */}

            {/* begin::Modal body */}
            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                {/* begin::Form */}
                {MARKET && MARKET.LOADED && <>
                    {MARKET.PRODUCTS && MARKET.PRODUCTS.length <= 0 && <>
                        {/* 0 products found */}
                    </>}
                    {MARKET.PRODUCTS && MARKET.PRODUCTS.length > 0 && <>
                        <div className="row gx-9 gy-6">
                            {MARKET.PRODUCTS.map((product, index) => {
                                return <SingleProduct key={product._id} product={product} />
                            })}
                        </div>
                    </>}
                </>}
                {/* end::Form */}
            </div>
            {/* end::Modal body */}
            {MY_DOMAIN.SELECTED_SERVICE !== null && <>
                <div className="modal-footer">
                    <form style={{ display: 'contents' }} onSubmit={addServiceToDomain}>
                        <div className="d-flex flex-row align-items-center justify-content-between w-100">
                            <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container" style={{ width: '80%' }}>
                                <label className="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                                    <span className="required">Redeem key</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-solid w-100"
                                    placeholder="Enter Redeem code"
                                    value={MY_DOMAIN.SELECTED_SERVICE && MY_DOMAIN.SELECTED_SERVICE._code}
                                    onChange={(event) => dispatch(update_my_domain({
                                        ...MY_DOMAIN,
                                        SELECTED_SERVICE: {
                                            ...MY_DOMAIN.SELECTED_SERVICE,
                                            _code: event.target.value
                                        }
                                    }))}
                                    required
                                />
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                            <button className="btn btn-sm btn-primary">
                                Next &nbsp; <i className="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </>}
        </Modal>
    );
};


// single product
const SingleProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { MY_DOMAIN } = useSelector(state => state.domain);

    return (<>
        <div className="col-xl-6" data-kt-billing-element="card">
            {/* begin::Card */}
            <div className={`card ${MY_DOMAIN.SELECTED_SERVICE && MY_DOMAIN.SELECTED_SERVICE._id === product._id ? 'card-dashed border-primary' : 'card-dashed'} h-xl-100 flex-row flex-stack flex-wrap p-6`}>
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

                    <button onClick={() => dispatch(update_my_domain({
                        SELECTED_SERVICE: product
                    }))} className="btn btn-sm btn-light-primary btn-active-light-primary me-3" data-kt-indicator="off">
                        {/* begin::Indicator label */}
                        <span className="indicator-label">
                            {MY_DOMAIN.SELECTED_SERVICE && MY_DOMAIN.SELECTED_SERVICE._id === product._id ? 'Selected' : 'Select'}
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


export default MyDomainApiKeys;



