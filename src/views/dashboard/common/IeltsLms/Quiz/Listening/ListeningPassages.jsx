import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';

import { IeltsLmsEditQuizSectionsListSkeleton, IeltsLmsEditQuizSectionSkeleton } from "../../../../../../components/Skeletons/Ieltslms";
import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { update_loader } from "../../../../../../includes/redux/slices/loader.slice";
import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_ieltslms_editQuiz_questions, update_ieltslms_editQuiz_sections, update_ieltslms_editQuiz_sections_states } from "../../../../../../includes/redux/slices/ieltslms.slice";
import { IELTS_LMS_SECTIONS_STATUS } from "../../../../../../includes/constants/ieltslms";
import { LoadEditorLight } from "../../../../../../components/Editor";



const IeltsLmsEditQuizListeningPassages = () => {
    const HEADING = 'List of Listening Passages';
    const BTN_TEXT = 'Add Passage';
    const NO_ITEMS_TEXT = "0 Passages";
    const dispatch                                      = useDispatch();
    const { id }                                        = useParams();
    const { ENDPOINT }                                  = ENDPOINTS;
    const [cancelTokenSource, setCancelTokenSource]     = useState(axios.CancelToken.source());
    const { ROUTES_LOADED, USER }                             = useSelector(state => state.auth);
    const { IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE }    = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE }     = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE }    = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS }              = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES }       = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_QUIZ }                       = useSelector(state => state.ieltslms);


    // states -
    const [showSectionModal,setShowSectionModal]        = useState(false);
    const [search, setSearch]                           = useState("");
    const [searching, setSearching]                     = useState(false);
    const [sid,setSid]                                  = useState(null);
    const [type,setType]                                = useState(null);
    const [reload,setReload]                            = useState(1);

    // handle close section
    const handleCloseAddEditSection = (type) => {
        if(type == "edit"){
            cancelTokenSource.cancel('Request canceled due to component unmounting');
        }
        //setReload(reload++);
        setShowSectionModal(false);
    };

    const handleRefresh = ()    => {
        loadSections();
    };

    const getQuestions = (sid)  => {
        dispatch(update_ieltslms_editQuiz_questions({
            CURRENT_SECTION_ID: sid
        }));
        dispatch(update_menu({
            CURRENT_DYNAMIC_PARAM: 'IELTS-LMS-EDIT-QUIZ-LISTENING-QUESTIONS'
        }));
    };
    

    const showAddSectionModal = () => {
        setType("new");
        setShowSectionModal(true);
    };
    const showEditSectionModal = (sid) => {
        setSid(sid);
        setType("edit");
        setShowSectionModal(true);
    };

    // reset states
    const resetStates = () => {
        dispatch(update_ieltslms_editQuiz_sections({
            LOADED: false,
            LOADING: true,
            FAILED: false,
            SECTIONS: [],
            TOTAL: 0
        }));
        dispatch(update_ieltslms_editQuiz_sections_states({
            TOTAL_PAGES: 0,
            TOTAL_ITEMS: 0
        }));
    };

    // error states
    const errorStates = () => {
        dispatch(update_ieltslms_editQuiz_sections({
            LOADED: false,
            LOADING: false,
            FAILED: true,
            SECTIONS: [],
            TOTAL: 0
        }));
    };

    // load sections
    const loadSections = (where = {}, pagination = {}, search = {}) => {
        setSearching(true);
        // set loading
        axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE.endpoint}/${id}`, {
            pagination: {
                currentPage: 1,
                perPage: 10,
                ...pagination
            },
            where: {
                status: IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS,
                _quizId: id,
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
                    dispatch(update_ieltslms_editQuiz_sections({
                        LOADED: true,
                        LOADING: false,
                        FAILED: false,
                        SECTIONS: [...response.data.success.json.sections],
                        TOTAL: response.data.success.json.total || 0
                    }));
                    dispatch(update_ieltslms_editQuiz_sections_states({
                        TOTAL_PAGES: response.data.success.json.pages || 0,
                        TOTAL_ITEMS: response.data.success.json.sections.length
                    }));
                }
            }

            if (response.data.error) {
                errorStates();
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
            errorStates();
            toast.error(error.message, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).finally(() => {
            setSearching(false);
        });
    };

    // filter - status
    const filterByStatus = (event) => {
        dispatch(update_ieltslms_editQuiz_sections_states({
            SECTION_STATUS: event.target.value
        }));

        loadSections({
            status: event.target.value
        }, {}, {});
        
    };

    // filter - search - title
    const findSection = () => {
        if (search.length > 0) {
            // search by name
            loadSections({}, {}, {
                status: true,
                query: search
            });
        } else {
            loadSections({}, {
                currentPage: 1
            }, {});
        }
    };


    // event for route links   ------------- [step 1]
    useEffect(() => {
        resetStates();
        if ( 
            ROUTES_LOADED && 
            IELTS_LMS_EDIT_QUIZ_GET_SECTIONS_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE &&
            IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE
        ) {
            if (IELTS_LMS_EDIT_QUIZ.LOADED) {
                loadSections();
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

    }, [ROUTES_LOADED, IELTS_LMS_EDIT_QUIZ]);

    return (<>{!IELTS_LMS_EDIT_QUIZ_SECTIONS.LOADED? <IeltsLmsEditQuizSectionsListSkeleton /> : <>
        <div className="card mb-0 bg-transparent" style={{boxShadow: '0 0 0 '}}>
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer bg-transparent">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">{HEADING}</h3>
                </div>
                <div className="card-toolbar">
                    <button className={"btn btn-sm btn-primary btn-sm"} onClick={() => showAddSectionModal()}> 
                        <i className="fa fa-plus"></i> {BTN_TEXT}
                    </button>
                </div>
            </div>
            {/* end::Card header */}
        </div>

        <div className="card mb-5 mb-xm-10">
            <div className="card-header cursor-pointer">

                <div className="d-flex flex-wrap align-items-center my-1">
                    <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_SECTIONS.TOTAL || 0})</h3>
                    <div className="d-flex align-items-center position-relative">
                        {(IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES && IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS) &&               
                        <select disabled={searching} onChange={filterByStatus} className='form-select form-select-solid form-select-sm w-150px me-5' value={IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS}>
                            {IELTS_LMS_SECTIONS_STATUS.length > 0 && IELTS_LMS_SECTIONS_STATUS.map((filter,index) => {
                                return <option key={index} value={filter.VALUE}>{filter.LABEL}</option>
                            })}
                        </select>}                 
                    </div>
                    

                </div>

                {/* BEGIN::search filter input */}
                <div className="d-flex align-items-center position-relative">

                    <div className="input-group input-group-sm">
                        <input disabled={searching} type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="form-control w-250px mr-2" placeholder="Search" aria-describedby="basic-addon2" />
                        <button onClick={findSection} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button">
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

            {/* begin::Content */}
            <div className="collapse show">
                {/* begin::Card body */}
                <div className="card-body border-top p-9">
                    {/* begin::Items */}
                    <div className="py-2">
                        {(
                            IELTS_LMS_EDIT_QUIZ_SECTIONS && 
                            IELTS_LMS_EDIT_QUIZ_SECTIONS.LOADED && 
                            IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS && 
                            <>
                                {/* begin::Item */}
                                {IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.length > 0 && IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.map((section,index) => {
                                    return (<SectionItem 
                                        key={section._id}
                                        index={index}
                                        section={section}
                                        showEditSectionModal={showEditSectionModal} 
                                        getQuestions={getQuestions} 
                                        handleRefresh={handleRefresh}
                                        length={IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.length}
                                    />)
                                })}
                                {/* end::Item */}

                                {IELTS_LMS_EDIT_QUIZ_SECTIONS.SECTIONS.length <= 0 && <>                           
                                    <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                                    </svg>
                                    <div className="text-center pt-10 mb-20">
                                        <h2 className="fs-2 fw-bold mb-7">
                                            {IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS === "published" && NO_ITEMS_TEXT}
                                            {IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS === "drafted" && <>Draft is empty</>}
                                            {IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS === "trashed" && <>Trash is empty</>}
                                        </h2>
                                        <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                            There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                        </p>
                                        {IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SECTION_STATUS === "published" &&
                                        <button onClick={() =>  showAddSectionModal()} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                            <i className="fa fa-plus"></i> {BTN_TEXT}
                                        </button>}
                                    </div>
                                </>}
                            </>
                        )}   
                    </div>
                    {/* end::Items */}
                </div>
                {/* end::Card body */}
                {/* begin::Card footer */}
                
                {/* end::Card footer */}
            </div>
            {/* end::Content */}
        </div>

        {/* begin::Add Section modal */}
        {showSectionModal && <AddEditSectionModal cancelTokenSource={cancelTokenSource} sid={sid} type={type} showSectionModal={showSectionModal} handleCloseAddEditSection={handleCloseAddEditSection} handleRefresh={handleRefresh} />}                           
        {/* end::Add Section modal */}




    </>}</>);
};


// section item
const SectionItem = ({ section, index, handleRefresh, getQuestions, showEditSectionModal , length }) => {
    const POST_TYPE                                     = 'listening-passage';
    const QUIZ_CATEGORY                                 = 'listening';
    const { id }                                        = useParams();
    const { ENDPOINT }                                  = ENDPOINTS;
    const { USER }                                      = useSelector(state => state.auth );
    const { IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE }    = useSelector(state => state.constants);
    const { IELTS_LMS_EDIT_QUIZ_REMOVE_SECTION_ROUTE }  = useSelector(state => state.constants);
    const [restoring,setRestoring]                      = useState(false);
    const [removing,setRemoving]                        = useState(false);


    // confirm restore section
    const confirmRestore = (sid) => {
        if( IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE && IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE.endpoint ) {
            let c = confirm("Would you like to restore and move to draft?");
            if( c ) {
                setRestoring(true);
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE.endpoint}/${id}/${sid}`, {
                    section:{
                        status: 'drafted',
                    },
                    where: {
                        _id: sid,
                        _quizId: id,
                        _postType: POST_TYPE,
                        _quizCategory: QUIZ_CATEGORY
                    }
                }, {
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {
        
                    if (response.data.success) {
                        handleRefresh();
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
                    setRestoring(false);
                });
            }
        } else {
            toast.error("Edit passage endpoint not found", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // confirm delete section
    const confirmRemove = (sid) => {
        if( IELTS_LMS_EDIT_QUIZ_REMOVE_SECTION_ROUTE && IELTS_LMS_EDIT_QUIZ_REMOVE_SECTION_ROUTE.endpoint ) {
            let c = confirm("Would you like to Remove this Section along with its Questions?");
            if( c ) {
                setRemoving(true);
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_REMOVE_SECTION_ROUTE.endpoint}/${id}/${sid}`, {}, {
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {
                    if (response.data.success) {
                        handleRefresh();
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
            toast.error("Remove passage endpoint not found", {
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
                
                <img className="w-40px h-40px me-6" src={"/img/writing/essay/list.png"} alt="" />
                <div className="d-flex flex-column">
                    
                    <div className="fs-5 text-dark text-hover-primary fw-bold">
                        {section.title}
                    </div>
                    <div className="fs-6 fw-semibold text-gray-400">
                        Order: {section.order}
                    </div>
                    
                </div>
            </div>

            <div className="d-flex justify-content-evenly">
                
                {section.status == "trashed" && <>

                    <button disabled={restoring || removing} onClick={() => confirmRestore(section._id)} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                        {!restoring && <i className="fa fa-refresh"></i>}
                        {restoring && <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </button>
                    &nbsp;
                    <button disabled={restoring || removing} onClick={() => confirmRemove(section._id)} className="btn btn-sm btn-light-danger" type='button' style={{padding: '4px 10px !important'}}>
                        {!removing && <>
                            <i className="fa fa-trash"></i> Delete Permanent
                        </>}
                        {removing && <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                        
                        
                    </button>
                </>}

                {(section.status == "published" || section.status == "drafted") && <>
                    <button disabled={restoring || removing} onClick={() => showEditSectionModal(section._id)} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                        <i className="fa fa-pencil"></i>
                    </button> &nbsp;
                    {section.status == "published" &&
                    <button disabled={restoring || removing} onClick={() => getQuestions(section._id)} className="btn btn-sm btn-light-success mr-2" type='button'>
                        <i className="fa fa-list"></i> Questions
                    </button>}
                </>}
                
                
            </div>
        </div>
        {index+1 < length && <div className="separator separator-dashed my-5"></div>}
    </React.Fragment>)
};

// handling section modal [add/edit]
const AddEditSectionModal = ({ reload, showSectionModal, handleCloseAddEditSection, handleRefresh, type, sid, cancelTokenSource }) => {
    const POST_TYPE                                     = 'listening-passage';
    const QUIZ_CATEGORY                                 = 'listening';

    const { id }                                        = useParams();
    const { ENDPOINT }                                  = ENDPOINTS;      
    const dispatch                                      = useDispatch();
    
    const { WIDTH }                                     = useSelector( state => state.theme );
    const { USER }                                      = useSelector( state => state.auth );
    const { IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE }     = useSelector( state => state.constants );
    const { IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE }    = useSelector( state => state.constants );
    const { IELTS_LMS_EDIT_QUIZ_GET_SECTION_ROUTE }     = useSelector( state => state.constants );

    const [fullscreen,setFullscreen]                    = useState(false);
    // title
    const [title,setTitle]                              = useState("");
    const [order,setOrder]                              = useState("");
    // content
    const [html,setHtml]                                = useState("");

    // passage status
    const [status,setStatus]                            = useState("published");
    // editors
    const [htmlEditor,setHtmlEditor]                    = useState(<></>);
    const [modalTitle,setModalTitle]                    = useState("");
    const [btnText,setBtnText]                          = useState("");
    const [creating,setCreating]                        = useState(false);
    const [loading,setLoading]                          = useState(true);
    const [once,setOnce]                                = useState(1);
    
    

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if( 
            IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE && IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE.endpoint &&
            IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE && IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE.endpoint
        ) {
            setCreating(true);
            if(type == "new"){
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_ADD_SECTION_ROUTE.endpoint}/${id}`, {
                    section:{
                        title: title,
                        content: html,
                        status: status
                    },
                    where: {
                        _quizId: id,
                        _postType: POST_TYPE,
                        _quizCategory: QUIZ_CATEGORY
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
                            handleRefresh();
                            handleCloseAddEditSection();
                            
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
            } else if(type == "edit") {
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_EDIT_SECTION_ROUTE.endpoint}/${id}/${sid}`, {
                    section:{
                        title: title,
                        content: html,
                        status: status,
                        order: order
                    },
                    where: {
                        _id: sid,
                        _quizId: id,
                        _postType: POST_TYPE,
                        _quizCategory: QUIZ_CATEGORY
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
                            setOnce(once+1);
                            handleRefresh();
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
        } else {
            toast.error("Route undefined", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // load passage
    const loadSection = () => {
        if(IELTS_LMS_EDIT_QUIZ_GET_SECTION_ROUTE && IELTS_LMS_EDIT_QUIZ_GET_SECTION_ROUTE.endpoint ) {
            axios.get(`${ENDPOINT}${IELTS_LMS_EDIT_QUIZ_GET_SECTION_ROUTE.endpoint}/${id}/${sid}`, {
                cancelToken: cancelTokenSource.token,
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {

                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { section } = response.data.success.json;
                        setTitle(section.title);
                        setOrder(section.order);
                        setHtml(section.content);
                        setHtmlEditor(<LoadEditorLight html={section.content} setHtml={setHtml} />);
                        setStatus(section.status);
                        setCreating(false);
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
                
            });
        } else {
            toast.error("it looks like endpoint is not set", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
        }
    };


    useEffect(() => {
        if(WIDTH <= 700 ){
            setFullscreen(true);
        } else {
            setFullscreen(false);
        }
    },[WIDTH]);

    useEffect(() => {
        if( type === "new" ) {
            // on modal load , load then default content
            setModalTitle('Add Listening Passage');
            setBtnText("Add Passage");
            setTitle("");
            setHtml("");
            setHtmlEditor(<LoadEditorLight html={"Add Passage content"} setHtml={setHtml} />);
            setStatus("published");
            setCreating(false);
            setOnce(1);
            setLoading(false);
        } else if(type == "edit" ) {
            setModalTitle('Edit Listening Passage');
            setBtnText("Edit Passage");
            setOnce(1);
            loadSection();
        }

        return () => {
            
            setModalTitle('');
            setBtnText("");
            setTitle("");
            setHtml("");
            setHtmlEditor(<LoadEditorLight html={""} setHtml={setHtml} />);
            setStatus("published");
            setCreating(false);
            setOnce(1);
            setLoading(true);
        };
    },[type,reload]);

    return (<>
        <Modal
            size="lg"
            centered
            show={showSectionModal}
            onHide={handleCloseAddEditSection}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header">
                <h2>{modalTitle}</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddEditSection}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            {loading? <IeltsLmsEditQuizSectionSkeleton /> : <form onSubmit={handleSubmit} style={{ display: 'contents'}}>   
                <div className="modal-body">
                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Title</div>
                        </div>

                        <div className="col-xl-9">  
                            <input 
                                type="text" 
                                className="form-control form-control-solid" 
                                name="title" 
                                value={title} 
                                placeholder={"Add Passage title"} 
                                onChange={(event) => setTitle(event.target.value)} 
                                disabled={creating}
                                required
                            />           
                        </div>
                        
                    </div>
                    {/* END::ROW */}

                    {type == "edit" && <>
                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Order</div>
                        </div>

                        <div className="col-xl-9">  
                            <input 
                                type="number" 
                                className="form-control form-control-solid" 
                                name="order" 
                                value={order} 
                                placeholder={"Add Passage order"} 
                                onChange={(event) => setOrder(event.target.value)} 
                                disabled={creating}
                                required
                            />           
                        </div>
                        
                    </div>
                    {/* END::ROW */}
                    </>}


                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Passage content</div>
                        </div>
                            
                        <div className="col-xl-9">
                            {htmlEditor}
                        </div>
                        
                    </div>
                    {/* END::ROW */}
                        

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">   
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                                
                        <div className="col-xl-9">
                            <select disabled={creating} className={`form-select form-select-solid w-200px`} name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                <option value="published">Published</option>
                                <option value="drafted">Save as Draft</option>
                                <option value="trashed">Move to Trash</option>
                            </select>
                        </div>
                            
                    </div>
                    {/* END::ROW */}
                        
                        
                </div>
                <div className="modal-footer p-4 d-flex flex-row justify-content-right">

                    <button disabled={creating} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">
                        {type == "new" && <>
                            {creating ? <>
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> &nbsp; Creating...
                            </> : btnText}
                        </>}
                        {type == "edit" && <>
                            {creating ? <>
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> &nbsp; Saving...
                            </> : (once > 1)? 'Save changes' : btnText}
                        </>}
                    </button>                       
                </div>
            </form>}
        </Modal> 
    </>)
};




export default IeltsLmsEditQuizListeningPassages;