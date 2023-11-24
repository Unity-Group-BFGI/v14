import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        NAME:'THEME',
        SIDEBAR_EXPAND: true,
        WIDTH: '',
        X: '',
        Y: '',
        HEIGHT: ''
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_theme: (state,action)                => {
            return {...state, ...action.payload};
        }
    }
});

// Action creators are generated for each case reducer function
export const { update_theme } = themeSlice.actions;
export default themeSlice.reducer;