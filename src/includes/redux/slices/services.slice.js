import { createSlice } from '@reduxjs/toolkit'

export const servicesSlice = createSlice({
    name: 'SERVICES',
    initialState: {
        NAME: 'SERVICES',
        MY_SERVICES:{
            LOADED: false,
            LOADING: true,
            FAILED: false,
            SERVICES: []
        }
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_services: (state,action)                => {
            return {...state, ...action.payload};
        },
        update_my_services: (state,action)                => {
            return {...state, MY_SERVICES:{
                ...state.MY_SERVICES,
                ...action.payload
            }};
        }, 
    },
});

// Action creators are generated for each case reducer function
export const { 
    update_services,
    update_my_services
} = servicesSlice.actions;

export default servicesSlice.reducer;