import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'LOADER',
    initialState: {
        NAME: 'LOADER',
        LOADER_LOADING: true
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_loader: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_loader } = loaderSlice.actions;

export default loaderSlice.reducer;