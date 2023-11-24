import { createSlice } from '@reduxjs/toolkit'

export const routeSlice = createSlice({
    name: 'route',
    initialState: {
        NAME: "ROUTER",
        UPDATE_ROUTE: 1,
        ENABLE_DASHBOARD_ROUTES: false,
        PARAM1: '',
        PARAM2: '',
        ROUTE_LOADING: true,
        ROUTE_LOADED: false,
        ROUTE_FAILED: false
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_route: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_route } = routeSlice.actions;

export default routeSlice.reducer;