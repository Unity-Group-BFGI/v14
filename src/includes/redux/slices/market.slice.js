import { createSlice } from '@reduxjs/toolkit'

export const marketSlice = createSlice({
    name: 'MARKET',
    initialState: {
        NAME: 'MARKET',
        MARKET:{
            LOADED: false,
            LOADING: false,
            FAILED: false,
            PRODUCTS:[]
        }
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_market: (state,action)                => {
            return {...state, MARKET:{
                ...state.MARKET,
                ...action.payload
            }};
        }
    },
});

// Action creators are generated for each case reducer function
export const { 
    update_market
} = marketSlice.actions;

export default marketSlice.reducer;