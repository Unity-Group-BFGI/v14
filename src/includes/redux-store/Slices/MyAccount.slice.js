import { createSlice } from '@reduxjs/toolkit'

export const myAccountSlice = createSlice({
    name: 'my-account',
    initialState: {
        NAME: "MY_ACCOUNT",
        MY_ACCOUNT_LOADING: true,
        MY_ACCOUNT_LOADED: false,
        MY_ACCOUNT_FAILED: false
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_my_account: (state,action)                => {
            return {...state, ...action.payload};
        }
    },
});

// Action creators are generated for each case reducer function
export const { update_my_account } = myAccountSlice.actions;

export default myAccountSlice.reducer;