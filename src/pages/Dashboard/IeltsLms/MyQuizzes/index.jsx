import CreateQuizModal from './CreateQuiz.modal';
import postRequest from '../../../../includes/rest-apis/post';
import { update_dashboard } from "../../../../includes/redux-store/Slices/Dashboard.slice"; 
import constants from '../../../../includes/constants';
import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';




const IeltsLmsMyQuizzes = () => {
    const routeParent = "ielts-lms";
    const routeChild  = "ielts-lms-my-quizzes";
    const { endpoint }                      = constants;
    const dispatch                          = useDispatch();

    const [loading,setLoading]              = useState(true);
    const [searchParam,apiSetSearchParams]  = useState("");
    const [searching,setSearching]          = useState(false);
    const { USER }                          = useSelector( state => state.auth );
    const { DASHBOARD_SUBMENUS }            = useSelector ( state => state.dashboard );
    const { IELTS_LMS_OVERALL }             = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_MY_QUIZZES_STATES }   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_MY_QUIZZES_PAGINATION_STATES } = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_MY_QUIZZES }          = useSelector( state => state.ieltsLms );         
    const updateStates = (json = {}) => {
        setSearching(false);
        const { permissions, states } = json;

        if( states.IELTS_LMS_MY_QUIZZES_PAGINATION_STATES ) {
            dispatch(update_ielts_lms({
                IELTS_LMS_MY_QUIZZES_PAGINATION_STATES: {
                    ...IELTS_LMS_MY_QUIZZES_PAGINATION_STATES,
                    ...permissions.IELTS_LMS_MY_QUIZZES_PAGINATION_STATES
                }
            }));
        }

        if( states.IELTS_LMS_MY_QUIZZES ) {
            dispatch(update_ielts_lms({
                IELTS_LMS_MY_QUIZZES: {
                    ...IELTS_LMS_MY_QUIZZES,
                    ...permissions.IELTS_LMS_MY_QUIZZES
                }
            }));
        }
        
        
    };

    // reload quizzes by filters
    const reloadQuizzes = (pagination = {}, where = {}, search = {}) => {
        const matches       = [...DASHBOARD_SUBMENUS];
        const matchedObject =  matches.find( menuItem => {
            return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
        });

        if( matchedObject ) {
            const { restApi } = matchedObject;
            if( restApi.enable ) {  
                setSearching(true);
                postRequest(endpoint + restApi.endpoint , {
                    'Authorization': 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken,
                    'x-api-token': restApi.endpoint 
                },{
                    pagination: {
                        perPage: IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_PER_PAGE,
                        currentPage: IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE,
                        ...pagination
                    },
                    where: {
                        category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECT_CATEGORY_FILTER,
                        status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER,
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
                    const { success, error, error_type, error_message, error_code } = err;
                    if( error ) {
                        console.log(error_message);
                        
                    } else {
                        console.log('[ERROR]: UNKNOWN',err);
                    }
                });
            }
        }
    };

    const findQuiz = () => {
        if(searchParam.length > 0){
            // search by name
            reloadQuizzes({},{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            },{
                status: true,
                query: searchParam
            });
        } else {
            reloadQuizzes({
                currentPage: 1
            },{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            });
        }
    };

    const filterByStatus = (event) => {
        dispatch(update_ielts_lms({
            IELTS_LMS_MY_QUIZZES_STATES:{
                ...IELTS_LMS_MY_QUIZZES_STATES,
                IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER: event.target.value
            }
        }));
        reloadQuizzes({},{
            status: event.target.value,
            category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
        });
    };

    const filterByCategory = (event) => {
        dispatch(update_ielts_lms({
            IELTS_LMS_MY_QUIZZES_STATES:{
                ...IELTS_LMS_MY_QUIZZES_STATES,
                IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER: event.target.value
            }
        }));
        reloadQuizzes({},{
            category: event.target.value == 'all'? null : event.target.value,
            status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
        });
    };

    // first page
    const firstPage = () => {
        if(+IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE > 0){
            reloadQuizzes({
                perPage: 10,
                currentPage: 1
            },{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            });
        }
    };
    const previousPage = () => {
        
        if(+IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE > 1){
            reloadQuizzes({
                perPage: 10,
                currentPage: +IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE - 1
            },{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            });
        }
    };
    const nextPage = () => {
        if(+IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE < +IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES){
            reloadQuizzes({
                perPage: 10,
                currentPage: +IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE + 1
            },{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            });
        }
    };
    const lastPage = () => {
        if(+IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE < +IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES){
            reloadQuizzes({
                perPage: 10,
                currentPage: +IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES
            },{
                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
            });
        }
    };

    const setPerPage = (event) => {
        reloadQuizzes({
            perPage: +event.target.value,
            currentPage: 1
        },{
            category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER,
            status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER
        }); 
    }

    useEffect(() => {
        if(
            IELTS_LMS_OVERALL && IELTS_LMS_OVERALL.LOADED &&
            IELTS_LMS_MY_QUIZZES_STATES && IELTS_LMS_MY_QUIZZES_STATES.LOADED &&
            IELTS_LMS_MY_QUIZZES_PAGINATION_STATES && IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.LOADED
        ) {

            const matches       = [...DASHBOARD_SUBMENUS];
            const matchedObject =  matches.find( menuItem => {
                return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
            });

            if( matchedObject ) {
                const { restApi } = matchedObject;
                
                if( restApi.enable ) { 
                    console.log('[RESET API]:',restApi);
                    if(IELTS_LMS_MY_QUIZZES === undefined || IELTS_LMS_MY_QUIZZES.QUIZZES === undefined || IELTS_LMS_MY_QUIZZES.QUIZZES.length <= 0){ 
                        postRequest(endpoint + restApi.endpoint , {
                            'Authorization': 'Bearer '+USER.accessToken,
                            'x-refresh-token': USER.refreshToken,
                            'x-api-token': restApi.endpoint 
                        },{
                            pagination: {
                                perPage: IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_PER_PAGE,
                                currentPage: IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE
                            },
                            where: {
                                category: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECT_CATEGORY_FILTER,
                                status: IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER 
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
                            const { success, error, error_type, error_message, error_code } = err;
                            if( error ) {
                                console.log(error_message);
                                
                            } else {
                                console.log('[ERROR]: UNKNOWN',err);
                            }
                        });  
                    } else {
                        console.log('loaded already');
                    }
                }

                return () => {};

            } else {
                console.warn("no match found for this route");
            }

        }
        return () => {}
    },[IELTS_LMS_OVERALL]);

    useEffect(() => {
        if(
            IELTS_LMS_MY_QUIZZES && 
            !IELTS_LMS_MY_QUIZZES.LOADING &&
            IELTS_LMS_MY_QUIZZES.LOADED
        ){
            setLoading(false);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: false
            }));
        } else {
            setLoading(true);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true
            }));
        }
    },[IELTS_LMS_MY_QUIZZES]);

    return (<>
        {loading? <>My Quizzes loading...</> :
        <>
            {/* --BEGIN::header-- */}
            <div className="d-flex flex-wrap flex-stack pb-7">

            
                <div className="d-flex flex-wrap align-items-center my-1">
                    <h3 className="fw-bold me-5 my-1">Quizzes ({IELTS_LMS_MY_QUIZZES.TOTAL || 0})</h3>
                    <div className="d-flex align-items-center position-relative">
                        {(IELTS_LMS_MY_QUIZZES_STATES && IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_STATUS_FILTERS && IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_STATUS_FILTERS.length > 0) &&               
                        <select onChange={filterByStatus} className='form-select form-select-sm border-body bg-body w-150px me-5' value={IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_STATUS_FILTER}>
                            {IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_STATUS_FILTERS.map((filter,index) => {
                                return <option key={index} value={filter.key}>{filter.value}</option>
                            })}
                        </select>}   
                        {(IELTS_LMS_MY_QUIZZES_STATES && IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_CATEGORIES_FILTERS && IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_CATEGORIES_FILTERS.length > 0) &&               
                        <select onChange={filterByCategory} className='form-select form-select-sm border-body bg-body w-150px me-5' value={IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_SELECTED_CATEGORY_FILTER}>
                            {IELTS_LMS_MY_QUIZZES_STATES.IELTS_LMS_MY_QUIZZES_CATEGORIES_FILTERS.map((filter,index) => {
                                return <option key={index} value={filter.key}>{filter.value}</option>
                            })}
                        </select>}                
                    </div>
                    

                </div>


                

                {/* BEGIN::search filter input */}
                <div className="d-flex align-items-center position-relative">               
                    <div className="input-group input-group-sm">
                        <input disabled={searching} type="text" value={searchParam} className="form-control w-250px mr-2" placeholder="Search Quiz" onChange={(event) => apiSetSearchParams(event.target.value)} aria-describedby="basic-addon2" />
                                
                        <button disabled={searching} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button" onClick={findQuiz}>
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
            {/* --END::header-- */}

            {/* --BEGIN::BODY-- */}
            <div className="card p-0 bg-transparent mb-6">
                <div className="card-body p-0">
                    {IELTS_LMS_MY_QUIZZES && IELTS_LMS_MY_QUIZZES.LOADED &&  !IELTS_LMS_MY_QUIZZES.LOADING && <>

                        {IELTS_LMS_MY_QUIZZES.QUIZZES && IELTS_LMS_MY_QUIZZES.QUIZZES.length > 0 && IELTS_LMS_MY_QUIZZES.QUIZZES.map((quiz,index) => {
                            return (<div className="card__hover card mb-2" key={index}>
                                <div className="card-body p-3 d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-stack">
                                        <div className="d-flex align-items-center">
                                            <input className="form-check-input me-3" type="checkbox" style={{borderRadius: '30px'}} />
                                                <div className="w30-px ml-6 mx-3 custom-img-box">

                                                </div>
                                                                                                            
                                                <div className="d-flex flex-column">
                                                    <div className="fs-5 text-dark text-hover-primary fw-bold">{quiz.title}</div>
                                                    <div className="fs-6 fw-semibold text-gray-400">{quiz.description}</div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-stack">
                                        <Link to={"/dashboard/ielts-lms/edit/"+quiz._id} className="btn btn-sm btn-primary">Edit</Link>
                                    </div>                                     
                                </div>                                       
                            </div>);
                        })}

                        {IELTS_LMS_MY_QUIZZES.QUIZZES && IELTS_LMS_MY_QUIZZES.QUIZZES.length <= 0 && <>
                            <h1>0 quizzes found</h1>
                        </>}
                    
                    </>}
                </div>
            </div>
            {/* --END::BODY-- */}

            {/* --BEGIN::footer-- */}
            {IELTS_LMS_MY_QUIZZES_PAGINATION_STATES && <>
                {IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES > 1? <>
                    <div className="card p-0">
                        <div className="card-header border-0">
                            <div className="card-toolbar">
                                <select onChange={setPerPage} className='form-select form-select-sm w-100px me-5' value={IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_PER_PAGE}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div className="card-toolbar">
                                <div className="dataTables_paginate paging_simple_numbers">
                                    <ul className="pagination">

                                        {/* begin::back to first */}
                                        {IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE > 1 && <>
                                            
                                            <li className={`paginate_button page-item previous ${IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE > 1? '' : 'disabled'}`}>
                                                <button type="button" className="page-link" onClick={firstPage}>
                                                    <i className="previous"></i>
                                                    <i className="previous"></i>
                                                </button>
                                            </li>
                                            <li className={`paginate_button page-item previous  ${IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE > 1? '' : 'disabled'}`}>
                                                <button type="button" className="page-link bg-light-primary" onClick={previousPage}>
                                                    <i className="previous"></i>
                                                </button>
                                            </li>
                                            {/* end::back to first */}
                                        </>}

                                            <li className="paginate_button page-item d-flex flex-row justify-content-center align-items-center text-dark font-bold" style={{padding: "0 10px", fontWeight: "bold"}}>
                                                <span className="text-ligth">{IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE}</span> / <span className="text-dark">{IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES}</span>
                                            </li>
                                            
                                            {IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_CURRENT_PAGE != IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES && <>
                                            
                                            {/* begin::last */}
                                            <li className={`paginate_button page-item bg-light-primary ${IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES > 1? '' : 'disabled'}`}>
                                                <button type="button" className="page-link" onClick={nextPage}>
                                                    <i className="next"></i>
                                                </button>
                                            </li>
                                            <li className={`paginate_button page-item next ${IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_TOTAL_PAGES > 1? '' : 'disabled'}`}>
                                                <button type="button" className="page-link" onClick={lastPage}>
                                                    <i className="next"></i>
                                                    <i className="next"></i>
                                                </button>
                                            </li>
                                            {/* end::last */}
                                            </>}
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : 
                <div className="card p-0">
                    <div className="card-header border-0">
                        <div className="card-toolbar">
                            <select onChange={setPerPage} className='form-select form-select-sm w-100px me-5' value={IELTS_LMS_MY_QUIZZES_PAGINATION_STATES.IELTS_LMS_MY_QUIZZES_PAGINATION_PER_PAGE}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="card-toolbar">
                                
                        </div>
                    </div>
                </div>}
            </>}
            
            {/* --END::footer-- */}

            <CreateQuizModal />
            
        </>}
    </>);
};

export default IeltsLmsMyQuizzes;
