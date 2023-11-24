import constants from '../../../../includes/constants';
import { MyAccountSettingsSkeleton } from '../../../../components/default/Skeletons';
import { update_my_account } from '../../../../includes/redux-store/Slices/MyAccount.slice';
import { update_dashboard } from "../../../../includes/redux-store/Slices/Dashboard.slice";
import getRequest from '../../../../includes/rest-apis/get';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FloatingLabel } from "react-bootstrap";


const Settings = () => {
    const routeParent = "my-account";
    const routeChild  = "my-account-settings";
    const { endpoint }                      = constants;
    const dispatch                          = useDispatch();
    const { DASHBOARD_SUBMENUS }            = useSelector( state => state.dashboard );
    const { MY_ACCOUNT_LOADED }             = useSelector( state => state.myAccount );
    const { USER }                          = useSelector( state => state.auth ); 
    const { MY_ACCOUNT_SETTINGS }           = useSelector( state => state.myAccount ); 
    const [user,setUser]                    = useState({});
    const [userValidation,setUserValidation] = useState({
        firstName: null,
        lastName: null,
        cc: null,
        mobile: null,
        country: null,
        state: null
    }); 
    const [loading,setLoading]              = useState(true); 
    const [states,setStates]                = useState([]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        let inputValue = value;
        if( name === "lastName") {
            setUser({
                ...user,
                [name]: inputValue
            });
        } else if( name === "mobile"){
            setUser({
                ...user,
                [name]: inputValue.substring(0, 10) 
            });

        } else {

            setUser({
                ...user,
                [name]: inputValue
            }); 


        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    const discard = () => {

    };

    const updateStates = (json = {}) => {

        const { permissions, states }   = json;
        
        if( states.MY_ACCOUNT_SETTINGS ) {
            setUser({
                ...permissions.MY_ACCOUNT_SETTINGS
            });
            dispatch(update_my_account({
                MY_ACCOUNT_SETTINGS: { 
                    ...permissions.MY_ACCOUNT_SETTINGS
                }
            }));
            
        }

    };

    useEffect(() => {
        
        if(MY_ACCOUNT_LOADED) {
            const matches       = [...DASHBOARD_SUBMENUS];
            const matchedObject =  matches.find( menuItem => {
                return (menuItem.params.param1 === routeParent && menuItem.params.param2 === routeChild )
            });

            if( matchedObject ) {
                const { restApi } = matchedObject;
                
                if( restApi.enable ) { 
                    console.log('[RESET API]:',restApi);
                    if(MY_ACCOUNT_SETTINGS === undefined || !MY_ACCOUNT_SETTINGS ){ 
                        getRequest(endpoint + restApi.endpoint , {
                            'Authorization': 'Bearer '+USER.accessToken,
                            'x-refresh-token': USER.refreshToken,
                            'x-api-token': restApi.endpoint 
                        },{}).then((response) => {
                            const { success, has_json, json, error, res } = response;
                            if( success && has_json && !error ) {
                                updateStates(json);
                            } else {
                                console.warn(`[warning]: ${res}`);
                            }
                        }).catch((err) => {
                            const { success, error, error_type, error_message, error_code } = err;
                            if( error ) {
                                console.log(error_message);
                                
                            } else {
                                console.log('[ERROR]: UNKNOWN',err);
                            }
                        });  
                    }
                }

                return () => {};

            }

        }

        return () => {}
    },[MY_ACCOUNT_LOADED]);


    useEffect(() => {
        if(
            MY_ACCOUNT_SETTINGS && 
            !MY_ACCOUNT_SETTINGS.MY_ACCOUNT_SETTINGS_LOADING &&
            MY_ACCOUNT_SETTINGS.MY_ACCOUNT_SETTINGS_LOADED
        ){
            setUser(MY_ACCOUNT_SETTINGS);
            setUserValidation({
                firstName: null,
                lastName: null,
                cc: null,
                mobile: null,
                country: null,
                state: null
            });
            setLoading(false);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: false
            }));
        } else {
            setLoading(true);
            dispatch(update_dashboard({
                DASHBOARD_ROUTE_LOADING: true
            }));
        }
    },[ MY_ACCOUNT_SETTINGS ]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json')
        .then((response) => response.json())
        .then((jsonData) => setStates(jsonData.states))
        .catch((error) => console.error('Error fetching data:', error));
    },[]);




    
    return (<>
        {loading? <MyAccountSettingsSkeleton /> :
        <div className="card mb-5 mb-xl-10" data-select2-id="select2-data-155-kq5x">
            {/* Card header */}
            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                {/* Card title */}
                <div className="card-title m-0">
                <h3 className="fw-bold m-0">Profile Details</h3>
                </div>
            </div>
            {/* Card header */}
            {/* Content */}
            
            <div className="collapse show">
                <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit}>
                    <div className="card-body border-top p-9">

                        {/* full name */}     
                        <div className="row mb-6">
                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                            <div className="col-lg-8">
                                
                                <div className="row">
                                    
                                    <div className="col-lg-6 fv-row">
                                        <input 
                                            required 
                                            type="text" 
                                            name="firstName" 
                                            className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${(userValidation.firstName == null? 'is-valid' : 'is-invalid')}`}
                                            placeholder="First name*" 
                                            value={user.firstName} 
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">
                                            {userValidation.firstName}
                                        </div>
                                    </div>                               
                                    
                                    <div className="col-lg-6 fv-row">
                                        <input 
                                            type="text" 
                                            name="lastName" 
                                            className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${(userValidation.lastName == null? 'is-valid' : 'is-invalid')}`}
                                            placeholder="Last name" 
                                            value={user.lastName} 
                                            onChange={handleChange}
                                        />
                                        <div className="invalid-feedback">
                                            {userValidation.lastName}
                                        </div>
                                    </div>

                                    
                                </div>
                                
                            </div>
                        </div>

                        {/* modile number */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold required fs-6">
                                Mobile no.
                            </label>
                                            
                            <div className="col-lg-8 row">

                                <div className='fv-row fv-plugins-icon-container col-xs-2 col-sm-2 col-md-2 col-lg-2'>                 

                                    <select 
                                        required
                                        name="cc" 
                                        className={`form-control form-select form-control-solid ${(userValidation.cc == null? 'is-valid' : 'is-invalid')}`}
                                        placeholder="cc*" 
                                        value={user.cc} 
                                        onChange={handleChange}       
                                    >
                                        <option></option> 
                                        <option value="+91">+91</option> 
                                        <option value="+1">+1</option>    
                                    </select>
                                    <div className="invalid-feedback">{userValidation.cc}</div>
                                </div>
                                <div className="fv-row col-md-10 col-sm-8 col-xs-8 col-lg-10">                 

                                    <input 
                                        required
                                        type="number" 
                                        name="mobile" 
                                        className={`form-control form-control-solid ${(userValidation.mobile == null? 'is-valid' : 'is-invalid')}`} 
                                        placeholder="Mobile number" 
                                        value={user.mobile} 
                                        onChange={handleChange}      
                                    />
                                    <div className="invalid-feedback">{userValidation.mobile}</div>
                                </div>


                            </div>
                            
                        </div>                        

                        {/* country */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold required fs-6">
                                Country.
                            </label>
                                            
                            <div className="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <select 
                                    name="country"
                                    required 
                                    value={user.country}
                                    className={`form-control form-select form-select-solid ${(userValidation.country == null? 'is-valid' : 'is-invalid')}`}
                                    data-control="select2"
                                    onChange={handleChange}
                                >
                                    <option></option>
                                    <option value="IN">India</option>
                                    <option value="PAK">Pakistan</option>
                                </select>
                                <div className="invalid-feedback">{userValidation.country}</div>
                            </div>
                            
                        </div>  

                        {/* state */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                State.
                            </label>
                                            
                            <div className="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <select 
                                    name="state"
                                    required 
                                    value={user.state}
                                    className={`form-control form-select form-select-solid ${(userValidation.state == null? 'is-valid' : 'is-invalid')}`}
                                    data-control="select2"
                                    onChange={handleChange}
                                >
                                    <option></option>
                                    {states && states.length > 0 && states.map((state,index) => {
                                        return <option key={index} value={state.state}>{state.state}</option>
                                    })}
                                </select>
                                <div className="invalid-feedback">{userValidation.state}</div>
                            </div>
                            
                        </div>          

                    </div>
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <button type="button" className="btn btn-light btn-active-light-primary me-2" onClick={discard}> Discard </button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>




            {/* Content */}
        </div>}
    </>);
};

export default Settings;
