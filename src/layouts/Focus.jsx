import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
    onAuthStateChanged,
    auth,
    authError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    googleAuthProvider,
    sendEmailVerification,
    signOut
} from '../includes/middlewares/Firebase';

import ENDPOINTS from '../includes/constants/routes';
import { 
    IELTS_LMS_MENU_MY_ITEMS 
} from '../includes/constants/menu';
import { update_auth } from "../includes/redux/slices/auth.slice";
import { update_menu } from "../includes/redux/slices/menu.slice";


const FocusLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { AUTH_LOADED, AUTH_LOADING, AUTH_FAILED } = useSelector(state => state.auth);
    const { IS_USER_LOGGED_IN, IS_VERIFIED, AUTH_VERIYING } = useSelector(state => state.auth);
    const { USER } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (AUTH_LOADED) {
            if (!IS_USER_LOGGED_IN) {
                setLoading(false);
            }

            if (IS_USER_LOGGED_IN && USER && !USER.emailVerified) {
                setLoading(false);
            }

            if (IS_USER_LOGGED_IN && USER && USER.emailVerified && !IS_VERIFIED) {
                setLoading(false);
            }

            if (IS_USER_LOGGED_IN && USER && USER.emailVerified && IS_VERIFIED) {
                setLoading(false);
            }


        }
    }, [AUTH_LOADED, AUTH_LOADING, AUTH_FAILED]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            try {
                if (!authError) {
                    if (user) {
                        console.log('[Auth] - loaded');
                        console.info('[Auth]: User is logged in');

                        dispatch(update_auth({
                            IS_USER_LOGGED_IN: true,
                            IS_VERIFIED: false,
                            AUTH_LOADED: true,
                            AUTH_LOADING: false,
                            AUTH_FAILED: false,
                            AUTH_VERIYING: true,
                            USER: {
                                status: true,
                                email: user.reloadUserInfo.email,
                                emailVerified: user.reloadUserInfo.emailVerified,
                                uid: user.uid,
                                accessToken: user.stsTokenManager.accessToken,
                                refreshToken: user.stsTokenManager.refreshToken
                            }
                        }));

                    } else {
                        dispatch(update_auth({
                            AUTH_LOADED: true,
                            AUTH_LOADING: false,
                            AUTH_FAILED: false,
                            USER: {},
                            IS_USER_LOGGED_IN: false,
                            IS_VERIFIED: false
                        }));
                        console.log('[Auth] - loaded');
                        console.info('[Auth]: User is not logged in');
                    }
                } else {
                    dispatch(update_auth({
                        AUTH_LOADED: false,
                        AUTH_LOADING: false,
                        AUTH_FAILED: true,

                        USER: {},
                        IS_USER_LOGGED_IN: false,
                        IS_VERIFIED: false,
                        AUTH_VERIYING: false
                    }));
                }
            } catch (err) {
                dispatch(update_auth({
                    AUTH_LOADED: false,
                    AUTH_LOADING: false,
                    AUTH_FAILED: true,
                    USER: {},
                    IS_USER_LOGGED_IN: false,
                    IS_VERIFIED: false,
                    AUTH_VERIYING: false
                }));
            }
        });
    }, []);


    return (<>
        {loading ? <>
            <div className="page-loader flex-column">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
            </div>
        </> : <>
            {AUTH_LOADED && IS_USER_LOGGED_IN && !IS_VERIFIED && <>
                {USER && USER.status && !USER.emailVerified && <>
                    <VerifyEmail />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>}
                {USER && USER.status && USER.emailVerified && AUTH_VERIYING && <>
                    <AuthVerify />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>}
            </>}
            {AUTH_LOADED && IS_USER_LOGGED_IN && IS_VERIFIED && <>
                {children}
            </>}
            {AUTH_LOADED && !IS_USER_LOGGED_IN && <>
                <AuthLogin />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </>}
        </>}
    </>);
};



const AuthLogin = () => {
    const [toggle, setToggle] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [account, setAccount] = useState({
        email: '',
        password: ''
    });

    const loginWithEmail = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, account.email, account.password).then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorMessage == "INVALID_LOGIN_CREDENTIALS"){
                toast.error("Looks like account dosn't exists or ( Email or Password is wrong )", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        });
    };

    const signupWithEmail = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, account.email, account.password).then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider).then((result) => {

        }).catch((error) => {
            if (error.errorCode === "auth/operation-not-allowed") {
                alert("Auth::method-not-allowed");
            }
        });
    };

    return (
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed auth-page-bg">
            {/* Content */}
            <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                {/* Logo */}
                

                {/* Wrapper */}
                {!toggle && <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                    {/* Form */}
                    <form onSubmit={loginWithEmail} className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
                        {/* Heading */}
                        <div className="text-center mb-10">
                            {/*--begin::Title--*/}
                            <h1 className="text-gray-900 mb-3">
                                Sign In to Dashboard
                            </h1>
                            {/*--END::Title--*/}

                            {/*--begin::Link--*/}
                            <div className="text-gray-500 fw-semibold fs-4">
                                New Here? <span className="link-primary fw-bold" onClick={() => setToggle(true)}>
                                    Create an Account
                                </span>
                            </div>
                            {/*--end::Title--*/}
                        </div>
                        {/* Input group */}
                        <div className="fv-row mb-10 fv-plugins-icon-container">
                            {/* Label */}
                            <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
                            {/* Input */}
                            <input
                                className="form-control form-control-lg form-control-solid"
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="Enter you email"
                                value={account.email}
                                onChange={(event) => setAccount({
                                    ...account,
                                    email: event.target.value
                                })}
                                required
                                disabled={processing}
                            />
                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>

                        {/* Input group */}
                        <div className="fv-row mb-10 fv-plugins-icon-container">
                            {/* Wrapper */}
                            <div className="d-flex flex-stack mb-2">
                                {/* Label */}
                                <label className="form-label fw-bold text-gray-900 fs-6 mb-0">Password</label>
                                {/* Link */}

                                <a href="/seven-html-pro/?page=authentication/sign-in/password-reset" className="d-none link-primary fs-6 fw-bold">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Input */}
                            <input
                                className="form-control form-control-lg form-control-solid"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="off"
                                value={account.password}
                                required
                                disabled={processing}
                                onChange={(event) => setAccount({
                                    ...account,
                                    password: event.target.value
                                })}
                            />
                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>

                        {/* Actions */}
                        <div className="text-center">
                            {/* Submit button */}
                            <button disabled={processing} type="submit" id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5" data-kt-indicator={processing ? 'on' : 'off'}>
                                <span className="indicator-label">
                                    <i className="fa fs-2 fa-envelope h-20px me-3"></i>
                                    Continue with email
                                </span>

                                <span className="indicator-progress">
                                    Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>

                            {/* Separator */}
                            { 1 == 2 && <>
                            <div className="text-center text-muted text-uppercase fw-bold mb-5">or</div>

                            {/* Google link */}
                            <button disabled={processing} onClick={signInWithGoogle} type="button" className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5">
                                <img alt="Logo" src="/svgs/google-logo.svg" className="h-20px me-3" />
                                Continue with Google
                            </button>
                            </>}
                        </div>
                    </form>
                    {/* Form */}
                </div>}

                {toggle && <>
                    <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                        {/* Form */}
                        <form onSubmit={signupWithEmail} className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
                            {/* Heading */}
                            <div className="mb-10 text-center">
                                {/* Title */}
                                <h1 className="text-gray-900 mb-3">
                                    Create an Account
                                </h1>

                                {/* Link */}
                                <div className="text-gray-500 fw-semibold fs-4">
                                    Already have an account? <span className="link-primary fw-bold" onClick={() => setToggle(false)}>
                                        Sign in here
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            {1 == 2 && <>
                                <button disabled={processing} onClick={signInWithGoogle} type="button" className="btn btn-light-primary fw-bold w-100 mb-10">
                                    <img alt="Logo" src="/svgs/google-logo.svg" className="h-20px me-3" />
                                    Sign in with Google
                                </button>

                                {/* Separator */}
                                <div className="d-flex align-items-center mb-10">
                                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                                    <span className="fw-semibold text-gray-500 fs-7 mx-2">OR</span>
                                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                                </div>
                            </>}

                            {/* Input group */}
                            <div className="fv-row mb-7 fv-plugins-icon-container">
                                <label className="form-label fw-bold text-gray-900 fs-6">Email</label>
                                <input
                                    className="form-control form-control-lg form-control-solid"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    placeholder="Enter you email"
                                    value={account.email}
                                    onChange={(event) => setAccount({
                                        ...account,
                                        email: event.target.value
                                    })}
                                    required
                                    disabled={processing}
                                />
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>

                            {/* Input group */}
                            <div className="mb-10 fv-row fv-plugins-icon-container" data-kt-password-meter="true">
                                {/* Wrapper */}
                                <div className="mb-1">
                                    {/* Label */}
                                    <label className="form-label fw-bold text-gray-900 fs-6">
                                        Password
                                    </label>

                                    {/* Input wrapper */}
                                    <div className="position-relative mb-3">
                                        <input
                                            className="form-control form-control-lg form-control-solid"
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            autoComplete="off"
                                            value={account.password}
                                            required
                                            onChange={(event) => setAccount({
                                                ...account,
                                                password: event.target.value
                                            })}
                                            disabled={processing}
                                        />

                                        <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                                            <i className="ki-duotone ki-eye-slash fs-2"></i>
                                            <i className="ki-duotone ki-eye fs-2 d-none"></i>
                                        </span>
                                    </div>


                                </div>

                                {/* Hint */}
                                <div className="text-muted">
                                    Use 8 or more characters with a mix of letters, numbers & symbols.
                                </div>
                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>

                            <div className="text-center">
                                <button disabled={processing} type="submit" className="btn btn-lg btn-primary" data-kt-indicator={processing ? 'on' : 'off'}>
                                    <span className="indicator-label">
                                        <i className="fa fs-2 fa-envelope h-20px me-3"></i> Signup with Email
                                    </span>
                                    <span className="indicator-progress">
                                        Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                </button>
                            </div>
                        </form>
                        {/* Form */}
                    </div>
                </>}
            </div>

            {/* Footer */}
            <div className="d-flex flex-center flex-column-auto p-10">
                {/* Links */}
                <div className="d-flex align-items-center fw-semibold fs-6">
                    <a href="https://spacetree.org" className="text-muted text-hover-primary px-2">About</a>
                    <a href="https://spacetree.org/support" className="text-muted text-hover-primary px-2">Support</a>
                    <a href="https://spacetree.org/shop" className="text-muted text-hover-primary px-2">
                        Purchase
                    </a>
                </div>
                {/* Links */}
            </div>
            {/* Footer */}
        </div>
    );
};

// verify email address
const VerifyEmail = () => {
    const { USER, AUTH_LOADED, IS_USER_LOGGED_IN } = useSelector(state => state.auth);
    const [sending, setSending] = useState(false);
    const [resending, setResending] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(<></>);

    const sendEmailVerificationLink = () => {
        setSending(true);
        setError(<></>);
        sendEmailVerification(auth.currentUser).then((response) => {
            toast.success("Verification email sent successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).catch((err) => {
            if (err.code == "auth/too-many-requests") {
                setError(<p style={{ color: 'red' }}>Email verification link already send too many times</p>);
                toast.warning("Email verification link already send too many times, try later", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

            }
        }).finally(() => {
            setSending(false);
            setResending(resending + 1);
        });
    };


    const changeEmail = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.reload();
            console.log("Signed out successfully")
        }).catch((error) => {
            alert("Failed to logout");
        });
    }

    useEffect(() => {
        setLoading(true);
        if (IS_USER_LOGGED_IN && AUTH_LOADED) {
            if (USER.status && !USER.emailVerified) {
                setLoading(false);
                sendEmailVerificationLink();
            }
        }
    }, []);

    useEffect(() => {
        document.body.classList = 'auth-bg';
        return () => {
            document.body.classList = '';
        }
    }, []);

    return (<>
        {loading ? <>
            <div className="page-loader flex-column">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
            </div>
        </> : <>
            <div className="d-flex flex-column flex-root">
                {/* Authentication - Signup Verify Email */}
                <div className="d-flex flex-column flex-column-fluid">
                    {/* Content */}
                    <div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-10">
                        {/* Logo */}
                        

                        {/* Wrapper */}
                        <div className="pt-lg-10 mb-10">
                            {/* Logo */}
                            <h1 className="fw-bold fs-2qx text-dark mb-7">Verify Your Email</h1>

                            {/* Message */}
                            <div className="fs-3 fw-semibold text-gray-400 mb-10">
                                We have sent an email to
                                <a href="#" className="link-primary fw-bold"> {USER.email} </a> <br />
                                please follow a link to verify your email.
                            </div>



                            {/* Action */}
                            {!sending && <div className="fs-5">
                                <span className="fw-semibold text-gray-700">Didn’t receive an email?</span>
                                <span className="link-primary fw-bold" onClick={sendEmailVerificationLink}>
                                    Resend
                                </span>
                            </div>}

                            <div className="mb-10 mt-2">{error}</div>


                            {/* Action */}
                            <div className="text-center mb-10">
                                <button onClick={changeEmail} type="button" className="btn btn-lg btn-primary fw-bold">
                                    Change email
                                </button>
                            </div>

                            <div className="mb-10 mt-2">
                                If you already clicked on verification link, then refresh the tab
                            </div>
                        </div>

                        {/* Illustration */}
                        <div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style={{ backgroundImage: 'url(/seven-html-pro/assets/media/illustrations/sigma-1/17.png)' }}>
                        </div>
                    </div>
                    {/* Content */}

                    {/* Footer */}
                    <div className="d-flex flex-center flex-column-auto p-10">
                        {/* Links */}
                        <div className="d-flex align-items-center fw-semibold fs-6">
                            <a href="https://spacetree.org" className="text-muted text-hover-primary px-2">About</a>
                            <a href="https://spacetree.org/support" className="text-muted text-hover-primary px-2">Support</a>
                            <a href="https://spacetree.org/shop" className="text-muted text-hover-primary px-2">
                                Purchase
                            </a>
                        </div>
                        {/* Links */}
                    </div>
                    {/* Footer */}
                </div>
                {/* Authentication - Signup Verify Email */}
            </div>
        </>}
    </>);
};

// verify server user
const AuthVerify = () => {
    const dispatch                  = useDispatch();
    const [send, setSend]           = useState(1);
    const { ENDPOINT }              = ENDPOINTS;
    const { USER }                  = useSelector(state => state.auth);
    const [loading, setLoading]     = useState(true);
    const [context, setContext]     = useState(<></>);
    

    // account checking
    const accountCheck = () => {
        axios.post(`${ENDPOINT}/account/verify`, {}, {
            headers: {
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        }).then((response) => {
            if (response.data.success) {
                const { type, json } = response.data.success;
                if (type === "create-account") {
                    setContext(<Signup />);
                    setLoading(false);
                } else if(type === "dashboard"){
                    dispatch(update_auth({
                        AUTH_LOADED: true,
                        AUTH_LOADING: false,
                        AUTH_FAILED: false,
                        IS_USER_LOGGED_IN: true,
                        IS_VERIFIED: true,
                        AUTH_VERIYING: false,
                        ACCOUNT: response.data.success.json._acc,
                        ROLE: response.data.success.json._acc._accountType,
                        USER_SERVICES: response.data.success.json.myServices || [],
                        USER_PERMISSIONS: response.data.success.json.permissions || [],
                        MY_TOTAL_DOMAINS: response.data.success.json.myDomains || 0,
                        USER_LOADING: false
                    }));
                    // set menu
                    if( json && json.permissions ){
                        if( json.permissions.length > 0 ) {
                            let menu = [];
                            json.permissions.forEach((p,index) => {
                                if(p._key === "ielts-lms" && p.status){
                                    menu.push({
                                        key: 0,
                                        PRIMARY: 'IELTS-LMS',
                                        ICON: 'icon-ielts-lms',
                                        DISPLAY: true,
                                        MENU_TITLE: 'IELTS LMS'
                                    });
                                }
                            });
                            dispatch(update_menu({
                                USER_MENU: menu
                            }));

                        }
                    }
                }
            }
        }).catch((err) => {

        });
    };


    useEffect(() => {
        setLoading(true);
        if (send == 1) {
            accountCheck();
        }
    }, []);

    return (<>
        {loading ? <>
            <div className="page-loader flex-column">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
            </div>
        </> : <>
            {context}
        </>}
    </>);
};

// signup create-account
const Signup = () => {
    const { ENDPOINT }              = ENDPOINTS;
    const { USER }                  = useSelector( state => state.auth );
    const { MARKET }                = useSelector( state => state.market );
    const [steps, setSteps]         = useState([
        { stats: 'completed' },
        { stats: 'current' }
    ]);
    const [index, setIndex]         = useState(0);
    const [finishing,setFinishing]  = useState(false);
    const [dashboard,setDashboard]  = useState(false);

    const [profile,setProfile]      = useState({
        _uid: '',
        _accountType: 'customer',
        display_name: '',
        usermeta:{
            phone: [],
            profession: '',
            email: '',
        },
        address:{
            country: 'IN',
            state: '',
            address: ''
        },
        billing:[],
        providers:[],
        connections:[],
        products:[],
        status: 'active'
    });

    const next = () => {
        if(index + 1 < steps.length){
            let tmpSteps = steps;
                tmpSteps[index].stats = 'completed';
                tmpSteps[index + 1].stats = 'current';
                setSteps(tmpSteps);
                setIndex(index+1);
        }
    };

    const previous = () => {
        if(index - 1 >= 0){
            let tmpSteps = steps;
            tmpSteps[index].stats = 'pending';
            tmpSteps[index - 1].stats = 'current';
            setSteps(tmpSteps);
            setIndex(index-1);
        }
    };

    const finishAccount = (event) => {
        event.preventDefault();
        let PROFILE = {
            ...profile,
            _uid: USER.uid,
            usermeta:{
                ...profile.usermeta,
                email: USER.email,
                emailVerified: USER.emailVerified
            }
        }
        setFinishing(true);
        axios.post(`${ENDPOINT}/account/signup`, {
            account: {
                ...PROFILE
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        }).then((response) => {
            if (response.data.success) {
                const { trigger } = response.data.success;
                if (response.data.success.type === "dashboard") {
                    setDashboard(true);
                    window.location.reload();
                }
            }
        }).catch((err) => {
            setFinishing(false);
        });
    };

    return (<>
        <div className="d-flex flex-column flex-root">
            <div className={`d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column ${index == 0 ? 'first' : 'between'}`}>

                {/* begin::Aside */}
                {1 == 2 && <>
                <div className="d-flex flex-column flex-lg-row-auto justify-content-between positon-xl-relative min-w-300px w-xl-500px bg-lighten shadow-sm">
                    {/* Wrapper */}
                    <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-500px scroll-y">
                        {/* Content */}
                        <div className="d-flex flex-row-fluid flex-column align-items-center pt-lg-20">
                            {/* Logo */}
                            <a href="/seven-html-pro/index.html" className="my-10 my-lg-20">
                                <img alt="Logo" src="/seven-html-pro/assets/media/logos/logo-default.svg" className="h-60px" />
                            </a>
                            {/* Logo */}

                            {/* Nav */}
                            <div className="stepper-nav">

                                {/* Step 1 */}
                                <div className={`stepper-item ${steps[0].stats}`}>
                                    {/* Wrapper */}
                                    <div className="stepper-wrapper">
                                        {/* Icon */}
                                        <div className="stepper-icon rounded-3">
                                            <i className="stepper-check fas fa-check"></i>
                                            <span className="stepper-number">1</span>
                                        </div>
                                        {/* Label */}
                                        <div className="stepper-label">
                                            <h3 className="stepper-title fs-2">Account Type</h3>
                                            <div className="stepper-desc fw-normal">Select your account type</div>
                                        </div>
                                    </div>
                                    {/* Wrapper */}
                                    {/* Line */}
                                    <div className="stepper-line h-40px"></div>
                                </div>
                                {/* Step 1 */}

                                {/* Step 2 */}
                                <div className={`stepper-item ${steps[1].stats}`}>
                                    {/* Wrapper */}
                                    <div className="stepper-wrapper">
                                        {/* Icon */}
                                        <div className="stepper-icon rounded-3">
                                            <i className="stepper-check fas fa-check"></i>
                                            <span className="stepper-number">2</span>
                                        </div>
                                        {/* Label */}
                                        <div className="stepper-label">
                                            <h3 className="stepper-title fs-2">Account Settings</h3>
                                            <div className="stepper-desc fw-normal">Setup your account settings</div>
                                        </div>
                                    </div>
                                    {/* Wrapper */}
                                    {/* Line */}
                                    <div className="stepper-line h-40px"></div>
                                </div>
                                {/* Step 2 */}

                            </div>
                            {/* Nav */}
                        </div>
                        {/* Content */}

                        {/* Illustration */}
                        <div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-125px min-h-lg-250px mh-250px" style={{ backgroundImage: 'url(/seven-html-pro/assets/media/illustrations/sigma-1/17.png)' }}>
                        </div>
                        {/* Illustration */}
                    </div>
                    {/* Wrapper */}
                </div>
                </>}
                {/* end::Aside */}

                {/* begin::Container */}
                <div className="d-flex flex-column flex-lg-row-fluid py-10">
                    {/* Content */}
                    <div className="d-flex flex-center flex-column flex-column-fluid">
                        {/* Wrapper */}
                        <div className="w-lg-700px p-10 p-lg-15 mx-auto">
                            {/* Form */}
                            <form onSubmit={finishAccount} className="my-auto pb-5 fv-plugins-bootstrap5 fv-plugins-framework">  

                                {/* Begin::Step 1 [account-type] */}
                                <div className={`${steps[0].stats}`} data-kt-stepper-element="content">
                                    {/* Wrapper */}
                                    <div className="w-100">
                                        {/* Heading */}
                                        <div className="pb-10 pb-lg-15">
                                            {/* Title */}
                                            <h2 className="fw-bold d-flex align-items-center text-gray-900">
                                                Choose Account Type
                                                <span className="ms-1" data-bs-toggle="tooltip" aria-label="Billing is issued based on your selected account type" data-bs-original-title="Billing is issued based on your selected account type" data-kt-initialized="1">
                                                    <i className="ki-duotone ki-information-5 text-gray-500 fs-6"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i>
                                                </span>
                                            </h2>
                                            {/* Title */}
                                            {/* Notice */}
                                            <div className="text-muted fw-semibold fs-6">
                                                If you need more info, please check out
                                                <a href="#" className="link-primary fw-bold">Help Page</a>.
                                            </div>
                                            {/* Notice */}
                                        </div>
                                        {/* Heading */}
                                        {/* Input group */}
                                        <div className="fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                            {/* Row */}
                                            <div className="row">

                                                {/* Col */}
                                                <div className="col-lg-6">
                                                    {/* Option */}
                                                    <input 
                                                        type="radio" 
                                                        className="btn-check" 
                                                        name="account_type" 
                                                        value="customer" 
                                                        id="customer"
                                                        checked={profile._accountType === "customer"? true : false} 
                                                        onChange={(event) => setProfile({
                                                            ...profile,
                                                            _accountType: event.target.value
                                                        })}
                                                    />
                                                    <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center mb-10" htmlFor="customer">
                                                        <i className="ki-duotone ki-user fs-3x me-5">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                        </i>
                                                        {/* Info */}
                                                        <span className="d-block fw-semibold text-start">
                                                            <span className="text-gray-900 fw-bold d-block fs-4 mb-2">Customer</span>
                                                            <span className="text-muted fw-semibold fs-6">If you need more info, please check it out</span>
                                                        </span>
                                                        {/* Info */}
                                                    </label>
                                                    {/* Option */}
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                {/* Col */}

                                                {/* Col */}
                                                <div className="col-lg-6">
                                                    {/* Option */}
                                                    <input 
                                                        type="radio" 
                                                        className="btn-check" 
                                                        name="account_type" 
                                                        value="teammate"
                                                        id="teammate" 
                                                        checked={profile._accountType === "teammate"? true : false} 
                                                        onChange={(event) => setProfile({
                                                            ...profile,
                                                            _accountType: event.target.value
                                                        })}
                                                    />
                                                    <label className="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex align-items-center" htmlFor="teammate">
                                                        <i className="fa fa-people-group fs-3x me-5"></i>
                                                        {/* Info */}
                                                        <span className="d-block fw-semibold text-start">
                                                            <span className="text-gray-900 fw-bold d-block fs-4 mb-2">Teammate</span>
                                                            <span className="text-muted fw-semibold fs-6">Create corporate account to manage users</span>
                                                        </span>
                                                        {/* Info */}
                                                    </label>
                                                    {/* Option */}
                                                </div>
                                                {/* Col */}

                                            </div>
                                            {/* Row */}
                                        </div>
                                        {/* Input group */}
                                    </div>
                                    {/* Wrapper */}
                                </div>
                                {/* End::Step 1 [account-type] */}

                                {/* Begin::Step 2 [account type - settings] */}
                                <div className={`m-0 ${steps[1].stats}`} data-kt-stepper-element="content">
                                    {profile._accountType == "customer" && <>
                                    {/* Wrapper */}
                                    <div className="w-100">

                                        {/* Heading */}
                                        <div className="pb-10 pb-lg-15">
                                            {/* Title */}
                                            <h2 className="fw-bold text-gray-900">Customer Profile</h2>
                                            {/* Title */}
                                            {/* Notice */}
                                            <div className="text-muted fw-semibold fs-6">
                                                If you need more info, please check out
                                                <a href="#" className="link-primary fw-bold">Help Page</a>.
                                            </div>
                                            {/* Notice */}
                                        </div>
                                        {/* Heading */}

                                        {/* Input group - [display_name] */}
                                        <div className="mb-5 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                            {/* Label */}
                                            <label className="form-label mb-3 required">Your fullname</label>
                                            {/* Input */}
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                name="display_name" 
                                                placeholder="Enter your fullname" 
                                                value={profile.display_name} 
                                                onChange={(event) => setProfile({
                                                    ...profile,
                                                    display_name: event.target.value
                                                })}
                                                required

                                            />
                                            {/* Input */}
                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">

                                            </div>
                                        </div>
                                        {/* Input group */}

                                        {/* Input group - [email] */}
                                        <div className="mb-5 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                            {/* Label */}
                                            <label className="form-label mb-3 required">Email</label>
                                            {/* Input */}
                                            <input 
                                                type="email" 
                                                className="form-control form-control-lg" 
                                                name="email" 
                                                placeholder="Enter your email" 
                                                value={USER.email? USER.email : profile.usermeta.email} 
                                                readOnly
                                                disabled
                                                required
                                            />
                                            {/* Input */}
                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">

                                            </div>
                                        </div>
                                        {/* Input group */}

                                        {/* Input group - [country] */}
                                        <div className="mb-20 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                            {/* Label */}
                                            <label className="form-label mb-3 required">Country</label>
                                            <ReactFlagsSelect
                                                className="form-control p-0 b-0"
                                                selected={profile.address.country}
                                                onSelect={(code) => setProfile({
                                                    ...profile,
                                                    address:{
                                                        ...profile.address,
                                                        country: code
                                                    }
                                                })}
                                            />
                                        </div>
                                        {/* Input group - [/country] */}

                                    </div>
                                    {/* Wrapper */}
                                    </>}
                                </div>
                                {/* End::Step 2 [account type - settings] */}


                                {/* Actions */}
                                <div className="d-flex flex-stack pt-15">
                                    <div className="mr-2">
                                        {1 == 2 && <>
                                        {index > 0 && <button disabled={finishing} onClick={previous} type="button" className="btn btn-lg btn-light-primary me-3" data-kt-stepper-action="previous">
                                            <i className="ki-duotone ki-arrow-left fs-4 me-1"><span className="path1"></span><span className="path2"></span></i>
                                            Previous
                                        </button>}
                                        </>}
                                    </div>
                                    <div>
                                        {<button disabled={finishing} type="submit" className="btn btn-lg btn-primary" data-kt-indicator={finishing? 'on' : 'off'}>
                                            <span className="indicator-label">
                                                Finish
                                                <i className="ki-duotone ki-arrow-right fs-4 ms-2"><span className="path1"></span><span className="path2"></span></i>
                                            </span>
                                            <span className="indicator-progress">
                                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                            </span>
                                        </button>}
                                        {1 == 2 && <>
                                        {index+1 < steps.length && <button disabled={finishing} onClick={next} type="button" className="btn btn-lg btn-primary" data-kt-stepper-action="next">
                                            Continue
                                            <i className="ki-duotone ki-arrow-right fs-4 ms-1"><span className="path1"></span><span className="path2"></span></i>
                                        </button>}
                                        </>}
                                    </div>
                                </div>
                                {/* Actions */}
                            </form>
                            {/* Form */}
                        </div>
                        {/* Wrapper */}
                    </div>
                    {/* Content */}
                    {/* Footer */}
                    <div className="d-flex flex-center flex-column-auto p-10">
                        {/* Links */}
                        <div className="d-flex align-items-center fw-semibold fs-6">
                            <a href="https://spacetree.org" className="text-muted text-hover-primary px-2">About</a>
                            <a href="https://spacetree.org/support" className="text-muted text-hover-primary px-2">Support</a>
                            <a href="https://spacetree.org/shop" className="text-muted text-hover-primary px-2">
                                Purchase
                            </a>
                        </div>
                        {/* Links */}
                    </div>
                    {/* Footer */}
                </div>
                {/* end::Container */}

            </div>
        </div>
    </>);
};



export default FocusLayout;



const Profession = () => {
    return (<>
        {/* Input group */}
        <div className="mb-0 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            {/* Label */}
            <label className="d-flex align-items-center form-label mb-5">
                Select Your profession
            </label>
            {/* Options */}
            <div className="mb-0">

                {/* Option */}
                <label className="d-flex flex-stack mb-5 cursor-pointer">
                    {/* Label */}
                    <span className="d-flex align-items-center me-2">
                        {/* Icon */}
                        <span className="symbol symbol-50px me-6">
                            <span className="symbol-label">
                                <i className="ki-duotone ki-bank fs-1 text-gray-600">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </span>
                        </span>
                        {/* Description */}
                        <span className="d-flex flex-column">
                            <span className="fw-bold text-gray-800 text-hover-primary fs-5">Student</span>
                            <span className="fs-6 fw-semibold text-muted">Im here for learning</span>
                        </span>
                    </span>
                    {/* Input */}
                    <span className="form-check form-check-custom form-check-solid">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="profession" 
                            value="student" 
                            checked={profile.customer.profession === "student"? true : false}
                            onChange={(event) => setProfile({
                                ...profile,
                                customer:{
                                    ...profile.customer,
                                    profession: event.target.value
                                }
                            })}
                        />
                    </span>
                </label>
                {/* Option */}

                {/* Option */}
                <label className="d-flex flex-stack mb-5 cursor-pointer">
                    {/* Label */}
                    <span className="d-flex align-items-center me-2">
                        {/* Icon */}
                        <span className="symbol symbol-50px me-6">
                            <span className="symbol-label">
                                <i className="fa fa-person-chalkboard fs-1 text-gray-600">
                                    
                                </i>
                            </span>
                        </span>
                        {/* Description */}
                        <span className="d-flex flex-column">
                            <span className="fw-bold text-gray-800 text-hover-primary fs-5">Instructor</span>
                            <span className="fs-6 fw-semibold text-muted">I use to instruct students</span>
                        </span>
                    </span>
                    {/* Input */}
                    <span className="form-check form-check-custom form-check-solid">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="profession" 
                            value="instructor" 
                            checked={profile.customer.profession === "instructor"? true : false}
                            onChange={(event) => setProfile({
                                ...profile,
                                customer:{
                                    ...profile.customer,
                                    profession: event.target.value
                                }
                            })}
                        />
                    </span>
                </label>
                {/* Option */}

            </div>
            {/* Options */}
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        {/* Input group */}
    </>);
};

