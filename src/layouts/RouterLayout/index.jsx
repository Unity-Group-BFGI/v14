import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { update_route } from "../../includes/redux-store/Slices/Route.slice";
import { update_dashboard } from "../../includes/redux-store/Slices/Dashboard.slice";


const RouterLayout = ({children}) => {
    const dispatch                                      = useDispatch();
    const { pathname }                                  = useLocation();
    const   navigate                                    = useNavigate();
    const  { id }                                       = useParams();

    const { ENABLE_DASHBOARD_ROUTES, PARAM1, PARAM2, DYNAMIC_ROUTE }   = useSelector( state => state.route );
    const { ROUTE_LOADING, ROUTE_LOADED, ROUTE_FAILED } = useSelector( state => state.route );
    const { DASHBOARD_MENUS, DASHBOARD_SUBMENUS }       = useSelector( state => state.dashboard );

    
    const loadSubmenus = () => {

        const MENU          = [...DASHBOARD_MENUS];
        const matchedObject =  MENU.find( menuItem => {
            return menuItem.params.param1 === PARAM1;
        });

        if( matchedObject ) {
            const { meta } = matchedObject;
            //console.log(matchedObject);
            dispatch(update_dashboard({
                DASHBOARD_CURRENT_MAIN_MENU: matchedObject,
                DASHBOARD_CURRENT_SUBMENUS: meta.hasSubmenu? meta.submenu : []
            }));
            
        }
    };


    const routerLoader = () => {

        dispatch(update_route({
            ROUTE_LOADING: true,
            ROUTE_LOADED: false,
            ROUTE_FAILED: false
        }));

        const matches       = [...DASHBOARD_MENUS,...DASHBOARD_SUBMENUS];
        // 1.) logic for all routes includes [mainmenu,submenus]
        const matchedObject =  matches.find( menuItem => {
            if(menuItem.router.routeMatchers.includes(pathname)){
                return menuItem.router.routeMatchers.includes(pathname);
            } else {
                if(menuItem.router.hasDynamicRoute){
                    if(menuItem.router.routeMatchers[0] + "/" + id === pathname ) {
                        return menuItem;
                    }
                }
            }
            
        });   
        // 2.) if any route matches
        if (matchedObject) {
            const { params, meta, router }      = matchedObject;
            // more config
            const { param1, param2 }                            = params;
            const { redirect, redirectTo, hasDynamicRoute, hasDynamicSubmenu  }    = router;   

            // submenu logic
            const MENU                          = [...DASHBOARD_MENUS];
            const matchedObjectMain             =  MENU.find( menuItem => {
                return menuItem.params.param1 === param1;
            });

            // 3.) get its root menu 
            if( matchedObjectMain ) {
                const { meta } = matchedObjectMain;

                // more route logic
                dispatch(update_dashboard({
                    DASHBOARD_CURRENT_MAIN_MENU: matchedObjectMain, // only for primary menu param1
                    DASHBOARD_CURRENT_SUBMENUS: meta.hasSubmenu? meta.submenu : [],
                    DASHBOARD_CURRENT_ACTIVE_MENU: matchedObjectMain,
                    DASHBOARD_CURRENT_ACTIVE_SUBMENU: matchedObject
                }));

                

                if( !redirect ) {   

                    dispatch(update_route({
                        PARAM1: param1,
                        PARAM2: param2,
                        ROUTE_LOADING: false,                  
                        ROUTE_LOADED: true,
                        ROUTE_FAILED: false,
                        DYNAMIC_ROUTE: id || null,
                        HAS_DYNAMIC_ROUTE: hasDynamicRoute || false,
                        HAS_DYNAMIC_SUBMENU: hasDynamicSubmenu || false, 
                        ACTIVE_DYNAMIC_SUBMENU: hasDynamicSubmenu || false                  
                    }));                 

                    const { meta }      = matchedObject;
                    document.title      = meta.pageTitle;

                        
                } else {

                    dispatch(update_route({
                        PARAM1: param1,
                        ROUTE_LOADING: true,
                        DYNAMIC_ROUTE: null,
                        HAS_DYNAMIC_ROUTE: false,
                        HAS_DYNAMIC_SUBMENU: false,
                        ACTIVE_DYNAMIC_SUBMENU: false
                    }));

                    navigate(redirectTo);
                    return;
                }


            } else {
                
            }
                
        } else {
            
            dispatch(update_route({
                ROUTE_LOADING: true
            }));
            navigate("/dashboard/my-account/overview");
            return;
        } 
    };

    useEffect(() => {
        if(ENABLE_DASHBOARD_ROUTES){
            routerLoader();
            
            return () => {           
                
            }
        }
    },[ENABLE_DASHBOARD_ROUTES,pathname]);

    
    useEffect(() => {
        if(ROUTE_LOADED){
            loadSubmenus();
        } 
    },[PARAM1, ROUTE_LOADED, ROUTE_LOADING]);
    
    return (<>{children}</>);
};

export default RouterLayout;