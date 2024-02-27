import { useDispatch, useSelector } from "react-redux";
import { update_modals } from "../../includes/redux/slices/modals.slice";

const DashboardHeader = () => {
    const { PAGE_HEADING }                                  = useSelector( state => state.menu );
    const { BREADCRUM_ONE, BREADCRUM_TWO, BREADCRUM_THREE } = useSelector( state => state.menu );
    return (<>
        <div data-sticky-class="header-sticky" className={'header'}>
            <div className="container-xxl d-flex align-items-center justify-content-between">
                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">
                    <h1 className="text-dark fw-semibold my-0 fs-2">
                        {PAGE_HEADING}
                    </h1>

                    <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                        <li className={"breadcrumb-item text-muted"}>{BREADCRUM_ONE}</li>
                        <li className={"breadcrumb-item text-muted"}>{BREADCRUM_TWO}</li>
                        <li className={"breadcrumb-item text-muted"}>{BREADCRUM_THREE}</li>
                    </ul>

                </div>
                <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
                    <div className="btn btn-icon btn-active-icon-primary" onClick={() => { }}>
                        <span className="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                    <a href="/dashboard" className="d-flex align-items-center">
                        <img alt="Logo" src={"https://preview.keenthemes.com/seven-html-pro/assets/media/logos/logo-default.svg"} className="h-40px" />
                    </a>
                </div>

                <div className="d-flex flex-shrink-0">
                    <DynamicHeader />
                </div>

            </div>
        </div>
    </>);
};

const DashboardHeaderBodySm = () => {
    const { PAGE_HEADING }                                  = useSelector( state => state.menu );
    const { BREADCRUM_ONE, BREADCRUM_TWO, BREADCRUM_THREE } = useSelector( state => state.menu );

    return (<>
        <div className="d-lg-none page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">
            <h1 className="text-dark fw-semibold my-0 fs-2">
                {PAGE_HEADING}
            </h1>
            
            <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                <li className="breadcrumb-item text-muted">{BREADCRUM_ONE}</li>
                <li className="breadcrumb-item text-muted">{BREADCRUM_TWO}</li>
                <li className="breadcrumb-item text-dark">{BREADCRUM_THREE}</li>
            </ul>
        </div>
    </>);
};

const DynamicHeader = () => {
    const dispatch                  = useDispatch();
    const { DYNAMIC_HEADER }        = useSelector( state => state.menu );
    
    return (<>
        {DYNAMIC_HEADER !== null && <>
            {DYNAMIC_HEADER == "IELTS-LMS-MY-QUIZZES" && <>
                <button className="btn btn-primary btn-sm" type="button" onClick={() => dispatch(update_modals({
                    IELTS_ADD_QUIZ_MODAL: true,
                    IELTS_ADD_COURSE_MODAL: false,
                }))}>
                    <i className="fa fa-plus"></i> Add New Quiz
                </button>
            </>}
            {DYNAMIC_HEADER == "IELTS-LMS-MY-COURSES" && <>
                <button className="btn btn-primary btn-sm" type="button" onClick={() => dispatch(update_modals({
                    IELTS_ADD_COURSE_MODAL: true,
                    IELTS_ADD_QUIZ_MODAL: false
                }))}>
                    <i className="fa fa-plus"></i> Add New Course
                </button>
            </>}
        </>}
    </>);
};

export { DashboardHeader, DashboardHeaderBodySm };