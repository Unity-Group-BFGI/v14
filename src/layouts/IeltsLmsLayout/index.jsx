import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const IeltsLmsLayout = ({children}) => {
    const [loading,setLoading]  = useState(true);
    const { IELTS_LMS_OVERALL } = useSelector( state => state.ieltsLms );

    useEffect(() => {
        if(IELTS_LMS_OVERALL){
            if(IELTS_LMS_OVERALL.LOADED && !IELTS_LMS_OVERALL.LOADING){
                setLoading(false);
            } else if(!IELTS_LMS_OVERALL.LOADED && !IELTS_LMS_OVERALL.LOADING){
                setLoading(true);
            }
        }
    },[IELTS_LMS_OVERALL]);

    return (<>
        {loading? <>
            <IeltsLmsMainLayoutSkeleton />
        </> : <>
            {children}
        </>}
    </>);
};


const IeltsLmsMainLayoutSkeleton = () => {
    const colorClass = 'primary';
    return (<>
            <div className={`alert alert-dismissible bg-light-${colorClass} d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10`}>
                {/* begin::Close */}
                <button type="button" className={`position-absolute top-0 end-0 m-2 btn btn-icon btn-icon-${colorClass}`}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </button>
                {/* end::Close */}

                {/* begin::Icon */}
                <i className={`ki-duotone ki-information-5 fs-5tx text-${colorClass} mb-5`}>
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                </i>
                {/* end::Icon */}

                {/* begin::Wrapper */}
                <div className="text-center">
                    {/* begin::Title */}
                    <h1 className="fw-bold mb-5">This is an alert</h1>
                    {/* end::Title */}

                    {/* begin::Separator */}
                    <div className={`separator separator-dashed border-${colorClass} opacity-25 mb-5`}></div>
                    {/* end::Separator */}

                    {/* begin::Content */}
                    <div className="mb-9 text-dark">
                        The alert component can be used to highlight certain parts of your page for 
                        <strong>higher content visibility</strong>.
                    </div>
                    {/* end::Content */}

                    {/* begin::Buttons */}
                    <div className="d-flex flex-center flex-wrap">
                        <a href="#" className={`btn btn-outline btn-outline-${colorClass} btn-active-${colorClass} m-2`}>Cancel</a>
                        <a href="#" className={`btn btn-${colorClass} m-2`}>Ok, I got it</a>
                    </div>
                    {/* end::Buttons */}
                </div>
                {/* end::Wrapper */}
            </div>
    </>);
};

export default IeltsLmsLayout;