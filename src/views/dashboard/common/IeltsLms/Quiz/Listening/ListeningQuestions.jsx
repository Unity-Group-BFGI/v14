import '../../../../../../styles/iot.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select, { components } from "react-select";
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import parse from 'html-react-parser';

import { IeltsLmsEditQuizSectionsListSkeleton } from "../../../../../../components/Skeletons/Ieltslms";
import ENDPOINTS from '../../../../../../includes/constants/routes';
import { LISTENING_QUESTION_CATEGORIES } from "../../../../../../includes/constants/ieltslms";


import {
    update_ieltslms_editQuiz_question_settings,
    update_ieltslms_editQuiz_questions,
    update_ieltslms_editQuiz_question_content,
    update_ieltslms_editQuiz_question_add_questions,
    update_ieltslms_editQuiz_question_remove_questions,
    update_question_editQuiz_question_update_questions_content,
    update_question_editQuiz_question_update_questions_options,
    update_ieltslms_editQuiz_question_reset,
    update_ieltslms_editQuiz_question_answer_settings,
    update_ieltslms_editQuiz_questions_explanations,
    update_ieltslms_editQuiz_question_update_explanation_content,
    update_ieltslms_editQuiz_question_update_question_main,
    update_ieltslms_editQuiz_update_question,
    update_ieltslms_editQuiz_question,
    update_ieltslms_editQuiz_question_question,
    update_ieltslms_editQuiz_alter_option
} from "../../../../../../includes/redux/slices/ieltslms.slice";
import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { LoadEditorLight } from "../../../../../../components/Editor";


const IeltsLmsEditQuizListeningQuestions = () => {
    const HEADING = 'List of Questions';
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ENDPOINT } = ENDPOINTS;

    // routes
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    // quiz states
    const { IELTS_LMS_EDIT_QUIZ } = useSelector(state => state.ieltslms);
    // questions states
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS } = useSelector(state => state.ieltslms);
    const [loading, setLoading] = useState(true);



    // states -
    const [sectionSelected, setSectionSelected] = useState(false);

    // load sections if not loaded
    // load sections
    const loadSections = (where = {}, pagination = {}, search = {}) => {
        // set loading
        axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE.endpoint}/${id}`, {
            pagination: {
                currentPage: 1,
                perPage: 100,
                ...pagination
            },
            where: {
                status: 'published',
                _quizId: id,
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
                    dispatch(update_ieltslms_editQuiz_questions({
                        LOADED: true,
                        LOADING: false,
                        FAILED: false,
                        SECTIONS: [...response.data.success.json.sections],
                        QUESTIONS: []
                    }));
                    loadQuestionsStates();
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

        }).catch(error => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).finally(() => {

        });
    };

    // load questions
    const loadQuestionsStates = () => {
        const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.find(item => item._id == IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID);
        if (foundObject) {
            dispatch(update_ieltslms_editQuiz_questions({
                CURRENT_SECTION_ID: foundObject._id
            }));
            setSectionSelected(true);
        } else {
            dispatch(update_ieltslms_editQuiz_questions({
                CURRENT_SECTION_ID: 'not-selected'
            }));
            setSectionSelected(false);

        }
        setLoading(false);
    };

    // handle section id change
    const handleSectionChange = (event) => {
        const { value } = event.target;
        const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.find(item => item._id == value);
        if (foundObject) {
            dispatch(update_ieltslms_editQuiz_questions({
                CURRENT_SECTION_ID: value
            }));
            setSectionSelected(true);
        } else {
            dispatch(update_ieltslms_editQuiz_questions({
                CURRENT_SECTION_ID: 'not-selected'
            }));
            setSectionSelected(false);
        }

    };

    // event for route links   ------------- [step 1]
    useEffect(() => {
        
        // reset states
        setLoading(true);
        if (
            ROUTES_LOADED &&
            IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTION_CATEGORIES_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_CATEGORIES_ROUTE
        ) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                if (
                    IELTS_LMS_EDIT_QUIZ_SECTIONS && 
                    IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS &&
                    IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS && 
                    (IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length != IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.length) ||
                    IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length <= 0
                ) {
                    // load sections
                    
                    loadSections();
                } else {
                    
                    loadQuestionsStates();
                }
            } else {
                toast.warning("It Looks like Quiz is not loaded", {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.warning("Failed to locate Listening Questions endpoints", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    }, [ROUTES_LOADED, IELTS_LMS_EDIT_QUIZ]);

    // on section change
    useEffect(() => {
        /*
        if ( 
            ROUTES_LOADED && 
            IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE
        ) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                if(IELTS_LMS_EDIT_QUIZ_QUESTIONS.LOADED){
                    if(IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length > 0){
                        if(IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID == null || IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID == "not-selected"){
                            setSectionSelected(false);
                            setLoading(false);
                        } else {
                            
                            console.log('load questions', IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID);
                            
                        }
                    }
                }
            }
        }
        */
    }, [IELTS_LMS_EDIT_QUIZ_QUESTIONS]);

    return (<>
        {loading ? <><IeltsLmsEditQuizSectionsListSkeleton /></> : <>
            {IELTS_LMS_EDIT_QUIZ_QUESTIONS.LOADED && <>
                {IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS && <>

                    {/* show section realed box if no sections */}
                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length <= 0 && <>
                        <div className="card">
                            <div className="card-body">
                                <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                                </svg>
                                <div className="text-center pt-10 mb-20">
                                    <h2 className="fs-2 fw-bold mb-7">0 Passages Found</h2>
                                    <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                        There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                    </p>
                                    <button type='button' className="btn btn-primary btn-thin" style={{ marginRight: "15px" }} onClick={() => dispatch(update_menu({
                                        CURRENT_DYNAMIC_PARAM: 'IELTS-LMS-EDIT-QUIZ-LISTENING-PASSAGES'
                                    }))}>
                                        <i className="fa fa-thin fa-chevron-left"></i> Swtich to Passages Tab
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>}

                    {/* show section realed box if sections */}
                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length > 0 && <>

                        {/* BEGIN::header */}
                        <div className="card bg-transparent mb-4 border-0" style={{ boxShadow: '0 0' }}>
                            <div className="card-header d-flex flex-row align-items-center border-0">
                                <h3 className="card-title">{HEADING}</h3>
                                <Form.Select
                                    style={{ maxWidth: "200px", fontSize: "12px" }}
                                    value={IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID || 'not-selected'}
                                    onChange={handleSectionChange}
                                >
                                    <option value="not-selected"> --SELECT PASSAGE-- </option>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.map((s, index) => { return (<option key={index} value={s._id}>{s.title}</option>) })}
                                </Form.Select>
                            </div>
                        </div>
                        {/* END::header */}

                        {!sectionSelected && <>
                            <div className="card">
                                <div className="card-body">
                                    <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                                    </svg>
                                    <div className="text-center pt-10 mb-20">
                                        <h2 className="fs-2 fw-bold mb-7">Choose Passage</h2>
                                        <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                            There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                        </p>
                                        <Form.Select
                                            style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }}
                                            value={IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID || 'not-selected'}
                                            onChange={handleSectionChange}
                                        >
                                            <option value="not-selected"> --SELECT PASSAGE-- </option>
                                            {IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.map((s, index) => { return (<option key={index} value={s._id}>{s.title}</option>) })}
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>
                        </>}

                        {sectionSelected && <QuestionsList sid={IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID} />}


                    </>}

                </>}
            </>}
        </>}
    </>);
};


const QuestionsList = ({ sid }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ENDPOINT } = ENDPOINTS;
    const [cancelTokenSource, setCancelTokenSource] = useState(axios.CancelToken.source());
    // routes
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE } = useSelector(state => state.constants);

    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    // states
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS } = useSelector(state => state.ieltslms);
    // loading -[true | false]
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(null);
    const [addEditQuestionModal, setAddEditQuestionModal] = useState(false);
    const [qid, setQid] = useState(null);

    // load Questions
    const loadQuestions = (where = {}, pagination = {}, search = {}) => {
        // set loading
        axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE.endpoint}/${id}/${sid}`, {
            pagination: {
                currentPage: 1,
                perPage: 100,
                ...pagination
            },
            where: {
                status: 'published',
                _quizId: id,
                _postId: sid,
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
                    dispatch(update_ieltslms_editQuiz_questions({
                        LOADED: true,
                        LOADING: false,
                        FAILED: false,
                        QUESTIONS: [...response.data.success.json.questions]
                    }));
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
        }).finally(() => {

        });
    };

    // add question modal
    const addQuestionModal = () => {
        setType('new');
        setAddEditQuestionModal(true);
    };

    // edit question
    const editQuestion = (_id) => {
        setType('edit');
        setQid(_id);
        setAddEditQuestionModal(true);
    };

    // handle close
    const handleClose = (reload = false) => {
        if (IELTS_LMS_EDIT_QUIZ_QUESTION.SAVING > 1) {
            if(!reload) { loadQuestions(); }
        }
        if(reload) { loadQuestions(); }
        dispatch(update_ieltslms_editQuiz_question_reset());
        setAddEditQuestionModal(false);
    };

    useEffect(() => {
        setLoading(true);
        if (
            ROUTES_LOADED &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE
        ) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                loadQuestions();
            } else {
                toast.warning("It Looks like Quiz is not loaded", {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.warning("Failed to locate Listening passages endpoints", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }, [sid]);

    return (<>
        {loading ? <><IeltsLmsEditQuizSectionsListSkeleton /></> : <>
            <div className="card mb-5 mb-xm-10">
                <div className="card-header cursor-pointer">
                    <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                        <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.length || 0})</h3>
                        <div className="d-flex align-items-center position-relative p-r">
                            <button className="btn btn-sm btn-primary" onClick={addQuestionModal}>
                                <i className="fa fa-plus"></i> Add Question
                            </button>
                        </div>
                    </div>
                </div>
                {/* begin::Content */}
                <div className="collapse show">
                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS.LOADED && <>

                        {IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.length <= 0 && <>
                            <div className="card">
                                <div className="card-body">
                                    <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                                    </svg>
                                    <div className="text-center pt-10 mb-20">
                                        <h2 className="fs-2 fw-bold mb-7">Add First Question</h2>
                                        <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                            There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                        </p>
                                        <button onClick={addQuestionModal} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                            <i className="fa fa-plus"></i> Add Question
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>}

                        <div className="card-body border-top p-9">
                            <div className="py-2">
                                {IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.length > 0 && <>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.map((qus, index) => {
                                        return (<QuestionItem
                                            key={qus._id}
                                            loadQuestions={loadQuestions}
                                            index={index}
                                            qus={qus}
                                            editQuestion={editQuestion}
                                            length={IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.length || 0}
                                        />)
                                    })}
                                </>}
                            </div>
                        </div>


                        {addEditQuestionModal && <AddEditQuestionModal sid={sid} addEditQuestionModal={addEditQuestionModal} type={type} qid={qid} handleClose={handleClose} />}


                    </>}
                </div>
            </div>
        </>}
    </>);

};


// single question item
const QuestionItem = ({ index, length, qus, editQuestion, loadQuestions }) => {
    const { id } = useParams();
    const { title, order, status, _id, _postId }        = qus;
    const [removing, setRemoving]                       = useState(false);
    const { ENDPOINT }                                  = ENDPOINTS;
    const { USER }                                      = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_REMOVE_QUESTION_ROUTE } = useSelector(state => state.constants);

    const confirmRemove = () => { 
        if( IELTS_LMS_EDIT_QUIZ_REMOVE_QUESTION_ROUTE && IELTS_LMS_EDIT_QUIZ_REMOVE_QUESTION_ROUTE.endpoint ) {
            let c = confirm("Would you like to Remove this Question?");
            if( c ) {
                setRemoving(true);
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_REMOVE_QUESTION_ROUTE.endpoint}/${id}/${_postId}/${_id}`, {}, {
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {
                    if (response.data.success) {
                        loadQuestions();
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
        
                }).catch(error => {
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }).finally(() => {
                    setRemoving(false);
                });
            }
        } else {
            toast.error("Remove question endpoint not found", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    return (<React.Fragment>
        <div className="d-flex flex-stack">
            <div className="d-flex">

                <img className="w-40px h-40px me-6" src={"/img/speaking/section/list.png"} alt="" />
                <div className="d-flex flex-column">

                    <div className="fs-5 text-dark text-hover-primary fw-bold">
                        {title}
                    </div>
                    <div className="fs-6 fw-semibold text-gray-400 d-flex flex-row justify-content-left">
                        <span>Order: {order}</span>
                    </div>

                </div>
            </div>

            <div className="d-flex flex-column justify-content-evenly">
                <div className="d-flex flex-row justify-content-evenly mb-2">

                    {status == "trashed" && <>
                        <button disabled={removing} onClick={() => { }} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                            <i className="fa fa-refresh"></i>
                        </button>
                        <button onClick={() => confirmRemove(_id)} disabled={removing} className="btn btn-sm btn-light-danger" type='button' style={{ padding: '4px 10px !important' }}>
                            <i className="fa fa-trash"></i> Delete Permanent
                        </button>
                    </>}

                    {(status == "published" || status == "drafted") && <>
                        <button disabled={removing} className="btn btn-sm btn-light-primary btn-icon btn-link" style={{ marginRight: '10px' }} type='button' onClick={() => editQuestion(_id)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button disabled={removing} onClick={() => confirmRemove(_id)} className="btn btn-sm btn-light-danger btn-icon btn-link mr-2" type='button'>
                            {removing && <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {!removing && <i className="fa fa-trash-alt"></i>}
                            
                        </button>
                    </>}

                </div>
            </div>
        </div>
        {index + 1 < length && <div className="separator separator-dashed my-5"></div>}
    </React.Fragment>)
};

// add edit question modal
const AddEditQuestionModal = ({ type, qid, sid, handleClose, addEditQuestionModal }) => {

    const POST_TYPE = 'listening-question';
    const { ENDPOINT } = ENDPOINTS;
    const dispatch = useDispatch();
    const { id } = useParams();
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { USER } = useSelector(state => state.auth);
    const { WIDTH } = useSelector(state => state.theme);
    const [fullscreen, setFullscreen] = useState(false);
    const [step, activeStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(1);
    const [tabs, setTabs] = useState([<BasicQuestionTab />, <QuestionContentTab load={Date()} />, <QuestionsExplanations />, <QuestionPreview />, <QuestionFinish handleClose={handleClose} />]);
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    const [HEADING, setHeading] = useState('Add Listening Question');

    const stepUpdate = (s) => {
        if (!IELTS_LMS_EDIT_QUIZ_QUESTION.PROCESSING) {
            activeStep(s);
        }
    };

    // load Question by id
    const loadQuestion = () => {
        setLoading(true);
        axios.get(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE.endpoint}/${id}/${sid}/${qid}`, {
            headers: {
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        }).then((response) => {

            if (response.data.success) {
                if (response.data.success.has_json) {
                    dispatch(update_ieltslms_editQuiz_question({
                        LOADED: true,
                        LOADING: false,
                        FAILED: false,
                        PROCESSING: false,
                        QUESTION: {
                            ...response.data.success.json.question
                        }
                    }));
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
        }).finally(() => {

        });
    };

    useEffect(() => {
        if (WIDTH <= 700) {
            setFullscreen(true);
        } else {
            setFullscreen(false);
        }
    }, [WIDTH]);

    useEffect(() => {
        if (sid) {
            if (type == "new") {
                setHeading('Add Listening Question');
                dispatch(update_ieltslms_editQuiz_question_question({
                    _postId: sid,
                    _quizId: id,
                    _postType: POST_TYPE
                }));
                setLoading(false);
            } else if (type == "edit") {
                setHeading('Edit Listening Question');
                loadQuestion();
            }
        } else {
            toast.warning("Missing Passage id", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }, [type, qid, sid]);

    return (<>

        <Modal
            size="lg"
            centered
            show={addEditQuestionModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
            className='question__components'
        >

            <div className="modal-header p-4">
                <h6 className='modal-title'>{HEADING}</h6>
                {!IELTS_LMS_EDIT_QUIZ_QUESTION.PROCESSING &&
                    <div className="btn-close-add-question-modal btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>}
            </div>
            <div className="modal-body p-0">
                <div className="tab-container">
                    <ul className='tablist'>

                        <>
                            <li className={`tabs ${step === 0 ? 'tab-active' : ''}`} onClick={(event) => stepUpdate(0)}>Basic</li>
                            {IELTS_LMS_EDIT_QUIZ_QUESTION && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION && <>
                                {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings && <>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType !== 'none' && <>
                                        <li className={`tabs tab-questions ${step === 1 ? 'tab-active' : ''}`} onClick={(event) => stepUpdate(1)}>Question</li>
                                        <li className={`tabs ${step === 2 ? 'tab-active' : ''}`} onClick={(event) => stepUpdate(2)}>Explanation</li>
                                        <li className={`tabs ${step === 3 ? 'tab-active' : ''}`} onClick={(event) => stepUpdate(3)}>Preview</li>
                                        <li className={`tabs ${step === 4 ? 'tab-active' : ''}`} onClick={(event) => stepUpdate(4)}>Finish</li>
                                    </>}
                                </>}
                            </>}

                        </>
                    </ul>
                </div>
                <div className={"tab-content__box"}>
                    {loading ? <>
                        Loading...
                    </> : <>

                        {tabs[step] ? tabs[step] : '404'}
                    </>}
                </div>
            </div>
        </Modal>

    </>);

};


// step 1 - basic of question
const BasicQuestionTab = () => {
    const dispatch = useDispatch();
    const { IELTS_LMS_EDIT_QUIZ_QUESTION_INPUT_TYPES } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);

    // default option layout
    const Option = (props) => (
        <components.Option {...props} className="question__types-option">
            {/*props.data.icon && <img src={props.data.icon} alt="logo" className="question__types-icon" />*/}
            {props.data.label}
        </components.Option>
    );

    const SingleValue = ({ children, ...props }) => (
        <components.SingleValue {...props}>
            {/*props.data.icon && <img src={props.data.icon} alt="s-logo" className="selected-logo question__types-icon" />*/}
            {props.data.label}
        </components.SingleValue>
    );

    // [inputType]
    const selectedInputTypeOption = IELTS_LMS_EDIT_QUIZ_QUESTION_INPUT_TYPES.find(
        (type) => type.value === IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType
    );

    // html string maker
    const removeHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    // analyze curly backets for correct answer 
    const analyzeCurlyBrackets = (text) => {
        // Regular expression to find text within curly brackets
        const regex = /\{([^}]+)\}/g;
        // Use matchAll to find all matches
        const matches = [...text.matchAll(regex)];
        // Extract values from matches
        const values = matches.map(match => match[1]);
        return values;
    };

    // events
    const handleQuestionInputTypeChange = (selectedOption) => {
        const selectedValue = selectedOption.value; // Get the selected option's value
        const { content, questions, explanations, _questionSettings, _answerSettings, options } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION;
        if (selectedValue === "fillup" || selectedValue === "select") {
            // analyize content of html
            const { html } = content;
            const stringText = removeHtmlTags(html);
            const values = analyzeCurlyBrackets(stringText);
            const num = values.length;
            if (values.length > 0) {
                // add explanations
                const newExplanations = Array(values.length).fill({
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                });

                // Preserve the content from the existing explanations
                for (let i = 0; i < Math.min(values.length, explanations.length); i++) {
                    newExplanations[i] = { ...explanations[i] };
                }

                dispatch(update_ieltslms_editQuiz_update_question({
                    _questionSettings: {
                        ..._questionSettings,
                        numberOfQuestions: num
                    },
                    explanations: newExplanations
                }));

            } else {
                // remove explanations
                dispatch(update_ieltslms_editQuiz_update_question({
                    _questionSettings: {
                        ..._questionSettings,
                        numberOfQuestions: num
                    },
                    explanations: []
                }));
            }
        } else if (selectedValue === "radio") {
            const num = questions.length;
            // add explanations
            const newExplanations = Array(num).fill({
                hasHtml: true,
                html: '',
                text: '',
                type: 'text'  // [text,audio,video]
            });

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(num, explanations.length); i++) {
                newExplanations[i] = { ...explanations[i] };
            }

            dispatch(update_ieltslms_editQuiz_update_question({
                _questionSettings: {
                    ..._questionSettings,
                    numberOfQuestions: num
                },
                explanations: newExplanations
            }));

        } else if (selectedValue === "checkbox") {
            const num = options.length;
            let xnum = 0;

            if (num > 0) {
                if(_questionSettings.combine){
                    xnum = options.filter(item => (item.correct == true || item.correct == "true")).length;
                } else {
                    let c = options.filter(item => (item.correct == true || item.correct == "true")).length;
                    if( c > 0 ) {
                        xnum = 1;
                    }
                }
            }

            // add explanations
            const newExplanations = Array(xnum).fill({
                hasHtml: true,
                html: '',
                text: '',
                type: 'text'  // [text,audio,video]
            });


            const newOptions = Array(num).fill({
                content: 'Option',
                correct: false
            });

            

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(xnum, explanations.length); i++) {
                newExplanations[i] = { ...explanations[i] };
            }

            // 
            for (let i = 0; i < Math.min(num, options.length); i++) {
                newOptions[i] = { ...options[i] };
            }

            let op = newOptions;
            if(newOptions.length <= 0 ){
                op = [{
                    content: 'Option '+(newOptions.length + 1),
                    correct: false
                }];
            }

            dispatch(update_ieltslms_editQuiz_update_question({
                _questionSettings: {
                    ..._questionSettings,
                    numberOfQuestions: xnum
                },
                options: op,
                explanations: newExplanations
            }));
        }

        dispatch(update_ieltslms_editQuiz_question_settings({
            type: 'inputType',
            value: selectedValue
        }));
    };


    return (<>
        <div className="step-1 steps tab-step__padding mb-10">
            <div className="step__controller">
                <label htmlFor="input-type" className='required'>Input Type</label>
                <Select
                    id="input-type"
                    value={selectedInputTypeOption}
                    options={IELTS_LMS_EDIT_QUIZ_QUESTION_INPUT_TYPES}
                    onChange={handleQuestionInputTypeChange}
                    styles={{
                        singleValue: (base) => ({
                            ...base,
                            display: "flex",
                            alignItems: "center"
                        })
                    }}
                    components={{
                        Option,
                        SingleValue
                    }}
                />
            </div>
        </div>
    </>);
};


// step 2 - Question [content/instructions]
const QuestionContentTab = ({ load }) => {
    const dispatch = useDispatch();
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    const [htmlEditor, setHtmlEditor] = useState(<></>);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const toolbar = "";
    // event [html]
    const setHtml = (html) => {
        dispatch(update_ieltslms_editQuiz_question_content({
            type: 'html',
            value: html
        }));
    };

    // html string maker
    const removeHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    // analyze curly backets for correct answer 
    const analyzeCurlyBrackets = (text) => {
        // Regular expression to find text within curly brackets
        const regex = /\{([^}]+)\}/g;
        // Use matchAll to find all matches
        const matches = [...text.matchAll(regex)];
        // Extract values from matches
        const values = matches.map(match => match[1]);
        return values;
    };

    // radio - events
    const handleCorrectAnswerChangeRadio = (qindex, oindex) => {
        dispatch(update_question_editQuiz_question_update_questions_options({
            qindex: qindex,
            type: 'radio',
            mode: 'correct',
            oindex: oindex
        }));
    };

    // add question option
    const addQuestionOption = (qindex, length) => {
        dispatch(update_question_editQuiz_question_update_questions_options({
            qindex: qindex,
            type: 'radio',
            mode: 'add',
            option: {
                content: `Option ${length + 1}`,
                correct: false
            }
        }));
    };

    const updateOptionContent = (qindex, oindex, html) => {
        dispatch(update_question_editQuiz_question_update_questions_options({
            qindex: qindex,
            type: 'radio',
            mode: 'content',
            oindex: oindex,
            content: html
        }));
    };

    const updateQuestionsContent = (qindex, html) => {

        dispatch(update_question_editQuiz_question_update_questions_content({
            type: 'radio',
            qindex: qindex,
            html: html
        }));

    };

    const removeQuestionOption = (qindex, oindex) => {
        dispatch(update_question_editQuiz_question_update_questions_options({
            qindex: qindex,
            type: 'radio',
            mode: 'remove',
            oindex: oindex
        }));
    };


    // add more question
    const addMoreQuestion = () => {
        dispatch(update_ieltslms_editQuiz_question_add_questions({
            type: 'radio'
        }));
    };

    // remove question
    const removeQuestion = (qindex) => {
        dispatch(update_ieltslms_editQuiz_question_remove_questions({
            type: 'radio',
            qindex: qindex
        }));
    };


    // checkbox -------
    const addOption = (length) => {
        dispatch(update_ieltslms_editQuiz_alter_option({
            type: 'add'
        }));
    };
    const removeOption = (oindex) => {
        dispatch(update_ieltslms_editQuiz_alter_option({
            type: 'remove',
            oindex: oindex
        }));
    };

    const handleCorrectAnswerChangeCheckbox = (oindex) => {
        dispatch(update_ieltslms_editQuiz_alter_option({
            type: 'correct',
            oindex: oindex
        }));
    };
    const updateOptionContentCheckbox       = (oindex, content) => {
        dispatch(update_ieltslms_editQuiz_alter_option({
            type: 'content',
            content: content,
            oindex: oindex
        }));
    };

    const setQuestionCombine                = () => {
        dispatch(update_ieltslms_editQuiz_question_settings({
            type: 'combine'
        }));
    };

    // select ---------
    const changeNumberOfOptions = (event) => {
        const { value } = event.target;
        const { answerType, answerTypes, numberOfOptions } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings;
        if (answerType == "custom") {
            const num = value || 1;
            const newCustomOptions = [...answerTypes.custom];

            if (newCustomOptions.length < num) {
                // Add blank strings to the custom array
                const diff = num - newCustomOptions.length;
                for (let i = 0; i < diff; i++) {
                    newCustomOptions.push('');
                }
            } else if (newCustomOptions.length > num) {
                // Remove excess blank strings from the end of the custom array
                newCustomOptions.splice(num);
            }

            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'all',
                _answerSettings: {
                    numberOfOptions: num,
                    answerType: 'custom',
                    answerTypes: {
                        "i": ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'],
                        'I': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
                        'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                        'a': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
                        '1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        'true-false-notgiven': ['True','False','Not Given'],
                        'yes-no-notgiven': ['Yes','No','Not Given'],
                        'custom': newCustomOptions
                    }
                }
            }));
        } else if(answerType == "true-false-notgiven" || answerType == "yes-no-notgiven"){
            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'all',
                _answerSettings: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                    numberOfOptions: 3,

                }
            }));
        } else {
            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'all',
                _answerSettings: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                    numberOfOptions: value,

                }
            }));
        }
    };

    const updateCustomOption = (cindex, html) => {
        const { answerType, answerTypes, numberOfOptions } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings;
        const newCustomOptions = [...answerTypes.custom];
        newCustomOptions[cindex] = html;
        dispatch(update_ieltslms_editQuiz_question_answer_settings({
            type: 'all',
            _answerSettings: {
                ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                answerTypes: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes,
                    custom: newCustomOptions
                }

            }
        }));
    };

    const changeAnswerType = (event) => {
        const { value } = event.target;
        // Check if the new answer type is 'custom'
        if (value === 'custom') {
            const { answerTypes, numberOfOptions } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings;
            const num = numberOfOptions || 1; // Use the current number of options or default to 1
            const currentCustomOptions = answerTypes.custom;
            const newCustomOptions = [...currentCustomOptions];

            if (newCustomOptions.length < num) {
                // Add blank strings to the custom array
                const diff = num - newCustomOptions.length;
                for (let i = 0; i < diff; i++) {
                    newCustomOptions.push('');
                }
            } else if (newCustomOptions.length > num) {
                // Remove excess blank strings from the end of the custom array
                newCustomOptions.splice(num);
            }

            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'all',
                _answerSettings: {
                    numberOfOptions: num,
                    answerType: 'custom',
                    answerTypes: {
                        "i": ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'],
                        'I': ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
                        'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                        'a': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
                        '1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        'true-false-notgiven': ['True','False','Not Given'],
                        'yes-no-notgiven': ['Yes','No','Not Given'],
                        'custom': newCustomOptions
                    }
                }
            }));
        } else if(value == "true-false-notgiven" || value == "yes-no-notgiven"){
            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'all',
                _answerSettings: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                    numberOfOptions: 3,
                    answerType: value
                }
            }));
        } else {
            // For other answer types, just update the answer type
            dispatch(update_ieltslms_editQuiz_question_answer_settings({
                type: 'answerType',
                value: event.target.value
            }));
        }

    };

    const copy = (event) => {
        const textToCopy = event.target.dataset.value;

        // Create a temporary textarea element to copy the text
        const textArea = document.createElement('textarea');
        textArea.value = `{${textToCopy}}`;
        document.body.appendChild(textArea);

        // Select the text in the textarea and copy it
        textArea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textArea);
        const buttons = document.querySelectorAll('.question__options-pills-animate');
        buttons.forEach((button) => {
            button.classList.remove('bg-active');
        });

        // Add the CSS class for animation
        event.target.classList.add('animate__jello-horizontal');
        event.target.classList.add('bg-active');
        // Remove the CSS class after 1 second
        setTimeout(() => {
            event.target.classList.remove('animate__jello-horizontal');
        }, 1000);



        // Create a floating element for the copied text






    };

    document.addEventListener('paste', () => {
        const buttons = document.querySelectorAll('.question__options-pills-animate');
        buttons.forEach((button) => {
            button.classList.remove('bg-active');
        });
    });

    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.content.html} setHtml={setHtml} />);
    }, [load]);

    useEffect(() => {
        if (
            IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "fillup" ||
            IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "select"
        ) {
            const stringText = removeHtmlTags(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.content.html);
            const values = analyzeCurlyBrackets(stringText);
            const num = values.length;

            if (num > 0) {
                // add explanations
                setCorrectAnswers(values);
                const newExplanations = Array(num).fill({
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                });

                // Preserve the content from the existing explanations
                for (let i = 0; i < Math.min(num, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                    newExplanations[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
                }

                dispatch(update_ieltslms_editQuiz_update_question({
                    _questionSettings: {
                        ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                        numberOfQuestions: num
                    },
                    explanations: newExplanations
                }));

            } else {
                setCorrectAnswers([]);
                dispatch(update_ieltslms_editQuiz_update_question({
                    _questionSettings: {
                        ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                        numberOfQuestions: num
                    },
                    explanations: []
                }));

            }
        }
    }, [IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.content.html]);

    useEffect(() => {
        if(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "checkbox"){
            const num = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options? IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length : 0;
            let xnum = 0;

            if (num > 0) {
                if(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.combine){
                    xnum = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                } else {
                    let c = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                    if( c > 0 ) {
                        xnum = 1;
                    }
                }
            }

            // add explanations
            const newExplanations = Array(xnum).fill({
                hasHtml: true,
                html: '',
                text: '',
                type: 'text'  // [text,audio,video]
            });


            const newOptions = Array(num).fill({
                content: 'Option',
                correct: false
            });

            

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(xnum, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
            }

            // 
            for (let i = 0; i < Math.min(num, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length); i++) {
                newOptions[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[i] };
            }

            let op = newOptions;
            if(newOptions.length <= 0 ){
                op = [{
                    content: 'Option '+(newOptions.length + 1),
                    correct: false
                }];
            }

            dispatch(update_ieltslms_editQuiz_update_question({
                _questionSettings: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                    inputType: 'checkbox',
                    numberOfQuestions: xnum
                },
                options: op,
                explanations: newExplanations
            }));
        }
    },[]);




    return (<>

        {/* begin::inputType[fillup] */}
        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "fillup" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question</label>
                        <blockquote>
                            {`
                            Enclose the searched words with { } e.g. I {play} soccer. 
                            Capital and small letters will be ignored. You can specify multiple options for a search word. 
                            Enclose the word with e.g. I {play | hate | love} soccer. In this case answers "play", 
                            "love" OR "hate" are correct.
                        `}
                        </blockquote>
                        {htmlEditor}

                        {correctAnswers.length > 0 &&
                            <blockquote style={{ marginTop: '10px' }}>
                                {correctAnswers.map((c, index) => {
                                    return <Badge style={{ marginRight: '4px', color: 'white' }} key={index} bg="success">{c}</Badge>
                                })}
                            </blockquote>}

                        <small className={`${IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.numberOfQuestions == correctAnswers.length ? 'text-success' : 'text-danger'}`}>
                            {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.numberOfQuestions !== correctAnswers.length && <>
                                It looks like you have entered the <b>Answers</b> more then number of Questions. so extra answers will be ignored and will be display as string.
                            </>}
                        </small>
                    </div>
                </div>
            </div>
        </>}
        {/* end::inputType[fillup] */}

        {/* begin::inputType[radio] */}
        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "radio" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Instructions</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>

            <div className="tab-step__seprator"></div>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required mb-6'>List of Questions</label>
                        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.length > 0 && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.map((qus, index) => {
                            const { html, options } = qus;
                            const questionIndex = index;
                            return <React.Fragment key={index}>
                                <div className="card mb-4" style={{ background: '#fbf6f6', padding: '5px 5px 0' }}>
                                    <div className="question_box mb-2 d-flex flex-row">
                                        <InputGroup.Text className='question__question-label'>Q.{index + 1}</InputGroup.Text>
                                        <Form.Control
                                            className='question__question-input'
                                            type="text"
                                            placeholder="Question text"
                                            value={html || ''}
                                            onChange={(event) => updateQuestionsContent(questionIndex, event.target.value)}
                                        />
                                        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.length > 1 && <Button variant="light-danger" id="button-addon2" onClick={() => removeQuestion(questionIndex)}>
                                            <i className="fa fa-times"></i>
                                        </Button>}

                                    </div>
                                    <div className="question_options-box d-flex flex-column">
                                        {options.length > 0 && options.map((option, index) => {
                                            const { correct, content } = option;
                                            return <React.Fragment key={index}>
                                                <div className="d-flex flex-row align-items-center justify-center mb-3">
                                                    <InputGroup className='question__input-group'>
                                                        <InputGroup.Radio onChange={(event) => handleCorrectAnswerChangeRadio(questionIndex, index)} checked={(correct == "true" || correct == true) ? true : false} className="question__correct-option-radio" aria-label="Radio button for following text input" />
                                                        <Form.Control onChange={(event) => updateOptionContent(questionIndex, index, event.target.value)} value={content || ''} placeholder={'Option ' + (index + 1)} aria-label="Text input with radio button" />
                                                        {options.length > 1 && <button className="btn" onClick={() => removeQuestionOption(questionIndex, index)}>
                                                            <i className="fa fa-times text-danger"></i>
                                                        </button>}
                                                    </InputGroup>
                                                </div>
                                            </React.Fragment>
                                        })}
                                        <div className="d-flex flex-row align-items-center justify-center mb-3">
                                            <InputGroup onClick={() => addQuestionOption(questionIndex, options.length)} className='question__input-group question_input-group-add-more'>
                                                <InputGroup.Radio disabled aria-label="Radio button for following text input" />
                                                <Form.Control readOnly placeholder={'Add more options'} aria-label="Text input with radio button" />
                                            </InputGroup>
                                        </div>

                                    </div>

                                </div>
                            </React.Fragment>
                        })}
                    </div>
                    <div className="col-md-12 mb-6 p-4">
                        <button type="button" className="btn btn-primary btn-sm" onClick={addMoreQuestion}>
                            <i className="fa fa-plus"></i> Add More Questions
                        </button>
                    </div>

                </div>
            </div>


        </>}
        {/* end::inputType[radio] */}

        {/* begin::inputType[select] */}
        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "select" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">

                    { /* default question options types for answer */}
                    <div className="col-sm-6 col-xs-12 mb-4">
                        <label htmlFor="default-options" className='required'>Default Options</label>
                        <select
                            id="default-options"
                            className="form-select"
                            value={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerType}
                            onChange={changeAnswerType}
                        >
                            <option value="i">i (Small Romans)</option>
                            <option value="I">I (Captial Romans)</option>
                            <option value="A">A (Captial Alphabets)</option>
                            <option value="a">a (Small Alphabets)</option>
                            <option value="1">1 (Numeric order)</option>
                            <option value="true-false-notgiven">True False & Not Given</option>
                            <option value="yes-no-notgiven">Yes No & Not Given</option>
                            <option value="custom"> --Custom-- </option>
                        </select>
                    </div>

                    {/* default answer number of options */}

                    <div className="col-sm-6 col-xs-12 mb-4">
                        <label htmlFor="number-of-options" className='required'>Number of Options</label>
                        <input
                            type="number"
                            min="1"
                            id="number-of-options"
                            className="form-input form-control"
                            value={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.numberOfOptions}
                            onChange={changeNumberOfOptions}
                            disabled={['true-false-notgiven','yes-no-notgiven'].includes(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerType)}
                        />
                    </div>

                    { /* custom options */}
                    {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerType === "custom" && <div className="custom__options">
                        <label htmlFor="custom-options" className='mb-6'>List of Custom options</label>
                        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes.custom && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes.custom.length > 0 && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes.custom.map((option, index) => {
                            return <React.Fragment key={index}>
                                <div className="d-flex flex-row align-items-center justify-center mb-3">
                                    <Form.Label className="d-flex flex-row justify-center align-items-center p-0 mr-4 my-0">
                                        <button style={{
                                            minWidth: "44px",
                                            height: "44px",
                                            border: "1px solid #efefef",
                                            color: "gray",
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            background: 'white'
                                        }}>
                                            {index + 1}
                                        </button>
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Option ${index + 1}`}
                                            style={{ borderRight: 0, borderTop: 0, borderLeft: 0, borderRadius: 0, borderStyle: 'dashed' }}
                                            value={option || ''}
                                            onChange={(event) => updateCustomOption(index, event.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                            </React.Fragment>
                        })}
                    </div>}
                </div>
            </div>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">

                    {/* list of answers */}
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='mb-4'>List of Answers</label>
                        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings && <>
                            <ul className='question__options-ul mb-2'>
                                {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes[IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerType] && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes[IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerType].slice(0, +IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.numberOfOptions).map((option, index) => {
                                    return <li className='question__options-pills' key={index}>
                                        <button type='button' className='question__options-pills-animate' data-value={option} onClick={copy}>{option}</button>
                                    </li>
                                })}
                            </ul>
                        </>}
                        <p className="question__hint-description">
                            click and copy the answer and paste inside question box, where you want to display the option.
                        </p>
                    </div>

                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question</label>
                        {htmlEditor}
                        <blockquote style={{ marginTop: '10px' }}>
                            {correctAnswers.map((c, index) => {
                                return <Badge style={{ marginRight: '4px', color: 'white' }} key={index} bg="success">{c}</Badge>
                            })}
                        </blockquote>
                    </div>
                </div>
            </div>
        </>}
        {/* end::inputType[select] */}

        {/* begin::inputType[radio] */}
        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "checkbox" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Instructions</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>

            <div className="tab-step__seprator"></div>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-4">
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                checked={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.combine? true : false} 
                                type="checkbox" 
                                role="switch" 
                                id="combine" 
                                onChange={setQuestionCombine}
                            />
                            <label className="form-check-label" htmlFor="combine">This will combine the correct answers as each question</label>
                        </div>
                    </div>
                    <div className="col-md-12 mb-6">
                        <div className="question_options-box__checkbox d-flex flex-column">
                            {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length > 0 && IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.map((option, index) => {
                                const { correct, content } = option;
                                return <React.Fragment key={index}>
                                    <div className="d-flex flex-row align-items-center justify-center mb-3">
                                        <InputGroup className='question__input-group'>
                                            <InputGroup.Checkbox onChange={(event) => handleCorrectAnswerChangeCheckbox(index)} checked={(correct == "true" || correct == true) ? true : false} className="question__correct-option-checkbox" aria-label="Checkbox button for following text input" />
                                            <Form.Control onChange={(event) => updateOptionContentCheckbox(index, event.target.value)} value={content || ''} placeholder={'Option ' + (index + 1)} aria-label="Text input with checkbox button" />
                                            {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length > 1 && <button className="btn" onClick={() => removeOption(index)}>
                                                <i className="fa fa-times text-danger"></i>
                                            </button>}
                                        </InputGroup>
                                    </div>
                                </React.Fragment>
                            })}
                            <div className="d-flex flex-row align-items-center justify-center mb-3">
                                <InputGroup onClick={() => addOption(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length)} className='question__input-group question_input-group-add-more'>
                                    <InputGroup.Checkbox disabled aria-label="Radio button for following text input" />
                                    <Form.Control readOnly placeholder={'Add more options'} aria-label="Text input with radio button" />
                                </InputGroup>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>}
        {/* end::inputType[radio] */}



    </>);
};


// step 3 - Questions explanations
const QuestionsExplanations = ({ }) => {
    const dispatch = useDispatch();
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    // update explanations html
    const updateExplanationHTML = (index, html) => {
        dispatch(update_ieltslms_editQuiz_question_update_explanation_content({
            xindex: index,
            html: html
        }));
    };
    // html string maker
    const removeHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    // analyze curly backets for correct answer 
    const analyzeCurlyBrackets = (text) => {
        // Regular expression to find text within curly brackets
        const regex = /\{([^}]+)\}/g;
        // Use matchAll to find all matches
        const matches = [...text.matchAll(regex)];
        // Extract values from matches
        const values = matches.map(match => match[1]);
        return values;
    };

    // tab switch
    const tabQuestionContent = () => {
        if (document.querySelector('.tab-questions')) {
            document.querySelector('.tab-questions').click();
        }
    };

    useEffect(() => {
        if (
            IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "fillup" ||
            IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType === "select"
        ) {
            const stringText = removeHtmlTags(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.content.html);
            const values = analyzeCurlyBrackets(stringText);
            if (values.length > 0) {
                if (values.length != correctAnswers.length) {

                    const newExplanations = Array(values.length).fill({
                        hasHtml: true,
                        html: '',
                        text: '',
                        type: 'text'  // [text,audio,video]
                    });

                    // Preserve the content from the existing explanations
                    for (let i = 0; i < Math.min(values.length, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                        newExplanations[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
                    }

                    dispatch(update_ieltslms_editQuiz_question_settings({
                        type: 'numberOfQuestions',
                        value: values.length
                    }));
                    dispatch(update_ieltslms_editQuiz_questions_explanations({
                        explanations: newExplanations
                    }));

                }
            } else {
                dispatch(update_ieltslms_editQuiz_question_settings({
                    type: 'numberOfQuestions',
                    value: 0
                }));
                dispatch(update_ieltslms_editQuiz_questions_explanations({
                    explanations: []
                }));
            }
        } else if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType == "radio") {
            if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.length > 0) {
                const num = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.length;
                const newExplanations = Array(num).fill({
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                });

                // Preserve the content from the existing explanations
                for (let i = 0; i < Math.min(num, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                    newExplanations[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
                }

                dispatch(update_ieltslms_editQuiz_questions_explanations({
                    explanations: newExplanations
                }));
            }
        } else if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType == "checkbox" ) {
            const num = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options? IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length : 0;
            let xnum = 0;

            if (num > 0) {
                if(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.combine){
                    xnum = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                } else {
                    let c = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                    if( c > 0 ) {
                        xnum = 1;
                    }
                }
            }

            // add explanations
            const newExplanations = Array(xnum).fill({
                hasHtml: true,
                html: '',
                text: '',
                type: 'text'  // [text,audio,video]
            });


            const newOptions = Array(num).fill({
                content: 'Option',
                correct: false
            });

            

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(xnum, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
            }

            // 
            for (let i = 0; i < Math.min(num, IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length); i++) {
                newOptions[i] = { ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[i] };
            }

            let op = newOptions;
            if(newOptions.length <= 0 ){
                op = [{
                    content: 'Option '+(newOptions.length + 1),
                    correct: false
                }];
            }

            dispatch(update_ieltslms_editQuiz_update_question({
                _questionSettings: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                    inputType: 'checkbox',
                    numberOfQuestions: xnum
                },
                options: op,
                explanations: newExplanations
            }));
        }


    }, []);

    return (<div style={{ background: '#d8f3fb' }}>
        <div className="step-1 steps tab-step__padding pb-10 tiny-css-0">
            <div className="step__controller row">
                {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION && <>

                    {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length > 0 && <>
                        {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.map((explanation, index) => {
                            const { html } = explanation;
                            return (<div key={index} className="col-md-12 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header collapsible cursor-pointer rotate d-flex align-items-center" style={{ minHeight: '40px' }}>
                                        <label htmlFor={`explanation-${index}`} className='required'>{index + 1}. Explanation</label>
                                        <div className="card-toolbar rotate-180">
                                            <i className="ki-duotone ki-down fs-1"></i>
                                        </div>
                                    </div>
                                    <div className="collapse show">
                                        <div className="card-body p-0" id={`explanation-${index}`}>
                                            <LoadEditorLight height={100} key={index} toolbar='' html={html} setHtml={(html) => updateExplanationHTML(index, html)} />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })}
                    </>}

                    {IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length <= 0 && <>
                        <div className="card">
                            <div className="card-body">
                                <div className="py-2">
                                    <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                                    </svg>
                                    <div className="text-center pt-10 mb-20">
                                        <h2 className="fs-2 fw-bold mb-7">Invalid Question content</h2>
                                        <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                            It looks like your Question dosn't contains any correct answers
                                        </p>
                                        <button onClick={() => tabQuestionContent()} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                            <i className="fa fa-chevron-left"></i> Add Answers
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}

                </>}
            </div>
        </div>
    </div>);
};


// step 4 - Question preview
const QuestionPreview = () => {
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    const [modal, setModal] = useState("preview");
    const [quizPreviewHtml, setQuizPreviewHtml] = useState('');
    const [total, setTotal] = useState(0);
    const [valid, setValid] = useState(true);


    const replaceCurlyBracketsWithSelect = (html, answerOptions, numberOfQuestions, numberOfOptions) => {
        let num = 0;
        return html.replace(/\{[^{}]+\}/g, (match, index) => {
            if (numberOfQuestions > 0) {

                const innerText = match.substring(1, match.length - 1);
                const matchingOption = answerOptions.includes(innerText);
                if (matchingOption) {
                    numberOfQuestions--;
                    num++;

                    const selectOptions = answerOptions.slice(0, numberOfOptions).map((option, index) => (
                        `<option key="${index}" value="${option}">${option}</option>`
                    )).join('');

                    return `<select 
                                value="" 
                                data-q_type=""
                                data-input_type="select"
                                data-num="${num}"
                                data-id="q-${num}"
                                class="question__input iot-lr-question iot-option iot-dropdown form-control mb-2">
                                    <option></option>
                                    ${selectOptions}
                                </select>
                    `;
                } else {
                    return match;
                }
            } else {
                return match; // Leave other curly brackets unchanged
            }
        });
    };

    const createExplanations = (html, answerOptions, numberOfQuestions, numberOfOptions) => {
        let explanations = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations || [];
        const regex = /\{([^{}]+)\}/g;
        const matches = html.match(regex);
        let explanationHtml = '';

        if (matches) {
            matches.map((match, index) => {
                const innerText = match.substring(1, match.length - 1);
                const matchingOption = answerOptions.includes(innerText);
                let explanation = "";
                if (explanations && explanations.length > 0) {
                    if (explanations[index]) {
                        const { html } = explanations[index];
                        explanation = `
                            <div class="sl-item explanation" key="${index}">
                                <div class="sl-control"> 
                                    <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${index}" href="javascript:void(0)" aria-expanded="true"> 
                                        <span class="icon-explain"></span> Explain 
                                    </a> 
                                </div>
                                <div id="col-${index}" class="collapse in" aria-expanded="true" style="">
                                    <!-- Your explanation text here -->
                                    ${html}
                                </div>
                            </div>
                        `;
                    }
                }

                explanationHtml += `
                    <li class="answer" key="${index}">
                        <span>
                            <b>${index + 1}</b>
                        </span> 
                        Answer: <span class="b-r">${matchingOption ? innerText : ''}</span>
                        ${explanation}
                    </li>
                `;
            });
        }

        return `
            <ul style="margin-top:20px;">
                ${explanationHtml}
            </ul>
        `;
    };

    const loadAnswers = (answers = {}) => {
        
        Object.keys(answers).forEach(questionNumber => {
            const { num, answer, q_type } = answers[questionNumber];
            // Access properties of the answer object
            if (document.querySelector(`[data-num='${num}']`)) {
                document.querySelector(`[data-num='${num}']`).value = `${answer}`;
                console.log('value changed  to', answer);
            }
        });
    };

    const handleInput = (event) => {
        if (!document.querySelector('.result-mode')) {
            console.log('changing input');
            const { dataset, value, id } = event.target;
            const { q_type, input_type, num } = dataset;
            answers[num] = {
                num: num,
                answer: value,
                q_type: q_type,
                input_type: input_type,
                q_id: '',
                classes: value ? 'attempted' : 'not-attempted'
            };


            localStorage.setItem('answers', JSON.stringify(window.answers));
        }

    };

    // radio type
    const radioTypeQuestions = (question = {}, questions = [], explanations = []) => {
        let htmlString = '';
        let num = 0;
        let explanationHtml = '';
        let questionText = '';

        if (question && question.html) {
            questionText = question.html;
        }


        if (questions.length > 0 && questions.length === explanations.length) {
            questions.forEach((qus, index) => {
                const { html, options } = qus;
                if (html) {
                    num++;
                    let answers = '';
                    let correctAnswer = '';
                    if (options.length > 0) {
                        options.forEach((op, oindex) => {
                            if (op.correct) {
                                correctAnswer = (oindex + 1);
                            }
                            answers += `<div class="test-panel__answer-item">
                                <div class="test-panel__answer-option">${oindex + 1}</div>
                                <label for="radio-${num}-${oindex + 1}" class="iot-radio">
                                    <input type="radio" class="radio-iot iot-lr-question" name="q-${num}" data-num="${num}" value="${oindex + 1}" id="radio-${num}-${oindex + 1}" placeholder="">
                                    ${op.content}
                                </label>
                            </div>`;
                        });
                    }

                    explanationHtml = `
                        <li class="answer" key="${num}">
                            <span>
                                <b>${num}</b>
                            </span> 
                            Answer: <span class="b-r">${correctAnswer}</span>
                            <div class="sl-item explanation" key="${num}">
                                <div class="sl-control"> 
                                    <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${num}" href="javascript:void(0)" aria-expanded="true"> 
                                        <span class="icon-explain"></span> Explain 
                                    </a> 
                                </div>
                                <div id="col-${num}" class="collapse in" aria-expanded="true" style="">
                                    <!-- Your explanation text here -->
                                    ${explanations[index].html}
                                </div>
                            </div>
                        </li>
                    `;

                    if (modal == "preview") {
                        htmlString += `
                            <div class="test-panel__question-sm-group">
                                <div class="test-panel__question-sm-title">${html}</div>
                                <div class="test-panel__answer">${answers}</div>
                            </div>
                        `;
                    } else if (modal == "result-preview") {
                        htmlString += `
                            <div class="test-panel__question-sm-group">
                                <div class="test-panel__question-sm-title">${html}</div>
                                <div class="test-panel__answer">${answers}</div>
                            </div>
                            <ul style="margin-top:20px;margin-bottom:20px;">
                                ${explanationHtml}
                            </ul>
                        `;
                    }
                }
            });
        }

        return `
            <div class="test-panel__question">${questionText}</div>
            ${htmlString}
        `;
    };

    // fillup type
    const replaceCurlyBracketsWithTextInput = (html = '', numberOfQuestions) => {
        let num = 0;
        return html.replace(/\{[^{}]+\}/g, (match, index) => {
            if (numberOfQuestions > 0) {
                numberOfQuestions--;
                num++;
                const innerText = match.substring(1, match.length - 1);
                return `<input 
                            type="text" 
                            placeholder="${num}" 
                            class="iot-question iot-lr-question iot-question__fill-blank form-control test-panel__input-answer" 
                            data-q_type=""
                            data-input_type="fillup"
                            data-num="${num}"
                            data-id="q-${num}"
                            autocomplete="off" 
                            id="q-${num}"
                        >
                `;

            } else {
                return match; // Leave other curly brackets unchanged
            }
        });
    };

    // fillup type explanations
    const replaceCurlyBracketsWithTextInputExplanations = (html = '', numberOfQuestions, explanations = []) => {
        let num = 0;
        let explanationAnswersLi = "";
        html.replace(/\{[^{}]+\}/g, (match, index) => {
            if (numberOfQuestions > 0) {
                numberOfQuestions--;
                num++;
                const innerText = match.substring(1, match.length - 1);
                const answersArray = innerText.split('|').map(item => item.trim());
                const answersText = answersArray.join(' <b style="color:#100f0f;"> | </b> ');
                let explanation = "";
                if (explanations[num - 1]) {
                    const { html } = explanations[num - 1];
                    explanation = `
                        <div class="sl-item explanation" key="${num}">
                            <div class="sl-control"> 
                                <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${num}" href="javascript:void(0)" aria-expanded="true"> 
                                    <span class="icon-explain"></span> Explain 
                                </a> 
                            </div>
                            <div id="col-${num}" class="collapse in" aria-expanded="true" style="">
                                <!-- Your explanation text here -->
                                ${html}
                            </div>
                        </div>
                    `;
                }
                explanationAnswersLi += `
                    <li class="answer" key="${num}">
                        <span>
                            <b>${num}</b>
                        </span> 
                        Answer: <span class="b-r">${answersText}</span>
                        ${explanation}
                    </li>
                `;
            }
        });

        return explanationAnswersLi;
    };

    // checkbox type questions

    const checkboxTypeQuestions = (question = {}, explanations = [], options = [], numberOfQuestions) => {
        let htmlString      = ''; 
        let num             = 0;
        let explanationHtml = '';
        let questionText    = '';
        let answers         = '';
        let correctAnswers  = [];
        let xNum            = 0;

        if(question && question.html){
            questionText = question.html;
        }


        if( options && options.length > 0 ){
            options.forEach((option,oindex) => {
                const { content, correct } = option;
                if(correct == "true" || correct == true){ correctAnswers.push(oindex+1); }
                answers += `<div class="test-panel__answer-item"> 
                    <span class="test-panel__answer-option">${oindex+1}</span> 
                    <label class="iot-checkbox2" for="checkbox-${num}-${oindex+1}"> 
                        <input type="checkbox" class="checkbox-iot iot-lr-question" name="q-${num}" data-total="${numberOfQuestions}" data-num="${num}" value="${oindex+1}" placeholder="" id="checkbox-${num}-${oindex+1}"> 
                        <span class="cb-label">${content}</span> 
                    </label>
                </div>`;
            });

            explanations.forEach((explanation,xindex) => {
                const { html } = explanation;
                let co = "";
                if(correctAnswers[xindex]){
                    co = correctAnswers[xindex];
                }
                explanationHtml += `
                        <li class="answer" key="${num}">
                            <span>
                                <b>${xindex+1}</b>
                            </span> 
                            Answer: <span class="b-r">${co}</span>
                            <div class="sl-item explanation" key="${xindex+1}">
                                <div class="sl-control"> 
                                    <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${xindex+1}" href="javascript:void(0)" aria-expanded="true"> 
                                        <span class="icon-explain"></span> Explain 
                                    </a> 
                                </div>
                                <div id="col-${xindex+1}" class="collapse in" aria-expanded="true" style="">
                                    <!-- Your explanation text here -->
                                    ${html}
                                </div>
                            </div>
                        </li>
                `;
            });
        } else {
            console.info('no options found');
            
        }


        if(modal == "preview"){
            htmlString += `
                <div class="test-panel__question-sm-group">
                    <div class="test-panel__answer">${answers}</div>
                </div>
            `;
        } else if(modal == "result-preview"){
            htmlString += `
                <div class="test-panel__question-sm-group">
                    <div class="test-panel__answer">${answers}</div>
                </div>
                <ul style="margin-top:20px;margin-bottom:20px;">
                    ${explanationHtml}
                </ul>
            `;
        }

        return `
            <div class="test-panel__question">${questionText}</div>
            ${htmlString}
        `;
    };



    useEffect(() => {

        const {
            _answerSettings,
            _questionSettings,
            content,
            explanations,
            questions,
            options
        } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION;

        if (explanations.length > 0) {

            const answerType = _answerSettings.answerType;
            const answerOptions = _answerSettings.answerTypes[answerType] || [];
            const numberOfQuestions = _questionSettings.numberOfQuestions;
            const numberOfOptions = _answerSettings.numberOfOptions || 1;
            const inputType = _questionSettings.inputType;

            if (inputType == "select") {

                const updatedHtml = replaceCurlyBracketsWithSelect(content.html, answerOptions, numberOfQuestions, numberOfOptions);
                const updateHtmlWithResult = createExplanations(content.html, answerOptions, numberOfQuestions, numberOfOptions);
                setTotal(numberOfQuestions);

                if (modal == "result-preview") {
                    setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`);
                } else if (modal == "preview") {
                    setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`);
                }

            } else if (inputType == "radio") {
                const updatedHtml = radioTypeQuestions(content, questions, explanations);
                setQuizPreviewHtml(updatedHtml);
                setTotal(numberOfQuestions);

            } else if (inputType == "fillup") {
                const updatedHtml = replaceCurlyBracketsWithTextInput(content.html, numberOfQuestions);
                const updatedExplanation = replaceCurlyBracketsWithTextInputExplanations(content.html, numberOfQuestions, explanations);
                setTotal(numberOfQuestions);
                if (modal === "preview") {
                    setQuizPreviewHtml(`
                            <div class="test-panel__answer">
                                <div class="ckeditor-wrapper">${updatedHtml}</div>
                            </div>
                        `);
                } else if (modal === "result-preview") {
                    setQuizPreviewHtml(`
                            <div class="test-panel__answer">
                                <div class="ckeditor-wrapper">${updatedHtml}</div>
                            </div>
                            <ul style="margin-top:20px;margin-bottom:20px;">
                            ${updatedExplanation}
                            </ul>
                        `);
                }
            } else if (inputType == "checkbox") {
                const updatedHtml = checkboxTypeQuestions(content, explanations, options, numberOfQuestions );
                setQuizPreviewHtml(updatedHtml);
                setTotal(options.filter(item => (item.correct == true || item.correct == "true")).length);
            }

            setValid(true);
        } else {
            setValid(false);
        }

    }, [IELTS_LMS_EDIT_QUIZ_QUESTION, modal]);

    useEffect(() => {
        /*
        $(document).ready(function() {
            window.answers = {};
            // Add click event listener to buttons
            $(document,'[data-toggle="collapse"]').on('click',function() {
                var target = $(this).data('target'); // Get the target element ID
                var $target = $(target);
    
                // Toggle the display of the target element
                $target.slideToggle();
            });
            
            if(modal == "preview"){
                $(document,'.question__input').on('change', handleInput);

            } else {

            }
    
        });
        */
    }, []);

    useEffect(() => {

        if (localStorage.getItem('answers')) {
            let answers = localStorage.getItem('answers');
            let answersObjs = JSON.parse(answers);
            loadAnswers(answersObjs);
        }

    }, [modal]);

    // tab switch
    const tabQuestionContent = () => {
        if (document.querySelector('.tab-questions')) {
            document.querySelector('.tab-questions').click();
        }
    };

    return (<>
        <>
            {valid && <>
                <div className={`listening-result listening-test take-test iot-font-global ${modal == "result-preview" ? 'review-explanation result-mode' : ''}`}>
                    <div className="split-left">
                        <div className="preview__window split-item">
                            <div dangerouslySetInnerHTML={{ __html: quizPreviewHtml }}></div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-footer take-test">
                        <div className="question-palette__list-item">
                            <div className="question-palette__part -active">
                                <div className="question-palette__items-group">
                                    {total > 0 && Array(total).fill(null).map((o, index) => {
                                        return (<span key={index} className="question-palette__item" data-num={index + 1}>{index + 1}</span>)
                                    })}
                                </div>
                            </div>
                            <div className="question-palette__part -active">
                                {modal != "preview" && <button className='realtest-header__bt-review' onClick={() => setModal('preview')}>Test Preview</button>}
                                {modal != "result-preview" && <button className='realtest-header__bt-review' onClick={() => setModal('result-preview')}>Solution Preview</button>}
                            </div>
                        </div>

                    </div>
                </div>
            </>}

            {!valid && <>
                <div className="card">
                    <div className="card-body">
                        <div className="py-2">
                            <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                            </svg>
                            <div className="text-center pt-10 mb-20">
                                <h2 className="fs-2 fw-bold mb-7">Invalid Question content</h2>
                                <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                    It looks like your Question dosn't contains any correct answers
                                </p>
                                <button onClick={() => tabQuestionContent()} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                    <i className="fa fa-chevron-left"></i> Add Answers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>

    </>);
};

// step 5 - Question finish
const QuestionFinish = ({handleClose}) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ENDPOINT } = ENDPOINTS;
    const { USER } = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_QUESTION } = useSelector(state => state.ieltslms);
    const [processing, setProcessing] = useState(false);
    const [mode, setMode] = useState("insert");
    const [categories, setCategories] = useState([]);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [category, setCategory] = useState("");
    const [categoryStates, setCategoryStates] = useState({
        LOADING: true,
        LOADED: false,
        FAILED: false
    });
    const [errors, setErrors] = useState([]);


    // html string maker
    const removeHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    // analyze curly backets for correct answer 
    const analyzeCurlyBrackets = (text) => {
        // Regular expression to find text within curly brackets
        const regex = /\{([^}]+)\}/g;
        // Use matchAll to find all matches
        const matches = [...text.matchAll(regex)];
        // Extract values from matches
        const values = matches.map(match => match[1]);
        return values;
    };



    // change question title
    const changeQuestionTitle = (value) => {
        dispatch(update_ieltslms_editQuiz_question_update_question_main({
            type: 'title',
            value: value
        }));
    };
    // change question order
    const changeQuestionOrder = (value) => {
        dispatch(update_ieltslms_editQuiz_question_update_question_main({
            type: 'order',
            value: value
        }));
    };

    // Alter Question [create | edit]
    const alterQuestion = () => {
        if (IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE && IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE) {
            setProcessing(true);
            dispatch(update_ieltslms_editQuiz_question({
                PROCESSING: true
            }));

            let end = null;
            if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._mode.insert) {
                const { _id, _quizId, _postId } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION;
                end = `${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE.endpoint}/${_quizId}/${_postId}`;
            }

            if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._mode.update) {
                const { _id, _quizId, _postId } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION;
                end = `${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE.endpoint}/${_quizId}/${_postId}/${_id}`;
            }

            axios.post(end, {
                question: {
                    ...IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION
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
                        dispatch(update_ieltslms_editQuiz_question({
                            SAVING: IELTS_LMS_EDIT_QUIZ_QUESTION.SAVING + 1
                        }));
                        if(IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._mode.insert){
                            handleClose(true);
                        }
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

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setProcessing(false);
                dispatch(update_ieltslms_editQuiz_question({
                    PROCESSING: false
                }));
            });
        } else {
            toast.warning("Failed to locate Question endpoints", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // validate question
    const validateQuestion = (event) => {
        event.preventDefault();
        setProcessing(true);
        setErrors([]);
        if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.inputType) {
            const { _questionSettings, _answerSettings, content, explanations, options, questions } = IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION;
            const { inputType } = _questionSettings;
            let er = [];
            if (["fillup", "radio", "checkbox", "select"].includes(inputType)) {

                // now validate question
                if (inputType === "fillup") {
                    const stringText = removeHtmlTags(content.html);
                    const values = analyzeCurlyBrackets(stringText);
                    if (values.length !== explanations.length) {
                        setErrors([...errors, {
                            type: 'danger',
                            title: 'Explanations & Question inputs',
                            detail: 'It looks like Question inputs length is not equal to explanations'
                        }]);
                    }

                } else if (inputType === "select") {
                    const stringText = removeHtmlTags(content.html);
                    const values = analyzeCurlyBrackets(stringText);
                    if (values.length !== explanations.length) {
                        setErrors([...errors, {
                            type: 'danger',
                            title: 'Explanations & Question inputs',
                            detail: 'It looks like Question inputs length is not equal to explanations'
                        }]);
                    }
                } else if (inputType === "radio") {

                    if (questions.length > 0) {
                        if (questions.length == explanations.length) {

                            questions.forEach((qus, index) => {
                                const { html, options } = qus;
                                let errorTitle = null;
                                let errorOptions = null;
                                let combine = null;

                                if (html.trim() == "") {
                                    errorTitle = `<b>Title:</b> Missing Question title <br />`;
                                }

                                if (options.length > 0) {
                                    let correct = false;
                                    let isEmpty = false;

                                    options.forEach((op, oindex) => {
                                        if (op.correct) {
                                            correct = true;
                                        }
                                        if (op.content.trim() == "") {
                                            if (errorOptions == null) {
                                                errorOptions = '';
                                            }
                                            errorOptions += `<b>[Option ${oindex + 1}]:</b> Missing option content <br />`;
                                        }
                                    });

                                    if (!correct) {
                                        if (errorOptions == null) {
                                            errorOptions = '';
                                        }
                                        errorOptions += `<b>[correct answer]:</b> Missing <br />`;
                                    }


                                } else {

                                    errorOptions = `<b>Options:</b> Missing Question options <br />`;
                                }

                                if (errorTitle !== null || errorOptions !== null) {
                                    if (errorTitle == null) {
                                        errorTitle = '';
                                    }

                                    if (errorOptions == null) {
                                        errorOptions = '';
                                    }
                                    er.push({
                                        type: 'danger',
                                        title: `Qustion ${index + 1}`,
                                        detail: errorTitle + errorOptions
                                    });
                                }




                            });
                        } else {
                            er.push({
                                type: 'danger',
                                title: 'Explanations & Question inputs',
                                detail: 'It looks like Question inputs length is not equal to explanations'
                            });
                        }
                    } else {
                        er.push({
                            type: 'danger',
                            title: 'Questions',
                            detail: 'It looks like there is no Question inputs available'
                        });
                    }
                } else if (inputType === "checkbox") {
                    if (options.length > 0) {
                        let xnum = options.filter(item => (item.correct == true || item.correct == "true")).length;
                        if(xnum == 0){
                            er.push({
                                type: 'danger',
                                title: `Correct Answers`,
                                detail: "Missing correct answers"
                            });
                        }

                        if(!_questionSettings.combine){
                            if(xnum > 0){
                                xnum = 1;
                            }
                        }


                        if (xnum == explanations.length) {

                            options.forEach((qus, index) => {
                                const { content } = qus; 
                                if(content.trim() == ""){
                                    er.push({
                                        type: 'danger',
                                        title: `Option ${index + 1}`,
                                        detail: "Missing content"
                                    });
                                }


                            });

                            





                        } else {
                            er.push({
                                type: 'danger',
                                title: 'Explanations & Correct inputs',
                                detail: 'It looks like Correct inputs length is not equal to explanations'
                            });
                        }
                    } else {
                        er.push({
                            type: 'danger',
                            title: 'Questions',
                            detail: 'It looks like there is no Question inputs available'
                        });
                    }
                }
                setErrors(er);
            } else {
                // unknown input type 
            }

            if (er.length <= 0) {
                // create question
                alterQuestion();
            } else {
                setProcessing(false);
            }


        } else {
            // invalid input type
        }
    };

    // show category form
    const removeForm = () => {
        setCreating(false);
        setShowCategoryForm(false);
    };
    const addCategory = () => {
        if (category.trim() !== "") {
            setCreating(true);
            setCategoryStates({
                LOADING: true,
                LOADED: false,
                FAILED: false
            });
            axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_CATEGORIES_ROUTE.endpoint}/${id}`, {
                category: {
                    label: category,
                    status: 'published'
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
                        setCategories([...categories, response.data.success.json.category]);
                        setCategoryStates({
                            LOADING: false,
                            LOADED: true,
                            FAILED: false
                        });
                        setCategory("");
                        setShowCategoryForm(false);
                        dispatch(update_ieltslms_editQuiz_question_update_question_main({
                            type: '_category',
                            value: response.data.success.json.category.value
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
                }

            }).catch(error => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setCreating(false);
                setCategoryStates({
                    LOADING: false,
                    LOADED: true,
                    FAILED: false
                });
            });
        } else {
            if (document.getElementById('qus_category')) {
                document.getElementById('qus_category').focus();
            }
        }
    };
    const getCategories = () => {
        setCategoryStates({
            LOADING: true,
            LOADED: false,
            FAILED: false
        });

        axios.get(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_QUESTION_CATEGORIES_ROUTE.endpoint}/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        }).then((response) => {
            if (response.data.success) {
                if (response.data.success.has_json) {
                    setCategories([...response.data.success.json.categories]);
                    setCategoryStates({
                        LOADING: false,
                        LOADED: true,
                        FAILED: false
                    });
                }
            }

            if (response.data.error) {
                setCategoryStates({
                    LOADING: false,
                    LOADED: false,
                    FAILED: true
                });
                toast.error(response.data.error.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }

        }).catch(error => {
            errorStates();
            toast.error(error.message, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).finally(() => {

        });
    };

    useEffect(() => {
        if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._mode.insert) {
            setMode('insert');
        } else if (IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._mode.update) {
            setMode('update');
        }
    }, [IELTS_LMS_EDIT_QUIZ_QUESTION]);

    useEffect(() => {
        if (categories.length <= 0) {
            getCategories();
        }
    }, []);

    return (<>
        <form onSubmit={validateQuestion}>
            {errors.length > 0 &&
                <div className="step-1 steps tab-step__padding mb-10">
                    {errors.map((err, index) => {
                        const { type, title, detail } = err;
                        return (<div key={index} className={`alert bg-light-${type} border border-${type} border-dashed d-flex flex-column flex-sm-row w-100 p-5 mb-10`}>
                            <i className={`ki-duotone ki-message-text-2 fs-2hx text-${type} me-4 mb-5 mb-sm-0`}>
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                            </i>
                            <div className="d-flex flex-column pe-0 pe-sm-10">
                                <h5 className="mb-1">{title}</h5>
                                <span>{parse(detail)}</span>
                            </div>
                        </div>)
                    })}
                </div>}
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">

                    <div className="col-12 mb-2">
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="title"
                                type="text"
                                placeholder="Question title"
                                value={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.title || ''}
                                onChange={(event) => changeQuestionTitle(event.target.value)}
                                required
                                disabled={processing}
                            />
                            <label className='required' htmlFor="title">Question title</label>
                        </Form.Floating>
                        {mode == "update" &&
                            <Form.Floating className="mb-3">
                                <Form.Control
                                    id="order"
                                    type="number"
                                    placeholder="Question order"
                                    value={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.order || 1}
                                    onChange={(event) => changeQuestionOrder(event.target.value)}
                                    disabled={processing}
                                />
                                <label className='required' htmlFor="order">Question order</label>
                            </Form.Floating>}



                    </div>
                    <div className="col-12 mb-2">

                        <div className="input-group input-group-solid mb-5">
                            {!showCategoryForm && <>
                                <select disabled={categoryStates.LOADING || processing} onChange={(event) => dispatch(update_ieltslms_editQuiz_question_update_question_main({
                                    type: '_category',
                                    value: event.target.value
                                }))} className="form-select form-control" value={IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._category}>
                                    <option value="uncategorized">Uncategorized</option>
                                    {LISTENING_QUESTION_CATEGORIES && LISTENING_QUESTION_CATEGORIES.length > 0 && <>
                                        <optgroup label="--Default Listening categories--">
                                            {LISTENING_QUESTION_CATEGORIES.map((o,i) => {
                                                const { value, label } = o;
                                                return <option key={i} value={value}>{label}</option>
                                            })}
                                        </optgroup>
                                    </>}
                                    {categories && categories.length > 0 && <>
                                        <optgroup label="--Custom Listening categories--">
                                            {categories.map((cat, index) => {
                                                const {value, label } = cat;
                                                return <option key={index} value={value}>{label}</option>
                                            })}
                                        </optgroup>
                                    </>}
                                </select>
                                {!processing && <>
                                    <span className="input-group-text p-2" id="basic-addon2">
                                        <button className="btn-icon btn btn-primary btn-sm" onClick={() => setShowCategoryForm(true)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </span></>}
                            </>}

                        </div>
                        {showCategoryForm && <>
                            <div className="input-group input-group-solid mb-5">
                                <input
                                    disabled={creating}
                                    required
                                    type="text"
                                    value={category}
                                    className="form-control"
                                    placeholder="Enter category name"
                                    id="qus_category"
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => setCategory(event.target.value)}
                                />
                                <span className="input-group-text d-flex flex-row" id="basic-addon2">
                                    <button onClick={addCategory} disabled={creating} type='button' className="btn-thin btn btn-outline btn-outline-dashed btn-outline-primary btn-sm" style={{ marginRight: '6px' }}>
                                        {creating ? 'Creating...' : 'Add Category'}
                                    </button>
                                    {!creating && <button disabled={creating} className="btn-thin btn btn-light-danger btn-sm" onClick={removeForm}>Cancel</button>}
                                </span>

                            </div>
                        </>}
                    </div>
                    {!showCategoryForm &&
                        <div className="col-12 d-flex flex-column ">
                            <button className={`btn btn-light-primary ${processing ? 'btn-disabled btn-loading' : ''}`} type='submit' disabled={processing || creating}>
                                {processing ? <>
                                    <div className="spinner-grow spinner-grow-sm" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {mode === "insert" && ' Creating...'}
                                    {mode === "update" && ' Saving...'}
                                </> : <>
                                    {mode === "insert" && 'Create Question'}
                                    {mode === "update" && 'Save changes'}
                                </>}
                            </button>
                        </div>}

                </div>
            </div>
        </form>
    </>);
};

export default IeltsLmsEditQuizListeningQuestions;