import constants from '../../../../includes/constants';
import { MyAccountOverviewSkeleton } from '../../../../components/default/Skeletons';
import { update_my_account } from '../../../../includes/redux-store/Slices/MyAccount.slice';
import { update_dashboard } from "../../../../includes/redux-store/Slices/Dashboard.slice";
import getRequest from '../../../../includes/rest-apis/get';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



const Overview = () => {
    const routeParent = "my-account";
    const routeChild  = "my-account-overview";
    const { endpoint } = constants;
    const dispatch = useDispatch();
    const { DASHBOARD_SUBMENUS }            = useSelector( state => state.dashboard );
    const { MY_ACCOUNT_LOADED }             = useSelector( state => state.myAccount );
    const { USER }                          = useSelector( state => state.auth ); 
    const { MY_ACCOUNT_OVERVIEW }           = useSelector( state => state.myAccount ); 
    const [loading,setLoading]              = useState(true);       

    const updateStates = (json = {}) => {
        const { permissions, states } = json;
        if( states.MY_ACCOUNT_OVERVIEW ) {
            dispatch(update_my_account({
                MY_ACCOUNT_OVERVIEW: { 
                    ...permissions.MY_ACCOUNT_OVERVIEW
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
                    if(MY_ACCOUNT_OVERVIEW === undefined || !MY_ACCOUNT_OVERVIEW){ 
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
            MY_ACCOUNT_OVERVIEW && 
            !MY_ACCOUNT_OVERVIEW.MY_ACCOUNT_OVERVIEW_LOADING &&
            MY_ACCOUNT_OVERVIEW.MY_ACCOUNT_OVERVIEW_LOADED
        ){
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
    },[MY_ACCOUNT_OVERVIEW]);

    
    return (<>
    {(loading)? <MyAccountOverviewSkeleton /> :
        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
            {/* Card header */}
            <div className="card-header cursor-pointer">
                {/* Card title */}
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Profile Details</h3>
                </div>
                {/* Action */}
                <Link to="/dashboard/my-account/settings" className="btn btn-sm btn-primary align-self-center">
                    Edit Profile
                </Link>
            </div>
            {/* Card header */}
            {/* Card body */}
            <div className="card-body p-9">

                {/* BEGIN::Row - FULLNAME [first , last] */}
                <div className="row mb-7">
                    {/* Label */}
                    <label className="col-lg-4 fw-semibold text-muted">Full Name</label>
                    {/* Col */}
                    <div className="col-lg-8">
                        <span className="fw-bold fs-6 text-gray-800">
                            {(MY_ACCOUNT_OVERVIEW.firstName || '') + " " + (MY_ACCOUNT_OVERVIEW.lastName || '') }
                        </span>
                    </div>
                </div>
                {/* END::Row - FULLNAME [first , last]*/}


                {/* BEGIN::Row - FULLNAME [role] */}
                <div className="row mb-7">
                    {/* Label */}
                    <label className="col-lg-4 fw-semibold text-muted">Role</label>
                    {/* Col */}
                    <div className="col-lg-8 fv-row">
                        <span className="fw-semibold text-gray-800 fs-6">
                            {MY_ACCOUNT_OVERVIEW.role === "customer"? 'CUSTOMER' : ''}
                            {MY_ACCOUNT_OVERVIEW.role === "owner"? 'OWNER' : ''}
                            {MY_ACCOUNT_OVERVIEW.role === "admin"? 'ADMIN' : ''}
                            {MY_ACCOUNT_OVERVIEW.role === "super-admin"? 'super-admin' : ''}
                            {MY_ACCOUNT_OVERVIEW.role === "teacher"? 'Teacher' : ''}
                        </span>
                    </div>
                </div>
                {/* END::Row - FULLNAME [role] */}
                
                {/* BEGIN::Row - MOBILE,CC */}
                <div className="row mb-7">
                    {/*--begin::Label--*/}
                    <label className="col-lg-4 fw-semibold text-muted">
                        Mobile no.
                    </label>
                    {/*--end::Label--*/}
                        
                    {/*--begin::Col--*/}
                    <div className="col-lg-8 d-flex align-items-center">
                        <span className="fw-bold fs-6 text-gray-800 me-2">{ (MY_ACCOUNT_OVERVIEW.cc || '') + " " + (MY_ACCOUNT_OVERVIEW.mobile || '') }</span>                                     
                    </div>
                    {/*--end::Col--*/}

                </div>
                {/* END::Row - MOBILE,CC */}

                {/* BEGIN::Row - Email */}
                <div className="row mb-7">
                    {/*--begin::Label--*/}
                    <label className="col-lg-4 fw-semibold text-muted">
                        Email.
                    </label>
                    {/*--end::Label--*/}
                        
                    {/*--begin::Col--*/}
                    <div className="col-lg-8 d-flex align-items-center">
                        <span className="fw-bold fs-6 text-gray-800 me-2">{(USER.email || '')}</span> 
                        <span className="badge badge-success">Verified</span>                                    
                    </div>
                    {/*--end::Col--*/}

                </div>
                {/* END::Row - Email */}

                {/* BEGIN::Row - Country */}
                <div className="row mb-7">
                    {/*--begin::Label--*/}
                    <label className="col-lg-4 fw-semibold text-muted">
                        Country
                    </label>
                    {/*--end::Label--*/}
                        
                    {/*--begin::Col--*/}
                    <div className="col-lg-8 d-flex align-items-center">
                        <span className="fw-bold fs-6 text-gray-800 me-2">{(MY_ACCOUNT_OVERVIEW.country || '')}</span>                                     
                    </div>
                    {/*--end::Col--*/}

                </div>
                {/* END::Row - Country */}

                {/* BEGIN::Row - State */}
                <div className="row mb-7">
                    {/*--begin::Label--*/}
                    <label className="col-lg-4 fw-semibold text-muted">
                        State
                    </label>
                    {/*--end::Label--*/}
                        
                    {/*--begin::Col--*/}
                    <div className="col-lg-8 d-flex align-items-center">
                        <span className="fw-bold fs-6 text-gray-800 me-2">{(MY_ACCOUNT_OVERVIEW.state || '')}</span>                                     
                    </div>
                    {/*--end::Col--*/}

                </div>
                {/* END::Row - State */}

            
            </div>
            {/* Card body */}
        </div>}
    </>);
};

export default Overview;

