import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';

import ENDPOINTS from '../../../../../../includes/constants/routes';
import { update_menu } from "../../../../../../includes/redux/slices/menu.slice";
import { IeltsLmsEditQuizBasicEditSkeleton } from "../../../../../../components/Skeletons/Ieltslms";
import { update_ieltslms_editCourse } from "../../../../../../includes/redux/slices/ieltslms.slice";


const IeltsLmsEditMyCourseBasicEdit = () => {
    const dispatch                                  = useDispatch();
    const { id }                                    = useParams();
    const { ENDPOINT }                              = ENDPOINTS;
    const { ROUTES_LOADED, USER }                   = useSelector( state => state.auth );
    const { IELTS_LMS_EDIT_MY_COURSE }              = useSelector( state => state.ieltslms );
    const { IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE }  = useSelector( state => state.constants );
    const [basicCourse,setBasicCourse]              = useState({
        title: '',
        description: '',
        status: '',
        category: '',
        _payment:{
            price: 0,
            sale: 0,
            access: 'open',
            expire:{
                status: "never",
                dd: 0,
                hh: 0,
                min: 0,
                ss: 0
            }
        }
    });
    const [loading, setLoading]                     = useState(true);
    const [saving, setSaving]                       = useState(false);


    // basic edit 
    const basicEditSubmit = (event) => {
        event.preventDefault();
        if( IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE && IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE.endpoint ){
            setSaving(true);
            axios.post(`${ENDPOINT}${IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE.endpoint}/${id}`, {
                course: {

                    title: basicCourse.title,
                    description: basicCourse.description,
                    status: basicCourse.status,
                    category: basicCourse.category,
                    _payment:{
                        price: basicCourse._payment.price,
                        sale: basicCourse._payment.sale,
                        access: basicCourse._payment.access,
                        expire:{
                            status: basicCourse._payment.expire.status,
                            dd: basicCourse._payment.expire.dd,
                            hh: basicCourse._payment.expire.hh,
                            min: basicCourse._payment.expire.min,
                            ss: basicCourse._payment.expire.ss
                        }
                    }
                }
            }, {
                headers: {
                    'Authorization': 'Bearer ' + USER.accessToken,
                    'x-refresh': 'ref ' + USER.refreshToken,
                    'x-ssf': 'xss PVRP'
                }
            }).then((response) => {
                if (response.data.success) {
                    dispatch(update_ieltslms_editCourse({
                        COURSE: {
                            ...IELTS_LMS_EDIT_MY_COURSE.COURSE,
                            ...basicCourse
                        }
                    }));

                }

                if (response.data.error) {
                    toast.error(response.data.error.message, {
                        position: "top-right",
                        autoClose: 3000,
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
                        autoClose: 3000,
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
            toast.warning("Failed to locate edit course Basic endpoint", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    // discard changes
    const discardChanges = () => {
        if (IELTS_LMS_EDIT_MY_COURSE.LOADED) {
            setBasicCourse({
                ...basicCourse,
                ...IELTS_LMS_EDIT_MY_COURSE.COURSE
            });
            setLoading(false);
        }
    };

    // event when quiz id found ------------- [step 0]
    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'IELTS-LMS',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'IELTS-LMS-MY-COURSES',
            CURRENT_DYNAMIC_MENU: "IELTS-LMS-EDIT-MY-COURSE",
            CURRENT_DYNAMIC_PARAM: "IELTS-LMS-EDIT-MY-COURSE-BASIC-EDIT",

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
            DYNAMIC_HEADER: 'IELTS-LMS-EDIT-MY-COURSE',
            TAB_TITLE: 'Edit Course | IELTS LMS | Dashboard'
        }));
    }, [id]);

    // event for route links   ------------- [step 1]
    useEffect(() => {
        setLoading(true);
        if (ROUTES_LOADED) {
            if( IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE && IELTS_LMS_EDIT_MY_COURSE_BASIC_ROUTE.endpoint ){
                discardChanges();
            } else {
                toast.warning("Failed to locate edit course Basic endpoint", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            toast.info("Routes not loaded fully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    }, [ROUTES_LOADED, IELTS_LMS_EDIT_MY_COURSE]);


    return (<>
        {loading ? <IeltsLmsEditQuizBasicEditSkeleton /> : <>
            <form className="form" onSubmit={basicEditSubmit}>

                <div className="card mb-8">
                    {/*--begin::Card header--*/}
                    <div className="card-header">
                        {/*--begin::Card title--*/}
                        <div className="card-title fs-3 fw-bold">Basic details</div>
                        {/*--end::Card title--*/}
                    </div>
                    {/*--end::Card header--*/}
                    {/*--begin::Form--*/}


                    {/*--begin::Card body--*/}
                    <div className="card-body p-9">

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Course title*</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <input 
                                    placeholder='Course title' 
                                    required 
                                    disabled={saving} 
                                    type="text" 
                                    className={`form-control form-control-solid`} 
                                    name="title" 
                                    value={basicCourse.title} 
                                    onChange={(event) => setBasicCourse({
                                        ...basicCourse,
                                        title: event.target.value
                                    })} 
                                />
                                <div className="fv-plugins-message-container invalid-feedback"></div>
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
                                <textarea 
                                    placeholder='describe your course'
                                    disabled={saving} 
                                    name="description" 
                                    className={`form-control form-control-solid h-100px `} 
                                    style={{ height: "123px" }} 
                                    value={basicCourse.description} 
                                    onChange={(event) => setBasicCourse({
                                        ...basicCourse,
                                        description: event.target.value
                                    })}
                                ></textarea>
                                <div className="fv-plugins-message-container invalid-feedback">{}</div>
                            </div>
                            {/*--begin::Col--*/}
                        </div>
                        {/*--end::Row--*/}

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Course category</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9">

                                <select 
                                    className={`form-select form-select-solid w-200px `} 
                                    name="status" 
                                    value={basicCourse.category} 
                                    onChange={(event) => setBasicCourse({
                                        ...basicCourse,
                                        category: event.target.value
                                    })} 
                                    disabled={saving}
                                >
                                    <option value="uncategorized">Uncategorized</option>
                                    <option value="general">General</option>
                                    <option value="academic">Academic</option>
                                </select>
                            </div>
                            {/*--end::Col--*/}

                        </div>
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

                                <select 
                                    className={`form-select form-select-solid w-200px `} 
                                    name="status" 
                                    value={basicCourse.status} 
                                    onChange={(event) => setBasicCourse({
                                        ...basicCourse,
                                        status: event.target.value
                                    })} 
                                    disabled={saving}
                                >
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
                </div>

                {/* begin::payment addon */}
                <div className="card mb-8">
                    {/*--begin::Card header--*/}
                    <div className="card-header">
                        {/*--begin::Card title--*/}
                        <div className="card-title fs-3 fw-bold">Course enrollment</div>
                        {/*--end::Card title--*/}
                    </div>
                    {/*--end::Card header--*/}
                    {/*--begin::Form--*/}


                    {/*--begin::Card body--*/}
                    <div className="card-body p-9">

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Course Access</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                
                                <div className="row">
                                    <div className="position-relative col-12" htmlFor="dd">
                                        <select 
                                            className={`form-select form-select-solid`} 
                                            name="expires-in-status" 
                                            value={basicCourse._payment.access} 
                                            onChange={(event) => setBasicCourse({
                                                ...basicCourse,
                                                _payment:{
                                                    ...basicCourse._payment,
                                                    access: event.target.value
                                                }
                                            })} 
                                            disabled={saving}
                                        >
                                            <option value="open">Open</option>
                                            <option value="enroll">Enroll</option>
                                            
                                        </select>
                                    </div>                                     
                                </div>

                            
                            </div>
                        </div>
                        {/*--end::Row--*/}
                        {basicCourse._payment.access === "enroll"  &&                     
                        <div className="row mb-8">
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Payment</div>
                            </div>
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <div className="row">
                                    <div className="position-relative col-6">
                                        <div className="mb-3 form-floating">
                                            <CurrencyInput 
                                                intlConfig={{ locale: 'en-IN', currency: 'INR' }} 
                                                placeholder="Price" 
                                                name="price" 
                                                id="price"
                                                value={basicCourse._payment.price}
                                                onValueChange={(value, name, values) => setBasicCourse({
                                                    ...basicCourse,
                                                    _payment:{
                                                        ...basicCourse._payment,
                                                        price: value
                                                    }
                                                })}
                                                
                                                className="no-valdiations form-control form-control-solid border-0 text-center"
                                            />
                                            
                                            <label htmlFor="price">Price</label>
                                        </div>
                                    </div>
                                    <div className="position-relative col-6">
                                        <div className="mb-3 form-floating">
                                            <CurrencyInput 
                                                intlConfig={{ locale: 'en-IN', currency: 'INR' }} 
                                                placeholder="Sale Price" 
                                                name="sale" 
                                                id="sale"
                                                value={basicCourse._payment.sale}
                                                onValueChange={(value, name, values) => setBasicCourse({
                                                    ...basicCourse,
                                                    _payment:{
                                                        ...basicCourse._payment,
                                                        sale: value
                                                    }
                                                })}
                                                
                                                className="no-valdiations form-control form-control-solid border-0 text-center"
                                            />
                                            
                                            <label htmlFor="sale">Sale Price</label>
                                        </div>
                                        
                                    </div>        
                                </div>
                            </div>
                        </div>}

                        {/*--begin::Row--*/}
                        {basicCourse._payment.access === "enroll" && <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Expires in</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                
                                <div className="row">
                                    <div className="position-relative col-6" htmlFor="dd">
                                        <select 
                                            className={`form-select form-select-solid`} 
                                            name="expires-in-status" 
                                            value={basicCourse._payment.expire.status} 
                                            onChange={(event) => setBasicCourse({
                                                ...basicCourse,
                                                _payment:{
                                                    ...basicCourse._payment,
                                                    expire: {
                                                        ...basicCourse._payment.expire,
                                                        status: event.target.value
                                                    }
                                                }
                                            })} 
                                            disabled={saving}
                                        >
                                            <option value="never">Never</option>
                                            <option value="time">Days</option>
                                            
                                        </select>
                                    </div> 
                                    {basicCourse._payment.expire.status === "time" && 
                                    <div className="position-relative col-6 d-flex">
                                        <div className="mb-3 form-floating">
                                            <input 
                                                type="number" 
                                                className="no-valdiations form-control form-control-solid border-0 text-center" 
                                                placeholder="Days" 
                                                name="dd" 
                                                id="days"
                                                value={basicCourse._payment.expire.dd} 
                                                onChange={(event) => setBasicCourse({
                                                    ...basicCourse,
                                                    _payment:{
                                                        ...basicCourse._payment,
                                                        expire:{
                                                            ...basicCourse._payment.expire,
                                                            dd: event.target.value
                                                        }
                                                    }
                                                })} 
                                            />
                                            <label htmlFor="days">Number of Days</label>
                                        </div>
                                    </div>}
                                </div>




                            </div>
                        </div>}
                        {/*--end::Row--*/}
                        

                    </div>
                    {/*--end::Card body--*/}

                </div>
                {/* end::payment addon */}

                

                <div className="card mb-8">
                    {/*--begin::Card footer--*/}
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <button disabled={saving} type="button" className="btn btn-light btn-active-light-primary me-2 btn-sm" onClick={discardChanges}>Discard</button>
                        <button disabled={saving} type="submit" className="btn btn-primary btn-sm">
                            {saving && <>
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> &nbsp; Saving...
                            </>}
                            {!saving && 'Save changes'}
                        </button>
                    </div>
                    {/*--end::Card footer--*/}
                </div>

            </form>
        </>}
    </>);
};


const Thumbnail = () => {
    return (<>
    
                <div className="card mb-8">
                    {/*--begin::Card header--*/}
                    <div className="card-header">
                        {/*--begin::Card title--*/}
                        <div className="card-title fs-3 fw-bold">Thumbail</div>
                        {/*--end::Card title--*/}
                    </div>
                    {/*--end::Card header--*/}
                    {/*--begin::Form--*/}


                    {/*--begin::Card body--*/}
                    <div className="card-body p-9">

                        {/*--begin::Row--*/}
                        <div className="row mb-8">
                            {/*--begin::Col--*/}
                            <div className="col-xl-3">
                                <div className="fs-6 fw-semibold mt-2 mb-3">Thumbnail</div>
                            </div>
                            {/*--end::Col--*/}
                            {/*--begin::Col--*/}
                            <div className="col-xl-9 fv-row fv-plugins-icon-container">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-block">
                                        {/* <!--begin::Image input--> */}
                                        <div className="image-input image-input-outline" data-kt-image-input="true" style={{}}>

                                            {/* <!--begin::Preview existing avatar--> */}
                                            <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: 'url()' }}>

                                            </div>
                                            {/* <!--end::Preview existing avatar--> */}
                                        </div>
                                        {/* <!--end::Image input--> */}
                                        {/* <!--begin::Hint--> */}
                                        <div className="form-text">Allowed file types:  png, jpg, jpeg.</div>
                                        {/* <!--end::Hint--> */}
                                    </div>
                                    <div className="d-block card w-100">
                                        <div className="card-body d-flex flex-column w-300px">
                                            <button className="btn btn-light mb-2"> Remove Thumbnail </button>
                                            <button className="btn btn-light mb-2"> Insert from Link </button>
                                            <button className="btn btn-light mb-2"> Browse Thumbnails </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*--end::Row--*/}

                    </div>
                    {/*--end::Card body--*/}

                </div>
    
    </>);
}

export default IeltsLmsEditMyCourseBasicEdit;