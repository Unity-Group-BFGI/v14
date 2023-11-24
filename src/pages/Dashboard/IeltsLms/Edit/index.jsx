import { update_dashboard } from '../../../../includes/redux-store/Slices/Dashboard.slice';
import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { update_route } from '../../../../includes/redux-store/Slices/Route.slice';
import getRequest from '../../../../includes/rest-apis/get';
import constants from '../../../../includes/constants';
import { IeltsLmsEditQuizOverviewSkeleton, IeltsLmsEditQuizDynamicSkeleton } from '../../../../components/default/Skeletons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import IeltsLmsEditQuizBasicEdit from './BasicEdit';
import { IeltsLmsEditQuizWritingEssay } from './Writing';
import { IeltsLmsEditQuizSpeakingSection, IeltsLmsEditQuizSpeakingQuestion } from './Speaking';
import { IeltsLmsEditQuizReadingPassages, IeltsLmsEditQuizReadingQuestions } from './Reading';
import { IeltsLmsEditQuizListeningPassages, IeltsLmsEditQuizListeningQuestions } from './Listening';
// dynamic tabs
const IeltsLmsEditQuizDynamicTabs = () => {
    const { PARAM3, PARAM2 } = useSelector( state => state.route );
    const [context,setContext] = useState(<></>);
    useEffect(() => {
        if(PARAM2 === "ielts-lms-edit-quiz"){
            if(PARAM3 === "ielts-lms-edit-quiz-basic-edit"){
                setContext(<IeltsLmsEditQuizBasicEdit />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-writing-essay"){
                setContext(<IeltsLmsEditQuizWritingEssay />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-speaking-sections"){
                setContext(<IeltsLmsEditQuizSpeakingSection />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-speaking-questions"){
                setContext(<IeltsLmsEditQuizSpeakingQuestion />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-reading-passages"){
                setContext(<IeltsLmsEditQuizReadingPassages />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-reading-questions"){
                setContext(<IeltsLmsEditQuizReadingQuestions />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-listening-passages"){
                setContext(<IeltsLmsEditQuizListeningPassages />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-listening-questions"){
                setContext(<IeltsLmsEditQuizListeningQuestions />);
            }
        }
    },[PARAM2,PARAM3]);

    return (<>
        {context}
    </>);
};



const EditQuiz = () => {
    const { id }                            = useParams();
    const { endpoint }                      = constants;
    const dispatch                          = useDispatch();
    const routeParent                       = "ielts-lms";
    const routeChild                        = "ielts-lms-edit-quiz";
    const { USER }                          = useSelector( state => state.auth ); 
    const { PARAM2, PARAM3 }                = useSelector( state => state.route );   
    const { DASHBOARD_SUBMENUS }            = useSelector( state => state.dashboard );
    const { DASHBOARD_DYNAMIC_MENU_LOADING, DASHBOARD_DYNAMIC_MENU } = useSelector( state => state.dashboard );


    const { IELTS_LMS_OVERALL }                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                       = useSelector( state => state.ieltsLms ); 
    const { IELTS_LMS_EDIT_QUIZ_DYNAMIC }               = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_OVERVIEW }              = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS }    = useSelector( state => state.ieltsLms );
    const [loading,setLoading]              = useState(true);

    const updateStates = (json = {}) => {
        const { permissions, states } = json;

        if( states.IELTS_LMS ){
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }

        if( states.DASHBOARD ) {
            dispatch(update_dashboard({
                ...permissions.DASHBOARD
            }));
        }

        if( states.ROUTE ) {
            dispatch(update_route({
                ...permissions.ROUTE
            }));
        }

        
    };

    // flush the previous states
    useEffect(() => {
        // flush the previous states
        if(loading){
            dispatch(update_ielts_lms({
                IELTS_LMS_EDIT_QUIZ: {
                    LOADING: true,
                    LOADED: false,
                    FAILED: false
                }
            }));
        }
    },[]);

    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED
        ) {

            const matches       = [...DASHBOARD_SUBMENUS];
            const matchedObject =  matches.find( menuItem => {
                return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
            });

            if( matchedObject ) {
                const { restApi } = matchedObject;
                
                if( restApi.enable ) { 
                    console.log('[RESET API]:',restApi);
                    if(1 == 1){
                        
                        getRequest(endpoint + restApi.endpoint + "/" +id, {
                            'Authorization': 'Bearer '+USER.accessToken,
                            'x-refresh-token': USER.refreshToken,
                            'x-api-token': ''
                        },{}).then((response) => {
                            const { success, has_json, json, error, res } = response;
                            if( success && has_json && !error ) {
                                updateStates(json);
                            } else {
                                console.warn(`[warning]: ${res}`);
                            }
                        }).catch((err) => {

                        });
                    }
                }

            } else {
                console.warn("no match found for this route");
            }

        }
        return () => {}
    },[IELTS_LMS_OVERALL]);

    useEffect(() => {
        if(
            IELTS_LMS_EDIT_QUIZ &&
            IELTS_LMS_EDIT_QUIZ.LOADED &&
            IELTS_LMS_EDIT_QUIZ_OVERVIEW &&
            IELTS_LMS_EDIT_QUIZ_OVERVIEW.LOADED
        ){
            setLoading(false);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: false,
                DASHBOARD_DYNAMIC_MENU_LOADING: false
            }));
        } else {
            setLoading(true);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
                DASHBOARD_DYNAMIC_MENU_LOADING: true
            }));
        }
    },[IELTS_LMS_EDIT_QUIZ,IELTS_LMS_EDIT_QUIZ_OVERVIEW]);

    return (<>
        {loading? <>
            <IeltsLmsEditQuizOverviewSkeleton />
            <IeltsLmsEditQuizDynamicSkeleton />
        </> : <>
            {IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ_OVERVIEW && <>
                {IELTS_LMS_EDIT_QUIZ_OVERVIEW.LOADED && IELTS_LMS_EDIT_QUIZ_OVERVIEW.QUIZ &&
                <>
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        {/* begin::Details */}
                        <div className="d-flex flex-sm-nowrap">
                            {/* begin: Pic */}
                            <div className="me-7 mb-4">
                                <div className="symbol symbol-60px symbol-fixed position-relative">                          
                                    <img src={""} alt={""} width={60} height={60} />
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
                                                {IELTS_LMS_EDIT_QUIZ_OVERVIEW.QUIZ.title}
                                            </a>
                                        </div>
                                        {/* end::Name */}

                                        {/* begin::Info */}
                                        <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                            <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                {IELTS_LMS_EDIT_QUIZ_OVERVIEW.QUIZ.description}
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
                        {(!DASHBOARD_DYNAMIC_MENU_LOADING && DASHBOARD_DYNAMIC_MENU)? <>
                            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                                {/* begin::Nav item */}
                                {(DASHBOARD_DYNAMIC_MENU.length > 0 && DASHBOARD_DYNAMIC_MENU.map((dmenu, index) => {
                                    const { meta, router, params }      = dmenu;
                                    const { param2, param1, param3 }    = params;
                                    return (<li className="nav-item mt-2" key={index}>
                                        <a 
                                            type="button" 
                                            className={`nav-link text-active-primary ms-0 me-10 py-5 ${(PARAM3 === param3 && PARAM2 === param2)? 'active': ''}`}
                                            onClick={() => dispatch(update_route({
                                                PARAM1: param1,
                                                PARAM2: param2,
                                                PARAM3: param3
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
                <IeltsLmsEditQuizDynamicTabs />
                </>}
            </>}
        </>}


    </>);
};

export { EditQuiz };