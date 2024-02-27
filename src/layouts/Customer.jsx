import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ENDPOINTS from '../includes/constants/routes';
import { update_constants } from "../includes/redux/slices/constants.slice";
import { update_auth } from "../includes/redux/slices/auth.slice";



const DashboardMyAccount            = React.lazy(() => import('../views/dashboard/common/MyAccount'));
const DashboardMyAccountOverview    = React.lazy(() => import('../views/dashboard/common/MyAccount/Overview'));
const DashboardIeltsLms             = React.lazy(() => import('../views/dashboard/common/IeltsLms'));
const DashboardIeltsLmsMyQuizzes    = React.lazy(() => import('../views/dashboard/common/IeltsLms/MyQuizzes'));
const DashboardIeltsLmsMyCourses    = React.lazy(() => import('../views/dashboard/common/IeltsLms/MyCourses'));
const DashboardIeltsLmsEditQuiz     = React.lazy(() => import('../views/dashboard/common/IeltsLms/Quiz/Edit'));
const DashboardIeltsLmsEditCourse   = React.lazy(() => import('../views/dashboard/common/IeltsLms/Course/Edit'));

const DashboardDomains              = React.lazy(() => import('../views/dashboard/common/Domains'));
const DashboardMyDomains            = React.lazy(() => import('../views/dashboard/common/Domains/MyDomains'));
const DashboardAddMyDomain          = React.lazy(() => import('../views/dashboard/common/Domains/AddMyDomain'));
const DashboardMyDomain             = React.lazy(() => import('../views/dashboard/common/Domains/MyDomain'));
const DashboardMarket               = React.lazy(() => import('../views/dashboard/common/Market'));
const DashboardMarketOverview       = React.lazy(() => import('../views/dashboard/common/Market/Overview'));

const Customer = (props) => {
    const dispatch                  = useDispatch();
    const { ENDPOINT }              = ENDPOINTS;
    const { RETRY_AUTH_API }        = useSelector( state => state.auth );
    const { USER }                  = useSelector( state => state.auth );
    const { ROUTES_LOADED }         = useSelector( state => state.auth );
    const { USER_PERMISSIONS }      = useSelector( state => state.auth );
    const [ieltslms,setIeltslms]    = useState(false);
    
    
    useEffect(() => {
        dispatch(update_auth({
            ROUTES_LOADING: true,
            ROUTES_LOADED: false,
            ROUTES_FAILED: true
        }));

        axios.get(`${ENDPOINT}/customer/routes`,{
            headers:{
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        }).then((response) => {
            if(response.data.success) {
                dispatch(update_constants({
                    ...response.data.success.json
                }));
                dispatch(update_auth({
                    ROUTES_LOADING: false,
                    ROUTES_LOADED: true,
                    ROUTES_FAILED: false
                }));
            } else {
                dispatch(update_auth({
                    ROUTES_LOADING: false,
                    ROUTES_LOADED: true,
                    ROUTES_FAILED: false
                }));
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
            dispatch(update_auth({
                ROUTES_LOADING: false,
                ROUTES_LOADED: false,
                ROUTES_FAILED: true
            }));
            if(error.code == "ERR_NETWORK"){
                toast.error("Failed to connect Backend services", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(error.code, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        });
    },[RETRY_AUTH_API]);

    useEffect(() => {
        setIeltslms(false);

        if( USER_PERMISSIONS && USER_PERMISSIONS.length > 0 ) {
            USER_PERMISSIONS.forEach((p) => {
                if(p._key === "ielts-lms" && p.status){
                    setIeltslms(true);
                }
            });
        }
    },[ROUTES_LOADED, USER_PERMISSIONS]);

    return (<>
        <Suspense fallback={<>
            <div className="page-loader flex-column">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
            </div>
        </>}>
            <Routes>
                {ROUTES_LOADED && <>
                <Route exact path="/@customer/my-account" name="my account" element={<DashboardMyAccount />}>
                    <Route exact path="/@customer/my-account/overview" name="my account Overview" element={<DashboardMyAccountOverview />} />
                    <Route exact path="/@customer/my-account/settings" name="my account settings" element={<>Settings</>} />
                    <Route path="*" name="all" element={<Navigate to="/dashboard/@customer/my-account/overview" replace />} />
                </Route>
                
                <Route exact path="/@customer/domains" name="domains overview" element={<DashboardDomains />}>
                    <Route exact path="/@customer/domains/my-domains" name="my domains list" element={<DashboardMyDomains />} />
                    <Route exact path="/@customer/domains/domain/add" name="my domains - add new domain" element={<DashboardAddMyDomain />} />
                    <Route exact path="/@customer/domains/:id" name="my domains - my domain" element={<DashboardMyDomain />} />
                    <Route path="*" name="all" element={<Navigate to="/dashboard/@customer/domains/my-domains" replace />} />
                </Route>

                <Route exact path="/@customer/market" name="market" element={<DashboardMarket />}>
                    <Route exact path="/@customer/market/overview" name="Market overview" element={<DashboardMarketOverview />} />
                    <Route path="*" name="all" element={<Navigate to="/dashboard/@customer/market/overview" replace />} />
                </Route>

                {ieltslms && <>
                <Route exact path="/@customer/ielts-lms" name="Ielts lms" element={<DashboardIeltsLms />}>
                    <Route exact path="/@customer/ielts-lms/my-quizzes" name="Ielts Lms My Quizzes" element={<DashboardIeltsLmsMyQuizzes />} />
                    <Route exact path="/@customer/ielts-lms/my-courses" name="Ielts LMS My Courses" element={<DashboardIeltsLmsMyCourses />} />
                    <Route exact path="/@customer/ielts-lms/quiz/edit/:id" name="Ielts lms" element={<DashboardIeltsLmsEditQuiz />} />
                    <Route exact path="/@customer/ielts-lms/course/edit/:id" name="Ielts lms Edit My Course" element={<DashboardIeltsLmsEditCourse />} />
                    <Route exact path="/@customer/ielts-lms" name="all" element={<Navigate to="/dashboard/@customer/ielts-lms/my-quizzes" replace />} />
                </Route>
                </>}

                
                <Route path="*" name="all" element={<Navigate to="/dashboard/@customer/my-account/overview" replace />} />
                </>}
            </Routes>
        </Suspense>
    </>);
};

export default Customer;