import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// components npm
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";

import ENDPOINTS from '../../../../includes/constants/routes';
import { update_menu } from "../../../../includes/redux/slices/menu.slice";
import { update_loader } from "../../../../includes/redux/slices/loader.slice";
import { update_ieltslms_myQuizzes, update_ieltslms_myQuizzes_states } from "../../../../includes/redux/slices/ieltslms.slice";
import { IELTS_LMS_MY_QUIZZES_CATEGORIES, IELTS_LMS_MY_QUIZZES_STATUS } from "../../../../includes/constants/ieltslms";
import { update_modals } from "../../../../includes/redux/slices/modals.slice";


const DashboardIeltsLmsMyQuizzes = () => {
    const dispatch = useDispatch();
    const { ENDPOINT } = ENDPOINTS;
    const { ROUTES_LOADED, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_MY_QUIZZES_LIST } = useSelector(state => state.constants);
    const { IELTS_LMS_MY_QUIZZES } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_MY_QUIZZES_STATES } = useSelector(state => state.ieltslms);
    const [searching, setSearching] = useState(false);


    const loadQuizzes = (where = {}, pagination = {}, search = {}) => {
        // set loading
        dispatch(update_loader({
            LOADER_LOADING: true
        }));
        setSearching(true);
        axios.post(`${ENDPOINT}${IELTS_LMS_MY_QUIZZES_LIST.endpoint}`, {
            pagination: {
                currentPage: 1,
                perPage: 10,
                ...pagination
            },
            where: {
                status: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS,
                _category: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_CATEGORY,
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
                    const { quizzes } = response.data.success.json;
                    dispatch(update_ieltslms_myQuizzes({
                        QUIZZES: [...quizzes],
                        LOADED: true,
                        LOADING: false,
                        FAILED: false
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
            dispatch(update_loader({
                LOADER_LOADING: false
            }));
            setSearching(false);
        });
    };

    // default
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-MY-QUIZZES',
            CURRENT_DYNAMIC_MENU: null,
            IS_DYNAMIC_MENU_ACTIVE: false,
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,
            DYNAMIC_MENU_LOADING: false,
            HAS_DYNAMIC_MENU: false,
            PAGE_HEADING: 'My Quizzes',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'IELTS LMS',
            BREADCRUM_THREE: 'My Quizzes',
            DYNAMIC_HEADER: 'IELTS-LMS-MY-QUIZZES',
            TAB_TITLE: 'My Quizzes | IELTS LMS | Dashboard'
        }));

    }, []);

    // event for load quizzes
    useEffect(() => {
        if (ROUTES_LOADED) {
            if (IELTS_LMS_MY_QUIZZES_LIST && IELTS_LMS_MY_QUIZZES && IELTS_LMS_MY_QUIZZES.QUIZZES.length <= 0) {
                loadQuizzes();
            } else {
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

    // render component 
    return (<>
        <MyQuizzesHeader loadQuizzes={loadQuizzes} searching={searching} setSearching={setSearching} />
        <MyQuizzesBody loadQuizzes={loadQuizzes} />
        <IeltslmsAddQuizModal loadQuizzes={loadQuizzes} />
    </>);
};

const MyQuizzesHeader = ({ loadQuizzes, searching, setSearching }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const { IELTS_LMS_MY_QUIZZES_STATES } = useSelector(state => state.ieltslms);

    const findQuiz = () => {
        if (search.length > 0) {
            // search by name
            loadQuizzes({
                category: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_CATEGORY,
                status: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS
            }, {}, {
                status: true,
                query: search
            });
        } else {
            loadQuizzes({
                category: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_CATEGORY,
                status: IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS
            }, {
                currentPage: 1
            }, {});
        }
    };

    // filter - category
    const filterQuizByCategory = (category) => {
        dispatch(update_ieltslms_myQuizzes_states({
            QUIZ_CATEGORY: category
        }));

        loadQuizzes({
            _category: category
        }, {}, {});
    };

    // filter - status
    const filterQuizByStatus = (status) => {
        dispatch(update_ieltslms_myQuizzes_states({
            QUIZ_STATUS: status
        }));

        loadQuizzes({
            status: status
        }, {}, {});
    };


    return (<>
        {/* --BEGIN::header-- */}
        <div className="d-flex flex-wrap flex-stack pb-7">

            {/* BEGIN::filters */}
            <div className="d-flex flex-wrap align-items-center my-1">
                <div className="d-flex align-items-center position-relative">

                    {/* BEGIN::Quiz category filter */}
                    <select onChange={(event) => filterQuizByCategory(event.target.value)} disabled={searching} className='form-select form-select-sm border-body bg-body w-150px me-5' value={IELTS_LMS_MY_QUIZZES_STATES.QUIZ_CATEGORY}>
                        {IELTS_LMS_MY_QUIZZES_CATEGORIES.map((category) => {
                            return <option key={category.key} value={category.VALUE}>{category.LABEL}</option>
                        })}
                    </select>
                    {/* END::Quiz category filter */}

                    {/* BEGIN::Quiz status filter */}
                    <select onChange={(event) => filterQuizByStatus(event.target.value)} disabled={searching} className='form-select form-select-sm border-body bg-body w-150px me-5' value={IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS}>
                        {IELTS_LMS_MY_QUIZZES_STATUS.map((status) => {
                            return <option key={status.key} value={status.VALUE}>{status.LABEL}</option>
                        })}
                    </select>
                    {/* END::Quiz status filter */}
                </div>
            </div>
            {/* END::filters */}

            {/* BEGIN::search filter input */}
            <div className="d-flex align-items-center position-relative">

                <div className="input-group input-group-sm">
                    <input disabled={searching} type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="form-control w-250px mr-2" placeholder="Search Quiz" aria-describedby="basic-addon2" />
                    <button onClick={findQuiz} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button">
                        {search.length > 0 ?
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                            </svg> :
                            <i className={`fa fa-thin fa-light fa-arrows-rotate ${searching ? 'spinner' : ''}`}></i>}
                    </button>
                </div>

            </div>
            {/* END::search filter input */}

        </div>
        {/* --END::header-- */}
    </>)
};

const MyQuizzesBody = ({ loadQuizzes }) => {
    const dispatch = useDispatch();
    const { IELTS_LMS_MY_QUIZZES } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_MY_QUIZZES_STATES } = useSelector(state => state.ieltslms);
    return (<>
        {IELTS_LMS_MY_QUIZZES && <>
            {IELTS_LMS_MY_QUIZZES.LOADED && <>

                {IELTS_LMS_MY_QUIZZES.QUIZZES && IELTS_LMS_MY_QUIZZES.QUIZZES.length > 0 && <>
                    {IELTS_LMS_MY_QUIZZES.QUIZZES.map((quiz, index) => {
                        return (<QuizItem quiz={quiz} key={quiz._id} loadQuizzes={loadQuizzes} />)
                    })}
                </>}

                {IELTS_LMS_MY_QUIZZES.QUIZZES && IELTS_LMS_MY_QUIZZES.QUIZZES.length <= 0 && <>
                    <div className="card mb-6">
                        <div className="card-body">
                            <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                            </svg>
                            <div className="text-center pt-10 mb-20">
                                <h2 className="fs-2 fw-bold mb-7">
                                    {IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS == "published" && <>0 Quizzes found</>}
                                    {IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS == "drafted" && <>Draft is empty</>}
                                    {IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS == "trashed" && <>Trash is empty</>}
                                </h2>
                                <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                    There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                </p>
                                {IELTS_LMS_MY_QUIZZES_STATES.QUIZ_STATUS == "published" && <>
                                    <button onClick={() => dispatch(update_modals({
                                        IELTS_ADD_QUIZ_MODAL: true
                                    }))} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                        <i className="fa fa-plus"></i> Add New Quiz
                                    </button>
                                </>}
                                
                            </div>
                        </div>
                    </div>
                </>}
            </>}
            {IELTS_LMS_MY_QUIZZES.LOADING && <>
                Quizzes loading...
            </>}
        </>}
    </>);
};

const QuizItem = ({ quiz, loadQuizzes }) => {
    return (<>
        <div className="card__hover card mb-2">
            <div className="card-body p-3 d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-stack">
                    <div className="d-flex align-items-center">
                        {1 == 2 && <input className="form-check-input me-3" type="checkbox" style={{ borderRadius: '30px' }} />}
                        <div className="w30-px ml-6 mx-3 custom-img-box">
                            <img src={"/svgs/" + quiz._category + ".svg"} />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fs-5 text-dark text-hover-primary fw-bold">{quiz.title}</div>
                            <div className="fs-6 fw-semibold text-gray-400">{quiz.description}</div>
                        </div>
                    </div>
                </div>
                <QuizItemControls quiz={quiz} loadQuizzes={loadQuizzes} />
            </div>
        </div>
    </>);
};

const QuizItemControls = ({ quiz, loadQuizzes }) => {
    const dispatch = useDispatch();
    const { ENDPOINT } = ENDPOINTS;
    const [confirm, setConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("");
    const { ROLE, USER } = useSelector(state => state.auth);
    const { IELTS_LMS_MY_QUIZZES } = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE } = useSelector( state => state.constants );
    const [controls,setControls]   = useState({
        
    });
    const [copy,setCoping]         = useState(false); 

    // shortcode copy
    const copyShortcode = () => {
        setCoping(true);
        let text = `[ilms-quiz quiz_id="${quiz._id}" quiz_title="${quiz.title}" quiz_slug="${quiz.slug}" quiz_description="${quiz.description}" quiz_status="${quiz.status}" created_at="${quiz.creation}" quiz_category="${quiz._category}" quiz_icon_url=""]`;
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);

        // Select the text in the textarea and copy it
        textArea.select();
        document.execCommand('copy');
        // Remove the temporary textarea
        document.body.removeChild(textArea);
        toast.success("Shortcode copied", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
        });

        setTimeout(() => {
            setCoping(false);
        },3000);

    };

    // ajax event
    const trashThis = (status = 'trashed') => {
        if(IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE){
            try{
                let total = IELTS_LMS_MY_QUIZZES.QUIZZES.length;
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_BASIC_ROUTE.endpoint}/${quiz._id}`,{
                    basic:{
                        status: status
                    },
                    where :{
                        _id: quiz._id
                    }
                },{
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {
                    if (response.data.success) {
                        loadQuizzes();
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
                    setConfirmStatus('');
                    setConfirm(false);
                });
            }catch(err){
                toast.info(err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.info("basic route not found", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // BEGIN::ajax actions -----------------------
    const confirmTrash = () => {
        setConfirmStatus('action-trashing');
        trashThis('trashed');
    };

    const confirmRestore = () => {
        setConfirmStatus('action-restoring');
        trashThis('drafted');
    };

    const confirmRemove = () => {
        /*
        console.log('removing...');
        postRequest(endpoint + "/ielts-lms/quiz/remove/"+quiz._id, {
            headers:{
                'Authorization': 'Bearer ' + USER.accessToken,
                'x-refresh': 'ref ' + USER.refreshToken,
                'x-ssf': 'xss PVRP'
            }
        },{
            where: {
                _id: quiz._id
            }
        }).then((response) => {
            const { success, has_json, json, error, res } = response;
            if( success && has_json && !error ) {
                if(json && json.remove){
                    reloadQuizzes();
                } else {
                    
                }
            } else {
                console.warn(`[warning]: ${res}`);
                
            }
        }).catch((err) => {
            console.log(err);
        });
        */
    };
    // END::ajax actions -----------------------



    // BEGIN:: cancel confirm ---------------------
    const cancelConfirm = () => {
        setConfirm(false);
        setConfirmStatus("");
    };

    // END:: cancel confirm ---------------------
    const setConfirmTrash = () => {
        setConfirmStatus("confirm-trash");
        setConfirm(true);
    };

    const setConfirmRemove = () => {
        setConfirmStatus("confirm-remove");
        setConfirm(true);
    };

    const setConfirmRestore = () => {
        setConfirmStatus("confirm-restore");
        setConfirm(true);
    };

    useEffect(() => {
        if (ROLE == "owner") {
            const editQuizLink = `/dashboard/@owner/ielts-lms/quiz/edit/${quiz._id}`;
            const previewQuizLink = `https://preview.ieltslms.com/iquiz/?id=${quiz._id}`;
            setControls({
                edit: editQuizLink,
                preview: previewQuizLink,
                trash: true,
                remove: true,
                restore: true
            });
        } else if(ROLE == "customer"){
            const editQuizLink = `/dashboard/@customer/ielts-lms/quiz/edit/${quiz._id}`;
            const previewQuizLink = `https://preview.ieltslms.com/iquiz/?id=${quiz._id}`;
            setControls({
                edit: editQuizLink,
                preview: previewQuizLink,
                trash: true,
                remove: true,
                restore: true
            });
        }
    }, [ROLE]);

    return (<>
        {!confirm ? <div className="d-flex flex-stack">

            {quiz.status == "published" && <>
                {controls.preview && <Link target='_blank' to={controls.preview} className='btn btn-sm btn-icon'>
                    <i className="fa fa-eye text-primary"></i>
                </Link>} &nbsp;

                <button type="button" disabled={copy} className="btn btn-sm btn-icon btn-light-primary" onClick={copyShortcode}>
                    {copy? <i className="fa fa-check"></i> : <i className="fa fa-copy"></i>}
                </button>




                {controls.edit && <Link to={controls.edit} className="btn btn-sm btn-icon">
                    <i className='fa fa-pencil text-primary'></i>
                </Link>} &nbsp;
                {controls.trash && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmTrash}>
                    <i className="fa fa-trash-alt text-danger"></i>
                </button>}
            </>}

            {quiz.status == "drafted" && <>
                {controls.preview && <Link target='_blank' to={controls.preview} className='btn btn-sm btn-icon'>
                    <i className="fa fa-eye text-primary"></i>
                </Link>} &nbsp;
                {controls.edit && <Link to={controls.edit} className="btn btn-sm btn-icon">
                    <i className='fa fa-pencil text-primary'></i>
                </Link>} &nbsp;
                {controls.trash && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmTrash}>
                    <i className="fa fa-trash-alt text-danger"></i>
                </button>}
            </>}

            {quiz.status == "trashed" && <>
                {controls.remove && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmRemove}>
                    <i className="fa fa-trash text-danger"></i>
                </button>} &nbsp;
                {controls.restore && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmRestore}>
                    <i className="fa fa-refresh text-danger"></i>
                </button>}
            </>}

        </div> : <div className="d-flex flex-stack">
            {quiz.status == "published" && <>
                {confirmStatus === "action-trashing" && <div className="d-flex flex-column">
                    <span className='text-danger'>Moving to trash...</span>
                </div>}

                {confirmStatus === "confirm-trash" && controls.trash && <div className="d-flex flex-column">
                    <span className='text-primary'>Move to Trash?</span>
                    <div className="d-flex flex-row">
                        <a type="button" className="text-danger mx-4" onClick={confirmTrash}>Yes</a>
                        <a type="button" className="text-primary mx-4" onClick={cancelConfirm}>No</a>
                    </div>
                </div>}
            </>}

            {quiz.status == "drafted" && <>

                {confirmStatus === "action-trashing" && controls.trash && <div className="d-flex flex-column">
                    <span className='text-danger'>Moving to trash...</span>
                </div>}

                {confirmStatus === "confirm-trash" && controls.trash && <div className="d-flex flex-column">
                    <span className='text-primary'>Move to Trash?</span>
                    <div className="d-flex flex-row">
                        <a type="button" className="text-danger mx-4" onClick={confirmTrash}>Yes</a>
                        <a type="button" className="text-primary mx-4" onClick={cancelConfirm}>No</a>
                    </div>
                </div>}

            </>}

            {quiz.status == "trashed" && <>

                {confirmStatus === "action-removing" && controls.remove && <div className="d-flex flex-column">
                    <span className='text-danger'>Removing quiz...</span>
                </div>}

                {confirmStatus === "action-restoring" && controls.restore && <div className="d-flex flex-column">
                    <span className='text-primary'>Moving to draft...</span>
                </div>}


                {confirmStatus === "confirm-restore" && controls.restore && <div className="d-flex flex-column">
                    <span className='text-primary'>Restore quiz?</span>
                    <div className="d-flex flex-row">
                        <a type="button" className="text-success mx-4" onClick={confirmRestore}>Yes</a>
                        <a type="button" className="text-primary mx-4" onClick={cancelConfirm}>No</a>
                    </div>
                </div>}

                {confirmStatus === "confirm-remove" && controls.remove && <div className="d-flex flex-column">
                    <span className='text-danger'>Remove this quiz and its related data?</span>
                    <div className="d-flex flex-row">
                        <a type="button" className="text-danger mx-4" onClick={confirmRemove}>Yes</a>
                        <a type="button" className="text-primary mx-4" onClick={cancelConfirm}>No</a>
                    </div>
                </div>}



            </>}
        </div>}
    </>)

};

const IeltslmsAddQuizModal = ({loadQuizzes}) => {
    const { ENDPOINT }              = ENDPOINTS;
    const dispatch                  = useDispatch();
    const navigate                  = useNavigate();
    const { IELTS_ADD_QUIZ_MODAL }  = useSelector(state => state.modals);
    const { ROLE, USER }            = useSelector(state => state.auth);
    const { WIDTH }                 = useSelector(state => state.theme);
    const { IELTS_LMS_ADD_QUIZ }    = useSelector(state => state.constants);
    const [creating, setCreating]   = useState(false);
    const [failed, setFailed]       = useState(false);
    const [error, setError]         = useState({
        error_message: '',
        error_type: '',
        error_code: ''
    });
    const [titleError, setTitleError] = useState(null);
    // quiz default data
    const QUIZ_DEFAULT_DATA = {
        "title": "",
        "description": "",
        "_category": "reading",
        "time": {
            "timer": true,
            "hh": 0,
            "mm": 0,
            "ss": 0
        },
        "status": "published",
        "settings": {
            "audio": {
                "type": "",
                "src": ""
            }
        }
    };

    // quiz modal stepper
    const [step, setStep] = useState(1);
    // quiz items states
    const [quizItems, setQuizItems] = useState(QUIZ_DEFAULT_DATA);
    // quiz form validation
    const [validated, setValidated] = useState(false);

    // handling close modal
    const handleClose = () => {
        if (!creating) {
            if (step !== 3) {
                dispatch(update_modals({
                    IELTS_ADD_QUIZ_MODAL: false
                }));
                setQuizItems(QUIZ_DEFAULT_DATA);
                setValidated(false);
                setStep(1);
                hideErrors();

            }
        }
    };

    // check validation on keyup ot other events
    const checkFormValidity = () => {
        const form = document.querySelector('#create-quiz-form');
        if (form && form.checkValidity() === false) {
            setValidated(true);
        }
    };

    // append quiz to list of quizzes
    const appendQuizToContext = (quiz) => {

    };

    const changeTime = (n, t = 0) => {

        if (t > -1 && t <= 60) {
            setQuizItems({
                ...quizItems,
                time: {
                    ...quizItems.time,
                    timer: quizItems._category === "reading" || quizItems._category === "listening" ? true : false,
                    [n]: t
                }
            });
        }
    }

    // on submit from handler
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            hideErrors();
            setCreating(true);

            axios.post(`${ENDPOINT}${IELTS_LMS_ADD_QUIZ.endpoint}`, {
                quiz: {
                    ...quizItems
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
                        const { quiz } = response.data.success.json;
                        setCreating(false);
                        loadQuizzes();
                        handleClose();
                        
                        navigate(`/dashboard/@${ROLE}/ielts-lms/quiz/edit/${quiz._id}`);
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
                setCreating(false);
            });

        }
    };

    // hide errors
    const hideErrors = () => {
        setFailed(false);
        setError({
            error_message: '',
            error_type: '',
            error_code: ''
        });
    };

    return (
        <Modal
            show={IELTS_ADD_QUIZ_MODAL}
            size="md"
            backdrop="static"
            keyboard={false}
            fullscreen={WIDTH <= 400 ? true : false}
            centered
        >
            <Form
                id="create-quiz-form"
                onSubmit={handleSubmit}
                style={{ display: "contents" }}
                noValidate
                validated={validated}

            >
                <div className="modal-header">
                    <h4>Create IELTS Quiz</h4>
                    {!creating &&
                        <div className="btn btn-sm btn-icon btn-active-color-primary" type="button" onClick={handleClose}>
                            <i className="ki-duotone ki-cross fs-1">
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </i>
                        </div>}
                </div>
                <Modal.Body>
                    {step === 1 && <div className="d-flex flex-column">

                        <div className={"row d-flex justify-content-center"}>

                            <label
                                htmlFor="reading"
                                className={quizItems._category === "reading"
                                    ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded border-reading bg-light-reading m-4"
                                    : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded border-light-reading m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="reading"
                                    style={{
                                        display: "none"
                                    }}
                                    checked={quizItems._category === "reading"}
                                    onChange={(event) => setQuizItems({
                                        ...quizItems,
                                        _category: event.target.id
                                    })} />
                                <span className="d-flex flex-column align-items-center svg-icon svg-icon-4x svg-icon-lg-3x">
                                    <img src={"/svgs/reading.svg"} alt="" style={{ marginBottom: '6px' }} />
                                    <span className='color-reading'>Reading</span>
                                </span>
                            </label>

                            <label
                                htmlFor="listening"
                                className={quizItems._category === "listening"
                                    ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light-listening border-listening m-4"
                                    : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded border-light-listening m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="listening"
                                    style={{
                                        display: "none"
                                    }}
                                    checked={quizItems._category === "listening"}
                                    onChange={(event) => setQuizItems({
                                        ...quizItems,
                                        _category: event.target.id
                                    })} />
                                <span className="d-flex flex-column align-items-center svg-icon svg-icon-4x svg-icon-lg-3x">
                                    <img src={"/svgs/listening.svg"} alt="" style={{ marginBottom: '6px' }} />
                                    <span className='color-listening'>Listening</span>
                                </span>
                            </label>

                        </div>
                        <div className={"row justify-content-center"}>

                            <label
                                htmlFor="writing"
                                className={quizItems._category === "writing"
                                    ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light-writing border-writing m-4"
                                    : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded border-light-writing m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="writing"
                                    style={{
                                        display: "none"
                                    }}
                                    checked={quizItems._category === "writing"}
                                    onChange={(event) => setQuizItems({
                                        ...quizItems,
                                        _category: event.target.id
                                    })} />
                                <span className="d-flex flex-column align-items-center svg-icon svg-icon-4x svg-icon-lg-3x">
                                    <img src={"/svgs/writing.svg"} alt="" style={{ marginBottom: '6px' }} />
                                    <span className='color-writing'>Writing</span>
                                </span>
                            </label>

                            <label
                                htmlFor="speaking"
                                className={quizItems._category === "speaking"
                                    ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light-speaking border-speaking m-4"
                                    : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded border-light-speaking m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="speaking"
                                    style={{
                                        display: "none"
                                    }}
                                    checked={quizItems._category === "speaking"}
                                    onChange={(event) => setQuizItems({
                                        ...quizItems,
                                        _category: event.target.id
                                    })} />
                                <span className="d-flex flex-column align-items-center svg-icon svg-icon-4x svg-icon-lg-3x">
                                    <img src={"/svgs/speaking.svg"} alt="" style={{ marginBottom: '6px' }} />
                                    <span className='color-speaking'>Speaking</span>
                                </span>
                            </label>

                        </div>
                    </div>}
                    {step === 2 && <div className="bs-hidden">
                        {failed && !creating &&
                            <div className="error-box">

                                {/*--begin::Alert--*/}
                                <div className={`alert alert-dismissible bg-light-${error.error_type} d-flex flex-column flex-sm-row p-5 mb-10`}>
                                    {/*--begin::Icon--*/}
                                    <i className={`ki-duotone ki-notification-bing fs-2hx text-${error.error_type} me-4 mb-5 mb-sm-0`}>
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                    </i>
                                    {/*--end::Icon--*/}

                                    {/*--begin::Wrapper--*/}
                                    <div className="d-flex flex-column pe-0 pe-sm-10">
                                        {/*--begin::Title--*/}
                                        <h4 className="fw-semibold">{error.error_code}</h4>
                                        {/*--end::Title--*/}

                                        {/*--begin::Content--*/}
                                        <span>{error.error_message}</span>
                                        {/*--end::Content--*/}
                                    </div>
                                    {/*--end::Wrapper--*/}

                                    {/*--begin::Close--*/}
                                    <button type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" onClick={hideErrors}>
                                        <i className={`ki-duotone ki-cross fs-1 text-${error.error_type}`}>
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i>
                                    </button>
                                    {/*--end::Close--*/}
                                </div>
                                {/*--end::Alert--*/}



                            </div>}


                        <FloatingLabel
                            className="mb-2 validate-label"
                            controlId="floatingInput"
                            label="Add title">
                            <Form.Control
                                size="small"
                                type="text"
                                required
                                placeholder="Add title"
                                value={quizItems.title}
                                className="form-control-solid"
                                onKeyUp={checkFormValidity}
                                onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    title: event.target.value
                                })} />
                            <Form.Control.Feedback type="invalid">{titleError || 'Please add quiz title'}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Short description (Optional)">
                            <Form.Control
                                as="textarea"
                                placeholder="Short description (Optional)"
                                style={{
                                    height: '100px'
                                }}
                                value={quizItems.description}
                                className="form-control-solid"
                                onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    description: event.target.value
                                })} />
                        </FloatingLabel>

                        {(quizItems._category === "reading" || quizItems._category === "listening") &&
                            <div className="row mt-4 b-1px-dashed p-4">
                                <label className="form-label mb-3">Quiz time (minutes)</label>
                                <div className="position-relative col-12">

                                    <button
                                        type="button"
                                        className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3"
                                        onClick={() => changeTime("mm", + quizItems.time.mm - 1)}
                                    >

                                        <span className="svg-icon svg-icon-1">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect
                                                    opacity="0.3"
                                                    x="2"
                                                    y="2"
                                                    width="20"
                                                    height="20"
                                                    rx="5"
                                                    fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>

                                    </button>

                                    <input
                                        type="number"
                                        className="no-valdiations form-control form-control-solid border-0 text-center"
                                        placeholder="MM"
                                        name="hh"
                                        value={quizItems.time.mm}
                                        min="0"
                                        max="60"
                                        onChange={(event) => changeTime("mm", + event.target.value)} />

                                    <button
                                        type="button"
                                        className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3"
                                        onClick={() => changeTime("mm", + quizItems.time.mm + 1)}>

                                        <span className="svg-icon svg-icon-1">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect
                                                    opacity="0.3"
                                                    x="2"
                                                    y="2"
                                                    width="20"
                                                    height="20"
                                                    rx="5"
                                                    fill="currentColor"></rect>
                                                <rect
                                                    x="10.8891"
                                                    y="17.8033"
                                                    width="12"
                                                    height="2"
                                                    rx="1"
                                                    transform="rotate(-90 10.8891 17.8033)"
                                                    fill="currentColor"></rect>
                                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>

                                    </button>

                                </div>

                            </div>}

                    </div>}
                    {step === 3 && <div className="d-flex align-items-center justify-center">

                        <Spinner animation="border" variant="primary" />

                    </div>}

                </Modal.Body>
                {step !== 3 && <Modal.Footer className="flex flex-stack">

                    {step === 2 && <Button
                        variant="primary"
                        disabled={creating}
                        className="btn-sm btn-light-primary pull-left"
                        onClick={() => setStep(1)}>Change category
                    </Button>}
                    <div></div>
                    {step === 2 && <Button
                        variant="primary"
                        className="btn-sm pull-left"
                        type="submit"
                        disabled={creating}
                    >
                        {creating && <>
                            <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> &nbsp; Creating...
                        </>}
                        {!creating && 'Add Quiz'}
                    </Button>}
                    {step === 1 && <Button
                        variant="primary"
                        disabled={creating}
                        className="btn-sm btn-light-primary pull-right"
                        onClick={() => setStep(2)}> Next
                    </Button>}

                </Modal.Footer>}
            </Form>
        </Modal>
    );
};



export default DashboardIeltsLmsMyQuizzes;