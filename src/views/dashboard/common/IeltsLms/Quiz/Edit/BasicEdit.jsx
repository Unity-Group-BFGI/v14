import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    IeltsLmsEditQuizBasicEditSkeleton,
    QuizForMyDomainsSkeleton,
    QuizForMyDomainsSingleSkeleton
} from "../../../../../../components/Skeletons/Ieltslms";
import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_ieltslms_editQuiz, update_ieltslms_myQuizzes } from "../../../../../../includes/redux/slices/ieltslms.slice";


// Quiz for domain
const QuizForDomain = ({ domain, total, count }) => {

    const { id }                                    = useParams();
    const { ENDPOINT }                              = ENDPOINTS;
    const { USER, ROUTES_LOADED, ROLE }             = useSelector(state => state.auth);
    const { MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE }   = useSelector(state => state.constants);
    const { MY_DOMAIN_GENERATE_POST_ROUTE }         = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ }                   = useSelector(state => state.ieltslms);
    const [sync,setSync]                            = useState(true);
    const [d,setD]                                  = useState(null);
    const [active,setActive]                        = useState(false);
    const [notice,setNotice]                        = useState(<></>);
    const [checking,setChecking]                    = useState(true);
    const [autoSync,setAutoSync]                    = useState(true);

    const loadDomain = () => {
        
        if (MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE.endpoint) {
            
            axios.get(`${ENDPOINT}${MY_DOMAINS_MY_DOMAIN_OVERVIEW_ROUTE.endpoint}/${domain._domainId}`, {
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }, ).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { domain } = response.data.success.json;
                        setD(domain);
                        setSync(false);
                        
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

                }
            });

        } else {
            toast.warning("Failed to get my domain endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            
        }
    };

    // check for if post exists for that domain
    const checkExistsOrMake = () => {
        if(d !== null){
            const { metadata, _hostTokenId, platform, status, _id } = d;
            if(MY_DOMAIN_GENERATE_POST_ROUTE && MY_DOMAIN_GENERATE_POST_ROUTE.endpoint){
                setNotice(<>Syncing...</>);
                setChecking(true);
                axios.post(`${ENDPOINT}${MY_DOMAIN_GENERATE_POST_ROUTE.endpoint}/${_id}`, {
                    post: {
                        _id: id
                    }
                },{
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }, ).then((response) => {
                    if (response.data.success) {
                        if (response.data.success) {
                            setNotice(<>
                                <p className="mb-0 text-success">
                                    {response.data.success.message}   
                                </p>
                            </>); 
                        }
                    }
    
                    if (response.data.error) {
                        setNotice(<>
                            <p className="mb-0 text-danger">
                                {response.data.error.message}   
                            </p>
                        </>);
                        toast.error(response.data.error.message, {
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
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
                        setNotice(<>
                            <p className="mb-0 text-danger">
                                {error.message}   
                            </p>
                        </>);
                        toast.error(error.message, {
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
    
                    }
                }).finally(() => {
                    setChecking(false);
                });
            } else{
                toast.warning("Failed to get domain post entry request endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    };

    useEffect(() => {
        if(sync){
            loadDomain();
        }
    },[domain]);

    useEffect(() => {
        if(!sync && d !== null){
            if(d.status == "active"){
                setActive(true);
                if(autoSync){
                    checkExistsOrMake();
                }
            }
        }
    },[sync,d,IELTS_LMS_EDIT_QUIZ]);

    return (<>
        {sync? <QuizForMyDomainsSingleSkeleton /> : <>
            {active && <>
                {/* begin::Item */}
                <div className="d-flex flex-stack">
                    <div className="d-flex">
                        {d.metadata && d.metadata.site_logo_url?
                            <img src={d.metadata && d.metadata.site_logo_url} className="w-30px me-6" alt="" /> 
                            :
                            <div className="d-flex justify-content-center flex-column align-items-center">
                                <i className="fa fa-globe me-6 fs-2x"></i>
                            </div>
                            
                        }
                        
                        <div className="d-flex flex-column">
                            <a href="#" className="fs-5 text-dark text-hover-primary fw-bold">{domain.domain}</a>
                            <div className="fs-6 fw-semibold text-gray-400">
                                {notice}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">

                        <button 
                            type="button" 
                            disabled={checking} 
                            className="btn btn-sm btn-light-primary"
                            onClick={checkExistsOrMake}
                        > 
                            {checking? <>Syncing...</> : <>Resync</>}
                        </button> &nbsp;

                        <div className="form-check form-check-solid form-check-custom form-switch">
                            <input onChange={(event) => setAutoSync(event.target.checked)} className="form-check-input w-45px h-30px" type="checkbox" id="auto-sync" checked={autoSync}  disabled={checking} />
                            <label className="form-check-label" htmlFor="auto-sync"></label>
                        </div>          
                    </div>
                </div>
                {/* end::Item */}
            </>}
            {count + 1 < total && <div className="separator separator-dashed my-5"></div>}
        </>}
    </>)
};


// Quiz for my domains
const QuizForMyDomains = () => {

    const { ENDPOINT }                          = ENDPOINTS;
    const { MY_DOMAINS_LIST_BY_SERVICES_ROUTE } = useSelector(state => state.constants);
    const { USER, ROUTES_LOADED, ROLE }         = useSelector(state => state.auth);
    const [loading, setLoading]                 = useState(true);
    const [domains, setDomains]                 = useState([]);

    const fetchDomains = (where = {}, pagination = {}, search = {}) => {
        if (MY_DOMAINS_LIST_BY_SERVICES_ROUTE && MY_DOMAINS_LIST_BY_SERVICES_ROUTE.endpoint) {
            // set loading

            axios.post(`${ENDPOINT}${MY_DOMAINS_LIST_BY_SERVICES_ROUTE.endpoint}`, {
                pagination: {
                    currentPage: 1,
                    perPage: 10,
                    ...pagination
                },
                condition:{
                    service: 'ieltslms-wp'
                },
                where: {
                    status: 'active',
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
                        const domains = [...response.data.success.json.domains];
                        setDomains(domains);
                        setLoading(false);
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
            toast.warning("Failed to locate my domains list endpoint", {
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
            if (MY_DOMAINS_LIST_BY_SERVICES_ROUTE && MY_DOMAINS_LIST_BY_SERVICES_ROUTE.endpoint) {
                fetchDomains();
            } else {
                toast.warning("Failed to locate my domains list endpoint", {
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
        {loading ? <QuizForMyDomainsSkeleton /> : <>

            <div className="card mb-5 mb-xl-10">
                {/* begin::Card header */}
                <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_connected_accounts" aria-expanded="true" aria-controls="kt_account_connected_accounts">
                    <div className="card-title m-0">
                        <h3 className="fw-bold m-0">Connected Domains</h3>
                    </div>
                </div>
                {/* end::Card header */}

                {/* begin::Content */}
                <div id="kt_account_settings_connected_accounts" className="collapse show">
                    {/* begin::Card body */}
                    <div className="card-body border-top p-9">
                        {/* begin::Notice */}
                        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6">
                            {/* begin::Icon */}
                            <i className="ki-duotone ki-design-1 fs-2tx text-primary me-4"></i>
                            {/* end::Icon */}
                            {/* begin::Wrapper */}
                            <div className="d-flex flex-stack flex-grow-1">
                                {/* begin::Content */}
                                <div className="fw-semibold">
                                    <div className="fs-6 text-gray-700">Two-factor authentication adds an extra layer of security to your account. To log in, you'll need to provide a 4-digit amazing code. <a href="#" className="fw-bold">Learn More</a></div>
                                </div>
                                {/* end::Content */}
                            </div>
                            {/* end::Wrapper */}
                        </div>
                        {/* end::Notice */}
                        {/* begin::Items */}
                        <div className="py-2">
                            {domains && domains.length > 0 && domains.map((domain, index) => {
                                return <QuizForDomain domain={domain} key={domain._id} total={domains.length} count={index} />
                            })}
                        </div>
                        {/* end::Items */}
                    </div>
                    {/* end::Card body */}
                    {/* begin::Card footer */}
                    
                    {/* end::Card footer */}
                </div>
                {/* end::Content */}
            </div>

        </>}
    </>);
};



const IeltsLmsEditQuizBasicEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { ENDPOINT } = ENDPOINTS;
    const { IELTS_LMS_EDIT_QUIZ } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE } = useSelector(state => state.constants);
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        _category: '',
        status: '',
        time: {
            timer: false,
            hh: 0,
            mm: 0,
            ss: 0
        },
        settings: {

        }
    });
    const [errors, setErrors] = useState({
        title: {
            status: false,
            message: '',
            type: ''
        },
        description: {
            status: false,
            message: '',
            type: ''
        },
        status: {
            status: false,
            message: '',
            type: ''
        },
        _category: {
            status: false,
            message: '',
            type: ''
        },
        timeHH: {
            status: false,
            message: '',
            type: ''
        },
        timeMM: {
            status: false,
            message: '',
            type: ''
        },
        timeSS: {
            status: false,
            message: '',
            type: ''
        },
        settings: {
            status: false,
            message: '',
            type: ''
        }
    });



    // change time
    const changeTime = (n, t = 0) => {

        if (t > -1 && t <= 60) {
            setInputs({
                ...inputs,
                time: {
                    ...inputs.time,
                    timer: inputs._category === "reading" || inputs._category === "listening" ? true : false,
                    [n]: t
                }
            });
        }
    };

    // events and functions
    const basicEditSubmit = (event) => {
        event.preventDefault();
        if (ROUTES_LOADED && IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE) {
            setSaving(true);
            axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE.endpoint}/${id}`, {
                basic: {
                    title: inputs.title,
                    description: inputs.description,
                    time: inputs.time,
                    status: inputs.status
                },
                where: {
                    _id: id,
                    _category: inputs._category
                }
            }, {
                headers: {
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if (response.data.success) {
                    dispatch(update_ieltslms_editQuiz({
                        QUIZ: {
                            ...IELTS_LMS_EDIT_QUIZ.QUIZ,
                            title: inputs.title,
                            description: inputs.description,
                            time: inputs.time,
                            status: inputs.status
                        }
                    }));

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
                }
            }).finally(() => {
                setSaving(false);
            });
        } else {
            toast.warning("Failed to locate edit quiz Basic endpoint", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // handle change input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    // discard changes
    const discardChanges = () => {
        if (IELTS_LMS_EDIT_QUIZ) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                const { title, _category, status, description, time, settings } = IELTS_LMS_EDIT_QUIZ.QUIZ;
                setInputs({
                    title: title,
                    description: description,
                    _category: _category,
                    status: status,
                    time: time,
                    settings: settings
                });
                setLoading(false);
            }
        }
    };

    // event for route links   ------------- [step 1]
    useEffect(() => {
        setLoading(true);
        if (ROUTES_LOADED && IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                discardChanges();
            }
        } else {
            toast.warning("Failed to locate edit quiz Basic endpoint", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    }, [ROUTES_LOADED, IELTS_LMS_EDIT_QUIZ]);


    return (<>
        {loading ? <IeltsLmsEditQuizBasicEditSkeleton /> : <>
            <div className="card mb-8">
                {/*--begin::Card header--*/}
                <div className="card-header">
                    {/*--begin::Card title--*/}
                    <div className="card-title fs-3 fw-bold">Quiz basic (Edit)</div>
                    {/*--end::Card title--*/}
                </div>
                {/*--end::Card header--*/}
                {/*--begin::Form--*/}
                <form className="form" onSubmit={basicEditSubmit}>

                    {/*--begin::Card body--*/}
                    <div className="card-body p-9">

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Quiz title*</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <input
                                    className={`form-control form-control-solid ${errors.title.status ? errors.title.type : ''}`}
                                    required
                                    disabled={saving}
                                    type="text"
                                    name="title"
                                    value={inputs.title}
                                    onChange={handleChange}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors.title.status && <>{errors.title.message}</>}
                                </div>
                            </div>
                        </div>
                        {/*--end::Row--*/}

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Description</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <textarea
                                    disabled={saving}
                                    name="description"
                                    className={`form-control form-control-solid h-100px ${errors.description.status ? errors.description.type : ''}`}
                                    style={{ height: "123px" }}
                                    value={inputs.description}
                                    onChange={handleChange}
                                ></textarea>
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors.description.status && <>{errors.description.message}</>}
                                </div>
                            </div>
                            {/*--begin::Col--*/}
                        </div>
                        {/*--end::Row--*/}

                        {/*--begin::Row--*/}
                        {((inputs._category) && (inputs._category === "reading" || inputs._category === "listening")) &&
                            <div className="row mb-8">
                                {/*--begin::Col--*/}
                                <div className="col-xl-3">
                                    <div className="fs-6 fw-semibold mt-2 mb-3">Time (minutes)</div>
                                </div>
                                {/*--end::Col--*/}
                                {/*--begin::Col--*/}
                                <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                    <div className="row">
                                        <div className="position-relative col-6 w-120px" htmlFor="mm">

                                            <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => changeTime("mm", + inputs.time.mm - 1)}>

                                                <span className="svg-icon svg-icon-1">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                        <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                                    </svg>
                                                </span>

                                            </button>

                                            <input type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="MM" name="min" value={inputs.time.mm} min="0" max="60" onChange={(event) => changeTime("mm", +event.target.value)} />


                                            <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => changeTime("mm", + inputs.time.mm + 1)}>

                                                <span className="svg-icon svg-icon-1">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                        <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                                        <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                                    </svg>
                                                </span>

                                            </button>

                                        </div>
                                    </div>

                                </div>
                                {/*--begin::Col--*/}
                            </div>}
                        {/*--end::Row--*/}


                        {/*--begin::Row--*/}
                        <div className="row">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9">
                                <select className={`form-select form-select-solid w-200px ${errors.status.status ? errors.status.type : ''}`} name="status" value={inputs.status} onChange={handleChange} disabled={saving}>
                                    <option value="published">Published</option>
                                    <option value="drafted">Save as Draft</option>
                                    <option value="trashed">Move to Trash</option>
                                </select>
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors.status.status && <>{errors.status.message}</>}
                                </div>
                            </div>
                            {/*--end::Col--*/}
                        </div>
                        {/*--end::Row--*/}

                    </div>
                    {/*--end::Card body--*/}

                    {/*--begin::Card footer--*/}
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <button disabled={saving} type="button" className="btn btn-light btn-active-light-primary me-2 btn-sm" onClick={discardChanges}>Discard</button>
                        <button disabled={saving} type="submit" className="btn btn-primary btn-sm">
                            {saving && <>
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> &nbsp; Saving...
                            </>}
                            {!saving && 'Save changes'}
                        </button>
                    </div>
                    {/*--end::Card footer--*/}

                </form>
                {/*--end:Form--*/}
            </div>
            <QuizForMyDomains />
        </>}
    </>);
};

export default IeltsLmsEditQuizBasicEdit;