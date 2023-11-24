import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { update_route } from '../../../../includes/redux-store/Slices/Route.slice';
import { update_dashboard } from '../../../../includes/redux-store/Slices/Dashboard.slice';
import { IeltsLmsEditQuizBasicEditSkeleton, QuizForMyDomainsSkeleton } from '../../../../components/default/Skeletons';
import getRequest from '../../../../includes/rest-apis/get';
import postRequest from '../../../../includes/rest-apis/post';
import constants from '../../../../includes/constants';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';




// Quiz for my domains
const QuizForMyDomains = () => {
    const [loading,setLoading] = useState(true);
    return (<>
        {loading? <QuizForMyDomainsSkeleton /> : <>
        
        <div className="card mb-5 mb-xl-10">
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_connected_accounts" aria-expanded="true" aria-controls="kt_account_connected_accounts">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Connected Domains</h3>
                </div>
            </div>
            {/* end::Card header */}

            {/* begin::Content */}
            <div id="kt_account_settings_connected_accounts" className="collapse show">
                {/* begin::Card body */}
                <div className="card-body border-top p-9">
                    {/* begin::Notice */}
                    <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6">
                        {/* begin::Icon */}
                        <i className="ki-duotone ki-design-1 fs-2tx text-primary me-4"></i>
                        {/* end::Icon */}
                        {/* begin::Wrapper */}
                        <div className="d-flex flex-stack flex-grow-1">
                            {/* begin::Content */}
                            <div className="fw-semibold">
                                <div className="fs-6 text-gray-700">Two-factor authentication adds an extra layer of security to your account. To log in, you'll need to provide a 4-digit amazing code. <a href="#" className="fw-bold">Learn More</a></div>
                            </div>
                            {/* end::Content */}
                        </div>
                        {/* end::Wrapper */}
                    </div>
                    {/* end::Notice */}
                    {/* begin::Items */}
                    <div className="py-2">
                        {/* begin::Item */}
                        <div className="d-flex flex-stack">
                            <div className="d-flex">
                                <img src="/seven-html-pro/assets/media/svg/brand-logos/google-icon.svg" className="w-30px me-6" alt="" />
                                <div className="d-flex flex-column">
                                    <a href="#" className="fs-5 text-dark text-hover-primary fw-bold">Client.local</a>
                                    <div className="fs-6 fw-semibold text-gray-400">Plan properly your workflow</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="form-check form-check-solid form-check-custom form-switch">
                                    <input className="form-check-input w-45px h-30px" type="checkbox" id="googleswitch" />
                                    <label className="form-check-label" htmlFor="googleswitch"></label>
                                </div>
                            </div>
                        </div>
                        {/* end::Item */}
                        <div className="separator separator-dashed my-5"></div>
                        {/* begin::Item */}
                        <div className="d-flex flex-stack">
                            <div className="d-flex">
                                <img src="/seven-html-pro/assets/media/svg/brand-logos/github.svg" className="w-30px me-6" alt="" />
                                <div className="d-flex flex-column">
                                    <a href="#" className="fs-5 text-dark text-hover-primary fw-bold">Hub.org</a>
                                    <div className="fs-6 fw-semibold text-gray-400">Keep an eye on your Repositories</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="form-check form-check-solid form-check-custom form-switch">
                                    <input className="form-check-input w-45px h-30px" type="checkbox" id="githubswitch" />
                                    <label className="form-check-label" htmlFor="githubswitch"></label>
                                </div>
                            </div>
                        </div>
                        {/* end::Item */}
                        <div className="separator separator-dashed my-5"></div>
                        {/* begin::Item */}
                        <div className="d-flex flex-stack">
                            <div className="d-flex">
                                <img src="/seven-html-pro/assets/media/svg/brand-logos/slack-icon.svg" className="w-30px me-6" alt="" />
                                <div className="d-flex flex-column">
                                    <a href="#" className="fs-5 text-dark text-hover-primary fw-bold">Slack.in</a>
                                    <div className="fs-6 fw-semibold text-gray-400">Integrate Projects Discussions</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="form-check form-check-solid form-check-custom form-switch">
                                    <input className="form-check-input w-45px h-30px" type="checkbox" id="slackswitch" />
                                    <label className="form-check-label" htmlFor="slackswitch"></label>
                                </div>
                            </div>
                        </div>
                        {/* end::Item */}
                    </div>
                    {/* end::Items */}
                </div>
                {/* end::Card body */}
                {/* begin::Card footer */}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <button className="btn btn-primary">Generate Quiz</button>
                </div>
                {/* end::Card footer */}
            </div>
            {/* end::Content */}
        </div>

        </>}
    </>);
};



const IeltsLmsEditQuizBasicEdit = () => {
    
    const routeParent               = "ielts-lms";
    const routeChild                = "ielts-lms-edit-quiz";
    const dummyInputs               = {
        title: '',
        description: '',
        time: {
            timer: false,
            hh: 0,
            mm: 0,
            ss: 0
        },
        status: '',
        category: ''
    };
    const dummyInputsError          = {
        title: {
            invalid: null,
            error: ''
        },
        description: {
            invalid: null,
            error: ''
        },
        status: {
            invalid: null,
            error: ''
        },
        time: {
            invalid: null,
            error: ''
        },
        hh: {
            invalid: null,
            error: ''
        },
        mm: {
            invalid: null,
            error: ''
        },
        ss: {
            invalid: null,
            error: ''
        }
    };
    const { id }                    = useParams();
    const { endpoint, IELTS_EDIT_QUIZ_BASIC } = constants;
    const dispatch                                      = useDispatch();
    const [loading,setLoading]                          = useState(false);
    const { USER }                                      = useSelector( state => state.auth );
    const { PARAM3 }                                    = useSelector( state => state.route);
    const { IELTS_LMS_OVERALL }                         = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ }                       = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_MY_QUIZZES }                      = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_OVERVIEW }              = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS }    = useSelector( state => state.ieltsLms );
    const { DASHBOARD_SUBMENUS }                        = useSelector( state => state.dashboard );
    const { DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU }     = useSelector( state => state.dashboard );
    const [inputs,setInputs]                            = useState(dummyInputs);
    const [inputErrors, setInputErrors]                 = useState(dummyInputsError);
    const [saving,setSaving]                            = useState(false);
    const { DASHBOARD_DYNAMIC_MENU, DASHBOARD_DYNAMIC_MENU_LOADING } = useSelector( state => state.dashboard );
    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        if( states.DASHBOARD ) {
            dispatch(update_dashboard({
                ...permissions.DASHBOARD
            }));
        }

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

    // change time
    const changeTime = (n,t = 0) => {
        
        if(t > -1 && t <= 60){
            setInputs({
                ...inputs,
                time: {
                    ...inputs.time,
                    timer : inputs.category === "reading" || inputs.category === "listening"? true : false,
                    [n]: t
                } 
            });  
        }    
    };

    // events and functions
    const basicEditSubmit = (event) => {
        if(DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU){
            const { restApi } = DASHBOARD_CURRENT_ACTIVE_DYNAMIC_MENU;
            event.preventDefault();
            postRequest(endpoint + restApi.postEndpoint +"/" + id, {
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken,
                'x-api-token': ''
            },{
                where: {
                    _id: id,
                    category: inputs.category
                },
                format: {
                    title: true,
                    description: true,
                    time: true,
                    status: true,
                    creation: true
                },
                values: {
                    ...inputs
                }
            }).then((response) => {
                const { success, has_json, json, error, res } = response;
                if( success && has_json && !error ) {
                    if(json && json.update){

                        setInputErrors(dummyInputsError);
                        if(json.get){
                            dispatch(update_ielts_lms({
                                IELTS_LMS_EDIT_QUIZ:{
                                    ...IELTS_LMS_EDIT_QUIZ,
                                },
                                IELTS_LMS_EDIT_QUIZ_OVERVIEW:{
                                    ...IELTS_LMS_EDIT_QUIZ_OVERVIEW,
                                    QUIZ: {
                                        ...IELTS_LMS_EDIT_QUIZ_OVERVIEW.QUIZ,
                                        ...json.quiz
                                    }
                                },
                                IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS:{
                                    ...IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS,
                                    QUIZ: {
                                        ...IELTS_LMS_EDIT_QUIZ_OVERVIEW.QUIZ,
                                        ...json.quiz
                                    }
                                },
                                IELTS_LMS_MY_QUIZZES: {
                                    ...IELTS_LMS_MY_QUIZZES,
                                    QUIZZES: []
                                }
                            }));
                            
                        }
                    } else {
                        const { errors, validFields } = json;
                        for (const key in errors) {
                            if (inputErrors.hasOwnProperty(key)) {
                                setInputErrors({
                                    ...inputErrors,
                                    [key]: {
                                        invalid: true,
                                        error:errors[key]
                                    }
                                });
                            } else {
                                setInputErrors({
                                    ...inputErrors,
                                    [key]: {
                                        invalid: false,
                                        error: ""
                                    }
                                });
                            }

                        }

                    }
                } else {
                    console.warn(`[warning]: ${res}`);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    };
    // handle change input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    // discard changes
    const discardChanges = () => {
        if(IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.LOADED){
            if(IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.QUIZ){
                const { title, description, time, status } = IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.QUIZ;
                setInputs({
                    ...dummyInputs,
                    title: title,
                    description: description || '',
                    time: time,
                    status: status
                });
                setInputErrors({
                    ...dummyInputsError
                });
            }
        }
    };

    useEffect(() => {
        return () => {
            
        };
    },[]);
    
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
                    if( restApi && restApi.enable ) {
                        console.log('[REST API -D]:', restApi);
                        getRequest(endpoint + restApi.getEndpoint + "/" +id, {
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
                    console.log('no dynamic found');
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
            IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS

        ){
            if(IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.LOADED){
                if(IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.QUIZ){
                    const { title, description, time, status, category } = IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS.QUIZ;
                    setInputs({
                        ...dummyInputs,
                        title: title,
                        description: description || '',
                        time: time,
                        status: status,
                        category: category
                    });
                    setInputErrors({
                        ...dummyInputsError
                    });
                    console.log("this called");
                }
                setLoading(false);
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: false,
                }));
            } else {
                setLoading(true);
                dispatch(update_dashboard({
                    DASHBOARD_ROUTE_LOADING: true,
                }));
            }
        } else {
            setLoading(true);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true,
            }));
        }
    },[IELTS_LMS_EDIT_QUIZ,IELTS_LMS_EDIT_QUIZ_EDIT_BASIC_DETAILS]);

    return (<>
    {loading? <IeltsLmsEditQuizBasicEditSkeleton /> : <>
        <div className="card mb-8">
            {/*--begin::Card header--*/}
            <div className="card-header">
                {/*--begin::Card title--*/}
                <div className="card-title fs-3 fw-bold">Quiz basic (Edit)</div>
                {/*--end::Card title--*/}
            </div>
            {/*--end::Card header--*/}
            {/*--begin::Form--*/}
            <form className="form" onSubmit={basicEditSubmit}>

                {/*--begin::Card body--*/}
                <div className="card-body p-9">
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Quiz title*</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <input required disabled={saving} type="text" className={`form-control form-control-solid ${inputErrors.title.invalid? 'is-invalid' : 'is-valid'}`} name="title" value={inputs.title} onChange={handleChange} />
                            <div className="fv-plugins-message-container invalid-feedback">{inputErrors.title.error}</div>
                        </div>
                    </div>
                    {/*--end::Row--*/}
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Description</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <textarea disabled={saving} name="description" className={`form-control form-control-solid h-100px ${inputErrors.description.invalid? 'is-invalid' : 'is-valid'}`} style={{height: "123px"}} value={inputs.description} onChange={handleChange}></textarea>
                            <div className="fv-plugins-message-container invalid-feedback">{inputErrors.description.error}</div>
                        </div>
                        {/*--begin::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                    {/*--begin::Row--*/}
                    {((inputs.category) && (inputs.category === "reading" || inputs.category === "listening")) &&
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Time</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <div className="row">
                                <div className="position-relative col-6 w-120px" htmlFor="hh">
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => changeTime("hh", +inputs.time.hh - 1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                    
                                    </button>
                                    
                                    <input type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="HH" name="hh" value={inputs.time.hh} min="0" max="60" onChange={(event) => changeTime("hh", +event.target.value)} />
                                    
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => changeTime("hh", +inputs.time.hh + 1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                                <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                        
                                    </button>
                                
                                </div>

                                <div className="position-relative col-6 w-120px" htmlFor="mm">
                                
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3" onClick={(event) => changeTime("mm", + inputs.time.mm - 1)}>
                                        
                                        <span className="svg-icon svg-icon-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                                <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                                    
                                    </button>
                                    
                                    <input type="number" className="no-valdiations form-control form-control-solid border-0 text-center" placeholder="MM" name="min" value={inputs.time.mm} min="0" max="60" onChange={(event) => changeTime("mm", +event.target.value)} />
                                    
                                    
                                    <button type="button" className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3" onClick={(event) => changeTime("mm", + inputs.time.mm + 1)}>
                                        
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

                        </div>
                        {/*--begin::Col--*/}
                    </div>}                   
                    {/*--end::Row--*/}

                    
                    {/*--begin::Row--*/}
                    <div className="row">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9">
                            
                            <select className={`form-select form-select-solid w-200px ${inputErrors.status.invalid? 'is-invalid' : 'is-valid'}`} name="status" value={inputs.status} onChange={handleChange} disabled={saving}>
                                <option value="published">Published</option>
                                <option value="drafted">Save as Draft</option>
                                <option value="trashed">Move to Trash</option>
                            </select>
                        </div>
                        {/*--end::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                </div>
                {/*--end::Card body--*/}

                {/*--begin::Card footer--*/}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <button disabled={saving} type="button" className="btn btn-light btn-active-light-primary me-2 btn-sm" onClick={discardChanges}>Discard</button>
                    <button disabled={saving} type="submit" className="btn btn-primary btn-sm">
                        {saving? 'Saving...' :'Save Changes'}
                    </button>
                </div>
                {/*--end::Card footer--*/}
                
            </form>
            {/*--end:Form--*/}
        </div>
        <QuizForMyDomains />
    </>}
    </>);
};

export default IeltsLmsEditQuizBasicEdit;