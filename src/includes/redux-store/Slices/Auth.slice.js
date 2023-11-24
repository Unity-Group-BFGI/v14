import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'AUTH',
    initialState: {
        NAME: 'AUTH',
        CALL_AUTH_VERIFY: 1,
        AUTH_APP_LOADING: true,
        AUTH_APP_LOADED: false,
        AUTH_APP_FAILED: false,

        AUTH_APP_ERROR_MESSAGE: "",
        AUTH_APP_ERROR_TYPE: "",
        AUTH_APP_ERROR_CODE: "",
        AUTH_APP_ERROR_MODAL: false,

        IS_USER_LOGGED_IN: false,
        IS_USER_VERIFIED: false,

        VERIFY_LOADING: true,
        VERIFY_LOADED: false,
        VERIFY_FAILED:false,
        
        VERIFY_ERROR_MESSAGE: "",
        VERIFY_ERROR_TYPE: "",
        VERIFY_ERROR_CODE: "",
        VERIFY_ERROR_MODAL: false,

        USER: {}
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_auth: (state,action)                => {
            return {...state, ...action.payload};
        },
        call_auth_verify: (state,action)            => {
            return {...state, CALL_AUTH_VERIFY: (state.CALL_AUTH_VERIFY + 1)}
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_auth, call_auth_verify } = authSlice.actions;

export default authSlice.reducer;