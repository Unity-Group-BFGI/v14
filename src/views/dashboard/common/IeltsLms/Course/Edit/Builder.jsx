import '../../../../../../styles/builder.min.css';
import '../../../../../../styles/builder.inputs.css';
import '../../../../../../styles/modal.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { IeltsLmsEditQuizBasicEditSkeleton } from "../../../../../../components/Skeletons/Ieltslms";
import { 
    update_ieltslms,
    update_ieltslms_editCourse_builder,
    update_ielts_lms_edit_course_builder_add_lesson,
    update_ielts_lms_edit_course_builder_edit_lesson,
    update_ielts_lms_edit_course_builder_remove_quiz_from_lesson 
} from "../../../../../../includes/redux/slices/ieltslms.slice";


const IeltsLmsEditMyCourseBuilder = () => {
    const dispatch                                              = useDispatch();
    const { id }                                                = useParams();
    const { ENDPOINT }                                          = ENDPOINTS;
    const { ROUTES_LOADED, USER }                               = useSelector( state => state.auth );
    const { IELTS_LMS_MY_QUIZZES_LIST }                         = useSelector( state => state.constants );
    const { IELTS_LMS_MY_COURSE_UPDATE_META_ROUTE }             = useSelector( state => state.constants );
    const { IELTS_LMS_MY_COURSE_REMOVE_META_ROUTE }             = useSelector( state => state.constants );
    const { IELTS_LMS_EDIT_MY_COURSE }                          = useSelector( state => state.ieltslms );
    const { IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE }    = useSelector( state => state.constants );
    const { IELTS_LMS_EDIT_COURSE_BUILDER }                     = useSelector( state => state.ieltslms );
    const { IELTS_LMS_EDIT_COURSE_BUILDER_STATES }              = useSelector( state => state.ieltslms );    
    const [loading, setLoading]                                 = useState(false);
    const [saving,setSaving]                                    = useState(false);

    const [modalQuiz,setModalQuiz]                  = useState(false);
    const [searchParam,apiSetSearchParams]          = useState("");
    const [searching,setSearching]                  = useState(false);
    const [showAddLessonBox,setShowAddLessonBox]    = useState(true);
    const [addLessonTab,setAddLessonTab]            = useState(false);
    const [lessonTitle,setLessonTitle]              = useState("");
    const [exIds,setExIds]                          = useState([]);
    const [currentContextId,setCurrentContextId]    = useState("");
    const [wishlist,setWishlist]                    = useState([]);

    const reloadQuizzes = (pagination = {}, where = {}, search = {}, xids = []) => {
        if( IELTS_LMS_MY_QUIZZES_LIST.endpoint && IELTS_LMS_MY_QUIZZES_LIST ){
            if(IELTS_LMS_EDIT_COURSE_BUILDER_STATES.LOADED){
                setSearching(true);
                axios.post(`${ENDPOINT}${IELTS_LMS_MY_QUIZZES_LIST.endpoint}`, {
                    pagination: {
                        currentPage: 1,
                        perPage: 100,
                        ...pagination
                    },
                    where: {
                        status: 'published',
                        _category: IELTS_LMS_EDIT_COURSE_BUILDER_STATES.SELECTED_QUIZ_CATEGORY,
                        ...where
                    },
                    search: {
                        status: false,
                        query: '',
                        ...search
                    },
                    excludedIds: [...xids]
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
                            let rcTmp = [];
                            if(IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES && IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES.length > 0){
                                rcTmp = IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES;     
                            }
                            let newQuizzes = [...quizzes];
                            let oldQuizzes = [...rcTmp];

                            let mergedQuizzes = [
                                ...oldQuizzes,
                                ...newQuizzes.filter((newQuiz) => !oldQuizzes.some((oldQuiz) => oldQuiz._id === newQuiz._id))
                            ];

                            dispatch(update_ieltslms({
                                IELTS_LMS_EDIT_COURSE_BUILDER:{
                                    ...IELTS_LMS_EDIT_COURSE_BUILDER,
                                    QUIZZES: newQuizzes,
                                    RECENT_QUIZZES: [...mergedQuizzes]
                                }
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
                });
            }
        } else {
            toast.warning("Failed to get load quizzes endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }

    // get course meta
    const loadCourseMeta = () => {
        if ( IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE && IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE.endpoint ) {
            setLoading(true);
            dispatch(update_ieltslms_editCourse_builder({
                LOADED:false,
                LOADING: true,
                FAILED:false,
            }));
            axios.get(`${ENDPOINT}${IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE.endpoint}/${id}`, {
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }, ).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { sections } = response.data.success.json;
                        dispatch(update_ieltslms_editCourse_builder({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            LESSONS: sections
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

                    dispatch(update_ieltslms_editCourse_builder({
                        LOADED: false,
                        LOADING: true,
                        FAILED: true,
                        LESSONS: []
                    }));
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
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    dispatch(update_ieltslms_editCourse_builder({
                        LOADED: false,
                        LOADING: true,
                        FAILED: true,
                        LESSONS: []
                    }));
                }
            });
        } else {
            toast.warning("Failed to get edit course meta endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };
    // save lessons event
    const saveLessons = () => {
        if( IELTS_LMS_MY_COURSE_UPDATE_META_ROUTE && IELTS_LMS_MY_COURSE_UPDATE_META_ROUTE.endpoint ) {
            setSaving(true);
            axios.post(`${ENDPOINT}${IELTS_LMS_MY_COURSE_UPDATE_META_ROUTE.endpoint}/${id}`, {
                sections: IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS
            }, {
                headers:{
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }, ).then((response) => {
                if (response.data.success) {
                    if (response.data.success.has_json) {
                        const { sections } = response.data.success.json;
                        dispatch(update_ieltslms_editCourse_builder({
                            LOADED: true,
                            LOADING: false,
                            FAILED: false,
                            LESSONS: sections
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
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            }).finally(() => {
                setSaving(false);
            });
        } else {
            toast.warning("Failed to get update course metadata endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }); 
        }
    };
    // add lesson box
    const addLessonBox = (event) => {
        event.preventDefault();
        setShowAddLessonBox(false);
        dispatch(update_ielts_lms_edit_course_builder_add_lesson({
            title: lessonTitle,
            description: '',
            status: 'published',
            _courseId: id,
            _postType: 'lesson',
            quizzes: [],
            wishlist: [],
            preview: false,
            _states: {
                _expand: true,
                _editTitle: false
            },
            _temp:{
                _title: lessonTitle,
                _mod: 'new',
                _unsaved: true
            }
        }));
        setLessonTitle("");
        setAddLessonTab(false);
        setShowAddLessonBox(true);

    };
    // save lesson title
    const saveLessonTitle = (event,lesson) => {
        event.preventDefault();
        dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
            ...lesson
        }));
    };
    // modal quizzes
    const showModalQuiz = (index) => {
        setCurrentContextId(index);
        setWishlist([]);
        if(IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].quizzes){
            setWishlist([...IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].quizzes]);
        } else {
            setWishlist([]);
        }
        
        setModalQuiz(true);
    };

    const closeModalQuizzes = () => {
        setModalQuiz(false);
    };

    // add to whishlist
    const addToCurrentLesson = () => {
        let index = currentContextId;
        if(IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]) {
            dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
                index: index,
                type: 'quizzes',
                value: wishlist
            }))
        }     

        setCurrentContextId("");
        setModalQuiz(false);
    };

    const toggleWishlistItem = (item) => {
        const itemId = item._id; // Assuming the unique identifier is _id
        // Check if the item is already in the wishlist
        const isItemInWishlist = wishlist.some((wishlistItem) => wishlistItem._id === itemId);
        // If the item is in the wishlist, remove it; otherwise, add it
        if (isItemInWishlist) {
            const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem._id !== itemId);
            setWishlist(updatedWishlist);
        } else {
            const updatedWishlist = [...wishlist, item];
            setWishlist(updatedWishlist);
        }
    };

    // quiz functions
    const filterByCategory = (event) => {
        dispatch(update_ieltslms({
            IELTS_LMS_EDIT_COURSE_BUILDER_STATES:{
                ...IELTS_LMS_EDIT_COURSE_BUILDER_STATES,
                SELECTED_QUIZ_CATEGORY: event.target.value
            }
        }));
        reloadQuizzes({},{
            _category: event.target.value == 'all'? null : event.target.value
        });
        
    };

    const findQuiz = () => {
        if(searchParam.length > 0){
            // search by name
            reloadQuizzes({},{
                _category: IELTS_LMS_EDIT_COURSE_BUILDER_STATES.SELECTED_QUIZ_CATEGORY,
                status: 'published'
            },{
                status: true,
                query: searchParam
            });
        } else {
            reloadQuizzes({
                currentPage: 1
            },{
                _category: IELTS_LMS_EDIT_COURSE_BUILDER_STATES.SELECTED_QUIZ_CATEGORY,
                status: 'published'
            });
        }
    };

    // remove quiz from lesson
    const removeQuizFromLesson = (li, _id) => {
        dispatch(update_ielts_lms_edit_course_builder_remove_quiz_from_lesson({
            li: li,
            _id: _id
        }));
    };

    // remove lesson from course
    const removeCourseLesson = (event,lid) => {
        let con = window.confirm("Are you sure you want to remove this lesson?");
        if( con ) {
            if( IELTS_LMS_MY_COURSE_REMOVE_META_ROUTE && IELTS_LMS_MY_COURSE_REMOVE_META_ROUTE.endpoint ) {
                axios.post(`${ENDPOINT}${IELTS_LMS_MY_COURSE_REMOVE_META_ROUTE.endpoint}/${id}/${lid}`, {
                    
                }, {
                    headers:{
                        'Authorization': 'Bearer ' + USER.accessToken,
                        'x-refresh': 'ref ' + USER.refreshToken,
                        'x-ssf': 'xss PVRP'
                    }
                }, ).then((response) => {
                    if (response.data.success) {
                        if (response.data.success.has_json) {
                            const { sections } = response.data.success.json;
                            dispatch(update_ieltslms_editCourse_builder({
                                LOADED: true,
                                LOADING: false,
                                FAILED: false,
                                LESSONS: sections
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
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                    }
                });
            } else {
                toast.warning("Failed to get remove course metadata endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }); 
            }
        }
    };


    // event when quiz id found ------------- [step 0]
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-MY-COURSES',
            CURRENT_DYNAMIC_MENU: "IELTS-LMS-EDIT-MY-COURSE",
            CURRENT_DYNAMIC_PARAM: "IELTS-LMS-EDIT-MY-COURSE-BUILDER",

            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,

            IS_DYNAMIC_MENU_ACTIVE: true,
            DYNAMIC_MENU_LOADING: false,
            HAS_DYNAMIC_MENU: true,
            DYNAMIC_MENU_FOR: 'IELTS-LMS',


            PAGE_HEADING: 'Edit Course',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'IELTS LMS',
            BREADCRUM_THREE: 'Edit Course',
            DYNAMIC_HEADER: 'IELTS-LMS-EDIT-MY-COURSE-BUILDER',
            TAB_TITLE: 'Course Builder | IELTS LMS | Dashboard'
        }));
    }, [id]);

    // event for load course   ------------- [step 2]
    useEffect(() => {
        setLoading(true);
        if (ROUTES_LOADED) {
            if ( IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE && IELTS_LMS_EDIT_MY_COURSE_GET_COURSE_META_ROUTE.endpoint ) {
                loadCourseMeta();
            } else {
                toast.warning("Failed to get edit course meta endpoint", {
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

    useEffect(() => {
        if(
            IELTS_LMS_EDIT_COURSE_BUILDER && IELTS_LMS_EDIT_COURSE_BUILDER.LOADED && 
            IELTS_LMS_EDIT_COURSE_BUILDER_STATES && IELTS_LMS_EDIT_COURSE_BUILDER_STATES.LOADED &&
            modalQuiz && !loading
        ){
            if(IELTS_LMS_EDIT_COURSE_BUILDER.QUIZZES && IELTS_LMS_EDIT_COURSE_BUILDER.QUIZZES.length <= 0 ) {

                reloadQuizzes();
            } else {
                reloadQuizzes();
            }
            if(IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES && IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES.length < 0){
                let quizIdsArray = IELTS_LMS_EDIT_COURSE_BUILDER.RECENT_QUIZZES.map((quiz) => quiz._id);
                setExIds(quizIdsArray);
            }

        }
    },[modalQuiz,loading]);

    return (<>
        {loading? <>Loading...</> : <>
            {IELTS_LMS_EDIT_COURSE_BUILDER && <>
                {IELTS_LMS_EDIT_COURSE_BUILDER.LOADING && <>
                    loading...
                </>}
                {IELTS_LMS_EDIT_COURSE_BUILDER.LOADED && <>
                    {IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS && IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS.length <= 0 && <>
                        <div className="">
                            <ul className="ld__builder--placeholder -lesson -is-empty" data-label="Drop Lessons here">
                                <li>
                                    <div className="ld__builder--empty-entity">
                                    <p>Course has no content yet.</p>
                                    <p>Add a new Lesson or add an existing one from the sidebar</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </>}

                    {IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS && IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS.length > 0 && <>
                    <div className="row">
                        <div className="col-12">
                        {IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS.map((lesson, index) => {
                            const { title, description, preview,  _states, _temp, quizzes } = lesson;
                            let stats = 'new';
                            let unsaved = false;
                            if( _temp && _temp._mod){
                                if(_temp._mod == "new"){
                                    stats = 'new';
                                } else if(_temp._mod == "edit"){
                                    stats = 'edit';
                                }
                            }

                            if( _temp && _temp._unsaved){
                                unsaved = true;
                            }

                            return <div key={index} className={`card mb-5 mb-xxl-10 ${stats}`}>
                                {/* <!--begin::Header NOT EDIT--> */}
                                { !_states._editTitle && <div className="card-header" style={{minHeight: '50px'}}>   
                                    {/* <!--begin::Title--> */}
                                    <div className="card-title">
                                        <h3 className='editable__title-root' onClick={() => dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
                                            index: index,
                                            type: '_editTitle',
                                            value: true
                                        }))}>
                                            {title}
                                        </h3>
                                    </div>
                                    {/* <!--end::Title--> */}
    
                                    {/* <!--begin::Toolbar--> */}
                                    <div className="card-toolbar">
                                        <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                            <input disabled={saving} onChange={(event) => dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
                                                index: index,
                                                type: 'preview',
                                                value: event.target.checked
                                            }))} className="form-check-input" type="checkbox" checked={preview? preview : false} value="1" />
                                            <span className="form-check-label text-muted">
                                                Preview
                                            </span>
                                        </label> &nbsp; &nbsp;
                                        {stats == "new" && <span className="badge badge-success">New</span>} &nbsp;
                                        {unsaved && <span className="badge badge-warning">Unsaved</span>} &nbsp;
                                        {saving && <span className='badge badge-success'>Saving...</span>}
                                    </div>
                                    {/* <!--end::Toolbar--> */}
                                </div>}
                                {/* <!--end::Header--> */}
    
                                {/* <!--begin::Header EDIT--> */}
                                { _states._editTitle && <div className="card-header">   
                                    {/* <!--begin::Title--> */}
                                    <div className="card-title">
                                        <h3>
                                            <div>
                                                <form onSubmit={(event) => saveLessonTitle(event, {
                                                    index:index,
                                                    type: 'temp-title',
                                                    value: title
                                                })}> 
                                                    <input disabled={saving} onChange={ (event) => dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
                                                        index: index,
                                                        type: 'title-onchange',
                                                        value: event.target.value
                                                    }))} required data-title={ _temp._title } type="text" placeholder="Add lesson title" value={title} />
                                                    <input disabled={saving} type="submit" className="is-button is-primary components-button ld__builder--new-entity-button" value="Save" />
                                                    <input disabled={saving} type="button" onClick={() => dispatch(update_ielts_lms_edit_course_builder_edit_lesson({
                                                        index: index,
                                                        type: 'title',
                                                        value: _temp._title
                                                    }))} className="is-button components-button is-default ld__builder--new-entity-button" value="Cancel" />
                                                </form>
                                            </div>
                                        </h3>
                                    </div>
                                    {/* <!--end::Title--> */}
    
                                </div>}
                                {/* <!--end::Header--> */}
    
                                {/* <!--begin::Body--> */}
                                <div className="card-body py-10">  
    
    
                                    <div className="ld__builder--child -expanded">
                                        {quizzes && quizzes.length <= 0 && <div className="">
                                            <div className="ld__builder--placeholder" data-label="0 Quizzes Selected"></div>
                                        </div>}
    
                                        {quizzes && quizzes.length > 0 && <div className="">
                                            {quizzes.map((qz) => {
                                                const { title, _id, _category } = qz;
                                                return <div className="quiz__card mb-2" key={_id}>
                                                    <div className="quiz__card-header d-flex">

                                                        <div className="quiz__card-tools d-flex ">
                                                            <div className="quiz__card-icon">
                                                                <img src={"/svgs/" + _category + ".svg"} />
                                                            </div>
                                                            <div className="quiz__card-title">{title}</div> 
                                                        </div>
                                                        <div className="quiz__card-tools">
                                                            <button disabled={saving} type="button" onClick={() => removeQuizFromLesson(index, _id)} className="btn btn-sm btn-light-danger" style={{display: 'flex',flexDirection: 'column',alignContent: 'center',width: '24px',height: '24px',padding: '0px',justifyContent: 'center',alignItems: 'center'}}>
                                                                <i className="fa fa-times p-0"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>}
    
                                        <div className="ld__builder--new-entities" style={{padding: '14px 0 0'}}>
                                            <div className="ld__builder--new-entity -collapsed d-flex justify-content-between w-100">
                                                <button disabled={saving} className="ld__builder--new-entity-add-button m-0" onClick={() => showModalQuiz(index)}>
                                                    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M185.066 128c0 3.534-2.866 6-6.4 6H134v44.666c0 3.534-2.467 6.399-6 6.399-3.534 0-6-2.865-6-6.399V134H77.332c-3.535 0-6.4-2.466-6.4-6s2.866-6 6.4-6H122V77.331c0-3.534 2.466-6.4 6-6.4 3.533 0 6 2.866 6 6.4V122h44.666c3.534 0 6.4 2.466 6.4 6zM256 128C256 57.42 198.58 0 128 0S0 57.42 0 128s57.42 128 128 128 128-57.42 128-128zm-12.8 0c0 63.521-51.679 115.2-115.2 115.2-63.522 0-115.2-51.679-115.2-115.2C12.8 64.478 64.478 12.8 128 12.8c63.521 0 115.2 51.678 115.2 115.2z" fillRule="nonzero"></path>
                                                    </svg>
                                                    Add Quizzes
                                                </button>
                                                {stats == "edit" && <button disabled={saving} onClick={() => removeCourseLesson(event,lesson._id)} className="btn-thin btn btn-light-danger btn-sm">
                                                    <i className="fa fa-trash-alt"></i> &nbsp; Remove lesson 
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
    
    
    
    
                                </div>
                                {/* <!--end::Body--> */}
                                
                                
                            </div>
                        })}
                        </div>
                        
                    </div>
                    </>}

                    {showAddLessonBox && 
                    <div className="ld__builder--new-entities">
                        <div className="ld__builder--new-entity -expanded d-flex">
                            {!addLessonTab && <>
                            <button disabled={saving} onClick={() => setAddLessonTab(true)} className="ld__builder--new-entity-add-button">
                                <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M185.066 128c0 3.534-2.866 6-6.4 6H134v44.666c0 3.534-2.467 6.399-6 6.399-3.534 0-6-2.865-6-6.399V134H77.332c-3.535 0-6.4-2.466-6.4-6s2.866-6 6.4-6H122V77.331c0-3.534 2.466-6.4 6-6.4 3.533 0 6 2.866 6 6.4V122h44.666c3.534 0 6.4 2.466 6.4 6zM256 128C256 57.42 198.58 0 128 0S0 57.42 0 128s57.42 128 128 128 128-57.42 128-128zm-12.8 0c0 63.521-51.679 115.2-115.2 115.2-63.522 0-115.2-51.679-115.2-115.2C12.8 64.478 64.478 12.8 128 12.8c63.521 0 115.2 51.678 115.2 115.2z" fillRule="nonzero"></path>
                                </svg>
                                New Lesson
                            </button>
                            <button disabled={saving} className="ld__builder--new-entity-button is-primary" onClick={saveLessons}>
                                {saving? 'Saving...' : 'Save Changes'}
                            </button>
                            </>}
                            {addLessonTab && 
                            <div className="ld__builder--new-entity -expanded">
                                <div>
                                    <form onSubmit={addLessonBox}>
                                        <input required onChange={(event) => setLessonTitle(event.target.value)} type="text" placeholder="Enter a title" value={lessonTitle} />
                                        <span>
                                            <input type="submit" className="is-primary ld__builder--new-entity-button" value="Add Lesson" />
                                            <input type="button" className="is-default ld__builder--new-entity-button" value="Cancel" onClick={() => setAddLessonTab(false)} />
                                        </span>
                                    </form>
                                </div>
                                
                            </div>}
                        </div>
                    </div>}

                    {/* BEGIN::modal quizz*/}                                        
                    <div tabIndex="0" className="media-modal wp-core-ui" role="dialog" aria-labelledby="media-frame-title" style={modalQuiz? { display: 'block' } : { display: 'none' }}>
                        <div className="media-modal-content" role="document">
                            <div className="edit-attachment-frame mode-select hide-menu hide-router">
                                <div className="edit-media-header">
                                    <button type="button" className="left bg-primary" onClick={addToCurrentLesson}>
                                        <i className="fa fa-check text-light"></i>
                                    </button>
                                    <button type="button" className="right">
                                        
                                    </button>
                                    <button type="button" className="media-modal-close" onClick={closeModalQuizzes}>
                                        <span className="media-modal-icon">
                                            <i className="fa fa-times"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="media-frame-title">
                                    <h1>Select Quizzes <span className="badge badge-circle badge-primary ms-2">{wishlist.length}</span></h1> 
                                </div>
                                <div className="media-frame-content">
                                    <div className="attachment-details save-ready media-frame">

                                        <div className="attachments-browser has-load-more hide-sidebar sidebar-for-errors">  
                                            {IELTS_LMS_EDIT_COURSE_BUILDER_STATES && IELTS_LMS_EDIT_COURSE_BUILDER_STATES.LOADED && <>
                                            
                                            {/* BEGIN::toolbar header */}
                                            <div className="d-flex flex-wrap flex-stack media-toolbar wp-filter flex-row align-items-center">
                                                <div className="d-flex flex-wrap align-items-center my-1">
                                                    
                                                    <div className="d-flex align-items-center position-relative">
                                                        <select onChange={filterByCategory} className='form-select form-select-sm form-select-solid w-150px me-5' value={IELTS_LMS_EDIT_COURSE_BUILDER_STATES.SELECTED_QUIZ_CATEGORY}>
                                                            <option value="all"> --ALL-- </option>
                                                            <option value="reading">Reading</option>
                                                            <option value="listening">Listening</option>
                                                            <option value="writing">Writing</option>
                                                            <option value="speaking">Speaking</option>
                                                        </select>   
                                                        {IELTS_LMS_EDIT_COURSE_BUILDER_STATES.SELECTED_QUIZ_CATEGORY}                                                    
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
                                            {/* END::toolbar header */}

                                            {/* BEGIN::toolbar pagination */}
                                            <div className="tablenav top d-flex align-items-center flex-row"> 

                                            </div>
                                            {/* END::toolbar pagination */}

                                            {/* BEGIN::Response area */}
                                            <div className="response-area">

                                                <ul tabIndex="-1" className="attachments ui-sortable ui-sortable-disabled p-4">
                                                    {IELTS_LMS_EDIT_COURSE_BUILDER && IELTS_LMS_EDIT_COURSE_BUILDER.LOADED && <>
                                                        {IELTS_LMS_EDIT_COURSE_BUILDER.QUIZZES && IELTS_LMS_EDIT_COURSE_BUILDER.QUIZZES.length > 0 && <>
                                                            {IELTS_LMS_EDIT_COURSE_BUILDER.QUIZZES.map((qz,index) => {
                                                                const { _category, title, _id, slug } = qz;
                                                                const isItemInWishlist = wishlist.some((wishlistItem) => wishlistItem._id === _id );
                                                                return <li key={_id} tabIndex="0" role="checkbox" aria-checked="false" data-id="2339" className={`attachment save-ready  ${isItemInWishlist? '-wished' : ''}`}>
                                                                    <button onClick={() => toggleWishlistItem({
                                                                        _id: _id,
                                                                        _category: _category,
                                                                        title: title,
                                                                        _slug: slug
                                                                    })} className="card w-100 hover-elevate-up shadow-sm parent-hover p-0">
                                                                        <div className={`card-body justify-content-between d-flex align-items flex-column p-2 w-100`}>
                                                                            <div className="w30-px ml-6 mx-3 custom-img-box mb-2 mt-2">
                                                                                <img src={"/svgs/"+_category+".svg"} /> 
                                                                            </div>  
                                                                            <span className="ms-3 text-gray-700 parent-hover-primary fs-6 fw-bold mb-2">
                                                                                {title}
                                                                            </span>
                                                                        </div>
                                                                    </button>         
                                                                </li>
                                                            })}
                                                        </>}
                                                    
                                                    </>}
                                                    
                                                </ul>



                                            </div>
                                            {/* END::Response area */}

                                            </>}  
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {modalQuiz && <div className="media-modal-backdrop"></div>} 
                    {/* END::modal quizz*/}  
                    
                </>}
                {IELTS_LMS_EDIT_COURSE_BUILDER.FAILED && <>
                
                </>}
            </>}
        </>}
    </>);
};

export default IeltsLmsEditMyCourseBuilder;