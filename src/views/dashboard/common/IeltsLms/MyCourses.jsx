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
import { update_ieltslms_myCourses, update_ieltslms_myCourses_states } from "../../../../includes/redux/slices/ieltslms.slice";
import { IELTS_LMS_MY_COURSES_STATUS } from "../../../../includes/constants/ieltslms";
import { update_modals } from "../../../../includes/redux/slices/modals.slice";

const DashboardIeltsLmsMyCourses = () => {
    const dispatch                              = useDispatch();
    const { ENDPOINT }                          = ENDPOINTS;
    const { ROUTES_LOADED, USER }               = useSelector(state => state.auth);
    const { IELTS_LMS_MY_COURSES_LIST_ROUTE }   = useSelector(state => state.constants);
    const { IELTS_LMS_MY_COURSES }              = useSelector(state => state.ieltslms);
    const { IELTS_LMS_MY_COURSES_STATES }       = useSelector(state => state.ieltslms);
    const { IELTS_ADD_COURSE_MODAL }            = useSelector(state => state.modals);
    const [searching, setSearching]             = useState(false);

    // handle close modal
    const handleClose = () => {
        dispatch(update_modals({
            IELTS_ADD_COURSE_MODAL: false,
            IELTS_ADD_QUIZ_MODAL: false
        }));
    };

    const loadCourses = (where = {}, pagination = {}, search = {}) => {
        if( IELTS_LMS_MY_COURSES_LIST_ROUTE && IELTS_LMS_MY_COURSES_LIST_ROUTE.endpoint ) {
            // set loading
            setSearching(true);
            dispatch(update_loader({
                LOADER_LOADING: true
            }));
            axios.post(`${ENDPOINT}${IELTS_LMS_MY_COURSES_LIST_ROUTE.endpoint}`, {
                pagination: {
                    currentPage: 1,
                    perPage: 10,
                    ...pagination
                },
                where: {
                    status: IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS,
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
                        const { courses } = response.data.success.json;
                        
                        dispatch(update_ieltslms_myCourses({
                            COURSES: [...courses],
                            LOADED: true,
                            LOADING: false,
                            FAILED: false
                        }));
                        
                        dispatch(update_loader({
                            LOADER_LOADING: false
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
                setSearching(false);
                dispatch(update_loader({
                    LOADER_LOADING: false
                }));
            });
        } else {
            toast.warning("Failed to get my courses endpoint", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // step --------------- 1
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-MY-COURSES',
            CURRENT_DYNAMIC_MENU: null,
            IS_DYNAMIC_MENU_ACTIVE: false,
            HAS_DYNAMIC_MENU: false,
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,
            DYNAMIC_MENU_LOADING: false,
            PAGE_HEADING: 'My Courses',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'IELTS LMS',
            BREADCRUM_THREE: 'My Courses',
            DYNAMIC_HEADER: 'IELTS-LMS-MY-COURSES',
            TAB_TITLE: 'My Courses | IELTS LMS | Dashboard'
        }));
        dispatch(update_loader({
            LOADER_LOADING: false
        }));
    },[]);

    // event for load courses routes --------- 2
    useEffect(() => {
        dispatch(update_loader({
            LOADER_LOADING: true
        }));

        if (ROUTES_LOADED) {
            if( IELTS_LMS_MY_COURSES_LIST_ROUTE && IELTS_LMS_MY_COURSES_LIST_ROUTE.endpoint ) {
                if ( IELTS_LMS_MY_COURSES && IELTS_LMS_MY_COURSES.COURSES.length <= 0 ) {
                    loadCourses();
                } else {
                    dispatch(update_loader({
                        LOADER_LOADING: false
                    }));
                }
            } else {
                toast.warning("Failed to get my courses endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    }, [ROUTES_LOADED]);

    return (<>
        <MyCoursesHeader loadCourses={loadCourses} searching={searching} setSearching={setSearching} />
        <MyCoursesBody loadCourses={loadCourses} />
        {IELTS_ADD_COURSE_MODAL && <CreateCourseModal handleClose={handleClose} loadCourses={loadCourses} />}
    </>);
};


const MyCoursesHeader = ({ loadCourses, searching, setSearching }) => {
    const dispatch                          = useDispatch();
    const [search, setSearch]               = useState("");
    const { IELTS_LMS_MY_COURSES_STATES }   = useSelector(state => state.ieltslms);

    const findCourse = () => {
        if (search.length > 0) {
            // search by name
            loadCourses({
                status: IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS
            }, {}, {
                status: true,
                query: search
            });
        } else {
            loadCourses({
                status: IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS
            }, {
                currentPage: 1
            }, {});
        }
    };

    // filter - status
    const filterCourseByStatus = (status) => {
        dispatch(update_ieltslms_myCourses_states({
            COURSE_STATUS: status
        }));

        loadCourses({
            status: status
        }, {}, {});
    };


    return (<>
        {/* --BEGIN::header-- */}
        <div className="d-flex flex-wrap flex-stack pb-7">

            {/* BEGIN::filters */}
            <div className="d-flex flex-wrap align-items-center my-1">
                <div className="d-flex align-items-center position-relative">
                    {/* BEGIN::Quiz status filter */}
                    <select onChange={(event) => filterCourseByStatus(event.target.value)} disabled={searching} className='form-select form-select-sm border-body bg-body w-150px me-5' value={IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS}>
                        {IELTS_LMS_MY_COURSES_STATUS.map((status) => {
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
                    <input disabled={searching} type="text" value={search} onChange={(event) => setSearch(event.target.value)} className="form-control w-250px mr-2" placeholder="Search Course" aria-describedby="basic-addon2" />
                    <button onClick={findCourse} id="basic-addon2" className="btn-sm input-group-btn btn btn-primary btn-icon d-flex" type="button">
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

const MyCoursesBody = ({ loadCourses }) => {
    const dispatch                          = useDispatch();
    const { IELTS_LMS_MY_COURSES }          = useSelector(state => state.ieltslms);
    const { IELTS_LMS_MY_COURSES_STATES }   = useSelector(state => state.ieltslms);
    return (<>
        {IELTS_LMS_MY_COURSES && <>
            {IELTS_LMS_MY_COURSES.LOADED && <>

                {IELTS_LMS_MY_COURSES.COURSES && IELTS_LMS_MY_COURSES.COURSES.length > 0 && <>
                    {IELTS_LMS_MY_COURSES.COURSES.map((course, index) => {
                        return (<CourseItem course={course} key={course._id} loadCourses={loadCourses} />)
                    })}
                </>}

                {IELTS_LMS_MY_COURSES.COURSES && IELTS_LMS_MY_COURSES.COURSES.length <= 0 && <>
                    <div className="card mb-6">
                        <div className="card-body">
                            <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                            </svg>
                            <div className="text-center pt-10 mb-20">
                                <h2 className="fs-2 fw-bold mb-7">
                                    {IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS == "published" && <>0 Courses found</>}
                                    {IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS == "drafted" && <>Draft is empty</>}
                                    {IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS == "trashed" && <>Trash is empty</>}
                                </h2>
                                <p className="text-gray-400 fs-6 fw-semibold mb-10">
                                    There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                                </p>
                                {IELTS_LMS_MY_COURSES_STATES.COURSE_STATUS == "published" && <>
                                    <button onClick={() => dispatch(update_modals({
                                        IELTS_ADD_COURSE_MODAL: true
                                    }))} className='btn btn-thin btn-light-primary' style={{ maxWidth: "200px", fontSize: "12px", margin: '0 auto' }} type="button">
                                        <i className="fa fa-plus"></i> Add New Course
                                    </button>
                                </>}
                                
                            </div>
                        </div>
                    </div>
                </>}
            </>}
            {IELTS_LMS_MY_COURSES.LOADING && <>
                Courses loading...
            </>}
        </>}
    </>);
};

const CourseItem = ({ course, loadCourses }) => {
    return (<>
        <div className="card__hover card mb-2">
            <div className="card-body p-3 d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-stack">
                    <div className="d-flex align-items-center">
                        {1 == 2 && <input className="form-check-input me-3" type="checkbox" style={{ borderRadius: '30px' }} />}
                        <div className="w30-px ml-6 mx-4 custom-img-box">
                            {/* <img src={"/svgs/course.svg"} /> */}
                            <i className="ki-duotone ki-teacher fs-2x text-primary">
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </i>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fs-5 text-dark text-hover-primary fw-bold">{course.title}</div>
                            <div className="fs-6 fw-semibold text-gray-400">{course.description}</div>
                        </div>
                    </div>
                </div>
                <CourseItemControls course={course} loadCourses={loadCourses} />
            </div>
        </div>
    </>);
};

const CourseItemControls = ({ course, loadCourses }) => {
    const dispatch                              = useDispatch();
    const { ENDPOINT }                          = ENDPOINTS;
    const [confirm, setConfirm]                 = useState(false);
    const [confirmStatus, setConfirmStatus]     = useState("");
    const { ROLE, USER }                        = useSelector(state => state.auth);
    const { IELTS_LMS_MY_COURSES }              = useSelector(state => state.ieltslms);
    const { IELTS_LMS_EDIT_COURSE_BASIC_ROUTE } = useSelector( state => state.constants );
    const [controls,setControls]                = useState({
        
    });
    const [copy,setCoping]         = useState(false); 

    // shortcode copy
    const copyShortcode = () => {
        setCoping(true);
        let text = `[ilms-course course_id="${course._id}" course_title="${course.title}" course_description="${course.description}" course_status="${course.status}" created_at="${course.creation}" course_category="${course.category}" course_icon_url=""]`;
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
        if(IELTS_LMS_EDIT_COURSE_BASIC_ROUTE){
            try{
                let total = IELTS_LMS_MY_COURSES.COURSES.length;
                axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_COURSE_BASIC_ROUTE.endpoint}/${quiz._id}`,{
                    basic:{
                        status: status
                    },
                    where :{
                        _id: course._id
                    }
                },{
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }).then((response) => {
                    if (response.data.success) {
                        loadCourses();
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
            const editCourseLink = `/dashboard/@owner/ielts-lms/course/edit/${course._id}`;
            const previewCourseLink = `https://preview.ieltslms.com/icourse/?id=${course._id}`;
            setControls({
                edit: editCourseLink,
                preview: previewCourseLink,
                trash: true,
                remove: true,
                restore: true
            });
        } else if(ROLE == "customer"){
            const editCourseLink = `/dashboard/@customer/ielts-lms/course/edit/${course._id}`;
            const previewCourseLink = `https://preview.ieltslms.com/icourse/?id=${course._id}`;
            setControls({
                edit: editCourseLink,
                preview: previewCourseLink,
                trash: true,
                remove: true,
                restore: true
            });
        }
    }, [ROLE]);

    return (<>
        {!confirm ? <div className="d-flex flex-stack">

            {course.status == "published" && <>
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

            {course.status == "drafted" && <>
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

            {course.status == "trashed" && <>
                {controls.remove && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmRemove}>
                    <i className="fa fa-trash text-danger"></i>
                </button>} &nbsp;
                {controls.restore && <button type="button" className='btn btn-sm btn-icon' onClick={setConfirmRestore}>
                    <i className="fa fa-refresh text-danger"></i>
                </button>}
            </>}

        </div> : <div className="d-flex flex-stack">
            {course.status == "published" && <>
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

            {course.status == "drafted" && <>

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

            {course.status == "trashed" && <>

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



const CreateCourseModal = ({ handleClose, loadCourses }) => {
    const navigate                          = useNavigate();
    const { ENDPOINT }                      = ENDPOINTS;
    const { WIDTH }                         = useSelector( state => state.theme );
    const { USER,ROLE }                          = useSelector( state => state.auth );
    const { IELTS_LMS_ADD_MY_COURSE_ROUTE } = useSelector( state => state.constants );
    const { IELTS_ADD_COURSE_MODAL }        = useSelector( state => state.modals );
    const [creating,setCreating]            = useState(false);
    const [course,setCourse]                = useState({
        title: '',
        category: '',
        description: '',
        status: 'published'
    });

    // on submit from handler
    const handleSubmit = (event) => {
        event.preventDefault();
        if( IELTS_LMS_ADD_MY_COURSE_ROUTE && IELTS_LMS_ADD_MY_COURSE_ROUTE.endpoint ){
            setCreating(true);
            axios.post(`${ENDPOINT}${IELTS_LMS_ADD_MY_COURSE_ROUTE.endpoint}`, {
                course: {
                    ...course
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
                        const { course } = response.data.success.json;
                        setCreating(false);
                        loadCourses();
                        handleClose();
                        navigate(`/dashboard/@${ROLE}/ielts-lms/course/edit/${course._id}`);
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
                setCreating(false);
            });
        } else {
            toast.warning("Failed to get add my course endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    return (
        <Modal
            show={IELTS_ADD_COURSE_MODAL}
            size="md"
            backdrop="static"
            keyboard={false}
            fullscreen={WIDTH <= 400? true : false}
            centered
        >
            <Form
                id="create-course-form"
                onSubmit={handleSubmit}
                style={{display:"contents"}}
            >
                <div className="modal-header p-4">
                    <h4 className="modal-title">Create Course</h4>
                    {!creating &&
                    <div className="btn btn-sm btn-icon btn-active-color-primary" type="button" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>                
                    </div>}
                </div>
                <Modal.Body>

                    <div className="mb-10">
                        <label className="form-label required">Course title</label>
                        <input 
                            onChange={(event) => setCourse({
                                ...course,
                                title: event.target.value
                            })} 
                            type="text" 
                            className="form-control" 
                            placeholder="Add course title" 
                            required
                            disabled={creating}
                        />
                    </div>

                    <div className="mb-10">
                        <label className="form-label">Course category</label>
                        <select 
                            onChange={(event) => setCourse({
                                ...course,
                                category: event.target.value
                            })} 
                            className='form-select form-select-sm w-100 me-5'
                            disabled={creating}
                        >
                            <option value="uncategorized">Uncategorized</option>
                            <option value="academic">Academic</option>
                            <option value="general">General</option>
                        </select> 
                    </div>



                </Modal.Body>
                <Modal.Footer className="p-2">
                    <Button 
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
                        {!creating && 'Add Course'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};


export default DashboardIeltsLmsMyCourses;