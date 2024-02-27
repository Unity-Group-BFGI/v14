import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'AUTH',
    initialState: {
        NAME: 'AUTH',
        ROLE: '',
        ROUTES_LOADING:     true,
        ROUTES_LOADED:      false,
        ROUTES_FAILED:      false,

        IS_USER_LOGGED_IN:  false,
        IS_VERIFIED:        false,
        AUTH_LOADING:       true,
        AUTH_LOADED:        false,
        AUTH_FAILED:        false,
        AUTH_VERIYING:      false,

        LOGOUT_MODAL:       false,
        RETRY_AUTH_API:     1,
        USER_LOADING:       true,
        NO_PRODUCT_NOTICE:  false,
        NO_DOMAIN_NOTICE:   false,
        MY_TOTAL_DOMAINS:   0
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_auth: (state,action)                => {
            return {...state, ...action.payload};
        },
        retry_auth_api: (state,action)              => {
            return {...state, RETRY_AUTH_API: state.RETRY_AUTH_API+1 };
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_auth, retry_auth_api } = authSlice.actions;

export default authSlice.reducer;