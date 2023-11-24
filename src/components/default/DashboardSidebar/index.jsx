import './sidebar.css';
import { update_route } from '../../../includes/redux-store/Slices/Route.slice';
import { update_theme } from "../../../includes/redux-store/Slices/Theme.slice";
import LoadIcon from '../LoadIcon';
import { SecondryMenuSkeleton } from "../Skeletons/theme.skeleton";
import { PrimaryMenuSkeleton } from '../Skeletons/theme.skeleton';
import { IeltsLmsEditQuizDynamicMenuSkeleton } from '../Skeletons/IeltsLms.skeleton';
import SvgLoader from '../SvgLoader';


import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Placeholder from 'react-bootstrap/Placeholder';
import { update_dashboard } from '../../../includes/redux-store/Slices/Dashboard.slice';





const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const PrimarySidebarDashboard = () => {
    const dispatch = useDispatch();
    const { PARAM1 }                                                = useSelector( state => state.route);
    const { DASHBOARD_MENUS, DASHBOARD_MENU_LOADING }               = useSelector( state => state.dashboard );
    const { DASHBOARD_OVERALL_LOADING, DASHBOARD_OVERALL_LOADED }   = useSelector( state => state.dashboard );

    
    const setParams = (param1) => {
        
        dispatch(update_route({
            PARAM1: param1
        }));
        dispatch(update_theme({
            SIDEBAR_EXPAND: true
        }));
    };

    

    return (<>
        <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
            <div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10">		
                <a href="/dashboard">
                    <img alt="Logo" src={"/svgs/logo-default.svg"} className="h-50px" />
                </a>
            </div>
            <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0">

                {(DASHBOARD_OVERALL_LOADING && !DASHBOARD_OVERALL_LOADED)? <>
                    <PrimaryMenuSkeleton />               
                </> : <></>}


                {(!DASHBOARD_OVERALL_LOADING && DASHBOARD_OVERALL_LOADED)? <>
                    {(DASHBOARD_MENUS && DASHBOARD_MENUS.length > 0)? <>
                        <ul className="nav flex-column" role="tablist">
                            {DASHBOARD_MENUS.map((mu,key) => {
                                const { meta, params } = mu;
                                let classes = "nav-link btn btn-custom btn-icon";
                                if( PARAM1 === params.param1 ){
                                    classes = "nav-link btn btn-custom btn-icon active";
                                }
                                                                
                                return <React.Fragment key={key}>
                                    <li className="nav-item mb-2" role="presentation">
                                        <LightTooltip title={meta.menuTitle} arrow placement="right">
                                            <a className={classes} role="tab" onClick={() => setParams(params.param1)}>
                                                <LoadIcon icon={meta.icon} />                     
                                            </a>
                                        </LightTooltip>
                                    </li>
                                </React.Fragment>
                            })}   
                        </ul>
                    </> : <></>}
                </> : <></>}            
                

            </div>
            <div className="aside-footer d-flex flex-column align-items-center flex-column-auto">
                            
            </div>
        </div>
    </>);
};

const SecondarySidebarDashboard = () => {
    const dispatch = useDispatch();
    const { PARAM1, PARAM2, PARAM3, HAS_DYNAMIC_ROUTE, ACTIVE_DYNAMIC_SUBMENU, HAS_DYNAMIC_SUBMENU } = useSelector( state => state.route);
    const { DASHBOARD_CURRENT_SUBMENUS, DASHBOARD_CURRENT_MAIN_MENU }   = useSelector( state => state.dashboard );
    const { DASHBOARD_SUBMENU_LOADING, DASHBOARD_MENU_LOADING }         = useSelector( state => state.dashboard );
    const { DASHBOARD_OVERALL_LOADING, DASHBOARD_OVERALL_LOADED }       = useSelector( state => state.dashboard );
    const { DASHBOARD_CURRENT_ACTIVE_SUBMENU }                          = useSelector( state => state.dashboard );
    const { DASHBOARD_DYNAMIC_MENU, DASHBOARD_DYNAMIC_MENU_LOADING }    = useSelector( state => state.dashboard );

    return (<div className="aside-secondary d-flex flex-row-fluid">
        <div className="aside-workspace my-5 p-5">
            <div className="d-flex h-100 flex-column">
                <div className="menu menu-column menu-sub-indention menu-rounded menu-active-bg menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 px-2 my-5 my-lg-0">                      

                    {(!DASHBOARD_OVERALL_LOADED && DASHBOARD_OVERALL_LOADING)? <>

                        <div className="menu-item px-4 pb-0 mb-0">
                            <Placeholder as={"p"} animation="glow" className={"mb-2 pb-0"}>
                                <Placeholder xs={12} style={{minHeight: "20px", width: '80px'}} />
                            </Placeholder>
                        </div>

                        <SecondryMenuSkeleton />     

                    </> : <></>}  
                    
                    {/* ---BEGIN:: ALL DONE--- */}
                    {(DASHBOARD_OVERALL_LOADED && !DASHBOARD_OVERALL_LOADING)? <>

                        {(DASHBOARD_CURRENT_ACTIVE_SUBMENU)? <>
                        
                            {(DASHBOARD_CURRENT_ACTIVE_SUBMENU.params)? <>

                                {(DASHBOARD_CURRENT_ACTIVE_SUBMENU.params.param1)? <>

                                    { /* my quizz list */}
                                    {(DASHBOARD_CURRENT_ACTIVE_SUBMENU.params.param1 == PARAM1) && <>
                                        
                                        { /* if has dynamic - EDIT QUIZ */}
                                        {(HAS_DYNAMIC_ROUTE) && <> 
                                            { /* show if dynmaic - on */}
                                            {ACTIVE_DYNAMIC_SUBMENU && <>
                                                <button className='btn btn-sm btn-light-primary w-100' onClick={() => dispatch(update_route({
                                                    ACTIVE_DYNAMIC_SUBMENU: false
                                                }))}>
                                                    <span className="menu-icon">
                                                        <span className="svg-icon svg-icon-2">
                                                            <i className="fa fa-chevron-left"></i>  
                                                        </span>
                                                    </span>
                                                    <span className="menu-title"> Back to Quizzes</span>
                                                </button>
                                                <div className="menu-item">
                                                    <div className="menu-content pb-2">
                                                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                                            {"Editable options"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* dynamic menu options here */}
                                                {(DASHBOARD_DYNAMIC_MENU && !DASHBOARD_DYNAMIC_MENU_LOADING) && <>
                                                    {(DASHBOARD_DYNAMIC_MENU && DASHBOARD_DYNAMIC_MENU.length > 0 && DASHBOARD_DYNAMIC_MENU.map((dm,index) => {
                                                        const { params, meta } = dm;
                                                        return (
                                                        <div 
                                                            key={index} 
                                                            className={params.param3 === PARAM3? "d-flex align-items-center mb-3 subchild p-2 active "+meta.activeClass : "d-flex subchild align-items-center mb-3 p-2"} 
                                                            type="button"
                                                            onClick={() => dispatch(update_route({
                                                                PARAM1: params.param1,
                                                                PARAM2: params.param2,
                                                                PARAM3: params.param3,
                                                                LOAD_DYNAMIC_ROUTE: true
                                                            }))}
                                                        >
                                                            <div className="symbol symbol-50px me-5">
                                                                <span className={"symbol-label "+ meta.iconBgColorClass}>
                                                                
                                                                    <span className={"svg-icon svg-icon-2x "+ meta.iconColorClass}>
                                                                        <SvgLoader type={meta.icon} />
                                                                    </span>
                                                                                
                                                                </span>
                                                            </div>                                      
                                                            <div className="d-flex flex-column">
                                                                <p className="text-gray-800 text-hover-primary fs-6 fw-semibold mb-0">{meta.heading}</p>
                                                                <span className="text-muted fw-semibold">{meta.subHeading}</span>
                                                            </div>
                                                
                                                        </div>)
                                                    }))}
                                                </>}

                                                {DASHBOARD_DYNAMIC_MENU_LOADING && <IeltsLmsEditQuizDynamicMenuSkeleton />}    


                                            </>}

                                            { /* show if dynmaic - off */}    
                                            {!ACTIVE_DYNAMIC_SUBMENU && <>
                                                <button className='btn btn-sm btn-light-primary w-100' onClick={() => dispatch(update_route({
                                                    ACTIVE_DYNAMIC_SUBMENU: true
                                                }))}>
                                                    <span className="menu-icon">
                                                        <span className="svg-icon svg-icon-2">
                                                            <i className="fa fa-chevron-left"></i>  
                                                        </span>
                                                    </span>
                                                    <span className="menu-title"> Back to Edit Quiz</span>
                                                </button>

                                                <div className="menu-item">
                                                    <div className="menu-content pb-2">
                                                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                                            {DASHBOARD_CURRENT_MAIN_MENU.meta.menuTitle}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* submenu options here */}
                                                { DASHBOARD_CURRENT_ACTIVE_SUBMENU && DASHBOARD_CURRENT_SUBMENUS && DASHBOARD_CURRENT_SUBMENUS.length > 0? <>
                                                    {DASHBOARD_CURRENT_SUBMENUS.map((menu,index) => {
                                                        const { meta, router, params }  = menu;
                                                        const { param2 }                = params;
                                                        if(meta.showMenu){                             
                                                            return (<div className="menu-item" key={index}>
                                                                <Link to={router.redirectTo} className={(PARAM2 === param2)? "menu-link active" : "menu-link "}>
                                                                    <span className="menu-icon">
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <LoadIcon icon={meta.icon} />   
                                                                        </span>
                                                                    </span>
                                                                    <span className="menu-title">{meta.menuTitle}</span>
                                                                </Link>
                                                            </div>)
                                                        } else {
                                                            return <React.Fragment key={index} />
                                                        }
                                                    })}
                                                </> : <></>}

                                            </>}    
                                            

                                        </>}

                                        { /* if NOT dynamic */}
                                        {(!HAS_DYNAMIC_ROUTE) && <> 
                                            {/* main heading */}
                                            <div className="menu-item">
                                                <div className="menu-content pb-2">
                                                    <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                                        {DASHBOARD_CURRENT_MAIN_MENU.meta.menuTitle}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* submenu options here */}
                                            { DASHBOARD_CURRENT_ACTIVE_SUBMENU && DASHBOARD_CURRENT_SUBMENUS && DASHBOARD_CURRENT_SUBMENUS.length > 0? <>
                                                    {DASHBOARD_CURRENT_SUBMENUS.map((menu,index) => {
                                                        const { meta, router, params }  = menu;
                                                        const { param2 }                = params;
                                                        if(meta.showMenu){                             
                                                            return (<div className="menu-item" key={index}>
                                                                <Link to={router.redirectTo} className={(PARAM2 === param2)? "menu-link active" : "menu-link "}>
                                                                    <span className="menu-icon">
                                                                        <span className="svg-icon svg-icon-2">
                                                                            <LoadIcon icon={meta.icon} />   
                                                                        </span>
                                                                    </span>
                                                                    <span className="menu-title">{meta.menuTitle}</span>
                                                                </Link>
                                                            </div>)
                                                        } else {
                                                            return <React.Fragment key={index} />
                                                        }
                                                    })}
                                                </> : <></>}
                                        </>}

                                    </>}


                                    {(DASHBOARD_CURRENT_ACTIVE_SUBMENU.params.param1 != PARAM1) && <>
                                        { /* main selected headings */}
                                        <div className="menu-item">
                                            <div className="menu-content pb-2">
                                                <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                                    {DASHBOARD_CURRENT_MAIN_MENU.meta.menuTitle}
                                                </span>
                                            </div>
                                        </div>
                                        {/* main selected submenus */}
                                        { DASHBOARD_CURRENT_ACTIVE_SUBMENU && DASHBOARD_CURRENT_SUBMENUS && DASHBOARD_CURRENT_SUBMENUS.length > 0? <>
                                            {DASHBOARD_CURRENT_SUBMENUS.map((menu,index) => {
                                                const { meta, router, params }  = menu;
                                                const { param2 }                = params;
                                                if(meta.showMenu){                             
                                                    return (<div className="menu-item" key={index}>
                                                        <Link to={router.redirectTo} className={(PARAM2 === param2)? "menu-link active" : "menu-link "}>
                                                            <span className="menu-icon">
                                                                <span className="svg-icon svg-icon-2">
                                                                    <LoadIcon icon={meta.icon} />   
                                                                </span>
                                                            </span>
                                                            <span className="menu-title">{meta.menuTitle}</span>
                                                        </Link>
                                                    </div>)
                                                } else {
                                                    return <React.Fragment key={index} />
                                                }
                                            })}
                                        </> : <></>}


                                    </>}

                                </> : <></>}

                            </> : <></>}

                        </> : <></>}



                    </> : <></>}   
                    {/* ---ENN:: ALL DONE--- */}
                    
                </div>
            </div> 
        </div>                        
    </div>);
};

const DashboardSidebar = () => {
    const dispatch = useDispatch();
    const { WIDTH, SIDEBAR_EXPAND } = useSelector( state => state.theme );
    const toggleSidebar = () => {
        dispatch(update_theme({
            SIDEBAR_EXPAND: !SIDEBAR_EXPAND
        }));
    };

    return (<>
        <div className={WIDTH > 991? ("aside aside-extended aside-fixed-on") : SIDEBAR_EXPAND? "aside aside-extended drawer drawer-start drawer-on" : "aside aside-extended drawer drawer-start "}>
            <PrimarySidebarDashboard />
            <SecondarySidebarDashboard />
            <button 
                onClick={toggleSidebar} 
                className={SIDEBAR_EXPAND? 'btn btn-sm btn-icon bg-body btn-color-gray-600 btn-active-primary position-absolute translate-middle start-100 end-0 bottom-0 shadow-sm d-none d-lg-flex' : 'btn btn-sm btn-icon bg-body btn-color-gray-600 btn-active-primary position-absolute translate-middle start-100 end-0 bottom-0 shadow-sm d-none d-lg-flex active'}
            >
                <i className="ki-duotone ki-arrow-left fs-2 rotate-180">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>
            </button>
        </div>
    </>);
};


export default DashboardSidebar;






