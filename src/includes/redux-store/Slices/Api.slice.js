import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'API',
    initialState: {
        NAME: 'API',
        API_LOADING: true,
        API_LOADED: false,
        API_FAILED: false,
        API_LOAD_AGAIN: 1,
        API_ERROR_MESSAGE: "",
        API_ERROR_TYPE: "",
        API_ERROR_CODE: "",
        API_ERROR_MODAL: false
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_api: (state,action)                => {
            return {...state, ...action.payload};
        },
        load_api_again: (state,action) => {
            return {...state, API_LOAD_AGAIN: (state.API_LOAD_AGAIN + 1) }
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_api, load_api_again } = apiSlice.actions;

export default apiSlice.reducer;