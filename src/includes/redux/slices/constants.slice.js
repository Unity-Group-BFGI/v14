import { createSlice } from '@reduxjs/toolkit'

export const constantsSlice = createSlice({
    name: 'CONSTANTS',
    initialState: {
        NAME: 'CONSTANTS'
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_constants: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_constants } = constantsSlice.actions;

export default constantsSlice.reducer;