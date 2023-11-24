import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { update_route } from '../../../../includes/redux-store/Slices/Route.slice';
import { update_dashboard } from '../../../../includes/redux-store/Slices/Dashboard.slice';
import { 
    IeltsLmsEditQuizEssayListSkeleton, 
    IeltsLmsEditQuizWritingEditEssaySkeleton,
    IeltsLmsEditQuizSpeakingEditQuestionSkeleton 
} from '../../../../components/default/Skeletons';
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


const IeltsLmsEditQuizSpeakingSection = () => {

    const routeParent               = "ielts-lms";
    const routeChild                = "ielts-lms-edit-quiz";
    
    const { id }                                                        = useParams();
    const { endpoint }                                                  = constants;
    const dispatch                                                      = useDispatch();
    const { USER }                                                      = useSelector( state => state.auth );
    const { PARAM3, PARAM4 }                                            = useSelector( state => state.route);

    const { DASHBOARD_SUBMENUS }                                        = useSelector( state => state.dashboard );
    const { DASHBOARD_DYNAMIC_MENU, DASHBOARD_DYNAMIC_MENU_LOADING }    = useSelector( state => state.dashboard );

    const { IELTS_LMS_OVERALL }                                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS }                              = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES }                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES }            = useSelector( state => state.ieltsLms );

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
                        if(!IELTS_LMS_EDIT_QUIZ_SECTIONS && !IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES && !IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES){
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
            IELTS_LMS_EDIT_QUIZ_SECTIONS &&
            IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES &&
            IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES
        ){
            if(
                IELTS_LMS_EDIT_QUIZ.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.LOADED
            ){             
                if(PARAM3 === "ielts-lms-edit-quiz-speaking-sections"){
                    
                    if(PARAM4 === "ielts-lms-edit-quiz-speaking-section-list"){
                        dispatch(update_dashboard({
                            DASHBOARD_ROUTE_LOADING: true,
                        }));
                        setContext(<IeltsLmsEditQuizSpeakingSectionsList />);
                        return;
                    } else {
                        dispatch(update_route({
                            PARAM4: 'ielts-lms-edit-quiz-speaking-section-list'
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
        IELTS_LMS_EDIT_QUIZ_SECTIONS, 
        IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES,
        IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES,
        PARAM3, 
        PARAM4
    ]);

    return (<>{context}</>);
};

// list of speaking sections
const IeltsLmsEditQuizSpeakingSectionsList = () => {
    const { id }                                                = useParams();
    const { endpoint }                                          = constants;
    const dispatch                                              = useDispatch();
    const [loading,setLoading]                                  = useState(true);
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );
    const { USER }                                              = useSelector( state => state.auth );
    const { IELTS_LMS_OVERALL }                                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                               = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS }                      = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST }                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES }               = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES }    = useSelector( state => state.ieltsLms );
    const [showAddSection,setShowAddSection]                    = useState(false);
    const [showEditSection,setShowEditSection]                  = useState(false);
    const [refresh,setRefresh]                                  = useState(1);
    const [sectionId,setSectionId]                              = useState(null);
    const [searchParam,setSearchParams]                         = useState("");
    const [searching,setSearching]                              = useState(false);
    const [showQuestions,setShowQuestions]                      = useState(false);
    const handleRefresh = ()                                    => setRefresh(refresh+1);
    const handleCloseAddSection = ()                            => {
        setShowAddSection(false);
        setShowEditSection(false);
        setSectionId(null);
    };
    const handleCloseEditSection = ()                           => {
        setShowAddSection(false);
        setShowEditSection(false);
        setSectionId(null);
        
    };
    const editSection = (id = null)                               => {
        if(id !== null){
            setSectionId(id);
            setShowAddSection(false);
            setShowEditSection(true);
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

    // find section
    const findSection = () => {
        if(searchParam.length > 0){
            // search by name
            reloadSections({ currentPage: 1 },{},{
                status: true,
                query: searchParam
            });
        } else {
            reloadSections({
                currentPage: 1
            },{ });
        }
    };

    const filterByStatus = (event) => {
        dispatch(update_ielts_lms({
            IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES:{
                ...IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES,
                SELECTED_STATUS_FILTER: event.target.value
            }
        }));
        reloadSections({},{
            status: event.target.value
        });
    };

    // get list of sections
    const reloadSections = (pagination = {}, where = {}, search = {}) => {
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
                        perPage: IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.PER_PAGE,
                        currentPage: IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.CURRENT_PAGE,
                        ...pagination
                    },
                    where: {
                        status: IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SELECTED_STATUS_FILTER,
                        _category: 'speaking',
                        _postType: 'speaking-section',
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

    // back to sections
    const backToSections = () => {
        setShowQuestions(false);
        setSectionId(null);
    };
    // get questions
    const getQuestions = (sid) => {
        dispatch(update_route({
            DYNAMIC_ROUTE_SECTION_ID: sid,
            PARAM3: 'ielts-lms-edit-quiz-speaking-questions'
        }));
        setShowQuestions(true);
    };

    // load hook
    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ.LOADED &&
            IELTS_LMS_EDIT_QUIZ_SECTIONS && IELTS_LMS_EDIT_QUIZ_SECTIONS.LOADED
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
                            perPage: IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.PER_PAGE,
                            currentPage: IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.CURRENT_PAGE
                        },
                        where: {
                            status: IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SELECTED_STATUS_FILTER,
                            _category: 'speaking',
                            _postType: 'speaking-section'
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
        
    },[IELTS_LMS_OVERALL,IELTS_LMS_EDIT_QUIZ, IELTS_LMS_EDIT_QUIZ_SECTIONS,refresh]);
    
    // success hook
    useEffect(() => {
        if(
            IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST &&
            IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES &&
            IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES && 
            IELTS_LMS_EDIT_QUIZ_SECTIONS
        ){

            if(
                IELTS_LMS_EDIT_QUIZ_SECTIONS.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.LOADED
            ){             
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: false,
                }));
                setLoading(false); 
                
            }
        }
    },[
        IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST,
        IELTS_LMS_EDIT_QUIZ_SECTIONS_PAGINATION_STATES,
        IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES,
        IELTS_LMS_EDIT_QUIZ_SECTIONS
    ]);

    return (<>
        {loading? <IeltsLmsEditQuizEssayListSkeleton /> : <>
            
        
        <div className="card mb-0 bg-transparent" style={{boxShadow: '0 0 0 '}}>
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer bg-transparent">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">List of Speaking sections</h3>
                </div>
                <div className="card-toolbar">
                    <button className={"btn btn-sm btn-primary btn-sm"} onClick={() => setShowAddSection(true)}> 
                        <i className="fa fa-plus"></i> Add Section
                    </button>
                </div>
            </div>
            {/* end::Card header */}
        </div>
        <div className="card mb-5 mb-xm-10">
            <div className="card-header cursor-pointer">

                <div className="d-flex flex-wrap align-items-center my-1">
                    <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.TOTAL || 0})</h3>
                    <div className="d-flex align-items-center position-relative">
                        {(IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES && IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.STATUS_FILTERS && IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.STATUS_FILTERS.length > 0) &&               
                        <select disabled={searching} onChange={filterByStatus} className='form-select form-select-solid form-select-sm w-150px me-5' value={IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.SELECTED_STATUS_FILTER}>
                            {IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES.STATUS_FILTERS.map((filter,index) => {
                                return <option key={index} value={filter.key}>{filter.value}</option>
                            })}
                        </select>}                 
                    </div>
                    

                </div>



                {/* BEGIN::search filter input */}
                <div className="d-flex align-items-center position-relative">               
                    <div className="input-group input-group-sm">
                        <input type="text" disabled={searching} value={searchParam} className="form-control w-250px mr-2" placeholder="Search Quiz" onChange={(event) => setSearchParams(event.target.value)} aria-describedby="basic-addon2" />
                                
                        <button disabled={searching} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button" onClick={findSection}>
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
                            IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST && 
                            IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.LOADED && 
                            IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.SECTIONS && <>
                            
                            {/* begin::Item */}
                            {IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.SECTIONS.length > 0 && IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.SECTIONS.map((section,index) => {
                                return (<React.Fragment key={index}>
                                    <div className="d-flex flex-stack">
                                        <div className="d-flex">
                                            
                                            <img className="w-40px h-40px me-6" src={"/img/speaking/section/list.png"} alt="" />
                                            <div className="d-flex flex-column">
                                                
                                                <div className="fs-5 text-dark text-hover-primary fw-bold">
                                                    {section.title}
                                                </div>
                                                <div className="fs-6 fw-semibold text-gray-400 d-flex flex-row justify-content-left">
                                                    <span>Order: {section.order}</span>
                                                    <span style={{marginLeft: '10px'}}>Questions: {10}</span>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column justify-content-evenly">
                                            <div className="d-flex flex-row justify-content-evenly mb-2">
                                                {section.status == "trashed" && <>
                                                    <button onClick={() => {}} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                        <i className="fa fa-refresh"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-light-danger" type='button' style={{padding: '4px 10px !important'}}>
                                                        <i className="fa fa-trash"></i> Delete Permanent
                                                    </button>
                                                </>}
                                                {(section.status == "published" || section.status == "drafted") && <>
                                                    <button onClick={() => editSection(section._id)} className="btn btn-sm btn-light-primary btn-icon btn-link" style={{marginRight: '10px'}} type='button'>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button onClick={() => getQuestions(section._id)} className="btn btn-sm btn-light-success mr-2" type='button'>
                                                        <i className="fa fa-list"></i> Questions
                                                    </button>
                                                </>}
                                            </div>
                                            
                                            
                                            
                                            
                                        </div>
                                        
                                    </div>
                                    {index+1 < IELTS_LMS_EDIT_QUIZ_SECTIONS_LIST.SECTIONS.length && <div className="separator separator-dashed my-5"></div>}
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

        {showAddSection? <AddSectionModal showAddSection={showAddSection} handleCloseAddSection={handleCloseAddSection} handleRefresh={handleRefresh}  /> : <></>}     
        {showEditSection? <EditSectionModal eid={sectionId} showEditSection={showEditSection} handleCloseEditSection={handleCloseEditSection} handleRefresh={handleRefresh} /> : <></>}                        
        
        </>}
    </>);
};


// add section modal
const AddSectionModal = ({showAddSection,handleCloseAddSection, handleRefresh}) => {
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
    // sample content
    const [sampleAnswer,setSampleAnswer]                        = useState("");
    const [sampleAnswerStatus,setSampleAnswerStatus]            = useState(false);
    // essay time
    const [time,setTime]                                        = useState({
        sectionTime:{
            timer: true,
            hh: 0,
            mm: 0,
            ss: 0
        },
        questionTimeToThink:{
            timer: true,
            hh: 0,
            mm: 0,
            ss: 0
        }
    });

    // essay status
    const [status,setStatus]                                    = useState("published");
    // editors
    const [htmlEditor,setHtmlEditor]                            = useState(<LoadEditorLight html={html} setHtml={setHtml} />);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} />);
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
                        _quizCategory: 'speaking',
                        _postType: 'speaking-section',
                        content: html,
                        sampleAnswer:{
                            status: sampleAnswerStatus,
                            content: sampleAnswerStatus? sampleAnswer : ''
                        },
                        time: time,
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
                            handleCloseAddSection();
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
            show={showAddSection}
            onHide={handleCloseAddSection}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header">
                <h2>Add Speaking Section</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddSection}>
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
                                placeholder={"Add Section title"} 
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
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Instructions</div>
                        </div>
                            
                        <div className="col-xl-9">
                            {htmlEditor}
                        </div>
                        
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">  
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">
                                <div className="form-check form-switch d-flex align-items-center">
                                    <input className="form-check-input" type="checkbox" id="sample-answer-status" name="sample-answer-status" checked={sampleAnswerStatus} onChange={(event) => setSampleAnswerStatus(event.target.checked)} />
                                    <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="sample-answer-status">
                                        <span>Sample Answer </span>
                                        {sampleAnswerStatus? 'Enabled' : 'Disabled'} 
                                    </label> 
                                </div>
                            </div>
                        </div>
                            
                        <div className={sampleAnswerStatus? "col-xl-9" : "col-xl-9 d-none"}>
                            {sampleAnswerHtmlEditor}
                        </div>
                        
                    </div>
                    {/* END::ROW */}
                        
                    {/* BEGIN::ROW */}
                    <div className="row mb-8">  
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Time</div>
                        </div>
                            
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container row">
                            <div className="position-relative col-md-6 col-sm-12 mb-4" htmlFor="mm"> 
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setTime({
                                    ...time,
                                    sectionTime:{
                                        ...time.sectionTime,
                                        mm: (time.sectionTime.mm - 1 < 0 )? 0 : time.sectionTime.mm - 1
                                    }
                                })}>  
                                    <span className="svg-icon svg-icon-1">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>                  
                                </button>  
                                <input required disabled={creating} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="MM" name="mm" value={time.sectionTime.mm} min="0" onChange={(event) => setTime({
                                    ...time,
                                    sectionTime:{
                                        ...time.sectionTime,
                                        mm: (+event.target.value < 0 )? 0 : +event.target.value
                                    }
                                })} />
                                <small className="text-muted form-text">Section time for questions <b>(Minuts)</b></small>
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setTime({
                                    ...time,
                                    sectionTime:{
                                        ...time.sectionTime,
                                        mm: +time.sectionTime.mm + 1
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

                            <div className="position-relative col-md-6 col-sm-12 mb-4" htmlFor="ss"> 
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setTime({
                                    ...time,
                                    questionTimeToThink:{
                                        ...time.questionTimeToThink,
                                        ss: (time.questionTimeToThink.ss - 1 < 0 )? 0 : time.questionTimeToThink.ss - 1
                                    }
                                })}>  
                                    <span className="svg-icon svg-icon-1">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>                  
                                </button>  
                                <input required disabled={creating} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="SS" name="ss" value={time.questionTimeToThink.ss} min="0" onChange={(event) => setTime({
                                    ...time,
                                    questionTimeToThink:{
                                        ...time.questionTimeToThink,
                                        ss: (+event.target.value < 0 )? 0 : +event.target.value
                                    }
                                })} />
                                <small className="text-muted form-text">Question time to think <b>(seconds)</b></small>
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setTime({
                                    ...time,
                                    questionTimeToThink:{
                                        ...time.questionTimeToThink,
                                        ss: +time.questionTimeToThink.ss + 1
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

                    <button disabled={creating} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Add Section</button>                       
                </div>
            </form>
        </Modal> 
    </>)
};

// edit section modal
const EditSectionModal = ({eid,showEditSection,handleCloseEditSection, handleRefresh}) => {
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
    // sample content
    const [sampleAnswer,setSampleAnswer]                        = useState("");
    const [sampleAnswerStatus,setSampleAnswerStatus]            = useState(false);
    // essay time
    const [time,setTime]                                        = useState({
        sectionTime:{
            timer: true,
            hh: 0,
            mm: 0,
            ss: 0
        },
        questionTimeToThink:{
            timer: true,
            hh: 0,
            mm: 0,
            ss: 0
        }
    });
    // essay status
    const [status,setStatus]                                    = useState("published");
    // editors
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<></>);
    const [editing,setEditing]                                  = useState(false);
    const [loading,setLoading]                                  = useState(true);
    

    const loadData = (data = {}) => {
        if(
            data.title && 
            data.order &&
            data.time &&
            data.content &&
            data.sampleAnswer &&
            data.status
        ){
            setTitle(data.title);
            setOrder(data.order);
            setHtml(data.content);
            setSampleAnswer(data.sampleAnswer.content);
            setSampleAnswerStatus(data.sampleAnswer.status);
            setTime(data.time);
            setStatus(data.status);
            setHtmlEditor(<LoadEditorLight html={data.content} setHtml={setHtml} />);
            setSampleAnswerHtmlEditor(<LoadEditorLight html={data.sampleAnswer.content} setHtml={setSampleAnswer} />);
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
                        _quizCategory: 'speaking',
                        _postType: 'speaking-section',
                        content: html,
                        sampleAnswer:{
                            status: sampleAnswerStatus,
                            content: sampleAnswerStatus? sampleAnswer : ''
                        },
                        time: time,
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

    useEffect(() => {
        
    },[loading]);




    return (<>
        <Modal
            size="lg"
            centered
            show={showEditSection}
            onHide={handleCloseEditSection}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header p-3">
                <h4 className='p-0 m-0'>Edit Speaking Section</h4>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseEditSection}>
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
                                    placeholder={"Add Section title"} 
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
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Section order</div>
                            </div>
                                    
                            <div className="col-xl-9">
                                <input 
                                    type="number" 
                                    className="form-control form-control-solid" 
                                    name="order" 
                                    value={order} 
                                    placeholder={"Add Section order"} 
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
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Section content</div>
                            </div>
                                
                            <div className="col-xl-9">
                                {htmlEditor}
                            </div>
                            
                        </div>
                        {/* END::ROW */}

                        {/* BEGIN::ROW */}
                        <div className="row mb-8">  
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">
                                    <div className="form-check form-switch d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" id="sample-answer-status" name="sample-answer-status" checked={sampleAnswerStatus} onChange={(event) => setSampleAnswerStatus(event.target.checked)} />
                                        <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="sample-answer-status">
                                            <span>Sample Answer </span>
                                            {sampleAnswerStatus? 'Enabled' : 'Disabled'} 
                                        </label> 
                                    </div>
                                </div>
                            </div>
                                
                            <div className={sampleAnswerStatus? "col-xl-9" : "col-xl-9 d-none"}>
                                {sampleAnswerHtmlEditor}
                            </div>
                            
                        </div>
                        {/* END::ROW */}
                            
                        {/* BEGIN::ROW */}
                        <div className="row mb-8">  
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Time</div>
                            </div>
                                
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container row">
                                <div className="position-relative col-md-6 col-sm-12 mb-4" htmlFor="mm"> 
                                    <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setTime({
                                        ...time,
                                        sectionTime:{
                                            ...time.sectionTime,
                                            mm: (time.sectionTime.mm - 1 < 0 )? 0 : time.sectionTime.mm - 1
                                        }
                                    })}>  
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>                  
                                    </button>  
                                    <input required disabled={editing} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="MM" name="mm" value={time.sectionTime.mm} min="0" onChange={(event) => setTime({
                                        ...time,
                                        sectionTime:{
                                            ...time.sectionTime,
                                            mm: (+event.target.value < 0 )? 0 : +event.target.value
                                        }
                                    })} />
                                    <small className="text-muted form-text">Section time for questions <b>(Minuts)</b></small>
                                    <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setTime({
                                        ...time,
                                        sectionTime:{
                                            ...time.sectionTime,
                                            mm: +time.sectionTime.mm + 1
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

                                <div className="position-relative col-md-6 col-sm-12 mb-4" htmlFor="ss"> 
                                    <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setTime({
                                        ...time,
                                        questionTimeToThink:{
                                            ...time.questionTimeToThink,
                                            ss: (time.questionTimeToThink.ss - 1 < 0 )? 0 : time.questionTimeToThink.ss - 1
                                        }
                                    })}>  
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>                  
                                    </button>  
                                    <input required disabled={editing} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="SS" name="ss" value={time.questionTimeToThink.ss} min="0" onChange={(event) => setTime({
                                        ...time,
                                        questionTimeToThink:{
                                            ...time.questionTimeToThink,
                                            ss: (+event.target.value < 0 )? 0 : +event.target.value
                                        }
                                    })} />
                                    <small className="text-muted form-text">Question time to think <b>(seconds)</b></small>
                                    <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setTime({
                                        ...time,
                                        questionTimeToThink:{
                                            ...time.questionTimeToThink,
                                            ss: +time.questionTimeToThink.ss + 1
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



// quesitons main
const IeltsLmsEditQuizSpeakingQuestion = () => {

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
        const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.find(item => item._id == value);
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
    }


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
                if(PARAM3 === "ielts-lms-edit-quiz-speaking-questions"){
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
            if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.length > 0){
                const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.find(item => item._id == DYNAMIC_ROUTE_SECTION_ID);
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
            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.length <= 0 && <>
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
                                PARAM3: 'ielts-lms-edit-quiz-speaking-sections',
                                PARAM4: 'ielts-lms-edit-quiz-speaking-section-list'
                            }))}>
                                <i className="fa fa-thin fa-chevron-left"></i> Swtich to Passages Tab
                            </button>    
                        </div> 
                    </div>
                </div>
            </>}
            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.length > 0 && <>
                <div className="card bg-transparent mb-4 border-0" style={{boxShadow: '0 0'}}>
                    <div className="card-header d-flex flex-row align-items-center border-0">
                        <h3 className="card-title">List of Questions</h3>
                        <Form.Select style={{maxWidth: "200px",fontSize: "12px"}} value={DYNAMIC_ROUTE_SECTION_ID} onChange={handleSectionChange}>
                            <option value="not-selected"> --SELECT SECTION-- </option>
                            {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.map((s,index) => { return (<option key={index} value={s._id}>{s.title}</option>) } )}
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
                                    <option value="not-selected"> --SELECT SECTION-- </option>
                                    {IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.map((s,index) => { return (<option key={index} value={s._id}>{s.title}</option>) } )}
                                </Form.Select>    
                            </div> 
                        </div>
                    </div>    
                </>}

                {sectionSelected && <QuestionsList sid={DYNAMIC_ROUTE_SECTION_ID} />}

            </>}
        </>}
    </>);
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
    const [reload,setReload]                                            = useState(1);
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
    const handleCloseAddQuestion = (r = 0) => {
        console.log(r);
        if(r == 1){ 
            setReload(reload+1); 
        }
        showAddQuestionModal(false);
    };
    // close edit question modal
    const handleCloseEditQuestion = (r = false) => {
        if(r){ setReload(reload+1); }
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
            if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS && IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.length > 0){
                const foundObject = IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.SECTIONS.find(item => item._id == sid);
                if(foundObject) {
                    if(DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU){
                        const { meta, restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
                        console.log("lets laod");
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
                        setFound(false);
                    }
                } else {
                    setFound(false);
                }
            }  
        }
    },[IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES,DYNAMIC_ROUTE_SECTION_ID,sid,reload]);

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
            {addQuestionModal? <AddSpeakingQuestionModal addQuestionModal={addQuestionModal} handleCloseAddQuestion={handleCloseAddQuestion} /> : <></>}            
            {editQuestionModal? <EditSpeakingQuestionModal editQuestionModal={editQuestionModal} handleCloseEditQuestion={handleCloseEditQuestion} questionId={questionId} /> : <></> }
        </>}
    </>);
};


const AddSpeakingQuestionModal = ({addQuestionModal,handleCloseAddQuestion}) => {
    const { id }                                                = useParams();
    const toolbar                                               = `fullscreen | blocks | bullist numlist checklist`;
    const { endpoint }                                          = constants;
    const { USER }                                              = useSelector( state => state.auth );
    const { WIDTH }                                             = useSelector( state => state.theme );
    const { DYNAMIC_ROUTE_SECTION_ID }                          = useSelector( state => state.route );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES  }             = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST }                = useSelector( state => state.ieltsLms );   
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );   

    const [fullscreen,setFullscreen]                            = useState(false);
    const [creating,setCreating]                                = useState(false);
    // inputs for questions
    const [inputs,setInputs]                                    = useState({
        title: '',
        question: {
            hasHtml: true,
            hasText: false,
            text: '',
            html: ''
        },
        time:{
            questionTimeToThink:{
                timer: true,
                mm: 0,
                ss: 0,
                hh: 0
            }
        }
    });
    const [html,setHtml]                                        = useState("");
    // editors  
    const [htmlEditor,setHtmlEditor]                            = useState(<LoadEditorLight contentCss='/css/editor/speaking/editor-speaking.css' toolbar={toolbar} html={html} setHtml={setHtml} />);

    // submit
    const addSpeakingQuestion = (event) => {
        event.preventDefault();
        const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;

        if( restApi.enable ) {
            const { postInsert } = restApi;
            if( postInsert !== undefined ) {
                const data = {
                    values: {
                        ...inputs,
                        question:{
                            ...inputs.question,
                            hasHtml: true,
                            html: html
                        },
                        status: 'published',
                        _quizCategory: 'speaking',
                        _questionCategory: 'speaking-question',
                        _quizId: id,
                        _sectionId: DYNAMIC_ROUTE_SECTION_ID
                    },
                    where: {
                        _quizId: id,
                        _sectionId: DYNAMIC_ROUTE_SECTION_ID
                    }
                };
                setCreating(true);
                postRequest(endpoint + postInsert + "/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID, {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': ''
                }, data).then((response) => {
                    const { success, has_json, json, error, res } = response;
                    if( success && has_json && !error ) {
                        if( json.insert ) {
                            handleCloseAddQuestion(2);    
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
    }


    useEffect(() => {
        if(WIDTH <= 700 ){
            setFullscreen(true);
        } else {
            setFullscreen(false);
        }
    },[WIDTH]);

    useEffect(() => {
        
        if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES.LOADED){
            if(IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.SECTION_LOADED){
                const { time } = IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.SECTION;
                console.log(time);
                setInputs({
                    ...inputs,
                    time:{
                        ...inputs.time,
                        questionTimeToThink: {
                            ...time.questionTimeToThink
                        }
                    }
                })
            }
        }
    },[IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES,DYNAMIC_ROUTE_SECTION_ID]);

    return (<>
        <Modal
            size="lg"
            centered
            show={addQuestionModal}
            onHide={handleCloseAddQuestion}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header">
                <h2>Add Speaking Question</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddQuestion}>
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
                                value={inputs.title} 
                                placeholder={"Add Question title"} 
                                onChange={(event) => setInputs({
                                    ...inputs,
                                    title: event.target.value
                                })} 
                                disabled={creating}
                            /> 
                            <small className="text-muted form-text">The title will not be visible in the frontend.</small>          
                        </div>
                        
                    </div>
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
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: (inputs.time.questionTimeToThink.ss - 1 < 0 )? 0 : inputs.time.questionTimeToThink.ss - 1
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
                                <input required disabled={creating} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="SS" name="ss" value={inputs.time.questionTimeToThink.ss} min="0" onChange={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: (+event.target.value < 0)? 0 : +event.target.value
                                        }
                                    }
                                })} />
                                <small className="text-muted form-text">Question time to think <b>(seconds)</b></small>
                                <button style={{marginTop: '-9px'}} disabled={creating} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: inputs.time.questionTimeToThink.ss + 1
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

                    <button disabled={creating} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Add Question</button>                       
                </div>
            </form>
        </Modal> 
    </>);
};

const EditSpeakingQuestionModal = ({editQuestionModal,handleCloseEditQuestion,questionId}) => {
    const { id }                                                = useParams();
    const toolbar                                               = `fullscreen | blocks | bullist numlist checklist`;
    const { endpoint }                                          = constants;
    const { USER }                                              = useSelector( state => state.auth );
    const { WIDTH }                                             = useSelector( state => state.theme );
    const { DYNAMIC_ROUTE_SECTION_ID }                          = useSelector( state => state.route );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES  }             = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST }                = useSelector( state => state.ieltsLms );   
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }             = useSelector( state => state.dashboard );   

    const [fullscreen,setFullscreen]                            = useState(false);
    const [editing,setEditing]                                  = useState(false);
    // inputs for questions
    const [inputs,setInputs]                                    = useState({
        title: '',
        order: 0,
        question: {
            hasHtml: true,
            hasText: false,
            text: '',
            html: ''
        },
        time:{
            questionTimeToThink:{
                timer: true,
                mm: 0,
                ss: 0,
                hh: 0
            }
        }
    });
    const [html,setHtml]                                        = useState("");
    // editors  
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [loading,setLoading]                                  = useState(true);
    // submit
    const editSpeakingQuestion = (event) => {
        event.preventDefault();
        const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;

        if( restApi.enable ) {
            const { postEdit } = restApi;
            if( postEdit !== undefined ) {
                const data = {
                    values: {
                        ...inputs,
                        question:{
                            ...inputs.question,
                            hasHtml: true,
                            html: html
                        }
                    },
                    where: {}
                };
                setEditing(true);
                postRequest(endpoint + postEdit + "/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID+"/"+questionId, {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': ''
                }, data).then((response) => {
                    const { success, has_json, json, error, res } = response;
                    if( success && has_json && !error ) {
                        if( json.update ) {
                            
                        } else {
                            console.warn(`[warning]: ${res}`);
                        }
                    } else {
                        console.warn(`[warning]: ${res}`);
                    }
                }).catch(err => {
                    console.warn('[ERROR]: ',err);
                }).finally(() => {
                    setEditing(false);
                });
            } else {
                alert("ERROR: Rest api for handling submit forms is not defined !");
            }
        } else {
            alert("Rest api for handling submit forms is not enable !");
        }
    };

    const loadData = (data = {}) => {
        if(
            data.title &&
            data.question &&
            data.time &&
            data.order &&
            data.status
        ){
            setInputs({
                ...inputs,
                title: data.title,
                question: data.question,
                time: data.time,
                order: data.order,
                status: data.status
            });
            setHtml(data.question.html);
            setHtmlEditor(<LoadEditorLight contentCss='/css/editor/speaking/editor-speaking.css' toolbar={toolbar} html={data.question.html} setHtml={setHtml} />)
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
        if(questionId !== null){
            if(loading){
                console.log('ajax called for id',questionId, DYNAMIC_ROUTE_SECTION_ID, id);
                const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
                if( restApi.enable ) {
                    const { getEdit } = restApi;
                    if( getEdit !== undefined ) {

                        postRequest(endpoint + getEdit + "/"+id+"/"+DYNAMIC_ROUTE_SECTION_ID+"/"+questionId, {
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
                                title: true,
                                status: true,
                                time: true,
                                question: true,
                                order: true
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
                }
            }
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
        >
            <div className="modal-header">
                <h2>Edit Speaking Question</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseEditQuestion}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </div> 
            {loading? <IeltsLmsEditQuizSpeakingEditQuestionSkeleton  /> : <>
            <form style={{ display: 'contents'}} onSubmit={editSpeakingQuestion}>   
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
                                value={inputs.title} 
                                placeholder={"Add Question title"} 
                                onChange={(event) => setInputs({
                                    ...inputs,
                                    title: event.target.value
                                })} 
                                disabled={editing}
                            /> 
                            <small className="text-muted form-text">The title will not be visible in the frontend.</small>          
                        </div>
                        
                    </div>
                    {/* END::ROW */}

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
                                value={inputs.order} 
                                placeholder={"Add Question order"} 
                                onChange={(event) => setInputs({
                                    ...inputs,
                                    order: +event.target.value
                                })} 
                                disabled={editing}
                            />         
                        </div>
                        
                    </div>
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
                                <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: (inputs.time.questionTimeToThink.ss - 1 < 0 )? 0 : inputs.time.questionTimeToThink.ss - 1
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
                                <input required disabled={editing} type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="SS" name="ss" value={inputs.time.questionTimeToThink.ss} min="0" onChange={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: (+event.target.value < 0)? 0 : +event.target.value
                                        }
                                    }
                                })} />
                                <small className="text-muted form-text">Question time to think <b>(seconds)</b></small>
                                <button style={{marginTop: '-9px'}} disabled={editing} type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => setInputs({
                                    ...inputs,
                                    time:{
                                        ...inputs.time,
                                        questionTimeToThink:{
                                            ...inputs.time.questionTimeToThink,
                                            ss: inputs.time.questionTimeToThink.ss + 1
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
                    <button disabled={editing} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Edit Question</button>                       
                </div>
            </form>
            </>}
        </Modal> 
    </>);
};




export { IeltsLmsEditQuizSpeakingSection, IeltsLmsEditQuizSpeakingQuestion };

