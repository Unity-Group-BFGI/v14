import '../../../../../../styles/iot.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { IeltsLmsEditQuizSectionsListSkeleton } from "../../../../../../components/Skeletons/Ieltslms";
import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_ieltslms_editQuiz_questions } from "../../../../../../includes/redux/slices/ieltslms.slice";
import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { LoadEditorLight } from "../../../../../../components/Editor";


const IeltsLmsEditQuizSpeakingQuestions = () => {
    const HEADING = 'List of Questions';
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ENDPOINT } = ENDPOINTS;

    // routes
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE }            = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTIONS_ROUTE }           = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE }            = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE }            = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE }           = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_CATEGORIES_ROUTE } = useSelector(state => state.constants);
    // quiz states
    const { IELTS_LMS_EDIT_QUIZ }                               = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS }                      = useSelector(state => state.ieltslms);    
    // questions states
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS }                     = useSelector(state => state.ieltslms);
    const [loading, setLoading]                                 = useState(true);



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
                    IELTS_LMS_EDIT_QUIZ_SECTIONS && IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS && 
                    IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS && 
                    (
                        IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length <= 0 || 
                        IELTS_LMS_EDIT_QUIZ_QUESTIONS.SECTIONS.length != IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.length
                    )
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
            toast.warning("Failed to locate Speaking Questions endpoints", {
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
                                    <h2 className="fs-2 fw-bold mb-7">0 Sections Found</h2>
                                    <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                        There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                    </p>
                                    <button type='button' className="btn btn-primary btn-thin" style={{ marginRight: "15px" }} onClick={() => dispatch(update_menu({
                                        CURRENT_DYNAMIC_PARAM: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-SECTIONS'
                                    }))}>
                                        <i className="fa fa-thin fa-chevron-left"></i> Swtich to Sections Tab
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
                                        <h2 className="fs-2 fw-bold mb-7">Choose Section</h2>
                                        <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                            There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                        </p>
                                        <Form.Select
                                            style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }}
                                            value={IELTS_LMS_EDIT_QUIZ_QUESTIONS.CURRENT_SECTION_ID || 'not-selected'}
                                            onChange={handleSectionChange}
                                        >
                                            <option value="not-selected"> --SELECT SECTION-- </option>
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
    // states
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS } = useSelector(state => state.ieltslms);
    // loading -[true | false]
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(null);
    const [addEditQuestionModal, setAddEditQuestionModal] = useState(false);
    const [qid, setQid] = useState(null);
    const [limit,setLimit] = useState(1);

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
        setLimit(1);
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
        setAddEditQuestionModal(false);
        if(reload){
            loadQuestions();
        }
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
            toast.warning("Failed to locate Speaking section endpoints", {
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
                                            index={index}
                                            loadQuestions={loadQuestions}
                                            qus={qus}
                                            editQuestion={editQuestion}
                                            length={IELTS_LMS_EDIT_QUIZ_QUESTIONS.QUESTIONS.length || 0}
                                        />)
                                    })}
                                </>}
                            </div>
                        </div>


                        {addEditQuestionModal && <AddEditQuestionModal limit={limit} setLimit={setLimit} sid={sid} addEditQuestionModal={addEditQuestionModal} type={type} qid={qid} handleClose={handleClose} />}


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
                            <i className="fa fa-trash-alt"></i>
                        </button>
                    </>}

                </div>
            </div>
        </div>
        {index + 1 < length && <div className="separator separator-dashed my-5"></div>}
    </React.Fragment>)
};

// add edit question modal
const AddEditQuestionModal = ({ type, qid, sid, handleClose, addEditQuestionModal, limit, setLimit }) => {
    
    const POST_TYPE                                     = 'speaking-question';
    const { ENDPOINT }                                  = ENDPOINTS;
    const { id }                                        = useParams();
    const { USER }                                      = useSelector(state => state.auth);        
    const { IELTS_LMS_EDIT_QUIZ_GET_QUESTION_ROUTE }    = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE }    = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE }   = useSelector(state => state.constants);
    const { WIDTH }                                     = useSelector(state => state.theme);
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS }             = useSelector(state => state.ieltslms);
    const [fullscreen, setFullscreen]                   = useState(false);
    const [loading, setLoading]                         = useState(true);
    const [creating,setCreating]                        = useState(false);
    const [HEADING,setHeading]                          = useState('Add Speaking Question');
    const [htmlEditor,setHtmlEditor]                    = useState(<></>);
    const [html,setHtml]                                = useState("");
    const [question,setQuestion]                        = useState({
        title: '',
        order: '',
        _id: '',
        _quizId: '',
        _postId: '',
        _postType: POST_TYPE,
        _category: '',
        _tags: [],
        content: {
            hasHtml: true,
            hasText: false,
            text: '',
            html: ''
        },
        _questionSettings:{
            time:{
                questionTimeToThink:{
                    timer: true,
                    mm: 0,
                    ss: 0,
                    hh: 0
                }
            }
        },
        status: 'published',
        _mode:{
            insert: false,
            update: false
        }

    });

    // add speaking question
    const addSpeakingQuestion = (event) => {
        event.preventDefault();
        if(IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE && IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE){
            let end = null;
            let QUS = {
                ...question,
                content:{
                    ...question.content,
                    html: html
                }
            };
            if(type == "new"){
                const { _quizId, _postId } = QUS;
                end = `${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_ADD_QUESTION_ROUTE.endpoint}/${_quizId}/${_postId}`;
            } else if(type == "edit"){
                const { _id, _quizId, _postId } = QUS;
                end = `${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_EDIT_QUESTION_ROUTE.endpoint}/${_quizId}/${_postId}/${_id}`;
            }

            axios.post(end, {
                question: {
                    ...QUS
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
                        if(type == "new"){
                            handleClose(true);
                        } else if(type == "edit"){
                            setLimit(limit + 1);
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
                setCreating(false);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).finally(() => {
                setCreating(false);
            });
        } else {
            toast.error("No Route found for Speaking Questions", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
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
                    setQuestion(response.data.success.json.question);
                    setHtml(response.data.success.json.question.content.html);
                    setHtmlEditor(<LoadEditorLight html={response.data.success.json.question.content.html} setHtml={(html) => setHtml(html)} />);
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
        if(sid){
            const { SECTIONS } = IELTS_LMS_EDIT_QUIZ_QUESTIONS;
            const section = SECTIONS.find((item) => item._id == sid);
            if( section ) {
                if (type == "new") {
                    console.log(section.time.questionTimeToThink);
                    setHeading('Add Speaking Question');
                    setQuestion({
                        ...question,
                        _postId: sid,
                        _quizId: id,
                        _postType: POST_TYPE,
                        _questionSettings:{
                            time:{
                                questionTimeToThink: section.time.questionTimeToThink
                            }
                        },
                        _mode:{
                            insert: true,
                            update: false
                        }
                    });
                    setHtmlEditor(<LoadEditorLight html={"Add Question"} setHtml={(html) => setHtml(html)} />);
                    setLoading(false);
                } else if(type == "edit"){
                    setHeading('Edit Speaking Question');
                    loadQuestion();
                }
            } else {
                toast.warning("It looks like Section realted to Question is not found", {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.warning("Missing Section id", {
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

            <div className="modal-header">
                <h2>{HEADING}</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            <form style={{ display: 'contents'}} onSubmit={addSpeakingQuestion}>   
                <div className="modal-body">

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Title (optional)</div>
                        </div>

                        <div className="col-xl-9">  
                            <input 
                                type="text" 
                                className="form-control form-control-solid" 
                                name="title" 
                                value={question.title} 
                                placeholder={"Add Question title"} 
                                onChange={(event) => setQuestion({
                                    ...question,
                                    title: event.target.value
                                })} 
                                disabled={creating}
                            /> 
                            <small className="text-muted form-text">The title will not be visible in the frontend.</small>          
                        </div>
                        
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    {type == "edit" &&
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Order</div>
                        </div>

                        <div className="col-xl-9">  
                            <input 
                                type="number" 
                                className="form-control form-control-solid" 
                                name="number" 
                                value={question.order} 
                                placeholder={"Add Question order"} 
                                onChange={(event) => setQuestion({
                                    ...question,
                                    order: event.target.value
                                })} 
                                disabled={creating}
                            />         
                        </div>
                        
                    </div>}
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Question</div>
                        </div>

                        <div className="col-xl-9">  
                            {htmlEditor}
                        </div>
                        
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">  
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Time</div>
                        </div>
                            
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <div className="position-relative col-md-12 col-sm-12 mb-4" htmlFor="ss"> 
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setQuestion({
                                    ...question,
                                    _questionSettings:{
                                        ...question._questionSettings,
                                        time:{
                                            ...question._questionSettings.time,
                                            questionTimeToThink:{
                                                ...question._questionSettings.time.questionTimeToThink,
                                                ss: (question._questionSettings.time.questionTimeToThink.ss - 1 < 0 )? 0 : question._questionSettings.time.questionTimeToThink.ss - 1
                                            }
                                        }
                                        
                                    }
                                })}>  
                                    <span className="svg-icon svg-icon-1">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>                  
                                </button>  
                                <input required disabled={creating} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="SS" name="ss" value={question._questionSettings.time.questionTimeToThink.ss} min="0" onChange={(event) => setQuestion({
                                    ...question,
                                    _questionSettings:{
                                        ...question._questionSettings,
                                        time:{
                                            ...question._questionSettings.time,
                                            questionTimeToThink:{
                                                ...question._questionSettings.time.questionTimeToThink,
                                                ss: (+event.target.value < 0)? 0 : +event.target.value
                                            }
                                        }
                                    }
                                })} />
                                <small className="text-muted form-text">Question time to think <b>(seconds)</b></small>
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setQuestion({
                                    ...question,
                                    _questionSettings:{
                                        ...question._questionSettings,
                                        time:{
                                            ...question._questionSettings.time,
                                            questionTimeToThink:{
                                                ...question._questionSettings.time.questionTimeToThink,
                                                ss: question._questionSettings.time.questionTimeToThink.ss + 1
                                            }
                                        }
                                        
                                    }
                                })}>
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
                        {/*--begin::Col--*/}
                        
                    </div>
                    {/* END::ROW */}
                    


                </div>
                <div className="modal-footer p-4 d-flex flex-row justify-content-right">

                    <button 
                        disabled={creating} 
                        className="btn btn-light-primary btn-sm pull-right float-right" type="submit">
                            {type == "new" && <>Add Question</>}
                            {type == "edit" && <>
                                {limit > 1? 'Save Changes' : 'Edit Question'}
                            </>}
                            
                        </button>                       
                </div>
            </form>
        </Modal>

    </>);

};



export default IeltsLmsEditQuizSpeakingQuestions;