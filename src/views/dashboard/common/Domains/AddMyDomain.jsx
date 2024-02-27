import '../../../../styles/addDomain.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import LoadIcon from '../../../../components/LoadIcon';

import { update_menu } from "../../../../includes/redux/slices/menu.slice";
import { update_auth } from '../../../../includes/redux/slices/auth.slice';
import ENDPOINTS from '../../../../includes/constants/routes';
import { update_add_domain, update_domain } from '../../../../includes/redux/slices/domain.slice';

const DashboardAddMyDomain = () => {
    const dispatch              = useDispatch();
    const [loading, setLoading] = useState(true);
    const { ADD_DOMAIN }        = useSelector( state => state.domain );
    const { USER_LOADING }      = useSelector( state => state.auth );
    const { MY_TOTAL_DOMAINS }  = useSelector( state => state.auth );
    const { NO_DOMAIN_NOTICE }  = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(update_menu({

            CURRENT_PRIMARY_MENU: 'DOMAINS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'ADD-MY-DOMAIN',
            CURRENT_DYNAMIC_MENU: null,

            IS_DYNAMIC_MENU_ACTIVE: false,
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            DYNAMIC_MENU_LOADING: false,
            HAS_DYNAMIC_MENU: false,
            DYNAMIC_MENU_FOR: null,

            PAGE_HEADING: 'Add Domain',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Domains',
            
            BREADCRUM_THREE: 'Add Domain',
            TAB_TITLE: 'Add Domain | Domains | Dashboard',
            DYNAMIC_HEADER: 'ADD-MY-DOMAIN'
        }));

        return () => {
            if(!USER_LOADING){
                if(MY_TOTAL_DOMAINS <= 0) {
                    if(document.querySelector('.no-domain-notice')){
                        document.querySelector('.no-domain-notice').classList.remove('hidden');
                    }
                    dispatch(update_auth({
                        NO_DOMAIN_NOTICE: true
                    }));
                }
            }
        };

    }, []);

    useEffect(() => {
        if (ADD_DOMAIN) {
            setLoading(false);
        }
    }, [ADD_DOMAIN]);

    useEffect(() => {
        if(NO_DOMAIN_NOTICE){
            dispatch(update_auth({
                NO_DOMAIN_NOTICE: false
            }));
        }
        if(document.querySelector('.no-domain-notice')){
            document.querySelector('.no-domain-notice').classList.add('hidden');
        }
    },[NO_DOMAIN_NOTICE]);


    return (<>
        {loading ? <>Domain loading...</> : <>
            <div className="domains__container">
                <div className="domains__content-wrapper h-container">
                    {ADD_DOMAIN.CURRENT_STEP === "choose-domain" && <ChooseDomain />}
                    {ADD_DOMAIN.CURRENT_STEP === "choose-platform" && <ChoosePlatform />}
                    {ADD_DOMAIN.CURRENT_STEP === "verify-domain" && <VerifyDomain />}
                    {ADD_DOMAIN.CURRENT_STEP === "complete-domain" && <CompleteDomain />}
                </div>
            </div>
        </>}
    </>);
};

// step - 1
const ChoosePlatform = () => {
    const dispatch          = useDispatch();
    const { ADD_DOMAIN }    = useSelector(state => state.domain);
    return (<>
        <h2 className="domains__content-heading-h2">
            Choose your platform
        </h2>
        <div className="domains__content-box m-0">
            <div className="domains__content-box-app">
                <div className="domains__content-items d-flex flex-wrap justify-content-center flex-gap-30px">
                    {/*--BEGIN::items--*/}

                    <div className={`domains__content-box-app__item --selected`}>
                        <div className="domains__content-box-app__item-box h-100">

                            {ADD_DOMAIN.DOMAIN.platform === "wordpress" && <div className="domains__Icon">
                                <i className="fa fa-check icon-active"></i>
                            </div>}

                            <div className="p-10 d-flex flex-column justify-content-start h-100 align-items-center">
                                <div className="pt-4">
                                    <LoadIcon icon={"icon-platform-wordpress-cms"} />
                                </div>
                                <h3 className="ligt">Wordpress</h3>
                                <p className="mb-4">Basic wordpress based on wordpress theme and plugins</p>
                                <button type="button" className={`w-100 btn btn-light-primary ${ADD_DOMAIN.DOMAIN.platform === "wordpress"? '--btn-selected' : ''}`} onClick={() => dispatch(update_add_domain({
                                    ADD_DOMAIN:{
                                        ...ADD_DOMAIN,
                                        platform: 'wordpress'
                                    }
                                }))}>
                                    {(ADD_DOMAIN.DOMAIN.platform == "wordpress") ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        </div>
                    </div>


                    {/*--END::items--*/}
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <button onClick={() => dispatch(update_add_domain({
                CURRENT_STEP: "choose-domain"
            }))} className="btn btn-primary btn-sm" style={{minWidth: '150px'}} disabled={ADD_DOMAIN.CURRENT_STEP == ""}>
                Continue <i className="fa fa-chevron-right"></i>
            </button>
        </div>
    </>)
};

// step - 2
const ChooseDomain = () => {
    const dispatch = useDispatch();
    const { ENDPOINT } = ENDPOINTS;
    const { MY_DOMAINS_CHECK_DOMAIN_ROUTE } = useSelector(state => state.constants);
    const { USER } = useSelector(state => state.auth);
    const { ADD_DOMAIN } = useSelector(state => state.domain);
    const [focused, setFocused] = useState(false);


    const setDomainValue = (event) => {
        dispatch(update_add_domain({
            DOMAIN: {
                ...ADD_DOMAIN.DOMAIN,
                host: event.target.value
            }
        }));

        if (isValidDomain(event.target.value)) {
            dispatch(update_add_domain({
                IS_VALID: true,
                IS_EXISTS: false,
                VERIFYING: false
            }));
        } else {
            dispatch(update_add_domain({
                IS_VALID: false,
                IS_EXISTS: false,
                VERIFYING: false
            }));
        }
    };

    const isValidDomain = (input) => {
        const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return domainRegex.test(input);
    };

    const continueWithDomain = (event) => {
        event.preventDefault();
        if (MY_DOMAINS_CHECK_DOMAIN_ROUTE && MY_DOMAINS_CHECK_DOMAIN_ROUTE.endpoint) {
            if (isValidDomain(ADD_DOMAIN.DOMAIN.host)) {
                dispatch(update_add_domain({
                    IS_VALID: true,
                    IS_EXISTS: false,
                    VERIFYING: true
                }));
                axios.get(`${ENDPOINT}${MY_DOMAINS_CHECK_DOMAIN_ROUTE.endpoint}/${ADD_DOMAIN.DOMAIN.host}`, {
                    headers: {
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then(response => {
                    if (response.data.success) {
                        dispatch(update_add_domain({
                            CURRENT_STEP: 'verify-domain',
                            IS_EXISTS: false,
                            IS_VALID: true,
                            VERIFYING: false
                        }));
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
                        dispatch(update_add_domain({
                            IS_VALID: true,
                            IS_EXISTS: false,
                            VERIFYING: false
                        }));
                    }
                }).catch(err => {
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    dispatch(update_add_domain({
                        IS_VALID: true,
                        IS_EXISTS: false,
                        VERIFYING: false
                    }));
                });
            } else {
                toast.warning("Domain is not valid", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.info("domain route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    return (<>
        {ADD_DOMAIN && <>
            <h2 className="domains__content-heading-h2">
                Choose your Domain
            </h2>
            <div className="domains__content-box m-0">
                <div className="domains__content-box-app">
                    <div className="domains__content-items d-flex flex-wrap justify-content-center flex-gap-30px">
                        <div className="domains__content-box-app__item w-min-620px">
                            <div className="domains__content-box-app__item-box h-100">
                                <div className="p-10 d-flex flex-column justify-content-start h-100 align-items-center">
                                    <div className="w-100">
                                        <div className="d-flex align-items-start flex-sm-nowrap flex-wrap">
                                            <form onSubmit={continueWithDomain} style={{ display: 'contents' }}>
                                                <div className="domains__form-field-holder w-100 domains__h-mr-32-sm">
                                                    <div className="domains__form-field">
                                                        <div className="domains__form-field__input-wrapper">
                                                            <div
                                                                className={`domains__form-field__input-holder ${(ADD_DOMAIN.DOMAIN.host.length > 0 && ADD_DOMAIN.IS_VALID) ? '--valid' : '--invalid'}`}>
                                                                <div className={`domains__form-field-label ${(ADD_DOMAIN.DOMAIN.host.length > 0) ? '--filled' : ''} ${(focused) ? '--active' : ''}`}>
                                                                    <span className="required">
                                                                        Enter you Existing domain name
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    name="domain"
                                                                    id="domain"
                                                                    value={ADD_DOMAIN.DOMAIN.host}
                                                                    className="domains__form-field-input"
                                                                    onBlur={() => setFocused(false)}
                                                                    onFocus={() => setFocused(true)}
                                                                    onChange={setDomainValue}
                                                                    disabled={ADD_DOMAIN.VERIFYING}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {!ADD_DOMAIN.IS_VALID && <div className="domains__form-field--feedback --invalid-feedback">
                                                        {ADD_DOMAIN.DOMAIN.host.length <= 0 ? 'Domain is required' : 'Domain is not valid'}
                                                    </div>}
                                                    {(ADD_DOMAIN.IS_VALID && ADD_DOMAIN.DOMAIN.host.length > 0 && ADD_DOMAIN.IS_EXISTS) ? <div className="domains__form-field--feedback --invalid-feedback">
                                                        Domain is already exist, If your are owner of this domain, please contact us.
                                                    </div> : <></>}

                                                </div>

                                                <div className="domains__button-wrapper">

                                                    <button type="submit" className="btn btn-primary w-100" disabled={!ADD_DOMAIN.IS_VALID || ADD_DOMAIN.IS_EXISTS}>
                                                        {ADD_DOMAIN.VERIFYING ? <Spinner animation="border" size="sm" /> : 'Verify'}
                                                    </button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={() => dispatch(update_add_domain({
                    CURRENT_STEP: "choose-platform"
                }))} className="btn btn-primary btn-sm" style={{minWidth: '150px'}}>
                    <i className="fa fa-chevron-left"></i> Change Platform
                </button>
            </div>
        </>}
    </>);
};


// step - 3
const VerifyDomain = () => {
    const dispatch                      = useDispatch();
    const { ENDPOINT }                  = ENDPOINTS;
    const [sendingOtp, setSendingOtp]   = useState(false);
    const [otpSended, setOtpSended]     = useState(false);
    const [subOtp,setSubOtp]            = useState(false);
    const { USER }                                      = useSelector( state => state.auth );
    const { ADD_DOMAIN }                                = useSelector(state => state.domain);
    const { MY_DOMAINS_SEND_DOMAIN_OTP_ROUTE }           = useSelector(state => state.constants);
    const { MY_DOMAINS_SEND_DOMAIN_OTP_VERIFY_ROUTE }    = useSelector(state => state.constants);


    const sendOtp = (event) => {
        if(MY_DOMAINS_SEND_DOMAIN_OTP_ROUTE && MY_DOMAINS_SEND_DOMAIN_OTP_ROUTE.endpoint){
            event.preventDefault();
            setSendingOtp(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_SEND_DOMAIN_OTP_ROUTE.endpoint}`,{
                domain:{
                    ...ADD_DOMAIN.DOMAIN
                }
            },{
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if(response.data.success){
                    setOtpSended(true);
                    toast.success("OTP sent successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

                if(response.data.error){
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

                
            }).catch(err => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setSendingOtp(false);
            });
        } else {
            toast.error("domain otp route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    const submitOtp = (event) => {
        event.preventDefault();
        
        if(MY_DOMAINS_SEND_DOMAIN_OTP_VERIFY_ROUTE && MY_DOMAINS_SEND_DOMAIN_OTP_VERIFY_ROUTE.endpoint){
            setSubOtp(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_SEND_DOMAIN_OTP_VERIFY_ROUTE.endpoint}`,{
                domain:{
                    ...ADD_DOMAIN.DOMAIN
                }
            },{
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if( response.data.success ) {
                    dispatch(update_add_domain({
                        ...ADD_DOMAIN,
                        DOMAIN:{
                            ...ADD_DOMAIN.DOMAIN,
                            metadata:{
                                ...response.data.success.json.domain
                            }
                        },
                        CURRENT_STEP: 'complete-domain'
                    }));
                }

                if( response.data.error ) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(err => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setSubOtp(false);
            });
        } else {
            toast.error("domain otp verify route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    useEffect(() => {
        if(!MY_DOMAINS_SEND_DOMAIN_OTP_ROUTE){
            toast.error("domain otp route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    },[]);

    return (<>

        <h2 className="domains__content-heading-h2">
            Verify your Domain
        </h2>
        <div className="domains__content-box m-0">
            <div className="domains__content-box-app">
                <div className="domains__verify-domain-app-box">
                    <div className="domains__verify-domain__box domains_p-24px">
                        <div className="domains__verify-domain__inner-box">

                            <div className="domains__verify-domain__content-item-1">
                                <div className="domains__verify-domain__item-1">
                                    {ADD_DOMAIN.DOMAIN.host}
                                </div>
                                <button disabled={subOtp || sendingOtp} className="btn btn-light-primary" onClick={() => dispatch(update_add_domain({
                                    CURRENT_STEP: 'choose-domain'
                                }))}>
                                    Change
                                </button>
                            </div>

                            <div className="domains__verify-domain__content-item-2 d-flex flex-row flex-wrap align-items-center mb-6">
                                <div className="domains__verfiy-domain__heading-3 d-block">
                                    <p className="p-0 m-0 text-left">
                                        <b> 1.) </b> Download our free wordpress plugin and installed it on your above listed domain.
                                    </p>
                                </div>
                                <div className="d-block">
                                    <button className="btn btn-sm btn-primary">Download</button>
                                </div>

                            </div>

                            <div className="domains__verify-domain__content-item-2 d-flex flex-row flex-wrap align-items-center mb-6">
                                <div className="domains__verfiy-domain__heading-3 d-block pb-3">
                                    <p className="p-0 m-0 text-left">
                                        <b> 2.) </b> After plugin installing, get id token from plugin and put here.
                                    </p>
                                </div>
                                <div className="d-block">
                                    <form onSubmit={sendOtp}>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                placeholder="ID Token"
                                                aria-label="ID Token"
                                                aria-describedby="basic-addon1"
                                                className="input-sm"
                                                value={ADD_DOMAIN.DOMAIN._hostTokenId}
                                                onChange={(event) => dispatch(update_add_domain({
                                                    DOMAIN: {
                                                        ...ADD_DOMAIN.DOMAIN,
                                                        _hostTokenId: event.target.value
                                                    }
                                                }))}
                                                required
                                                disabled={sendingOtp || subOtp}
                                            />
                                            <button disabled={sendingOtp || subOtp} type="submit" className="btn btn-sm btn-primary btn-border-group" id="button-addon1">
                                                {otpSended ? 'Resend' : 'Send OTP'}
                                            </button>
                                        </InputGroup>
                                    </form>
                                </div>
                            </div>

                            <div className="bb-0 domains__verify-domain__content-item-2 d-flex flex-row flex-wrap align-items-center mb-6">
                                <div className="domains__verfiy-domain__heading-3 d-block pb-3">
                                    <p className="p-0 m-0 text-left">
                                        <b> 3.) </b> Enter OTP and hit submit button, if otp is correct, this will register your domain with our dashboard.
                                    </p>
                                </div>
                                <div className="d-block">
                                    <form onSubmit={submitOtp}>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                placeholder="OTP"
                                                aria-label="OTP"
                                                aria-describedby="basic-addon2"
                                                className="input-sm"
                                                value={ADD_DOMAIN.DOMAIN._otp || ''}
                                                onChange={(event) => dispatch(update_add_domain({
                                                    DOMAIN: {
                                                        ...ADD_DOMAIN.DOMAIN,
                                                        _otp: event.target.value
                                                    }
                                                }))}
                                                required
                                                disabled={sendingOtp || subOtp}
                                            />
                                            <button disabled={sendingOtp || subOtp} type="submit" className="btn btn-sm btn-primary btn-border-group" id="button-addon2">
                                                {subOtp? 'Validating...' : 'Submit OTP'}
                                            </button>
                                        </InputGroup>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center d-none">
            <button className="btn btn-primary btn-sm" style={{ minWidth: '150px' }}>
                Continue
            </button>
        </div>

    </>)
};

// step - 4 
const CompleteDomain = () => {
    const dispatch                                      = useDispatch();
    const { ENDPOINT }                                  = ENDPOINTS;
    const { ADD_DOMAIN }                                = useSelector( state => state.domain );
    const { MY_DOMAINS_SEND_DOMAIN_FETCH_DETAILS_ROUTE } = useSelector(state => state.constants);
    const { MY_DOMAINS_DOMAIN_REGISTER_ROUTE }           = useSelector(state => state.constants);
    const { USER }                                      = useSelector( state => state.auth );
    const [loading,setLoading]                          = useState(true);
    const [validate,setValidate]                        = useState(false);
    const [finishing,setFinishing]                      = useState(false);

    const validateDomain = () => {
        if( MY_DOMAINS_SEND_DOMAIN_FETCH_DETAILS_ROUTE && MY_DOMAINS_SEND_DOMAIN_FETCH_DETAILS_ROUTE.endpoint ){
            setValidate(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_SEND_DOMAIN_FETCH_DETAILS_ROUTE.endpoint}`,{
                domain:{
                    ...ADD_DOMAIN.DOMAIN
                }
            },{
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if( response.data.success ) {
                    dispatch(update_add_domain({
                        ...ADD_DOMAIN,
                        DOMAIN:{
                            ...ADD_DOMAIN.DOMAIN,
                            metadata:{
                                ...response.data.success.json.domain
                            }
                        }
                    }));
                }

                if( response.data.error ) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(err => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setValidate(false);
            });
        } else {
            toast.error("domain fetch route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    const finishDomainSetup = () => {
        if( MY_DOMAINS_DOMAIN_REGISTER_ROUTE && MY_DOMAINS_DOMAIN_REGISTER_ROUTE.endpoint ){
            setFinishing(true);
            axios.post(`${ENDPOINT}${MY_DOMAINS_DOMAIN_REGISTER_ROUTE.endpoint}`,{
                domain:{
                    ...ADD_DOMAIN.DOMAIN
                }
            },{
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {

                if( response.data.success ) {
                    dispatch(update_auth({
                        MY_TOTAL_DOMAINS: 1,
                        NO_DOMAIN_NOTICE: false
                    }));
                    
                }

                if( response.data.error ) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }

            }).catch(err => {
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setFinishing(false);
            });
        } else {
            toast.error("domain register route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    useEffect(() => {
        if(ADD_DOMAIN && ADD_DOMAIN.DOMAIN && ADD_DOMAIN.DOMAIN.metadata) {
            setLoading(false);
        }
    },[]);

    return (<>
        <h2 className="domains__content-heading-h2">
            Complete Domain setup
        </h2>
        {loading? <>Loading...</> : <>
        
        <div className="domains__content-box m-0">
            <div className="domains__content-box-app">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8">
                        {/* begin::domain card */}
                        <div className="card border-hover-primary text-left" style={{border: '2px dashed #7239ea'}}>
                            {/* Card header */}
                            <div className="card-header border-0 pt-9">
                                {/* Card Title */}
                                <div className="card-title m-0">
                                    {ADD_DOMAIN.DOMAIN.metadata.site_url && <>

                                    
                                        {/* Avatar */}
                                        <a 
                                            href={"https://" + ADD_DOMAIN.DOMAIN.metadata.site_url}
                                            className="symbol bg-light d-flex flex-row justify-center align-items-center" 
                                            style={{ padding: '0px 15px 0px 0px', fontSize: '13px'}}
                                            target='_blank'
                                        >
                                            {ADD_DOMAIN.DOMAIN.metadata.site_logo_url? <>
                                                <img src={ADD_DOMAIN.DOMAIN.metadata.site_logo_url} alt="image" className="p-3" /> 
                                                &nbsp; 
                                                {ADD_DOMAIN.DOMAIN.metadata.site_url}
                                            </> : <>
                                                <i className="fa fa-globe p-3 fs-2"></i> 
                                                &nbsp; 
                                                {ADD_DOMAIN.DOMAIN.metadata.site_url}
                                            </>}
                                        </a>
                                        {/* End Avatar */}

                                    </>}
                                </div>
                                {/* End Card Title */}
                        
                                {/* Card toolbar */}
                                <div className="card-toolbar">
                                    <span className="badge badge-light fw-bold me-auto px-4 py-3">Pending</span>
                                </div>
                                {/* End Card toolbar */}
                            </div>
                            {/* End Card header */}
                        
                            {/* Card body */}
                            <div className="card-body p-9">

                                {/* site title */}
                                <div className="">
                                                
                                    <b className='fw-bold text-gray-900 fs-2'>{ADD_DOMAIN.DOMAIN.metadata.site_title || 'Site title'}</b>
                                </div>
                                {/* site title */}
                        
                                {/* Description */}
                                
                                <div className="mb-5">
                                    
                                    <b className='text-gray-500 fw-semibold fs-5'>{ADD_DOMAIN.DOMAIN.metadata.site_description || 'Site short description'}</b>
                                </div>
                                {/* End Description */}


                                {/* site contact email */}
                                <p className="fs-6 mt-1 mb-7">
                                    <i className="fa fa-envelope mr-2 fs-5 text-primary"></i> 
                                    &nbsp;
                                    <i>{ADD_DOMAIN.DOMAIN.metadata.site_contact_email}</i>
                                </p>
                                {/* site contact email */}  

                                <div className="d-flex flex-wrap mb-5">
                                    {/*--begin::Due--*/}
                                    <div className="d-flex flex-row border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">  
                                        <div className="d-flex" style={{marginRight: '10px'}}>
                                            <div className="symbol symbol-35px symbol-circle">
                                                <img alt={ADD_DOMAIN.DOMAIN.metadata.admin_name} src={ADD_DOMAIN.DOMAIN.metadata.admin_avatar_url} />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="fs-6 text-gray-800 fw-bold">{ADD_DOMAIN.DOMAIN.metadata.admin_name}</div>
                                            <div className="fw-semibold text-gray-500">{ADD_DOMAIN.DOMAIN.metadata.admin_email}</div>
                                        </div>        
                                        

                                    </div>
                                    {/*--end::Due--*/}

                                    
                                </div>              

                        
                                
                            </div>
                            {/* End Card body */}
                        </div>
                        {/* end::domain card */}
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>

            </div>
        </div>

        </>}
        <div className="d-flex justify-content-center">
            <button onClick={validateDomain} type='button' className="btn btn-light-primary btn-sm" disabled={loading || validate || finishing}>
                <i className={validate? "fa fa-refresh fa-spin" : "fa fa-refresh"}></i> Refresh details
            </button> &nbsp; &nbsp;
            <button onClick={finishDomainSetup} type='button' className="btn btn-primary btn-sm" style={{ minWidth: '150px' }} disabled={loading || validate || finishing}>
                {finishing? 'Finishing...' : 'Finish'}    
            </button>
        </div>
    </>);
};



export default DashboardAddMyDomain;
