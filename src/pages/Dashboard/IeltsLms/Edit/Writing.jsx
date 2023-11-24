import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
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

const IeltsLmsEditQuizWritingEssay = () => {

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
    const { IELTS_LMS_EDIT_QUIZ_ESSAY }                                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY_STATES }                          = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES }               = useSelector( state => state.ieltsLms );

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
                        if(!IELTS_LMS_EDIT_QUIZ_ESSAY && !IELTS_LMS_EDIT_QUIZ_ESSAY_STATES && !IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES){
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
            IELTS_LMS_EDIT_QUIZ_ESSAY &&
            IELTS_LMS_EDIT_QUIZ_ESSAY_STATES &&
            IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES
        ){
            if(
                IELTS_LMS_EDIT_QUIZ.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.LOADED
            ){             
                if(PARAM3 === "ielts-lms-edit-quiz-writing-essay"){
                    
                    if(PARAM4 === "ielts-lms-edit-quiz-writing-essay-list"){
                        dispatch(update_dashboard({
                            DASHBOARD_ROUTE_LOADING: true,
                        }));
                        setContext(<IeltsLmsEditQuizWritingEssayList />);
                        return;
                    } else if(PARAM4 === "ielts-lms-edit-quiz-writing-essay-add"){
                        
                        dispatch(update_dashboard({
                            DASHBOARD_ROUTE_LOADING: true,
                        }));
                        setContext(<IeltsLmsEditQuizWritingEssayAddEssay />);
                        return;
                    } else if(PARAM4 === "ielts-lms-edit-quiz-writing-essay-edit"){
                        dispatch(update_dashboard({
                            DASHBOARD_ROUTE_LOADING: true,
                        }));
                        setContext(<IeltsLmsEditQuizWritingEssayEditEssay id={""} />);
                        return;
                    } else {
                        dispatch(update_route({
                            PARAM4: 'ielts-lms-edit-quiz-writing-essay-list'
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
        IELTS_LMS_EDIT_QUIZ_ESSAY, 
        IELTS_LMS_EDIT_QUIZ_ESSAY_STATES,
        IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES,
        PARAM3, 
        PARAM4
    ]);

    return (<>{context}</>);
};


// essay list
const IeltsLmsEditQuizWritingEssayList = () => {
    const { id }                                        = useParams();
    const { endpoint }                                  = constants;
    const dispatch                                      = useDispatch();
    const [loading,setLoading]                          = useState(true);
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }     = useSelector( state => state.dashboard );
    const { USER }                                      = useSelector( state => state.auth );
    const { PARAM3, PARAM4 }                            = useSelector( state => state.route);
    const { IELTS_LMS_OVERALL }                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY }                 = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY_LIST }            = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY_STATES }          = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES } = useSelector( state => state.ieltsLms );
    const [showAddEssay,setShowAddEssay]                = useState(false);
    const [showEditEssay,setShowEditEssay]              = useState(false);
    const [refresh,setRefresh]                          = useState(1);
    const [essayId,setEssayId]                          = useState(null);
    const [searchParam,setSearchParams]                 = useState("");
    const [searching,setSearching]                      = useState(false);
    const handleRefresh = ()                            => setRefresh(refresh+1);
    const handleCloseAddEssay = ()                      => {
        setShowAddEssay(false);
        setShowEditEssay(false);
        setEssayId(null);
    };
    const handleCloseEditEssay = ()                     => {
        setShowAddEssay(false);
        setShowEditEssay(false);
        setEssayId(null);
        
    };
    const editEssay = (id = null)                       => {
        if(id !== null){
            setEssayId(id);
            setShowAddEssay(false);
            setShowEditEssay(true);
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
            IELTS_LMS_EDIT_QUIZ_ESSAY_STATES:{
                ...IELTS_LMS_EDIT_QUIZ_ESSAY_STATES,
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
                        perPage: IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.PER_PAGE,
                        currentPage: IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.CURRENT_PAGE,
                        ...pagination
                    },
                    where: {
                        status: IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.SELECTED_STATUS_FILTER,
                        _category: 'writing',
                        _postType: 'writing-essay',
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

    // load hook
    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            IELTS_LMS_EDIT_QUIZ && IELTS_LMS_EDIT_QUIZ.LOADED &&
            IELTS_LMS_EDIT_QUIZ_ESSAY && IELTS_LMS_EDIT_QUIZ_ESSAY.LOADED
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
                            perPage: IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.PER_PAGE,
                            currentPage: IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.CURRENT_PAGE
                        },
                        where: {
                            status: IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.SELECTED_STATUS_FILTER,
                            _category: 'writing',
                            _postType: 'writing-essay'
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
        
    },[IELTS_LMS_OVERALL,IELTS_LMS_EDIT_QUIZ, IELTS_LMS_EDIT_QUIZ_ESSAY,refresh]);
    
    // success hook
    useEffect(() => {
        if(
            IELTS_LMS_EDIT_QUIZ_ESSAY_LIST &&
            IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES &&
            IELTS_LMS_EDIT_QUIZ_ESSAY_STATES && 
            IELTS_LMS_EDIT_QUIZ_ESSAY
        ){

            if(
                IELTS_LMS_EDIT_QUIZ_ESSAY.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES.LOADED &&
                IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.LOADED
            ){             
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: false,
                }));
                setLoading(false); 
                
            }
        }
    },[
        IELTS_LMS_EDIT_QUIZ_ESSAY_LIST,
        IELTS_LMS_EDIT_QUIZ_ESSAY_PAGINATION_STATES,
        IELTS_LMS_EDIT_QUIZ_ESSAY_STATES,
        IELTS_LMS_EDIT_QUIZ_ESSAY
    ]);

    return (<>
        {loading? <IeltsLmsEditQuizEssayListSkeleton /> : <>
            
        <div className="card mb-0 bg-transparent" style={{boxShadow: '0 0 0 '}}>
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer bg-transparent">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">List of Writing Essays</h3>
                </div>
                <div className="card-toolbar">
                    <button className={"btn btn-sm btn-primary btn-sm"} onClick={() => setShowAddEssay(true)}> 
                        <i className="fa fa-plus"></i> Add Essay
                    </button>
                </div>
            </div>
            {/* end::Card header */}
        </div>

        <div className="card mb-5 mb-xm-10">
            <div className="card-header cursor-pointer">

                <div className="d-flex flex-wrap align-items-center my-1">
                    <h3 className="fw-bold me-5 my-1">Total ({IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.TOTAL || 0})</h3>
                    <div className="d-flex align-items-center position-relative">
                        {(IELTS_LMS_EDIT_QUIZ_ESSAY_STATES && IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.STATUS_FILTERS && IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.STATUS_FILTERS.length > 0) &&               
                        <select disabled={searching} onChange={filterByStatus} className='form-select form-select-solid form-select-sm w-150px me-5' value={IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.SELECTED_STATUS_FILTER}>
                            {IELTS_LMS_EDIT_QUIZ_ESSAY_STATES.STATUS_FILTERS.map((filter,index) => {
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
                            IELTS_LMS_EDIT_QUIZ_ESSAY_LIST && 
                            IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.LOADED && 
                            IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.ESSAY && <>
                            
                            {/* begin::Item */}
                            {IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.ESSAY.length > 0 && IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.ESSAY.map((essay,index) => {
                                return (<React.Fragment key={index}>
                                    <div className="d-flex flex-stack">
                                        <div className="d-flex">
                                            
                                            <img className="w-40px h-40px me-6" src={"/img/writing/essay/list.png"} alt="" />
                                            <div className="d-flex flex-column">
                                                
                                                <div className="fs-5 text-dark text-hover-primary fw-bold">
                                                    {essay.title}
                                                </div>
                                                <div className="fs-6 fw-semibold text-gray-400">
                                                    {essay.order == 1? 'Writing Essay 1' : ''}
                                                    {essay.order == 2? 'Writing Essay 2' : ''}
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-evenly">
                                            
                                            {essay.status == "trashed" && <>
                                                <button onClick={() => {}} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                    <i className="fa fa-refresh"></i>
                                                </button>
                                                <button className="btn btn-sm btn-light-danger" type='button' style={{padding: '4px 10px !important'}}>
                                                    <i className="fa fa-trash"></i> Delete Permanent
                                                </button>
                                            </>}
                                            {(essay.status == "published" || essay.status == "drafted") && <>
                                                <button onClick={() => editEssay(essay._id)} className="btn btn-sm btn-light-primary btn-icon btn-link mr-2" type='button'>
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-light-danger btn-icon btn-link" type='button'>
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </>}
                                            
                                            
                                        </div>
                                    </div>
                                    {index+1 < IELTS_LMS_EDIT_QUIZ_ESSAY_LIST.ESSAY.length && <div className="separator separator-dashed my-5"></div>}
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

        {showAddEssay? <AddEssayModal showAddEssay={showAddEssay} handleCloseAddEssay={handleCloseAddEssay} handleRefresh={handleRefresh}  /> : <></>}     
        {showEditEssay? <EditEssayModal eid={essayId} showEditEssay={showEditEssay} handleCloseEditEssay={handleCloseEditEssay} handleRefresh={handleRefresh}  /> : <></>}                     

        </>}
    </>);
};


// add essay modal
const AddEssayModal = ({showAddEssay,handleCloseAddEssay, handleRefresh}) => {
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
    const [order,setOrder]                                      = useState(1);
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
                        order: order,
                        _quizCategory: 'writing',
                        _postType: 'writing-essay',
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
                            handleCloseAddEssay();
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
            show={showAddEssay}
            onHide={handleCloseAddEssay}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header">
                <h2>Add Writing Essay</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseAddEssay}>
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
                            <div className="fs-6 fw-semibold mt-2 mb-3">Title (optional)</div>
                        </div>

                        <div className="col-xl-9">  
                            <input 
                                type="text" 
                                className="form-control form-control-solid" 
                                name="title" 
                                value={title} 
                                placeholder={"Add Essay title"} 
                                onChange={(event) => setTitle(event.target.value)} 
                                disabled={creating}
                            />           
                        </div>
                        
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">  
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Essay order</div>
                        </div>
                                
                        <div className="col-xl-9">
                            <select 
                                disabled={creating} 
                                className={`form-select form-select-solid w-100`} 
                                name="order" 
                                value={order} 
                                onChange={(event) => setOrder(event.target.value)}
                            >
                                <option value="1">Writing Essay 1</option>
                                <option value="2">Writing Essay 2</option>
                            </select>
                        </div>
                            
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Essay content</div>
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
                            <div className="fs-6 fw-semibold mt-2 mb-3 required">Essay Time (minuts)</div>
                        </div>
                            
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container row">
                            <div className="position-relative col-md-12 col-sm-12 mb-4" htmlFor="mm"> 
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
                                <small className="text-muted form-text">Essay time in <b>(Minuts)</b></small>
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

                    <button disabled={creating} className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Add Essay</button>                       
                </div>
            </form>
        </Modal> 
    </>)
};

// add essay modal
const EditEssayModal = ({eid,showEditEssay,handleCloseEditEssay, handleRefresh}) => {
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
    const [order,setOrder]                                      = useState(1);
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
                        _quizCategory: 'writing',
                        _postType: 'writing-essay',
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


    return (<>
        <Modal
            size="lg"
            centered
            show={showEditEssay}
            onHide={handleCloseEditEssay}
            backdrop="static"
            keyboard={false}
            fullscreen={fullscreen}
        >
            <div className="modal-header p-3">
                <h4 className='p-0 m-0'>Edit Writing Essay</h4>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseEditEssay}>
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
                                <div className="fs-6 fw-semibold mt-2 mb-3">Title (optional)</div>
                            </div>

                            <div className="col-xl-9">  
                                <input 
                                    type="text" 
                                    className="form-control form-control-solid" 
                                    name="title" 
                                    value={title} 
                                    placeholder={"Add Essay title"} 
                                    onChange={(event) => setTitle(event.target.value)} 
                                    disabled={editing}
                                />           
                            </div>
                            
                        </div>
                        {/* END::ROW */}

                        {/* BEGIN::ROW */}
                        <div className="row mb-8">  
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Essay order</div>
                            </div>
                                    
                            <div className="col-xl-9">
                                <select 
                                    disabled={editing} 
                                    className={`form-select form-select-solid w-100`} 
                                    name="order" 
                                    value={order} 
                                    onChange={(event) => setOrder(event.target.value)}
                                >
                                    <option value="1">Writing Essay 1</option>
                                    <option value="2">Writing Essay 2</option>
                                </select>
                            </div>
                                
                        </div>
                        {/* END::ROW */}

                        {/* BEGIN::ROW */}
                        <div className="row mb-8">
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Essay content</div>
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
                                <div className="fs-6 fw-semibold mt-2 mb-3 required">Essay Time (minuts)</div>
                            </div>
                                
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container row">
                                <div className="position-relative col-md-12 col-sm-12 mb-4" htmlFor="mm"> 
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
                                    <small className="text-muted form-text">Essay time in <b>(Minuts)</b></small>
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



export { IeltsLmsEditQuizWritingEssay };

