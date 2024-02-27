import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { IeltsLmsEditQuizOverviewSkeleton, IeltsLmsEditQuizBasicEditSkeleton } from '../../../../../../components/Skeletons/Ieltslms';

import IeltsLmsEditQuizBasicEdit from "./BasicEdit";
import IeltsLmsEditQuizReadingPassages from "../Reading/ReadingPassages";
import IeltsLmsEditQuizReadingQuestions from "../Reading/ReadingQuestions";

import IeltsLmsEditQuizListeningPassages from "../Listening/ListeningPassages";
import IeltsLmsEditQuizListeningQuestions from "../Listening/ListeningQuestions";

import IeltsLmsEditQuizWritingEssay from "../Writing/WritingEssay";

import IeltsLmsEditQuizSpeakingSections from "../Speaking/SpeakingSection";
import IeltsLmsEditQuizSpeakingQuestions from "../Speaking/SpeakingQuestions";


import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { update_loader } from "../../../../../../includes/redux/slices/loader.slice";
import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_ieltslms_editQuiz, update_ieltslms_editQuiz_reset } from "../../../../../../includes/redux/slices/ieltslms.slice";
import { 
    IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS 
} from "../../../../../../includes/constants/ieltslms";


const DashboardIeltsLmsEditQuiz = () => {
    const dispatch              = useDispatch();
    const { id }                = useParams();
    const { ENDPOINT }          = ENDPOINTS;
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ } = useSelector(state => state.ieltslms);
    const { CURRENT_DYNAMIC_PARAM } = useSelector(state => state.menu);
    const [context, currentContext] = useState(<>loading...</>);
    const { CURRENT_DYNAMIC_MENU } = useSelector( state => state.menu );
    const { DYNAMIC_MENU_LOADING } = useSelector( state => state.menu );
    const [dmenu,setDmenu]         = useState([]); 
    const [cancelTokenSource, setCancelTokenSource] = useState(axios.CancelToken.source());


    // update states inside request --------- [step 3]
    const loadQuiz = () => {
        dispatch(update_ieltslms_editQuiz_reset());
        if (IELTS_LMS_EDIT_QUIZ_ROUTE.endpoint) {

            axios.get(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_ROUTE.endpoint}/${id}`, {
                cancelToken: cancelTokenSource.token,
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }, ).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { quiz } = response.data.success.json;
                        const cat = quiz._category;

                        dispatch(update_menu({
                            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
                            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-EDIT-QUIZ',
                            CURRENT_DYNAMIC_MENU: "IELTS-LMS-EDIT-QUIZ-" + quiz._category,
                            CURRENT_DYNAMIC_PARAM: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT',

                            PRIMARY_MENU_LOADING: false,
                            SECONDARY_MENU_LOADING: false,

                            IS_DYNAMIC_MENU_ACTIVE: true,
                            DYNAMIC_MENU_LOADING: false,
                            HAS_DYNAMIC_MENU: true,


                            PAGE_HEADING: 'Edit Quiz',
                            BREADCRUM_ONE: 'Dashboard',
                            BREADCRUM_TWO: 'IELTS LMS',
                            BREADCRUM_THREE: 'Edit Quiz',
                            DYNAMIC_HEADER: 'IELTS-LMS-EDIT-QUIZ'
                        }));

                        dispatch(update_ieltslms_editQuiz({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            QUIZ: quiz
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

                    dispatch(update_ieltslms_editQuiz({
                        LOADED: false,
                        LOADING: true,
                        FAILED: true
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
                    dispatch(update_ieltslms_editQuiz({
                        LOADED: false,
                        LOADING: true,
                        FAILED: true
                    }));
                }
            });

        } else {
            toast.warning("Failed to get edit quiz endpoint", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            dispatch(update_ieltslms_editQuiz({
                LOADED: false,
                LOADING: true,
                FAILED: true
            }));
        }


    };

    // event when quiz id found ------------- [step 1]
    useEffect(() => {
        dispatch(update_ieltslms_editQuiz({
            LOADED: false,
            LOADING: true,
            FAILED: false
        }));
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-MY-QUIZZES',
            CURRENT_DYNAMIC_MENU: "IELTS-LMS-EDIT-QUIZ",
            CURRENT_DYNAMIC_PARAM: "IELTS-LMS-EDIT-QUIZ-BASIC-EDIT",

            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            IS_DYNAMIC_MENU_ACTIVE: true,
            DYNAMIC_MENU_LOADING: true,
            HAS_DYNAMIC_MENU: true,
            DYNAMIC_MENU_FOR: 'IELTS-LMS',


            PAGE_HEADING: 'Edit Quiz',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'IELTS LMS',
            BREADCRUM_THREE: 'Edit Quiz',
            DYNAMIC_HEADER: 'IELTS-LMS-EDIT-QUIZ',
            TAB_TITLE: 'Edit Quiz | IELTS LMS | Dashboard'
        }));
    }, [id]);

    // event for load quizzes   ------------- [step 2]
    useEffect(() => {
        if (ROUTES_LOADED) {
            if (IELTS_LMS_EDIT_QUIZ_ROUTE) {
                loadQuiz();
            } else {
                toast.warning("Failed to get edit quiz endpoint", {
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
        if(CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-reading"){
            setDmenu(IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS);
        } else if(CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-listening"){
            setDmenu(IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS);
        } else if(CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-writing"){
            setDmenu(IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS);
        }  else if(CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-speaking"){
            setDmenu(IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS);
        } else {
            setDmenu([]);
        }
    },[CURRENT_DYNAMIC_MENU]);

    // on dynamic route change [switch tabs]
    useEffect(() => {
        if (
            CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-BASIC-EDIT" || 
            CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-BASIC-EDIT"
        ) {
            currentContext(<IeltsLmsEditQuizBasicEdit />)
        } else if (CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-READING-PASSAGES") {
            currentContext(<IeltsLmsEditQuizReadingPassages />);
        } else if (CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-READING-QUESTIONS") {
            currentContext(<IeltsLmsEditQuizReadingQuestions />);
        } else if (CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-LISTENING-PASSAGES") {
            currentContext(<IeltsLmsEditQuizListeningPassages />);
        } else if (CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-LISTENING-QUESTIONS") {
            currentContext(<IeltsLmsEditQuizListeningQuestions />);
        } else if(CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-WRITING-ESSAYS") {
            currentContext(<IeltsLmsEditQuizWritingEssay />);
        } else if(CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-SPEAKING-SECTIONS"){
            currentContext(<IeltsLmsEditQuizSpeakingSections />);
        } else if(CURRENT_DYNAMIC_PARAM == "IELTS-LMS-EDIT-QUIZ-SPEAKING-QUESTIONS"){
            currentContext(<IeltsLmsEditQuizSpeakingQuestions />);
        } else {
            currentContext(<>404 {CURRENT_DYNAMIC_PARAM}</>);
        }
    }, [CURRENT_DYNAMIC_PARAM]);

    useEffect(() => {
        return () => {
            cancelTokenSource.cancel('Request canceled due to component unmounting');
        }
    },[]);



    return (<>
        {IELTS_LMS_EDIT_QUIZ && <>
            {IELTS_LMS_EDIT_QUIZ.LOADED && <>
                {/* begin:: overview edit quiz */}
                <>

                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            {/* begin::Details */}
                            <div className="d-flex flex-sm-nowrap">
                                {/* begin: Pic */}
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-50px symbol-fixed position-relative">
                                        <img src={"/svgs/" + IELTS_LMS_EDIT_QUIZ.QUIZ._category + ".svg"} alt={""} width={50} height={60} />
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
                                                    {IELTS_LMS_EDIT_QUIZ.QUIZ.title}
                                                </a>
                                            </div>
                                            {/* end::Name */}

                                            {/* begin::Info */}
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    {IELTS_LMS_EDIT_QUIZ.QUIZ.description}
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
            {IELTS_LMS_EDIT_QUIZ.LOADING && <>
                <IeltsLmsEditQuizOverviewSkeleton />
                <IeltsLmsEditQuizBasicEditSkeleton />
            </>}
        </>}
    </>);
};




export default DashboardIeltsLmsEditQuiz;