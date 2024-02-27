import { createSlice } from '@reduxjs/toolkit'

export const modalsSlice = createSlice({
    name: 'MODALS',
    initialState: {
        NAME: 'MODALS',
        IELTS_ADD_QUIZ_MODAL: false
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_modals: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_modals } = modalsSlice.actions;

export default modalsSlice.reducer;