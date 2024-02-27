import { createSlice } from '@reduxjs/toolkit'

export const domainSlice = createSlice({
    name: 'DOMAIN',
    initialState: {
        NAME: 'DOMAIN',
        ADD_DOMAIN:{
            CURRENT_STEP        : 'choose-platform',
            IS_VALID            : false,
            VERIFYING           : false,
            IS_EXISTS           : false,
            DOMAIN:{
                host: '',
                _hostTokenId: '',
                _accountId: '',
                platform: 'wordpress',
                metadata: {

                }
            },

        },
        MY_DOMAINS:{
            LOADED: false,
            LOADING: true,
            FAILED: false,
            DOMAINS: []
        },
        MY_DOMAINS_STATES:{
            SELECTED_STATUS: 'completed'
        },
        MY_DOMAIN:{
            LOADED: false,
            LOADING: true,
            FAILED: false,
            DOMAIN: null,
            API_KEYS:{
                LOADING:true,
                LOADED: false,
                FAILED: false,
                API_KEYS: [],
                SELECTED_STATUS: 'all',
                SELECTED_SERVICE: 'all',
            },
            SERVICES:{
                LOADING: true,
                LOADED: false,
                FAILED: false,
                MY_SERVICES: []
            },
            SELECTED_SERVICE_ID: null,
            SELECTED_SERVICE: null
            

        }
    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_domain: (state,action)                => {
            return {...state, ...action.payload};
        },
        update_add_domain: (state,action)            => {
            return {...state, ADD_DOMAIN: {
                ...state.ADD_DOMAIN,
                ...action.payload
            } };
        },
        update_my_domains: (state,action)            => {
            return {...state, MY_DOMAINS: {
                ...state.MY_DOMAINS,
                ...action.payload
            } };
        },
        update_my_domains_states: (state,action)    => {
            return {...state, MY_DOMAINS_STATES: {
                ...state.MY_DOMAINS_STATES,
                ...action.payload
            } };
        },
        update_my_domain: (state,action)    => {
            return {...state, MY_DOMAIN: {
                ...state.MY_DOMAIN,
                ...action.payload
            }}
        },
        update_my_domain_api_keys: (state,action) => {
            return {...state, MY_DOMAIN: {
                ...state.MY_DOMAIN,
                API_KEYS:{
                    ...state.MY_DOMAIN.API_KEYS,
                    ...action.payload
                }
            }}
        },
        update_my_domain_services: (state,action) => {
            return {...state, MY_DOMAIN: {
                ...state.MY_DOMAIN,
                SERVICES:{
                    ...state.MY_DOMAIN.SERVICES,
                    ...action.payload
                }
            }}
        }
    },
});

// Action creators are generated for each case reducer function
export const { 
    update_domain,
    update_add_domain,
    update_my_domains,
    update_my_domains_states,
    update_my_domain,
    update_my_domain_api_keys,
    update_my_domain_services
} = domainSlice.actions;

export default domainSlice.reducer;