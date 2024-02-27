import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
    name: 'MENU',
    initialState: {
        NAME: 'MENU',
        CURRENT_PRIMARY_MENU: null,
        CURRENT_SECONDARY_MENU_ACTIVE_ITEM: null,
        CURRENT_SECONDARY_MENU: null,
        CURRENT_DYNAMIC_MENU: null,
        IS_DYNAMIC_MENU_ACTIVE: false,
        PRIMARY_MENU_LOADING: false,
        SECONDARY_MENU_LOADING: false,
        DYNAMIC_MENU_LOADING: false,
        HAS_DYNAMIC_MENU: false,
        DYNAMIC_MENU_FOR: null,
        PAGE_HEADING: null,
        BREADCRUM_ONE: null,
        BREADCRUM_TWO: null,
        BREADCRUM_THREE: null,
        ROUTE_LOADING: false,
        DYNAMIC_HEADER: null,
        TAB_TITLE: 'Dashboard',
        USER_MENU: []
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_menu: (state,action)                => {
            return {...state, ...action.payload};
        },
        update_user_menu: (state,action)            => {
            return {...state, USER_MENU: [...action.payload]};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_menu, update_user_menu } = menuSlice.actions;

export default menuSlice.reducer;