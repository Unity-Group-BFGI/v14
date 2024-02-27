import LoadIcon from "../LoadIcon";
import { IeltsLmsEditQuizDynamicMenuSkeleton } from "../Skeletons/Ieltslms";
import { 
    IELTS_LMS_MENU_MY_ITEMS, 
    OWNER_PRIMARY_MENU, 
    MY_ACCOUNT_MENU_ITEMS,
    CUSTOMER_PRIMARY_MENU,
    DOMAINS_MENU_ITEMS,
    MARKET_MENU_ITEMS
} from "../../includes/constants/menu";

import {
    IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS,
    IELTS_LMS_EDIT_MY_COURSE_DYNAMIC_OPTIONS
} from "../../includes/constants/ieltslms";

import {
    MY_DOMAIN_OVERVIEW_DYNAMIC_MENU
} from "../../includes/constants/domain";

import { update_menu } from "../../includes/redux/slices/menu.slice";
import { update_auth } from "../../includes/redux/slices/auth.slice";
import SvgLoader from "../SvgLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
    return (<div className="aside aside-extended">
        <DashboardSidebarPrimary />
        <DashboardSidebarSecondary />
    </div>);
};

const DashboardSidebarPrimary = () => {
    const dispatch = useDispatch();
    return (<div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
        {/* begin::logo */}
        <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10">
            <a href="" className="">
                <img src="" alt="Logo" className="h-50px" />
            </a>
        </div>
        {/* end::logo */}

        <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0">
            <LoadPrimaryMenu />
        </div>

        <div className="aside-footer d-flex flex-column align-items-center flex-column-auto">
            <div className="d-flex align-items-center mb-10">


                <button className="btn btn-icon btn-custom" onClick={() => dispatch(update_auth({
                    LOGOUT_MODAL: true
                }))}>
                    <i className="ki-duotone ki-exit-left fs-2 fs-lg-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                    </i>
                </button>


            </div>
        </div>
    </div>);
};

const DashboardSidebarSecondary = () => {
    return (<div className="aside-secondary d-flex flex-row-fluid">
        <div className="aside-workspace my-5 p-5">
            <div className="d-flex h-100 flex-column">
                <div className="flex-column-fluid hover-scroll-y">
                    <LoadMenu />
                </div>
            </div>
        </div>
    </div>);
};

const LoadMenu = () => {
    const dispatch = useDispatch();
    const { CURRENT_PRIMARY_MENU, CURRENT_SECONDARY_MENU_ACTIVE_ITEM } = useSelector(state => state.menu);
    const { IS_DYNAMIC_MENU_ACTIVE, DYNAMIC_MENU_LOADING } = useSelector(state => state.menu);
    const { HAS_DYNAMIC_MENU, DYNAMIC_MENU_FOR } = useSelector(state => state.menu);
    const { ROLE } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (CURRENT_PRIMARY_MENU == null) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [CURRENT_PRIMARY_MENU]);

    return (<div className="menu menu-column menu-sub-indention menu-rounded menu-active-bg menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 px-2 my-5 my-lg-0">
        {loading && <>
            Loading submenu
        </>}

        {/* begin::back to options button */}
        {<>
            {!IS_DYNAMIC_MENU_ACTIVE && <>
                {HAS_DYNAMIC_MENU && <>
                    <button onClick={() => dispatch(update_menu({
                        IS_DYNAMIC_MENU_ACTIVE: true
                    }))} type="button" className="btn btn-sm btn-light-primary w-100 mb-4">
                        <span className="menu-icon">
                            <span className="svg-icon svg-icon-2">
                                <i className="fa fa-chevron-left"></i> &nbsp;
                            </span>
                        </span>
                        <span className="menu-title">
                            {DYNAMIC_MENU_FOR == "DOMAINS" && <>Back to My Domain</>}
                            {DYNAMIC_MENU_FOR == "IELTS-LMS" && <>Back to Edit Quiz</>}
                        </span>
                    </button>
                </>}
            </>}
        </>}
        {/* end::back to options button */}

        {CURRENT_PRIMARY_MENU === "IELTS-LMS" && <>

            {HAS_DYNAMIC_MENU && <>
                {IS_DYNAMIC_MENU_ACTIVE && <>
                    {<>
                        <button onClick={() => dispatch(update_menu({
                            IS_DYNAMIC_MENU_ACTIVE: false
                        }))} type="button" className="btn btn-sm btn-light-primary w-100 mb-4">
                            <span className="menu-icon">
                                <span className="svg-icon svg-icon-2">
                                    <i className="fa fa-chevron-left"></i> &nbsp;
                                </span>
                            </span>
                            <span className="menu-title">
                                Back to Quizzes
                            </span>
                        </button>

                        {DYNAMIC_MENU_LOADING && <>
                            <IeltsLmsEditQuizDynamicMenuSkeleton />
                        </>}

                    </>}

                    {!DYNAMIC_MENU_LOADING && <>
                        <IeltsLmsLoadDynamicMenu />
                    </>}

                </>}

            </>}

            {!IS_DYNAMIC_MENU_ACTIVE && <>
                
                    <div className="menu-item">
                        <div className="menu-content pb-2">
                            <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                IELTS LMS
                            </span>
                        </div>
                    </div>
                    {IELTS_LMS_MENU_MY_ITEMS && IELTS_LMS_MENU_MY_ITEMS.length > 0 && IELTS_LMS_MENU_MY_ITEMS.map((menu, index) => {
                        const { LINK, SECONDARY } = menu;
                        const MERGE_LINK = `/dashboard/@${ROLE}${LINK}`;
                        return (<div key={index} className="menu-item">
                            <Link className={CURRENT_SECONDARY_MENU_ACTIVE_ITEM === SECONDARY ? "menu-link active" : "menu-link"} to={MERGE_LINK}>
                                <span className="menu-icon">
                                    <LoadIcon icon={menu.ICON} />
                                </span>
                                <span className="menu-title">{menu.MENU_TITLE}</span>
                            </Link>
                        </div>)
                    })}
                
            </>}

        </>}

        {CURRENT_PRIMARY_MENU === "MY-ACCOUNT" && <>
            <div className="menu-item">
                <div className="menu-content pb-2">
                    <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                        My Account
                    </span>
                </div>
            </div>
            {MY_ACCOUNT_MENU_ITEMS && MY_ACCOUNT_MENU_ITEMS.length > 0 && MY_ACCOUNT_MENU_ITEMS.map((menu, index) => {
                const { LINK, SECONDARY } = menu;
                const MERGE_LINK = `/dashboard/@${ROLE}${LINK}`;
                return (<div key={index} className="menu-item">
                    <Link className={CURRENT_SECONDARY_MENU_ACTIVE_ITEM === SECONDARY ? "menu-link active" : "menu-link"} to={MERGE_LINK}>
                        <span className="menu-icon">
                            <LoadIcon icon={menu.ICON} />
                        </span>
                        <span className="menu-title">{menu.MENU_TITLE}</span>
                    </Link>
                </div>)
            })}
        </>}

        {CURRENT_PRIMARY_MENU === "MARKET" && <>
            <div className="menu-item">
                <div className="menu-content pb-2">
                    <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                        Marketplace
                    </span>
                </div>
            </div>
            {MARKET_MENU_ITEMS && MARKET_MENU_ITEMS.length > 0 && MARKET_MENU_ITEMS.map((menu, index) => {
                const { LINK, SECONDARY } = menu;
                const MERGE_LINK = `/dashboard/@${ROLE}${LINK}`;
                return (<div key={index} className="menu-item">
                    <Link className={CURRENT_SECONDARY_MENU_ACTIVE_ITEM === SECONDARY ? "menu-link active" : "menu-link"} to={MERGE_LINK}>
                        <span className="menu-icon">
                            <LoadIcon icon={menu.ICON} />
                        </span>
                        <span className="menu-title">{menu.MENU_TITLE}</span>
                    </Link>
                </div>)
            })}
        </>}

        {CURRENT_PRIMARY_MENU === "DOMAINS" && <>

            {HAS_DYNAMIC_MENU && <>
                {IS_DYNAMIC_MENU_ACTIVE && <>
                    {<>
                        <button onClick={() => dispatch(update_menu({
                            IS_DYNAMIC_MENU_ACTIVE: false
                        }))} type="button" className="btn btn-sm btn-light-primary w-100 mb-4">
                            <span className="menu-icon">
                                <span className="svg-icon svg-icon-2">
                                    <i className="fa fa-chevron-left"></i> &nbsp;
                                </span>
                            </span>
                            <span className="menu-title">
                                Back to My Domains
                            </span>
                        </button>
                        {DYNAMIC_MENU_LOADING && <>
                            <IeltsLmsEditQuizDynamicMenuSkeleton />
                        </>}
                    </>}
                    

                    

                    {!DYNAMIC_MENU_LOADING && <>
                        <MyDomainDynamicMenu />
                    </>}

                </>}

            </>}

            {!IS_DYNAMIC_MENU_ACTIVE && <>
                

                    <div className="menu-item">
                        <div className="menu-content pb-2">
                            <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                DOMAINS
                            </span>
                        </div>
                    </div>

                    {DOMAINS_MENU_ITEMS && DOMAINS_MENU_ITEMS.length > 0 && DOMAINS_MENU_ITEMS.map((menu, index) => {
                        const { LINK, SECONDARY } = menu;
                        const MERGE_LINK = `/dashboard/@${ROLE}${LINK}`;
                        return (<div key={index} className="menu-item">
                            <Link className={CURRENT_SECONDARY_MENU_ACTIVE_ITEM === SECONDARY ? "menu-link active" : "menu-link"} to={MERGE_LINK}>
                                <span className="menu-icon">
                                    <LoadIcon icon={menu.ICON} />
                                </span>
                                <span className="menu-title">{menu.MENU_TITLE}</span>
                            </Link>
                        </div>)
                    })} 

                
            </>}

        </>}

    </div>);
};

const LoadPrimaryMenu = () => {
    const dispatch = useDispatch();
    const { CURRENT_PRIMARY_MENU }      = useSelector(state => state.menu);
    const { USER_MENU }                 = useSelector(state => state.menu);
    const { ROLE, USER_PERMISSIONS }    = useSelector(state => state.auth);
    const [loading, setLoading]         = useState(true);
    const [menus,setMenu]               = useState([]);

    const setPrimaryMenu = (p) => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: p
        }));
    };

    useEffect(() => {
        setLoading(true);
        if(ROLE === "owner"){
            if(OWNER_PRIMARY_MENU && OWNER_PRIMARY_MENU.length > 0){
                let menu = USER_MENU || [];
                setMenu([...OWNER_PRIMARY_MENU,...menu]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } else if(ROLE === "customer"){
            if(CUSTOMER_PRIMARY_MENU && CUSTOMER_PRIMARY_MENU.length > 0){
                let menu = USER_MENU || [];
                setMenu([...CUSTOMER_PRIMARY_MENU,...menu]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    },[ROLE,USER_MENU]);

    return (<>
        <ul className="nav flex-column" role="tablist">
            {menus && menus.length > 0 && menus.map((menu, index) => {
                const { PRIMARY, ICON, MENU_TITLE } = menu;
                return (<li key={index} className="nav-item mb-2">
                    <a
                        type="button"
                        onClick={() => setPrimaryMenu(PRIMARY)}
                        title={MENU_TITLE}
                        role="tab"
                        className={CURRENT_PRIMARY_MENU == PRIMARY ? "nav-link btn btn-custom flex-column d-flex align-items-center active" : "nav-link btn btn-custom flex-column d-flex align-items-center"}
                    >
                        <LoadIcon icon={ICON} />
                        <small>{MENU_TITLE}</small>
                    </a>
                </li>)
            })}
        </ul>
    </>);
};

// load dynamic menu content
const IeltsLmsLoadDynamicMenu = () => {
    const dispatch = useDispatch();
    const [dmenu, setDmenu] = useState([]);
    const { CURRENT_DYNAMIC_MENU, CURRENT_DYNAMIC_PARAM } = useSelector(state => state.menu);

    useEffect(() => {
        if (CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-reading") {
            setDmenu(IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS);
        } else if (CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-listening") {
            setDmenu(IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS);
        } else if (CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-writing") {
            setDmenu(IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS);
        } else if (CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-QUIZ-speaking") {
            setDmenu(IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS);
        } else if (CURRENT_DYNAMIC_MENU === "IELTS-LMS-EDIT-MY-COURSE") {
            setDmenu(IELTS_LMS_EDIT_MY_COURSE_DYNAMIC_OPTIONS);
        } else {
            setDmenu([]);
        }
    }, [CURRENT_DYNAMIC_MENU]);

    return (<>
        {dmenu && dmenu.length > 0 && dmenu.map((menu, index) => {
            const { key, params, meta } = menu;
            return (<div
                key={key}
                className={params.param3 === CURRENT_DYNAMIC_PARAM ? "d-flex align-items-center mb-3 subchild p-2 active " + meta.activeClass : "d-flex subchild align-items-center mb-3 p-2"}
                type="button"
                onClick={() => dispatch(update_menu({
                    CURRENT_DYNAMIC_PARAM: params.param3
                }))}
            >
                <div className="symbol symbol-50px me-5">
                    <span className={"symbol-label " + meta.iconBgColorClass}>
                        <span className={"svg-icon svg-icon-2x " + meta.iconColorClass}>
                            <SvgLoader type={meta.icon} />
                        </span>
                    </span>
                </div>
                <div className="d-flex flex-column">
                    <p className="text-gray-800 text-hover-primary fs-6 fw-semibold mb-0">{meta.heading}</p>
                    <span className="text-muted fw-semibold">{meta.subHeading}</span>
                </div>
            </div>)
        })}
    </>);
};

// load dynamic menu content
const MyDomainDynamicMenu = () => {
    const dispatch = useDispatch();
    const [dmenu, setDmenu] = useState([]);
    const { CURRENT_DYNAMIC_MENU, CURRENT_DYNAMIC_PARAM } = useSelector(state => state.menu);

    useEffect(() => {
        if (CURRENT_DYNAMIC_MENU === "MY-DOMAIN") {
            setDmenu(MY_DOMAIN_OVERVIEW_DYNAMIC_MENU);
        } else {
            setDmenu([]);
        }
    }, [CURRENT_DYNAMIC_MENU]);

    return (<>
        {dmenu && dmenu.length > 0 && dmenu.map((menu, index) => {
            const { key, params, meta } = menu;
            return (<div
                key={key}
                className={params.param3 === CURRENT_DYNAMIC_PARAM ? "d-flex align-items-center mb-3 subchild p-2 active " + meta.activeClass : "d-flex subchild align-items-center mb-3 p-2"}
                type="button"
                onClick={() => dispatch(update_menu({
                    CURRENT_DYNAMIC_PARAM: params.param3
                }))}
            >
                <div className="symbol symbol-50px me-5">
                    <span className={"symbol-label " + meta.iconBgColorClass}>
                        <span className={"svg-icon svg-icon-2x " + meta.iconColorClass}>
                            <SvgLoader type={meta.icon} />
                        </span>
                    </span>
                </div>
                <div className="d-flex flex-column">
                    <p className="text-gray-800 text-hover-primary fs-6 fw-semibold mb-0">{meta.heading}</p>
                    <span className="text-muted fw-semibold">{meta.subHeading}</span>
                </div>
            </div>)
        })}
    </>);
};

export default DashboardSidebar;