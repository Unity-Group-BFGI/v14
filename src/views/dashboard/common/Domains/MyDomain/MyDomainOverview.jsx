import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update_menu } from "../../../../../includes/redux/slices/menu.slice";
import { update_my_domain } from "../../../../../includes/redux/slices/domain.slice";
import ENDPOINTS from '../../../../../includes/constants/routes';

const MyDomainOverview = () => {
    const { ENDPOINT }                      = ENDPOINTS;     
    const dispatch                          = useDispatch();
    const { id }                            = useParams();
    const [loading, setLoading]             = useState(true);
    const { ROUTES_LOADED, USER }           = useSelector(state => state.auth);
    const { MY_DOMAIN }                     = useSelector(state => state.domain);
    const { MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE }  = useSelector(state => state.constants);
    const [domain,setDomain]                = useState({
        metadata:{
            site_url: '',
            site_title: '',
            site_description: '',
            site_logo_url: '',
            site_contact_email: ''
        },
        admins: []
    });

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
                        setDomain(domain);
                        setLoading(false);
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

            PAGE_HEADING: 'My Domain Overview',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Domains',
            BREADCRUM_THREE: 'My Domain',
            TAB_TITLE: 'Overview | My Domain | Domains | Dashboard',
            DYNAMIC_HEADER: 'MY-DOMAIN-OVERVIEW'
        }));
    },[id]);

    // event for load domain   ------------- [step 2]
    useEffect(() => {
        if(MY_DOMAIN && MY_DOMAIN.LOADED){
            if (ROUTES_LOADED) {
                if (MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE && MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE.endpoint) {
                    // load api keys
                    loadDomain();
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
        } else {
            toast.error("Domain root is not yet loaded", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }, [ROUTES_LOADED]);

    useEffect(() => {
        return () => {
            setLoading(true);
        }
    },[]);

    return (<>
        {loading? <> Loading... </> : <>
            <div className="card">
                {/* Card header */}
                <div className="card-header">
                    {/* Card title */}
                    <div className="card-title fs-3 fw-bold">Domain Overview</div>
                    {/* End Card title */}
                </div>
                {/* End Card header */}
                {/* Form */}
                <form id="kt_project_settings_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" noValidate>
                    {/* Card body */}
                    <div className="card-body p-9">

                        {/* Row */}
                        <div className="row mb-8">
                            {/* Col */}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Site title</div>
                            </div>
                            {/* End Col */}
                            {/* Col */}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <input 
                                    type="text" 
                                    className="form-control form-control-solid" 
                                    name="site_title" 
                                    value={domain.metadata.site_title || ''} 
                                    onChange={(event) => setDomain({
                                        ...domain,
                                        metadata:{
                                            ...domain.metadata,
                                            site_title: event.target.value
                                        }
                                    })}
                                />
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                            {/* End Col */}
                        </div>
                        {/* End Row */}
                        {/* Row */}
                        <div className="row mb-8">
                            {/* Col */}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Site url</div>
                            </div>
                            {/* End Col */}
                            {/* Col */}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <input type="text" className="form-control form-control-solid" name="site_url" disabled readOnly value={domain.metadata.site_url || ''} />
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                            {/* End Col */}
                        </div>
                        {/* End Row */}

                        {/* Row */}
                        <div className="row mb-8">
                            {/* Col */}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Site Description</div>
                            </div>
                            {/* End Col */}
                            {/* Col */}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <textarea 
                                    name="site_description" 
                                    className="form-control form-control-solid h-100px"
                                    value={domain.metadata.site_description}
                                    onChange={(event) => setDomain({
                                        ...domain,
                                        metadata:{
                                            ...domain.metadata,
                                            site_description: event.target.value
                                        }
                                    })}
                                ></textarea>
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                            {/* Col */}
                        </div>
                        {/* End Row */}

                        {/* Row */}
                        <div className="row mb-8">
                            {/* Col */}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Site contact</div>
                            </div>
                            {/* End Col */}
                            {/* Col */}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <input 
                                    type="email" 
                                    className="form-control form-control-solid" 
                                    name="site_contact_email" 
                                    value={domain.metadata.site_contact_email || ''}
                                    onChange={(event) => setDomain({
                                        ...domain,
                                        metadata:{
                                            ...domain.metadata,
                                            site_contact_email: event.target.value
                                        }
                                    })}
                                    required 
                                />
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                            {/* End Col */}
                        </div>
                        {/* End Row */}
                        
                    </div>
                    {/* End Card body */}
                    {/* Card footer */}
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2">Discard</button>
                        <button type="submit" className="btn btn-sm btn-primary" id="kt_project_settings_submit">Save Changes</button>
                    </div>
                    {/* End Card footer */}
                    <input type="hidden" />
                </form>
                {/* End Form */}
            </div>
        </>}
    </>);
};

export default MyDomainOverview;
