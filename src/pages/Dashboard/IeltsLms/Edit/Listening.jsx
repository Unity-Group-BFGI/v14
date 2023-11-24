import { 
    update_ielts_lms,
    update_question_matching,
    ielts_lms_update_question_by_index,
    update_question_type,
    update_question_plan_map_diagram_labelling_listening,
    update_question_sentence_completion_listening,
    update_question_summary_form_completion_listening,
    update_question_matching_explanation,
    update_question_summary_form_completion_explanation_listening,
    update_question_sentence_completion_explanation_listening,
    update_question_plan_map_diagram_labelling_explanation_listening
} from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { update_route } from '../../../../includes/redux-store/Slices/Route.slice';
import { update_dashboard } from '../../../../includes/redux-store/Slices/Dashboard.slice';
import { IeltsLmsEditQuizEssayListSkeleton, IeltsLmsEditQuizWritingEditEssaySkeleton } from '../../../../components/default/Skeletons';
import { LoadEditorLight, LoadEditorDark } from '../../../../components/default/Editor';
import constants from '../../../../includes/constants';
import getRequest from '../../../../includes/rest-apis/get';
import postRequest from '../../../../includes/rest-apis/post';
import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select, { components } from "react-select";
import { QuestionMainMatchingListening } from './ListeningQuestions/Matching';
import { QuestionMainSummaryFormCompletion } from './ListeningQuestions/SummaryFormCompletion';
import { QuestionMainSentenceCompletion } from './ListeningQuestions/SentenceCompletion';
import { QuestionMainPlanMapDiagramLabelling } from './ListeningQuestions/PlanMapDiagramLabelling';


const IeltsLmsEditQuizListeningPassages = () => {

    const routeParent               = "ielts-lms";
    const routeChild                = "ielts-lms-edit-quiz";
    
    const { id }                                                        = useParams();
    const { endpoint }                                                  = constants;
    const dispatch                                                      = useDispatch();
    const { USER }                                                      = useSelector( state => state.auth );
    const { PARAM3, PARAM4 }                                            = useSelector( state => state.route);

    const { DASHBOARD_SUBMENUS }                                        = useSelector( state => state.dashboard );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }                     = useSelector( state => state.dashboard );
    const { DASHBOARD_DYNAMIC_MENU, DASHBOARD_DYNAMIC_MENU_LOADING }    = useSelector( state => state.dashboard );

    const { IELTS_LMS_OVERALL }                                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES }                              = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES }                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES }            = useSelector( state => state.ieltsLms );

    const [loading,setLoading]                                          = useState(true);
    const [context,setContext]                                          = useState(<IeltsLmsEditQuizEssayListSkeleton />);
    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        if( states.IELTS_LMS ) {
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }

        if( states.ROUTE ) {
            dispatch(update_route({
                ...permissions.ROUTE
            }));
        }
    };

    // load hooks
    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            !DASHBOARD_DYNAMIC_MENU_LOADING && DASHBOARD_DYNAMIC_MENU &&
            IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ.LOADED
        ) {

            const matches       = [...DASHBOARD_SUBMENUS];
            const matchedObject =  matches.find( menuItem => {
                return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
            });

            if( matchedObject ) {
                const dynamicMenus = [...DASHBOARD_DYNAMIC_MENU];
                const dynamicObject =  dynamicMenus.find( dItem => {
                    return (dItem.params.param1 === routeParent && dItem.params.param2 === routeChild && dItem.params.param3 === PARAM3 )
                });

                if(dynamicObject) {
                    const { meta, restApi } = dynamicObject;
                    dispatch(update_dashboard({
                        DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU: dynamicObject
                    }));
                    if( restApi && restApi.enable ) {
                        if(!IELTS_LMS_EDIT_QUIZ_PASSAGES && !IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES && !IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES){
                            console.log('[REST API -D]:', restApi);
                            getRequest(endpoint + restApi.getOverall + "/" +id, {
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
                        
                    } else {
                        console.info('[REST-API D]:', dynamicObject);
                    }
                } else {
                    console.log('no dynamic found');
                }
            } else {
                console.warn("no match found for this route");
            }

        }
        return () => {}
    },[IELTS_LMS_OVERALL]);

    // success hook
    useEffect(() => {
        
        if(
            IELTS_LMS_EDIT_QUIZ &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES
        ){
            if(
                IELTS_LMS_EDIT_QUIZ.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.LOADED
            ){             
                if(PARAM3 === "ielts-lms-edit-quiz-listening-passages"){
                    
                    if(PARAM4 === "ielts-lms-edit-quiz-listening-passages-list"){
                        dispatch(update_dashboard({
                            DASHBOARD_ROUTE_LOADING: false,
                        }));
                        setContext(<IeltsLmsEditQuizListeningPassagesList />);
                        return;
                    } else {
                        dispatch(update_route({
                            PARAM4: 'ielts-lms-edit-quiz-listening-passages-list'
                        }));
                    }
                }
            } else {
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: true,
                }));
            }
        } else {
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
            }));
        }
    },[
        IELTS_LMS_EDIT_QUIZ, 
        IELTS_LMS_EDIT_QUIZ_PASSAGES, 
        IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES,
        IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES,
        PARAM3, 
        PARAM4
    ]);

    return (<>{context}</>);
};

// passages list
const IeltsLmsEditQuizListeningPassagesList = () => {
    const { id }                                                = useParams();
    const { endpoint }                                          = constants;
    const dispatch                                              = useDispatch();
    const [loading,setLoading]                                  = useState(true);
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );
    const { USER }                                              = useSelector( state => state.auth );
    const { PARAM3, PARAM4 }                                    = useSelector( state => state.route);
    const { IELTS_LMS_OVERALL }                                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                               = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES }                      = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST }                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES }               = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES }    = useSelector( state => state.ieltsLms );
    const [showAddPassage,setShowAddPassage]                      = useState(false);
    const [showEditPassage,setShowEditPassage]                  = useState(false);
    const [refresh,setRefresh]                                  = useState(1);
    const [passageId,setPassageId]                              = useState(null);
    const [searchParam,setSearchParams]                         = useState("");
    const [searching,setSearching]                              = useState(false);
    const handleRefresh = ()                                    => setRefresh(refresh+1);
    const handleCloseAddPassage = ()                              => {
        setShowAddPassage(false);
        setShowEditPassage(false);
        setPassageId(null);
    };
    const handleCloseEditPassage = ()                     => {
        setShowAddPassage(false);
        setShowEditPassage(false);
        setPassageId(null);
        
    };
    const editPassage = (id = null)                       => {
        if(id !== null){
            setPassageId(id);
            setShowAddPassage(false);
            setShowEditPassage(true);
            console.log('we id',id);
        }
    }

    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        setSearching(false);
        if( states && states.IELTS_LMS ) {
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }

        if(states && states.ROUTE ) {
            dispatch(update_route({
                ...permissions.ROUTE
            }));
        }


    };

    // find passage
    const findPassage = () => {
        if(searchParam.length > 0){
            // search by name
            reloadPassages({ currentPage: 1 },{},{
                status: true,
                query: searchParam
            });
        } else {
            reloadPassages({
                currentPage: 1
            },{ });
        }
    };

    const filterByStatus = (event) => {
        dispatch(update_ielts_lms({
            IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES:{
                ...IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES,
                SELECTED_STATUS_FILTER: event.target.value
            }
        }));
        reloadPassages({},{
            status: event.target.value
        });
    };

    // get list of sections
    const reloadPassages = (pagination = {}, where = {}, search = {}) => {
        if(DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU){
            const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
            if( restApi && restApi.enable ) {
                setSearching(true);
                postRequest(endpoint + restApi.getList + "/" +id, {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': ''
                },{
                    pagination: {
                        perPage: IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.PER_PAGE,
                        currentPage: IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.CURRENT_PAGE,
                        ...pagination
                    },
                    where: {
                        status: IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.SELECTED_STATUS_FILTER,
                        _category: 'listening',
                        _postType: 'listening-passage',
                        ...where
                    },
                    search: {
                        status: false,
                        query: '',
                        ...search
                    }
                }).then((response) => {
                    const { success, has_json, json, error, res } = response;
                    if( success && has_json && !error ) {
                        updateStates(json);
                    } else {
                        console.warn(`[warning]: ${res}`);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            console.log('we are inside');
        }
    }

    // get questions
    const getQuestions = (sid) => {
        dispatch(update_route({
            DYNAMIC_ROUTE_SECTION_ID: sid,
            PARAM3: 'ielts-lms-edit-quiz-listening-questions'
        }));
    };

    // load hook
    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ.LOADED &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES && IELTS_LMS_EDIT_QUIZ_PASSAGES.LOADED
        ) {
            if(DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU){
                const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
                if( restApi && restApi.enable ) {
                    postRequest(endpoint + restApi.getList + "/" +id, {
                        'Authorization': 'Bearer '+USER.accessToken,
                        'x-refresh-token': USER.refreshToken,
                        'x-api-token': ''
                    },{
                        pagination: {
                            perPage: IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.PER_PAGE,
                            currentPage: IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.CURRENT_PAGE
                        },
                        where: {
                            status: IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.SELECTED_STATUS_FILTER,
                            _category: 'listening',
                            _postType: 'listening-passage'
                        },
                        search: {
                            status: searching,
                            query: searchParam
                        }
                    }).then((response) => {
                        const { success, has_json, json, error, res } = response;
                        if( success && has_json && !error ) {
                            updateStates(json);
                        } else {
                            console.warn(`[warning]: ${res}`);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                console.log('we are inside');
            }  
        } else {
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
            }));
            setLoading(true); 
        }
        
    },[IELTS_LMS_OVERALL,IELTS_LMS_EDIT_QUIZ, IELTS_LMS_EDIT_QUIZ_PASSAGES,refresh]);
    
    // success hook
    useEffect(() => {
        if(
            IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES &&
            IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES && 
            IELTS_LMS_EDIT_QUIZ_PASSAGES
        ){

            if(
                IELTS_LMS_EDIT_QUIZ_PASSAGES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.LOADED
            ){             
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: false,
                }));
                setLoading(false); 
                
            }
        }
    },[
        IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST,
        IELTS_LMS_EDIT_QUIZ_PASSAGES_PAGINATION_STATES,
        IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES,
        IELTS_LMS_EDIT_QUIZ_PASSAGES
    ]);

    return (<>
        {loading? <IeltsLmsEditQuizEssayListSkeleton /> : <>
            
        <div className="card mb-0 bg-transparent" style={{boxShadow: '0 0 0 '}}>
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer bg-transparent">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">List of Listening Passages</h3>
                </div>
                <div className="card-toolbar">
                    <button className={"btn btn-sm btn-primary btn-sm"} onClick={() => setShowAddPassage(true)}> 
                        <i className="fa fa-plus"></i> Add Passage
                    </button>
                </div>
            </div>
            {/* end::Card header */}
        </div>

        <div className="card mb-5 mb-xm-10">
            <div className="card-header cursor-pointer">

                <div className="d-flex flex-wrap align-items-center my-1">
                    <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.TOTAL || 0})</h3>
                    <div className="d-flex align-items-center position-relative">
                        {(IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES && IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.STATUS_FILTERS && IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.STATUS_FILTERS.length > 0) &&               
                        <select disabled={searching} onChange={filterByStatus} className='form-select form-select-solid form-select-sm w-150px me-5' value={IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.SELECTED_STATUS_FILTER}>
                            {IELTS_LMS_EDIT_QUIZ_PASSAGES_STATES.STATUS_FILTERS.map((filter,index) => {
                                return <option key={index} value={filter.key}>{filter.value}</option>
                            })}
                        </select>}                 
                    </div>
                    

                </div>



                {/* BEGIN::search filter input */}
                <div className="d-flex align-items-center position-relative">               
                    <div className="input-group input-group-sm">
                        <input type="text" disabled={searching} value={searchParam} className="form-control w-250px mr-2" placeholder="Search Passage" onChange={(event) => setSearchParams(event.target.value)} aria-describedby="basic-addon2" />
                                
                        <button disabled={searching} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button" onClick={findPassage}>
                            {searchParam.length > 0? 
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                                </svg>
                            :
                                <i className={`fa fa-thin fa-light fa-arrows-rotate ${searching? 'spinner' : ''}`}></i>
                            }
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
                            IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST && 
                            IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.LOADED && 
                            IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.PASSAGES && <>
                            
                            {/* begin::Item */}
                            {IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.PASSAGES.length > 0 && IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.PASSAGES.map((passage,index) => {
                                return (<React.Fragment key={index}>
                                    <div className="d-flex flex-stack">
                                        <div className="d-flex">
                                            
                                            <img className="w-40px h-40px me-6" src={"/img/writing/essay/list.png"} alt="" />
                                            <div className="d-flex flex-column">
                                                
                                                <div className="fs-5 text-dark text-hover-primary fw-bold">
                                                    {passage.title}
                                                </div>
                                                <div className="fs-6 fw-semibold text-gray-400">
                                                    Order: {passage.order}
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-evenly">
                                            
                                            {passage.status == "trashed" && <>
                                                <button onClick={() => {}} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                    <i className="fa fa-refresh"></i>
                                                </button>
                                                <button className="btn btn-sm btn-light-danger" type='button' style={{padding: '4px 10px !important'}}>
                                                    <i className="fa fa-trash"></i> Delete Permanent
                                                </button>
                                            </>}
                                            {(passage.status == "published" || passage.status == "drafted") && <>
                                                <button onClick={() => editPassage(passage._id)} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button onClick={() => getQuestions(passage._id)} className="btn btn-sm btn-light-success mr-2" type='button'>
                                                    <i className="fa fa-list"></i> Questions
                                                </button>
                                            </>}
                                            
                                            
                                        </div>
                                    </div>
                                    {index+1 < IELTS_LMS_EDIT_QUIZ_PASSAGES_LIST.PASSAGES.length && <div className="separator separator-dashed my-5"></div>}
                                </React.Fragment>)
                                }
                            )}
                            {/* end::Item */}






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

        {showAddPassage? <AddPassageModal showAddPassage={showAddPassage} handleCloseAddPassage={handleCloseAddPassage} handleRefresh={handleRefresh}  /> : <></>}     
        {showEditPassage? <EditPassageModal eid={passageId} showEditPassage={showEditPassage} handleCloseEditPassage={handleCloseEditPassage} handleRefresh={handleRefresh}  /> : <></>}                     

        </>}
    </>);
};

// add essay modal
const AddPassageModal = ({showAddPassage,handleCloseAddPassage, handleRefresh}) => {
    const { id }                                                = useParams();
    const { endpoint }                                          = constants;        
    const dispatch                                              = useDispatch();
    const { USER }                                              = useSelector( state => state.auth );
    const { WIDTH }                                             = useSelector( state => state.theme );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );

    const [fullscreen,setFullscreen]                            = useState(false);
    // title
    const [title,setTitle]                                      = useState("");
    // content
    const [html,setHtml]                                        = useState("");

    // passage status
    const [status,setStatus]                                    = useState("published");
    // editors
    const [htmlEditor,setHtmlEditor]                            = useState(<LoadEditorLight html={html} setHtml={setHtml} />);
    const [creating,setCreating]                                = useState(false);
    

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
        if( restApi.enable ) {
            const { postInsert } = restApi;
            if( postInsert !== undefined ) {
                const data = {
                    values: {
                        title: title,
                        _category: 'listening',
                        _postType: 'listening-passage',
                        content: html,
                        status: status
                    }
                };
                setCreating(true);
                postRequest(endpoint + postInsert + "/"+id, {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': ''
                }, data).then((response) => {
                    const { success, has_json, json, error, res } = response;
                    if( success && has_json && !error ) {
                        if( json.insert ) {
                            handleRefresh();
                            handleCloseAddPassage();
                        } else {
                            console.warn(`[warning]: ${res}`);
                        }
                    } else {
                        console.warn(`[warning]: ${res}`);
                    }
                }).catch(err => {
                    console.warn('[ERROR]: ',err);
                }).finally(() => {
                    setCreating(false);
                });
            } else {
                alert("ERROR: Rest api for handling submit forms is not defined !");
            }
        } else {
            alert("Rest api for handling submit forms is not enable !");
        }
    };


    useEffect(() => {
        if(WIDTH <= 700 ){
            setFullscreen(true);
        } else {
            setFullscreen(false);
        }
    },[WIDTH]);


    return (<>
        <Modal
            size="lg"
            centered
            show={showAddPassage}
            onHide={handleCloseAddPassage}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header">
                <h2>Add Listening Passage</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddPassage}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            <form onSubmit={handleSubmit} style={{ display: 'contents'}}>   
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

                    <button disabled={creating} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Add Passage</button>                       
                </div>
            </form>
        </Modal> 
    </>)
};

// edit section modal
const EditPassageModal = ({eid,showEditPassage,handleCloseEditPassage, handleRefresh}) => {
    const { id }                                                = useParams();
    const { endpoint }                                          = constants;        
    const dispatch                                              = useDispatch();
    const { USER }                                              = useSelector( state => state.auth );
    const { WIDTH }                                             = useSelector( state => state.theme );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );

    const [fullscreen,setFullscreen]                            = useState(false);
    // title
    const [title,setTitle]                                      = useState("");
    // essay order
    const [order,setOrder]                                      = useState(0);
    // content
    const [html,setHtml]                                        = useState("");
    // essay status
    const [status,setStatus]                                    = useState("published");
    // editors
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [editing,setEditing]                                  = useState(false);
    const [loading,setLoading]                                  = useState(true);
    

    const loadData = (data = {}) => {
        if(
            data.title && 
            data.order &&
            data.content &&
            data.status
        ){
            setTitle(data.title);
            setOrder(data.order);
            setHtml(data.content);
            setStatus(data.status);
            setHtmlEditor(<LoadEditorLight html={data.content} setHtml={setHtml} />);
            setLoading(false);
        }
    };


    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
        if( restApi.enable ) {
            const { postEdit } = restApi;
            if( postEdit !== undefined ) {
                const data = {
                    values: {
                        title: title,
                        order: order,
                        _quizCategory: 'listening',
                        _postType: 'listening-passage',
                        content: html,
                        status: status
                    },
                    where: {
                        _id: eid,
                        _quizId: id
                    }
                };
                setEditing(true);
                postRequest(endpoint + postEdit + "/"+id+"/"+eid, {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': ''
                }, data).then((response) => {
                    const { success, has_json, json, error, res } = response;
                    if( success && has_json && !error ) {
                        if( json.update ) {
                            handleRefresh();
                            setEditing(false);
                        } else {
                            console.warn(`[warning]: ${res}`);
                        }
                    } else {
                        console.warn(`[warning]: ${res}`);
                    }
                }).catch(err => {
                    console.warn('[ERROR]: ',err);
                })
            } else {
                alert("ERROR: Rest api for handling submit forms is not defined !");
            }
        } else {
            alert("Rest api for handling submit forms is not enable !");
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
        if(eid !== null){
            if(loading){
                console.log('ajax called for id',eid, id);
                const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
                if( restApi.enable ) {
                    const { getEdit } = restApi;
                    if( getEdit !== undefined ) {

                        postRequest(endpoint + getEdit + "/"+id+"/"+eid, {
                            'Authorization': 'Bearer '+USER.accessToken,
                            'x-refresh-token': USER.refreshToken,
                            'x-api-token': ''
                        },{
                            where: {
                                _id: eid,
                                _quizId: id
                            },
                            format: {}
                        }).then((response) => {
                            const { success, has_json, json, error, res } = response;
                            if( success && has_json && !error ) {
                                if( json.get ) {
                                    loadData(json.data);
                                } else {
                                    console.warn(`[warning]: ${res}`);
                                }
                            } else {
                                console.warn(`[warning]: ${res}`);
                            }
                        }).catch(err => {
                            console.warn('[ERROR]: ',err);
                        }).finally(() => {
                            
                        });     

                    }
                }
            }
        }
    },[eid]);



    return (<>
        <Modal
            size="lg"
            centered
            show={showEditPassage}
            onHide={handleCloseEditPassage}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header p-3">
                <h4 className='p-0 m-0'>Edit Listening Passage</h4>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseEditPassage}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div>
            {loading? <IeltsLmsEditQuizWritingEditEssaySkeleton /> : <>
                <form onSubmit={handleSubmit} style={{ display: 'contents'}}>   
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
                                    disabled={editing}
                                    required
                                />           
                            </div>
                            
                        </div>
                        {/* END::ROW */}

                        {/* BEGIN::ROW */}
                        <div className="row mb-8">  
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Passage order</div>
                            </div>
                                    
                            <div className="col-xl-9">
                                <input 
                                    type="number" 
                                    className="form-control form-control-solid" 
                                    name="order" 
                                    value={order} 
                                    placeholder={"Add Passage order"} 
                                    onChange={(event) => setOrder(event.target.value)} 
                                    disabled={editing}
                                    required
                                /> 
                            </div>
                                
                        </div>
                        {/* END::ROW */}

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
                                <select disabled={editing} className={`form-select form-select-solid w-200px`} name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                    <option value="published">Published</option>
                                    <option value="drafted">Save as Draft</option>
                                    <option value="trashed">Move to Trash</option>
                                </select>
                            </div>
                                
                        </div>
                        {/* END::ROW */}
                            
                            
                    </div>
                    <div className="modal-footer p-3 d-flex flex-row justify-content-right">

                        <button disabled={editing} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Save Changes</button>                       
                    </div>
                </form>
            </>} 
        </Modal> 
    </>)
};

// questions list
const IeltsLmsEditQuizListeningQuestions = () => {

    const routeParent               = "ielts-lms";
    const routeChild                = "ielts-lms-edit-quiz";
    
    const { id }                                                        = useParams();
    const { endpoint }                                                  = constants;
    const dispatch                                                      = useDispatch();
    const { USER }                                                      = useSelector( state => state.auth );
    const { PARAM3, PARAM4 }                                            = useSelector( state => state.route);
    const { DYNAMIC_ROUTE_SECTION_ID }                                  = useSelector( state => state.route );

    const { DASHBOARD_SUBMENUS }                                        = useSelector( state => state.dashboard );
    const { DASHBOARD_DYNAMIC_MENU, DASHBOARD_DYNAMIC_MENU_LOADING }    = useSelector( state => state.dashboard );

    const { IELTS_LMS_OVERALL }                                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS }                             = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES }                      = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_PAGINATION_STATES }           = useSelector( state => state.ieltsLms );
    const [sectionSelected,setSectionSelected]                          = useState(false);
    const [loading,setLoading]                                          = useState(true);    
    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        if( states.IELTS_LMS ) {
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }

        if( states.ROUTE ) {
            dispatch(update_route({
                ...permissions.ROUTE
            }));
        }
    };

    const handleSectionChange = (event) => {
        const { value } = event.target;
        const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.find(item => item._id == value);
        if(foundObject) {
            dispatch(update_route({
                DYNAMIC_ROUTE_SECTION_ID: value
            }));
            setSectionSelected(true);
        } else {
            dispatch(update_route({
                DYNAMIC_ROUTE_SECTION_ID: "not-selected"
            }));
            setSectionSelected(false);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: false,
            }));
        }
    };

    // load hooks
    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            !DASHBOARD_DYNAMIC_MENU_LOADING && DASHBOARD_DYNAMIC_MENU &&
            IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ.LOADED
        ) {
            const matches       = [...DASHBOARD_SUBMENUS];
            const matchedObject =  matches.find( menuItem => {
                return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
            });

            if( matchedObject ) {
                const dynamicMenus = [...DASHBOARD_DYNAMIC_MENU];
                const dynamicObject =  dynamicMenus.find( dItem => {
                    return (dItem.params.param1 === routeParent && dItem.params.param2 === routeChild && dItem.params.param3 === PARAM3 )
                });

                if(dynamicObject) {
                    const { meta, restApi } = dynamicObject;
                    dispatch(update_dashboard({
                        DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU: dynamicObject
                    }));
                    if( restApi && restApi.enable ) {
                        
                            console.log('[REST API -D]:', restApi);
                            getRequest(endpoint + restApi.getOverall + "/" +id, {
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
                            }).catch((err) => {});
                        
                        
                    } else {
                        console.info('[REST-API D]:', dynamicObject);
                    }
                } else {
                    console.log('no dynamic found');
                }
            } else {
                console.warn("no match found for this route");
            }

        }
        return () => {}
    },[IELTS_LMS_OVERALL]);

    // success hooks
    useEffect(() => {
        if(
            IELTS_LMS_EDIT_QUIZ &&
            IELTS_LMS_EDIT_QUIZ_QUESTIONS &&
            IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES &&
            IELTS_LMS_EDIT_QUIZ_QUESTIONS_PAGINATION_STATES
        ){
            if(
                IELTS_LMS_EDIT_QUIZ.LOADED &&
                IELTS_LMS_EDIT_QUIZ_QUESTIONS.LOADED &&
                IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_QUESTIONS_PAGINATION_STATES.LOADED
            ){             
                if(PARAM3 === "ielts-lms-edit-quiz-listening-questions"){
                    dispatch(update_dashboard({
                        DASHBOARD_ROUTE_LOADING: false,
                    }));
                    setLoading(false); 
                }
            } else {
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: true,
                }));
            }
        } else {
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
            }));
        }
    },[
        IELTS_LMS_EDIT_QUIZ, 
        IELTS_LMS_EDIT_QUIZ_QUESTIONS, 
        IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES,
        IELTS_LMS_EDIT_QUIZ_QUESTIONS_PAGINATION_STATES,
        PARAM3, 
        PARAM4
    ]);

    // section switch
    useEffect(() => {
        if(!loading && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.LOADED){
            if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.length > 0){
                const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.find(item => item._id == DYNAMIC_ROUTE_SECTION_ID);
                if(foundObject) {
                    setSectionSelected(true);
                } else {
                    setSectionSelected(false);
                }
            }  
        }
    },[loading,IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES,DYNAMIC_ROUTE_SECTION_ID]);

    
    return (<>
        {loading? <>is loading...</> : <>
            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.length <= 0 && <>
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
                            <button type='button' className="btn btn-primary btn-thin" style={{marginRight: "15px"}} onClick={() => dispatch(update_route({
                                PARAM3: 'ielts-lms-edit-quiz-listening-passages',
                                PARAM4: 'ielts-lms-edit-quiz-listening-passages-list'
                            }))}>
                                <i className="fa fa-thin fa-chevron-left"></i> Swtich to Passages Tab
                            </button>    
                        </div> 
                    </div>
                </div>
            </>}
            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.length > 0 && <>
                <div className="card bg-transparent mb-4 border-0" style={{boxShadow: '0 0'}}>
                    <div className="card-header d-flex flex-row align-items-center border-0">
                        <h3 className="card-title">List of Questions</h3>
                        <Form.Select style={{maxWidth: "200px",fontSize: "12px"}} value={DYNAMIC_ROUTE_SECTION_ID} onChange={handleSectionChange}>
                            <option value="not-selected"> --SELECT PASSAGE-- </option>
                            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.map((s,index) => { return (<option key={index} value={s._id}>{s.title}</option>) } )}
                        </Form.Select>          
                    </div>
                </div>

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
                                <Form.Select style={{maxWidth: "200px",fontSize: "12px", margin: '0 auto'}} value={DYNAMIC_ROUTE_SECTION_ID} onChange={handleSectionChange}>
                                    <option value="not-selected"> --SELECT PASSAGE-- </option>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.map((s,index) => { return (<option key={index} value={s._id}>{s.title}</option>) } )}
                                </Form.Select>    
                            </div> 
                        </div>
                    </div>    
                </>}

                {sectionSelected && <QuestionsList sid={DYNAMIC_ROUTE_SECTION_ID} />}

            </>}
        </>}
    </>)
};

// list of questions
const QuestionsList = ({sid}) => {
    const { id }                                                        = useParams();
    const dispatch                                                      = useDispatch();
    const { endpoint }                                                  = constants;
    const [loading,setLoading]                                          = useState(true);
    const { DYNAMIC_ROUTE_SECTION_ID }                                  = useSelector( state => state.route );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }                     = useSelector( state => state.dashboard );
    const { USER }                                                      = useSelector( state => state.auth );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES  }                     = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST }                        = useSelector( state => state.ieltsLms );
    const [addQuestionModal,showAddQuestionModal]                       = useState(false);
    const [questions,setQuestions]                                      = useState([]);
    const [questionId,setQuestionId]                                    = useState(null);
    const [editQuestionModal,showEditQuestionModal]                     = useState(false);  
    const updateStates                                                  = (json = {}) => {
        const { permissions, states } = json;
        if( states.IELTS_LMS ) {
            dispatch(update_ielts_lms({
                ...permissions.IELTS_LMS
            }));
        }
        dispatch(update_dashboard({
            DASHBOARD_ROUTE_LOADING: false,
        }));
        setLoading(false);
    };

    // close add question modal
    const handleCloseAddQuestion = () => {
        showAddQuestionModal(false);
    };
    // close edit question modal
    const handleCloseEditQuestion = () => {
        showEditQuestionModal(false);
        setQuestionId(null);
        
    };
    // edit question
    const editQuestion = (id) => {
        if(id !== null){
            setQuestionId(id);
            showEditQuestionModal(true);
        }
    };



    // load hook
    useEffect(() => {
        
        if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.LOADED){
            if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.length > 0){
                const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.PASSAGES.find(item => item._id == sid);
                if(foundObject) {
                    if(DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU){
                        const { meta, restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;

                        if( restApi && restApi.enable ) {
                            setLoading(true);
                            dispatch(update_dashboard({
                                DASHBOARD_ROUTE_LOADING: true,
                            }));
                            getRequest(endpoint + restApi.getList + "/" +id+ "/"+sid, {
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
                            }).catch((err) => {});
                        }
                    } else {
                        
                    }
                } else {
                    
                }
            }  
        }
    },[IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES,DYNAMIC_ROUTE_SECTION_ID,sid]);

    // success
    useEffect(() => {
        if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST && IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.LOADED){
            
        } else {
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
            }));
            setLoading(true);
        }
    },[IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST]);


    return (<>
        {loading? <>
            loading
        </> : <>
            <div className="card mb-5 mb-xm-10">
                <div className="card-header cursor-pointer">
                    <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                        <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.TOTAL || 0})</h3>
                        <div className="d-flex align-items-center position-relative p-r">
                            <button className="btn btn-sm btn-primary" onClick={() => showAddQuestionModal(true)}> 
                                <i className="fa fa-plus"></i> Add Question
                            </button>
                        </div>
                    </div>
                </div>
                {/* begin::Content */}
                <div className="collapse show">
                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST && IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.LOADED && <>
                        {IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.length <= 0 && <>
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
                                        <button onClick={() => showAddQuestionModal(true)} className='btn btn-thin btn-light-primary' style={{maxWidth: "200px",fontSize: "12px", margin: '0 auto'}} type="button">
                                            <i className="fa fa-plus"></i> Add Question
                                        </button>    
                                    </div> 
                                </div>
                            </div>   
                        </>}

                        <div className="card-body border-top p-9">
                            <div className="py-2">
                                {IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.length > 0 && <>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.map((qus,index) => {
                                        const { title, order, status, _id } = qus;
                                        return (<React.Fragment key={index}>
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
                                                            <button onClick={() => {}} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                                <i className="fa fa-refresh"></i>
                                                            </button>
                                                            <button className="btn btn-sm btn-light-danger" type='button' style={{padding: '4px 10px !important'}}>
                                                                <i className="fa fa-trash"></i> Delete Permanent
                                                            </button>
                                                        </>}
                                                        {(status == "published" || status == "drafted") && <>
                                                            <button className="btn btn-sm btn-light-primary btn-icon btn-link" style={{marginRight: '10px'}} type='button' onClick={() => editQuestion(_id)}>
                                                                <i className="fa fa-pencil"></i>
                                                            </button>
                                                            <button onClick={() => {}} className="btn btn-sm btn-light-danger btn-icon btn-link mr-2" type='button'>
                                                                <i className="fa fa-trash-alt"></i>
                                                            </button>
                                                        </>}
                                                    </div>
                                                    
                                                    
                                                    
                                                    
                                                </div>
                                            </div>
                                            {index+1 < IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.length && <div className="separator separator-dashed my-5"></div>}
                                        </React.Fragment>)
                                    })}
                                </>}
                            </div>
                        </div>
                        
                    </>}
                </div>
            </div>
            {addQuestionModal? <AddQuestionModal addQuestionModal={addQuestionModal} handleCloseAddQuestion={handleCloseAddQuestion} /> : <></>}            
            {editQuestionModal? <EditQuestionModal editQuestionModal={editQuestionModal} handleCloseEditQuestion={handleCloseEditQuestion} questionId={questionId} /> : <></> }
        </>}
    </>);
};

const AddQuestionModal = ({addQuestionModal,handleCloseAddQuestion}) => { 
    const dispatch                       = useDispatch();                       
    const { WIDTH }                      = useSelector( state => state.theme );
    const [fullscreen,setFullscreen]     = useState(false);
    const [step,activeStep]              = useState(0);
    const { IELTS_LMS_QUESTION_TYPE }    = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SAMPLES } = useSelector( state => state.ieltsLms );

    useEffect(() => {
        if(WIDTH <= 700 ){
            setFullscreen(true);
        } else {
            setFullscreen(false);
        }
    },[WIDTH]);

    useEffect(() => {
        dispatch(update_ielts_lms({
            IELTS_LMS_QUESTION_MODE: 'create',
            IELTS_LMS_QUESTION_TYPE: 'none',
            IELTS_CURRENT_QUESTION_ID: null,
            ...IELTS_LMS_QUESTION_SAMPLES
        }));
    },[])
    
    return (<>
        <Modal
            size="lg"
            centered
            show={addQuestionModal}
            onHide={handleCloseAddQuestion}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
            className='question__components'
        >
        
            <div className="modal-header p-4">
                <h6 className='modal-title'>Add Listening Question</h6>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddQuestion}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            <div className="modal-body p-0">
                <div className="tab-container">
                    <ul className='tablist'>
                        
                        {IELTS_LMS_QUESTION_TYPE !== 'none' && <>
                        <li className={`tabs ${step === 0? 'tab-active' : ''}`} onClick={(event) => activeStep(0)}>Basic</li>
                        <li className={`tabs ${step === 1? 'tab-active' : ''}`} onClick={(event) => activeStep(1)}>Question</li>
                        <li className={`tabs ${step === 2? 'tab-active' : ''}`} onClick={(event) => activeStep(2)}>Explanation</li>
                        <li className={`tabs ${step === 3? 'tab-active' : ''}`} onClick={(event) => activeStep(3)}>Preview</li>
                        <li className={`tabs ${step === 4? 'tab-active' : ''}`} onClick={(event) => activeStep(4)}>Finish</li>
                        </>}
                    </ul>
                </div>
                <div className={"tab-content__box"}>
                    <QuestionTabContent tab={step} /> 
                </div>
            </div>
        </Modal> 
    </>);
};


const QuestionTabContent = ({tab}) => {
    const [tabs,setTabs] = useState([<QuestionBasic />,<QuestionMain />, <QuestionExplanation />, <QuestionPreview />, <VerifyQuestion />]);
    const [content,setContent] = useState(<>Loading...</>);
    useEffect(() => {
        if(tab < tabs.length){
            setContent(tabs[tab]);
            return;
        } else {
            setContent(<>Unknown tab content</>);
            return; 
        }
    },[tab]);
    return (<>{content}</>)
};

// step - 1
const QuestionBasic = () => {
    const dispatch                                                      = useDispatch();
    const { IELTS_LMS_QUESTION_TYPES }                                  = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_TYPE }                                   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_MATCHING_LISTENING }                     = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING }   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING }          = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING }      = useSelector( state => state.ieltsLms );
    
    // Find the selected option based on the TYPE value in Redux
    const selectedOption = IELTS_LMS_QUESTION_TYPES.find((type) => type.value === IELTS_LMS_QUESTION_TYPE);
    const selectedOptionQuestionLayout = IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUTS.find((layout) => layout.value === IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUT);
    const selectedOptionForSentenceCompletion = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUTS.find((layout) => layout.value === IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUT);
    
    
    const Option = (props) => (
        <components.Option {...props} className="question__types-option">
            {props.data.icon && <img src={props.data.icon} alt="logo" className="question__types-icon" />}
            {props.data.label}
        </components.Option>
    );
    
    const SingleValue = ({ children, ...props }) => (
        <components.SingleValue {...props}>
            {props.data.icon && <img src={props.data.icon} alt="s-logo" className="selected-logo question__types-icon" />}
            {props.data.label}
        </components.SingleValue>
    );

    
    const handleQuestionTypeChange = (selectedOption) => {
        const selectedValue = selectedOption.value; // Get the selected option's value
        dispatch(update_question_type(selectedValue));
    };

    const handleQuestionLayoutChange = (selectedOptionQuestionLayout) => {

        if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            const selectedValue = selectedOptionQuestionLayout.value; // Get the selected option's value
            dispatch(update_question_sentence_completion_listening({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS,
                    QUESTION_LAYOUT: selectedValue
                }
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            const selectedValue = selectedOptionQuestionLayout.value; // Get the selected option's value
            dispatch(update_question_plan_map_diagram_labelling_listening({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS,
                    QUESTION_LAYOUT: selectedValue
                }
            }));
        }
        
    };
    
    const changeNumberOfQuestions = (event) => {
        const { value } = event.target;
        const num = +value <= 0 ? 1 : +value;
        if(IELTS_LMS_QUESTION_TYPE === "matching"){

            // Create an array of explanations objects with preserved content
            const newExplanations = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
            });
        
            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS[i] };
            }
        
            dispatch(update_question_matching({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_MATCHING_LISTENING.QUESTION_SETTINGS,
                    NUMBER_OF_QUESTIONS: num,
                },
                EXPLANATIONS: newExplanations,
            }));

        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            // Create an array of explanations objects with preserved content
            const newExplanations = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
            });

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS[i] };
            }
        
            dispatch(update_question_plan_map_diagram_labelling_listening({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS,
                    NUMBER_OF_QUESTIONS: num,
                },
                EXPLANATIONS: newExplanations
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            //update_question_summary_form_completion
            const newQuestions = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
                ANSWER: '',
                OPTIONS: [{
                    HTML: '',
                    CORRECT: false
                }] 
            });

            // Create an array of explanations objects with preserved content
            const newExplanations = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
            });

        
            // Preserve the content from the existing questions
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS.length); i++) {
                newQuestions[i] = { ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[i] };
            }

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS[i] };
            }
        
            dispatch(update_question_sentence_completion_listening({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS,
                    NUMBER_OF_QUESTIONS: num,
                },
                EXPLANATIONS: newExplanations,
                QUESTIONS: newQuestions
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            //update_question_summary_form_completion
            const newQuestions = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
                ANSWER: '',
                OPTIONS: [{
                    HTML: '',
                    CORRECT: false
                }] 
            });

            // Create an array of explanations objects with preserved content
            const newExplanations = Array(num).fill({
                HTML: '',
                TEXT: '',
                HASHTML: true,
                HASTEXT: false,
            });

        
            // Preserve the content from the existing questions
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTIONS.length); i++) {
                newQuestions[i] = { ...IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTIONS[i] };
            }

            // Preserve the content from the existing explanations
            for (let i = 0; i < Math.min(num, IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS.length); i++) {
                newExplanations[i] = { ...IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS[i] };
            }
        
            dispatch(update_question_summary_form_completion_listening({
                QUESTION_SETTINGS: {
                    ...IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTION_SETTINGS,
                    NUMBER_OF_QUESTIONS: num,
                },
                EXPLANATIONS: newExplanations,
                QUESTIONS: newQuestions
            }));
        }
    };

    return (<>
        <div className="step-1 steps tab-step__padding mb-10">
            <div className="step__controller">
                <label htmlFor="question-type" className='required'>Question Type</label>
                <Select
                    id="question-type"
                    value={selectedOption}
                    options={IELTS_LMS_QUESTION_TYPES.filter(type =>  type.category === "listening")}
                    onChange={handleQuestionTypeChange}
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

        {IELTS_LMS_QUESTION_TYPE === "matching" && <>
            <div className="tab-step__seprator"></div> 
            <div className="step-2 steps tab-step__padding pt-0">
                <div className="row mb-4"> 
                    {/* number of questions in a group */}
                    <div className="col-sm-12 col-xs-12 mb-4">
                        <label htmlFor="number-of-questions" className='required'>Number of Questions</label>
                        <input 
                            type="number"
                            min="1"
                            id="number-of-questions" 
                            className="form-input form-control" 
                            value={IELTS_LMS_QUESTION_MATCHING_LISTENING.QUESTION_SETTINGS.NUMBER_OF_QUESTIONS}
                            onChange={changeNumberOfQuestions}
                        />    
                    </div>

                </div>
            </div>
        </>} 

        {IELTS_LMS_QUESTION_TYPE === "summary-form-completion" && <>
            <div className="tab-step__seprator"></div> 
            <div className="step-2 steps tab-step__padding pt-0">
                <div className="row mb-4"> 
                    {/* number of questions in a group */}
                    <div className="col-sm-12 col-xs-12 mb-4 col-md-12 mb-4">
                        <label htmlFor="number-of-questions" className='required'>Number of Questions</label>
                        <input 
                            type="number"
                            min="1"
                            id="number-of-questions" 
                            className="form-input form-control" 
                            value={IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTION_SETTINGS.NUMBER_OF_QUESTIONS}
                            onChange={changeNumberOfQuestions}
                        />    
                    </div>


                </div>
            </div>
        </>}

        {IELTS_LMS_QUESTION_TYPE === "sentence-completion" && <>
            <div className="tab-step__seprator"></div> 
            <div className="step-2 steps tab-step__padding pt-0">
                <div className="row mb-4"> 
                    {/* number of questions in a group */}
                    <div className="col-sm-12 col-xs-12 mb-4 col-md-6 mb-4">
                        <label htmlFor="number-of-questions" className='required'>Number of Questions</label>
                        <input 
                            type="number"
                            min="1"
                            id="number-of-questions" 
                            className="form-input form-control" 
                            value={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.NUMBER_OF_QUESTIONS}
                            onChange={changeNumberOfQuestions}
                        />    
                    </div>

                    <div className="mb-4 col-sm-12 col-xs-12 col-md-6 mb-4">
                        <label htmlFor="input-type" className='required'>Input Type</label>
                        <Select
                            id="input-type"
                            value={selectedOptionForSentenceCompletion}
                            options={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUTS}
                            onChange={handleQuestionLayoutChange}
                            styles={{
                                SingleValueLayout: (base) => ({
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
            </div>
        </>}

        {IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling" && <>
            <div className="tab-step__seprator"></div> 
            <div className="step-2 steps tab-step__padding pt-0">
                <div className="row mb-4"> 
                    {/* number of questions in a group */}
                    <div className="col-sm-12 col-xs-12 mb-4 col-md-6 mb-4">
                        <label htmlFor="number-of-questions" className='required'>Number of Questions</label>
                        <input 
                            type="number"
                            min="1"
                            id="number-of-questions" 
                            className="form-input form-control" 
                            value={IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS.NUMBER_OF_QUESTIONS}
                            onChange={changeNumberOfQuestions}
                        />    
                    </div>

                    <div className="mb-4 col-sm-12 col-xs-12 col-md-6 mb-4">
                        <label htmlFor="input-type" className='required'>Input Type</label>
                        <Select
                            id="input-type"
                            value={selectedOptionQuestionLayout}
                            options={IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUTS}
                            onChange={handleQuestionLayoutChange}
                            styles={{
                                SingleValueLayout: (base) => ({
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
            </div>
        </>}


    </>);
};


// step - 2 [types]
const QuestionMain = () => {
    const { IELTS_LMS_QUESTION_TYPE }            = useSelector( state => state.ieltsLms );
    return (<>
        {IELTS_LMS_QUESTION_TYPE === "matching" && <QuestionMainMatchingListening />}
        {IELTS_LMS_QUESTION_TYPE === "summary-form-completion" && <QuestionMainSummaryFormCompletion />}
        {IELTS_LMS_QUESTION_TYPE === "sentence-completion" && <QuestionMainSentenceCompletion />}
        {IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling" && <QuestionMainPlanMapDiagramLabelling />}
    </>);
};

// step - 3 [types]
const QuestionExplanation = () => {
    const dispatch                                                      = useDispatch();
    const { IELTS_LMS_QUESTION_TYPE }                                   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_MATCHING_LISTENING }                     = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING }   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING }          = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING }      = useSelector( state => state.ieltsLms );

    const updateExplanationHTML = (targetKey, newHTML) => {
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            dispatch(update_question_matching_explanation({
                index: targetKey,
                html: newHTML
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            dispatch(update_question_summary_form_completion_explanation_listening({
                index: targetKey,
                html: newHTML
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            dispatch(update_question_sentence_completion_explanation_listening({
                index: targetKey,
                html: newHTML
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            dispatch(update_question_plan_map_diagram_labelling_explanation_listening({
                index: targetKey,
                html: newHTML
            }));
        }
    };

    return (<div style={{background: '#d8f3fb'}}>
        <div className="step-1 steps tab-step__padding pb-10 tiny-css-0">
            <div className="step__controller row">

                {IELTS_LMS_QUESTION_TYPE === "matching" && <>
                    {IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS && IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS.length > 0 && <>
                    {IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS.map((explaination,index) => {
                        const { HTML } = explaination;
                        return (<div key={index} className="col-md-12 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header collapsible cursor-pointer rotate d-flex align-items-center" style={{minHeight: '40px'}}>
                                    <label htmlFor={`explanation-${index}`} className='required'>{index+1}. Explaination</label>
                                    <div className="card-toolbar rotate-180">
                                        <i className="ki-duotone ki-down fs-1"></i>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body p-0" id={`explanation-${index}`}>
                                        <LoadEditorLight height={100} key={index} toolbar='' html={HTML} setHtml={(html) => updateExplanationHTML(index,html)} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                    </>}
                </>}

                {IELTS_LMS_QUESTION_TYPE === "summary-form-completion" && <>
                    {IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS && IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS.length > 0 && <>
                    {IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS.map((explaination,index) => {
                        const { HTML } = explaination;
                        return (<div key={index} className="col-md-12 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header collapsible cursor-pointer rotate d-flex align-items-center" style={{minHeight: '40px'}}>
                                    <label htmlFor={`explanation-${index}`} className='required'>{index+1}. Explaination</label>
                                    <div className="card-toolbar rotate-180">
                                        <i className="ki-duotone ki-down fs-1"></i>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body p-0" id={`explanation-${index}`}>
                                        <LoadEditorLight height={100} key={index} toolbar='' html={HTML} setHtml={(html) => updateExplanationHTML(index,html)} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                    </>}
                </>}

                {IELTS_LMS_QUESTION_TYPE === "sentence-completion" && <>
                    {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS.length > 0 && <>
                    {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS.map((explaination,index) => {
                        const { HTML } = explaination;
                        return (<div key={index} className="col-md-12 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header collapsible cursor-pointer rotate d-flex align-items-center" style={{minHeight: '40px'}}>
                                    <label htmlFor={`explanation-${index}`} className='required'>{index+1}. Explaination</label>
                                    <div className="card-toolbar rotate-180">
                                        <i className="ki-duotone ki-down fs-1"></i>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body p-0" id={`explanation-${index}`}>
                                        <LoadEditorLight height={100} key={index} toolbar='' html={HTML} setHtml={(html) => updateExplanationHTML(index,html)} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                    </>}
                </>}    

                {IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling" && <>
                    {IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS && IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS.length > 0 && <>
                    {IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS.map((explaination,index) => {
                        const { HTML } = explaination;
                        return (<div key={index} className="col-md-12 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header collapsible cursor-pointer rotate d-flex align-items-center" style={{minHeight: '40px'}}>
                                    <label htmlFor={`explanation-${index}`} className='required'>{index+1}. Explaination</label>
                                    <div className="card-toolbar rotate-180">
                                        <i className="ki-duotone ki-down fs-1"></i>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body p-0" id={`explanation-${index}`}>
                                        <LoadEditorLight height={100} key={index} toolbar='' html={HTML} setHtml={(html) => updateExplanationHTML(index,html)} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                    </>}
                </>} 

                
            </div>
        </div> 

    </div>);
};

// question preview
const QuestionPreview = () => {
    const { IELTS_LMS_QUESTION_TYPE }                                   = useSelector((state) => state.ieltsLms);
    const { IELTS_LMS_QUESTION_MATCHING_LISTENING }                     = useSelector((state) => state.ieltsLms);
    const { IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING }      = useSelector((state) => state.ieltsLms);
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING }          = useSelector((state) => state.ieltsLms);
    const { IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING }   = useSelector( state => state.ieltsLms );
    const [modal, setModal]                                             = useState("preview");
    const [quizPreviewHtml, setQuizPreviewHtml]                         = useState('');
    const [total,setTotal]                                              = useState(0);
    

    const replaceCurlyBracketsWithSelect = (html, answerOptions, numberOfQuestions, numberOfOptions) => {
        let num = 0;
        return html.replace(/\{[^{}]+\}/g, (match, index) => {
            if (numberOfQuestions > 0) {
                
                const innerText = match.substring(1, match.length - 1);
                const matchingOption = answerOptions.includes(innerText); 
                if( matchingOption ){
                    numberOfQuestions--;
                    num++;

                    const selectOptions = answerOptions.slice(0, numberOfOptions).map((option,index) => (
                        `<option key="${index}" value="${option}">${option}</option>`
                    )).join('');

                    return `<select 
                                value="" 
                                data-q_type="${IELTS_LMS_QUESTION_TYPE}"
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
        let explanations = [];
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            explanations = IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS;
        }



        const regex = /\{([^{}]+)\}/g;
        const matches = html.match(regex);
        let explanationHtml = '';

        if (matches) {
            matches.map((match, index) => {
                const innerText = match.substring(1, match.length - 1);
                const matchingOption = answerOptions.includes(innerText);
                let explanation = "";
                if(explanations && explanations.length > 0){
                    if(explanations[index]){
                        const { HTML } = explanations[index];
                        explanation = `
                            <div class="sl-item explanation" key="${index}">
                                <div class="sl-control"> 
                                    <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${index}" href="javascript:void(0)" aria-expanded="true"> 
                                        <span class="icon-explain"></span> Explain 
                                    </a> 
                                </div>
                                <div id="col-${index}" class="collapse in" aria-expanded="true" style="">
                                    <!-- Your explanation text here -->
                                    ${HTML}
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
        console.info(answers);
        Object.keys(answers).forEach(questionNumber => {
            const { num, answer, q_type } = answers[questionNumber];
            // Access properties of the answer object
            if(document.querySelector(`[data-num='${num}']`)){
                document.querySelector(`[data-num='${num}']`).value = `${answer}`;
                console.log('value changed  to',answer);
            }
        });        
    };

    const handleInput = (event) => {
        if(!document.querySelector('.result-mode')){
            console.log('changing input');
            const { dataset, value, id }        = event.target;
            const { q_type, input_type, num }  = dataset;
            answers[num] = {
                num: num,
                answer: value,
                q_type: q_type,
                input_type: input_type,
                q_id: '',
                classes: value? 'attempted': 'not-attempted'
            };

            
            localStorage.setItem('answers', JSON.stringify(window.answers));
        }

    };

    // radio type
    const radioTypeQuestions = (question = {}, questions = [], explanations = []) => {
        let html            = ''; 
        let num             = 0;
        let explanationHtml = '';
        let questionText    = '';

        if(question && question.HTML){
            questionText = question.HTML;
        }


        if( questions.length > 0  && questions.length === explanations.length){
            questions.forEach((qus,index) => {
                const { HTML, OPTIONS } = qus;
                if(HTML){
                    num++;
                    let answers = '';
                    let correctAnswer   = '';
                    if(OPTIONS.length > 0){
                        OPTIONS.forEach((op,oindex) => {
                            if(op.CORRECT){
                                correctAnswer = (oindex+1);
                            }
                            answers += `<div class="test-panel__answer-item">
                                <div class="test-panel__answer-option">${oindex+1}</div>
                                <label for="radio-${num}-${oindex+1}" class="iot-radio">
                                    <input type="radio" class="radio-iot iot-lr-question" name="q-${num}" data-num="${num}" value="${oindex+1}" id="radio-${num}-${oindex+1}" placeholder="">
                                    ${op.HTML}
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
                                    ${explanations[index]}
                                </div>
                            </div>
                        </li>
                    `;
                    
                    if(modal == "preview"){
                        html += `
                            <div class="test-panel__question-sm-group">
                                <div class="test-panel__question-sm-title">${HTML}</div>
                                <div class="test-panel__answer">${answers}</div>
                            </div>
                        `;
                    } else if(modal == "result-preview"){
                        html += `
                            <div class="test-panel__question-sm-group">
                                <div class="test-panel__question-sm-title">${HTML}</div>
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
            ${html}
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
                            data-q_type="${IELTS_LMS_QUESTION_TYPE}"
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
                const innerText     = match.substring(1, match.length - 1);
                const answersArray  = innerText.split('|').map(item => item.trim());
                const answersText   = answersArray.join(' <b style="color:#100f0f;"> | </b> ');
                let explanation = "";
                if(explanations[num-1]){
                    const { HTML } = explanations[num-1];
                    explanation = `
                        <div class="sl-item explanation" key="${num}">
                            <div class="sl-control"> 
                                <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${num}" href="javascript:void(0)" aria-expanded="true"> 
                                    <span class="icon-explain"></span> Explain 
                                </a> 
                            </div>
                            <div id="col-${num}" class="collapse in" aria-expanded="true" style="">
                                <!-- Your explanation text here -->
                                ${HTML}
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



    useEffect(() => {
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            const { ANSWER_SETTINGS, QUESTION, QUESTION_SETTINGS } = IELTS_LMS_QUESTION_MATCHING_LISTENING;
            const answerType = ANSWER_SETTINGS.ANSWER_TYPE;
            const answerOptions = ANSWER_SETTINGS.ANSWER_TYPES[answerType] || [];
            const numberOfQuestions = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
            const numberOfOptions = ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1;

            const updatedHtml           = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions);
            const updateHtmlWithResult  = createExplanations(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions);
            setTotal(numberOfQuestions);

            if(modal == "result-preview"){
                setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                    <div class="test-panel__answers-wrap">
                        ${updatedHtml}
                    </div>
                    <div class="test-panel__answers-wrap">
                        ${updateHtmlWithResult}
                    </div>
                </div>`);
            } else if(modal == "preview"){
                setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                    <div class="test-panel__answers-wrap">
                        ${updatedHtml}
                    </div>
                </div>`);
            }

        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            const { QUESTION, QUESTIONS, QUESTION_SETTINGS, EXPLANATIONS } = IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING;
            const numberOfQuestions      = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
            if(QUESTION_SETTINGS.QUESTION_LAYOUT == "fillup"){
                const updatedHtml            = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions);
                const updatedExplanation     = replaceCurlyBracketsWithTextInputExplanations(QUESTION.HTML, numberOfQuestions, EXPLANATIONS);   
                setTotal(numberOfQuestions);
                if(modal === "preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                    `);
                } else if(modal === "result-preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                        <ul style="margin-top:20px;margin-bottom:20px;">
                        ${updatedExplanation}
                        </ul>
                    `);
                }
                
            }

        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            const { QUESTION, QUESTIONS, QUESTION_SETTINGS, EXPLANATIONS, ANSWER_SETTINGS } = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING;
            const numberOfQuestions         = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
            const answerType                = ANSWER_SETTINGS.ANSWER_TYPE;
            const answerOptions             = ANSWER_SETTINGS.ANSWER_TYPES[answerType] || [];
            const numberOfOptions           = ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1;

            if(QUESTION_SETTINGS.QUESTION_LAYOUT == "radio"){
                const updatedHtml            = radioTypeQuestions(QUESTION, QUESTIONS,EXPLANATIONS);
                setQuizPreviewHtml(updatedHtml);
                setTotal(numberOfQuestions);
            } else if(QUESTION_SETTINGS.QUESTION_LAYOUT == "fillup"){
                const updatedHtml            = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions);
                const updatedExplanation     = replaceCurlyBracketsWithTextInputExplanations(QUESTION.HTML, numberOfQuestions, EXPLANATIONS);   
                setTotal(numberOfQuestions);
                if(modal === "preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                    `);
                } else if(modal === "result-preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                        <ul style="margin-top:20px;margin-bottom:20px;">
                        ${updatedExplanation}
                        </ul>
                    `);
                }
                
            }

        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            const { QUESTION, QUESTION_SETTINGS, EXPLANATIONS, ANSWER_SETTINGS } = IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING;
            const numberOfQuestions         = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
            const answerType                = ANSWER_SETTINGS.ANSWER_TYPE;
            const answerOptions             = ANSWER_SETTINGS.ANSWER_TYPES[answerType] || [];
            const numberOfOptions           = ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1;

            if(QUESTION_SETTINGS.QUESTION_LAYOUT == "fillup"){
                const updatedHtml            = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions);
                const updatedExplanation     = replaceCurlyBracketsWithTextInputExplanations(QUESTION.HTML, numberOfQuestions, EXPLANATIONS);   
                setTotal(numberOfQuestions);
                if(modal === "preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                    `);
                } else if(modal === "result-preview"){
                    setQuizPreviewHtml(`
                        <div class="test-panel__answer">
                            <div class="ckeditor-wrapper">${updatedHtml}</div>
                        </div>
                        <ul style="margin-top:20px;margin-bottom:20px;">
                        ${updatedExplanation}
                        </ul>
                    `);
                }
                
            }  else if(QUESTION_SETTINGS.QUESTION_LAYOUT == "select"){
                const updatedHtml           = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions);
                const updateHtmlWithResult  = createExplanations(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions);
                if(modal == "result-preview"){
                    setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`);
                } else if(modal == "preview"){
                    setQuizPreviewHtml(`<div class="question test-panel__item" style="width:100%;">
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`);
                }
                setTotal(numberOfQuestions);
            }
        }
    }, [IELTS_LMS_QUESTION_TYPE,modal]);

    useEffect(() => {
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
    },[]);

    useEffect(() => {
        
        if(localStorage.getItem('answers')){
            let answers         = localStorage.getItem('answers');
            let answersObjs     = JSON.parse(answers);
            loadAnswers(answersObjs);
        }
        
    },[modal]);

    return (<>
        <>
            <div className={`reading-result reading-test take-test iot-font-global ${modal == "result-preview"? 'review-explanation result-mode' : ''}`}>
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
                                {total > 0 && Array(total).fill(null).map((o,index) => {
                                    return (<span key={index} className="question-palette__item" data-num={index+1}>{index+1}</span>)
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
        </>

    </>);
};

const VerifyQuestion = () => {

    const { endpoint }                                                  = constants;
    const { id }                                                        = useParams();
    const dispatch                                                      = useDispatch();
    const { USER }                                                      = useSelector( (state) => state.auth );
    const { IELTS_LMS_QUESTION_TYPE }                                   = useSelector( (state) => state.ieltsLms );
    const { IELTS_LMS_QUESTION_MATCHING_LISTENING }                     = useSelector( (state) => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING }      = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING }          = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING }   = useSelector( state => state.ieltsLms ); 
    const { IELTS_LMS_QUESTION_MODE }                                   = useSelector( state => state.ieltsLms );   
    const { IELTS_CURRENT_QUESTION_ID }                                 = useSelector( state => state.ieltsLms ); 
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST }                        = useSelector( state => state.ieltsLms ); 
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }                     = useSelector( (state) => state.dashboard );
    const { DYNAMIC_ROUTE_SECTION_ID }                                  = useSelector( state => state.route ); 
    const [title,setTitle]                                              = useState("Unnamed question");
    const [order,setOrder]                                              = useState(0);
    const [processing,setProcessing]                                    = useState(false);

    const updateStatesCreate = (response) => {
        
        if(response.success){
            if(response.has_json){
                const { insert, data } = response.json;
                if( insert ){
                    dispatch(update_ielts_lms({
                        IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST:{
                            ...IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST,
                            QUESTIONS: [
                                ...IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS,
                                {
                                    ...data
                                }
                            ]
                        }
                    }));
                } else {

                }
            }
        }
    };

    const updateStatesEdit = (response, question) => {
        
        if(response.success){
            if(response.has_json){
                const { update, data } = response.json;
                if( update ){
                    let currentQuestion = IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.filter( qus => IELTS_CURRENT_QUESTION_ID === qus._id );
                    if (currentQuestion.length > 0) {
                        // Get the index of the first matching element
                        let indexOfCurrentQuestion = IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS.indexOf(currentQuestion[0]);
                        let qus = {
                            order: question.order,
                            status: question.status,
                            title: question.TITLE,
                            _id: IELTS_CURRENT_QUESTION_ID
                        };
                        
                        dispatch(ielts_lms_update_question_by_index({
                            index: indexOfCurrentQuestion,
                            question:  qus
                        }));
                    } else {
                        console.log('question not found');
                    }
                } else {

                }
            }
        }
    }

    const changeQuestionTitle = (title) => {
        setTitle(title);
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            dispatch(update_question_matching({
                TITLE: title
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            dispatch(update_question_plan_map_diagram_labelling_listening({
                TITLE: title
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            dispatch(update_question_sentence_completion_listening({
                TITLE: title
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            dispatch(update_question_summary_form_completion_listening({
                TITLE: title
            }));
        }
    };

    const changeQuestionOrder = (order) => {
        setOrder(order);
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            dispatch(update_question_matching({
                order: order
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            dispatch(update_question_plan_map_diagram_labelling_listening({
                order: order
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            dispatch(update_question_sentence_completion_listening({
                order: order
            }));
        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            dispatch(update_question_summary_form_completion_listening({
                order: order
            }));
        }
    };

    const validateQuestion = () => {
        let create = false;
        let question = null;
        if(IELTS_LMS_QUESTION_TYPE !== "none"){

            if(IELTS_LMS_QUESTION_TYPE === "matching"){
                create = true;
                question = IELTS_LMS_QUESTION_MATCHING_LISTENING;
            } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
                create = true;
                question = IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING;
            } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
                create = true;
                question = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING;
            } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
                create = true;
                question = IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING;
            }
        }

        if(create){
            const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
            if( restApi && restApi.enable ) {
                if(IELTS_LMS_QUESTION_MODE === "create"){
                    setProcessing(true);
                    postRequest(endpoint+restApi.postInsert+"/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID, {
                        'Authorization': 'Bearer '+USER.accessToken,
                        'x-refresh-token': USER.refreshToken,
                        'x-api-token': ''
                    },{
                        insert: true,
                        question: question
                    }).then((response) => {
                        updateStatesCreate(response);
                    }).catch((err) => {}).catch((err) => {}).finally(() => {
                        setTimeout(() => {
                            setProcessing(false);
                        },1000);
                        
                    });
                } else if(IELTS_LMS_QUESTION_MODE === "edit" && IELTS_CURRENT_QUESTION_ID !== null){
                    setProcessing(true);
                    postRequest(endpoint+restApi.postEdit+"/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID+"/"+IELTS_CURRENT_QUESTION_ID, {
                        'Authorization': 'Bearer '+USER.accessToken,
                        'x-refresh-token': USER.refreshToken,
                        'x-api-token': ''
                    },{
                        update: true,
                        question: question
                    }).then((response) => {
                        updateStatesEdit(response,question);
                    }).catch((err) => {}).catch((err) => {}).finally(() => {
                        setTimeout(() => {
                            setProcessing(false);
                        },1000);
                        
                    });
                }
            }
        }
    };


    useEffect(() => {
        if(IELTS_LMS_QUESTION_TYPE === "matching"){
            setTitle(IELTS_LMS_QUESTION_MATCHING_LISTENING.TITLE);
            setOrder(IELTS_LMS_QUESTION_MATCHING_LISTENING.order);
        } else if(IELTS_LMS_QUESTION_TYPE === "plan-map-diagram-labelling"){
            setTitle(IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.TITLE);
            setOrder(IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.order);
        } else if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            setTitle(IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.TITLE);
            setOrder(IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.order);
        } else if(IELTS_LMS_QUESTION_TYPE === "summary-form-completion"){
            setTitle(IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.TITLE);
            setOrder(IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.order);
        }
    },[IELTS_LMS_QUESTION_TYPE]);

    return (<>
        <div className="step-1 steps tab-step__padding mb-10">
            <div className="step__controller row">
                
                <div className="col-12">
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="title"
                            type="text"
                            placeholder="Question title"
                            value={title}
                            onChange={(event) => changeQuestionTitle(event.target.value)}
                        />
                        <label className='required' htmlFor="title">Question title</label>
                    </Form.Floating>
                    {IELTS_LMS_QUESTION_MODE === "edit" &&
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="order"
                            type="number"
                            placeholder="Question order"
                            value={order}
                            onChange={(event) => changeQuestionOrder(event.target.value)}
                        />
                        <label className='required' htmlFor="order">Question order</label>
                    </Form.Floating>}
                    
                </div>
                <div className="col-12 d-flex flex-column ">
                    <button className={`btn btn-light-primary ${processing? 'btn-disabled btn-loading' : ''}`} type='button' onClick={validateQuestion} disabled={processing}>
                        {processing? <>
                            <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> 
                            {IELTS_LMS_QUESTION_MODE === "create" && ' Creating...'}
                            {IELTS_LMS_QUESTION_MODE === "edit" && ' Saving...'}
                        </> : <>
                            {IELTS_LMS_QUESTION_MODE === "create" && 'Create Question'}
                            {IELTS_LMS_QUESTION_MODE === "edit" && 'Save changes'}
                        </>} 
                    </button>
                </div>
                
            </div>
        </div>
    </>);
};



const EditQuestionModal = ({questionId,editQuestionModal,handleCloseEditQuestion}) => { 
    const { endpoint }                                          = constants;
    const { id }                                                = useParams();
    const toolbar                                               = ``;
    const dispatch                                              = useDispatch();
    const { USER }                                              = useSelector( state => state.auth );
    const { WIDTH }                                             = useSelector( state => state.theme );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard ); 
    const { IELTS_LMS_QUESTION_TYPE }                           = useSelector( state => state.ieltsLms );
    const { DYNAMIC_ROUTE_SECTION_ID }                          = useSelector( state => state.route ); 
    const [step,activeStep]                                     = useState(0);
    const [fullscreen,setFullscreen]                            = useState(false);
    const [loading,setLoading]                                  = useState(true);

    const loadData = (data = {}) => {
        if(data.TYPE === "matching"){
            dispatch(update_ielts_lms({
                IELTS_LMS_QUESTION_MATCHING_LISTENING: data,
                IELTS_LMS_QUESTION_TYPE: 'matching',
                IELTS_LMS_QUESTION_MODE: 'edit',
                IELTS_CURRENT_QUESTION_ID: questionId
            }));
            setLoading(false);
        } else if(data.TYPE === "plan-map-diagram-labelling"){
            dispatch(update_ielts_lms({
                IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING: data,
                IELTS_LMS_QUESTION_TYPE: 'plan-map-diagram-labelling',
                IELTS_LMS_QUESTION_MODE: 'edit',
                IELTS_CURRENT_QUESTION_ID: questionId
            }));
            setLoading(false);
        } else if(data.TYPE === "sentence-completion"){
            dispatch(update_ielts_lms({
                IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING: data,
                IELTS_LMS_QUESTION_TYPE: 'sentence-completion',
                IELTS_LMS_QUESTION_MODE: 'edit',
                IELTS_CURRENT_QUESTION_ID: questionId
            }));
            setLoading(false);
        } else if(data.TYPE === "summary-form-completion"){
            dispatch(update_ielts_lms({
                IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING: data,
                IELTS_LMS_QUESTION_TYPE: 'summary-form-completion',
                IELTS_LMS_QUESTION_MODE: 'edit',
                IELTS_CURRENT_QUESTION_ID: questionId
            }));
            setLoading(false);
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
        const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
        if( restApi && restApi.enable ){
            postRequest(endpoint+restApi.getEdit+"/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID+"/"+questionId, {
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken,
                'x-api-token': ''
            },{
                where: {
                    _id: questionId,
                    _quizId: id,
                    _sectionId: DYNAMIC_ROUTE_SECTION_ID
                },
                format: {
                    TITLE: true,
                    CATEGORY: true,
                    TYPE: true,
                    QUESTION: true,
                    EXPLANATIONS: true,
                    ANSWER_SETTINGS: true,
                    QUESTION_SETTINGS: true,
                    QUESTIONS: true,
                    order: true,
                    status: true
                }
            }).then((response) => {
                const { success, has_json, json, error, res } = response;
                if( success && has_json && !error ) {
                    if( json.get ) {
                        loadData(json.data);
                    } else {
                        console.warn(`[warning]: ${res}`);
                    }
                } else {
                    console.warn(`[warning]: ${res}`);
                }
            }).catch(err => {
                console.warn('[ERROR]: ',err);
            }).finally(() => {
                
            });  
        }
    },[questionId]);
    
    return (<>
        <Modal
            size="lg"
            centered
            show={editQuestionModal}
            onHide={handleCloseEditQuestion}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
            className='question__components'
        >
            <div className="modal-header p-4">
                <h6 className='modal-title'>Edit Reading Question</h6>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseEditQuestion}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            {loading? <>
            
            
            </>: <>
            <div className="modal-body p-0">
                <div className="tab-container">
                    <ul className='tablist'>
                        
                        {IELTS_LMS_QUESTION_TYPE !== 'none' && <>
                        <li className={`tabs ${step === 0? 'tab-active' : ''}`} onClick={(event) => activeStep(0)}>Basic</li>
                        <li className={`tabs ${step === 1? 'tab-active' : ''}`} onClick={(event) => activeStep(1)}>Question</li>
                        <li className={`tabs ${step === 2? 'tab-active' : ''}`} onClick={(event) => activeStep(2)}>Explanation</li>
                        <li className={`tabs ${step === 3? 'tab-active' : ''}`} onClick={(event) => activeStep(3)}>Preview</li>
                        <li className={`tabs ${step === 4? 'tab-active' : ''}`} onClick={(event) => activeStep(4)}>Finish</li>
                        </>}
                    </ul>
                </div>
                <div className={"tab-content__box"}>
                    <QuestionTabContent tab={step} /> 
                </div>
            </div>
            </>}

        </Modal> 
    </>);
};








export { IeltsLmsEditQuizListeningPassages, IeltsLmsEditQuizListeningQuestions };