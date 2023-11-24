import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        NAME: "DASHBOARD",
        DASHBOARD_MENU_LOADING: true,
        DASHBOARD_SUBMENU_LOADING:true,
        DASHBOARD_USER_ROLE: null,
        DASHBOARD_ROUTE_LOADING: true,
        DASHBOARD_DYNAMIC_ROUTE_LOADING: true,
        DASHBOARD_LOADING: true,
        DASHBOARD_LOADED: false,
        DASHBOARD_FAILED: false,
        DASHBOARD_ERROR_MESSAGE: null,
        DASHBOARD_ERROR_TYPE: null,
        DASHBOARD_ERROR_CODE: null,


        DASHBOARD_SUBMENUS: [],
        DASHBOARD_MENUS: [],
        DASHBOARD_CURRENT_MAIN_MENU: null, // only for primary menu param1
        DASHBOARD_CURRENT_SUBMENUS: null,
        DASHBOARD_CURRENT_ACTIVE_MENU: null,
        DASHBOARD_CURRENT_ACTIVE_SUBMENU: null,

        DASHBOARD_OVERALL_LOADED: false,
        DASHBOARD_OVERALL_LOADING: true,
        DASHBOARD_OVERALL_FAILED: false,
        
        DASHBOARD_OVERALL_ERROR_MESSAGE: null,
        DASHBOARD_OVERALL_ERROR_TYPE: null,
        DASHBOARD_OVERALL_ERROR_CODE: null
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_dashboard: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_dashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;