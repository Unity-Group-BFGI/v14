import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { update_menu } from "../../../../includes/redux/slices/menu.slice";
import { update_loader } from "../../../../includes/redux/slices/loader.slice";
import ENDPOINTS from '../../../../includes/constants/routes';
import { update_my_domains, update_my_domains_states } from "../../../../includes/redux/slices/domain.slice";
import { MyDomainsOverviewSkeleton, MyDomainsSingleDomainSkeleton, MyDomainsDomainsListSkeleton } from "../../../../components/Skeletons/domains";
import { Link, useNavigate } from "react-router-dom";

const DashboardMyDomains = () => {
    const dispatch                              = useDispatch();
    const navigate                              = useNavigate();
    const { ENDPOINT }                          = ENDPOINTS;
    const { MY_DOMAINS }                        = useSelector( state => state.domain ); 
    const { MY_DOMAINS_STATES }                 = useSelector( state => state.domain ); 
    const { MY_DOMAINS_LIST_ROUTE }             = useSelector( state => state.constants );
    const { USER, ROUTES_LOADED, ROLE }         = useSelector( state => state.auth );
    const [fetching,setFetching]                = useState(false);

    
    const filterByStatus = (status) => {
        dispatch(update_my_domains_states({
            SELECTED_STATUS: status
        }));
        fetchDomains({ status: status });
    };
    
    const fetchDomains = (where = {}, pagination = {}, search = {}) => {
        if(MY_DOMAINS_LIST_ROUTE && MY_DOMAINS_LIST_ROUTE.endpoint){
            // set loading
            setFetching(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_LIST_ROUTE.endpoint}`, {
                pagination: {
                    currentPage: 1,
                    perPage: 10,
                    ...pagination
                },
                where: {
                    status: MY_DOMAINS_STATES.SELECTED_STATUS,
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
                        dispatch(update_my_domains({
                            LOADING: false,
                            LOADED: true,
                            FAILED: false,
                            DOMAINS: [...response.data.success.json.domains]
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

                    dispatch(update_my_domains({
                        LOADING: false,
                        LOADED: false,
                        FAILED: true
                    }));
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
                dispatch(update_loader({
                    LOADER_LOADING: false
                }));
            });
        } else {

        }
    };

    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'DOMAINS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MY-DOMAINS-OVERVIEW',
            CURRENT_DYNAMIC_MENU: null,

            
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            IS_DYNAMIC_MENU_ACTIVE: false,
            DYNAMIC_MENU_LOADING: false,
            HAS_DYNAMIC_MENU: false,
            DYNAMIC_MENU_FOR: null,

            PAGE_HEADING: 'My Domains Overview',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Domains',
            BREADCRUM_THREE: 'My Domains',
            TAB_TITLE: 'My Domains | Domains | Dashboard',
            DYNAMIC_HEADER: 'MY-DOMAINS-OVERVIEW'
        }));
    },[]);

    useEffect(() => {
        if (ROUTES_LOADED) {
            if(MY_DOMAINS_LIST_ROUTE && MY_DOMAINS_LIST_ROUTE.endpoint){
                dispatch(update_my_domains({
                    LOADING: true,
                    LOADED: false,
                    FAILED: false
                }));
                fetchDomains();
            } else {
                toast.error("My domains list route not found 1", {
                    position: "top-right",
                    autoClose: 3000,
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
    },[ROUTES_LOADED]);

    return (<>{MY_DOMAINS && <>
        {MY_DOMAINS.LOADING && !MY_DOMAINS.LOADED && <>
            <MyDomainsOverviewSkeleton />
        </>}
        {MY_DOMAINS.LOADED && <>
        
            <div className="d-flex flex-wrap flex-stack my-5">
                {/* Heading */}
                <h2 className="fs-2 fw-semibold my-2">
                    Domains 
                    <span className="fs-6 text-gray-500 ms-1">by Status</span>
                </h2>
                {/* End Heading */}

                {/* Controls */}
                <div className="d-flex flex-wrap my-1">
                    {/* Select wrapper */}
                    <div className="m-0">
                        {/* Select */}
                        <select 
                            name="status" 
                            className="form-select form-select-sm bg-body border-body fw-bold w-125px select2-hidden-accessible" 
                            tabIndex="-1" 
                            value={MY_DOMAINS_STATES.SELECTED_STATUS}
                            onChange={(event) => filterByStatus(event.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="disabled">Disabled</option>
                        </select>
                        {/* End Select */}
                    </div>
                    {/* End Select wrapper */}
                </div>
                {/* End Controls */}
            </div>  

            <div className="row g-6 g-xl-9">
                {fetching && <MyDomainsDomainsListSkeleton />}
                {!fetching && MY_DOMAINS.DOMAINS && MY_DOMAINS.DOMAINS.length > 0 && <>
                    {MY_DOMAINS.DOMAINS.map((domain,index) => {
                        return <DomainCard domain={domain} key={domain._id} />
                    })}
                </>}
                {!fetching && MY_DOMAINS.DOMAINS && MY_DOMAINS.DOMAINS.length <= 0 && <>

                    <div className="card mb-6">
                        <div className="card-body">
                            <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                            </svg>
                            <div className="text-center pt-10 mb-20">
                                <h2 className="fs-2 fw-bold mb-7">
                                    0 Domains
                                </h2>
                                <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                    There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                </p>
                                {<>
                                    <button 
                                        onClick={() => navigate(`/dashboard/@${ROLE}/domains/domain/add`)} 
                                        className='btn btn-thin btn-light-primary' 
                                        style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button"
                                    >
                                        <i className="fa fa-plus"></i> Add New Domain
                                    </button>
                                </>}
                                
                            </div>
                        </div>
                    </div>


                </>}
            </div>

        </>}
    </>}</>);
};

const DomainCard = ({ domain }) => {
    const { ROLE }                                      = useSelector( state => state.auth );
    const [site_logo,setSite_logo]                      = useState("");
    const [site_title,setSite_title]                    = useState("");
    const [site_description,setSite_description]        = useState("");
    const [site_status,setSite_status]                  = useState("");
    const [site_url,setSite_url]                        = useState("");
    const [site_created,setSite_created]                = useState("");
    const [site_contact_email,setSite_contact_email]    = useState("");
    const [loading,setLoading]                          = useState(true);

    useEffect(() => {
        
        if(domain.metadata){
            setSite_logo(domain.metadata.site_logo_url);
            setSite_title(domain.metadata.site_title);
            setSite_description(domain.metadata.site_description);
            setSite_status(domain.status);
            setSite_url(domain.metadata.site_url);
            setSite_contact_email(domain.metadata.site_contact_email);
            setSite_created(UnixTimeToReadableDateTime(domain._created));
            setLoading(false);            
        }
    },[domain]);

    return (<>{loading? <MyDomainsSingleDomainSkeleton /> :
        <div className="col-md-6 col-xl-4">
            <Link to={`/dashboard/@${ROLE}/domains/${domain._id}`} className="card border-hover-primary">
                {/* Card header */}
                <div className="card-header border-0 pt-9">

                    {/* Card Title */}
                    <div className="card-title m-0">

                        {/* Avatar */}
                        {site_logo? <>
                            <div className="symbol bg-light symbol-50px w-50px">
                                <img src={site_logo} alt={site_title} className="p-3" /> 
                                &nbsp; {site_url}
                            </div>
                        </> : <div className="symbol bg-light">
                            <i className="fa fa-globe"></i>
                            &nbsp; {site_url}
                        </div>}

                        
                        
                        {/* End Avatar */}
                    </div>
                    {/* End Card Title */}

                    {/* Card toolbar */}
                    <div className="card-toolbar">
                        {site_status && <>
                            {site_status == "active" && <span className="badge badge-light-primary fw-bold me-auto px-4 py-3"> Active </span>}
                            {site_status == "pending" && <span className="badge badge-light fw-bold me-auto px-4 py-3"> Pending </span>}
                            {site_status == "disabled" && <span className="badge badge-light-danger fw-bold me-auto px-4 py-3"> Disabled </span>}
                        </>}
                    </div>
                    {/* End Card toolbar */}

                </div>
                {/* End Card header */}

                {/* Card body */}
                <div className="card-body p-9">
                    {/* Name */}
                    <div className="fs-3 fw-bold text-gray-900">{site_title}</div>
                    {/* End Name */}

                    {/* Description */}
                    <p className="text-gray-500 fw-semibold fs-5 mt-1 mb-10">{site_description}</p>
                    {/* End Description */}

                    <div className="fs-6 d-flex justify-content-between mb-4">
                        <div className="fw-semibold">
                            {site_created}
                        </div>
                        <div className="d-flex fw-bold">
                            
                            <i className="fa fa-calendar"></i>
                        </div>
                    </div>
                    <div className="separator separator-dashed mb-4"></div>
                    <div className="fs-6 d-flex justify-content-between mb-4">
                        <div className="fw-semibold">
                            {site_contact_email}
                        </div> &nbsp;
                        <div className="d-flex fw-bold">
                            <i className="fa fa-envelope"></i>
                        </div>
                    </div>
                </div>
                {/* End Card body */}

            </Link>
        </div>}
    </>);
};

const UnixTimeToReadableDateTime = (unixTimeString) => {
    // Convert Unix timestamp string to milliseconds and create a Date object
    const date = new Date(parseInt(unixTimeString));

    // Format date and time components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Construct the readable date-time format
    const readableDateTime = `${day}/${month}/${year}`;

    return readableDateTime;
};



export default DashboardMyDomains;