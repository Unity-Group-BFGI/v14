import { createSlice } from '@reduxjs/toolkit'

export const verifySlice = createSlice({
    name: 'verify',
    initialState: {
        verify_isCompleted: false,
        verify_current: 0,
        verify_loading: true,
    },
    reducers: {
        update_verify: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        update_inputs: (state, action) => {
            const { inputs } = action.payload;
        
            // Update errors based on field name
            const updatedInputs = { ...state.inputs };
            for (const field in inputs) {
                updatedInputs[field] = {
                    ...updatedInputs[field],
                    ...inputs[field],
                };
            }
        
            return {
                ...state,
                inputs: updatedInputs,
            };
        }
    },
});


// Action creators are generated for each case reducer function
export const { update_verify, update_inputs } = verifySlice.actions;

export default verifySlice.reducer;