import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Admin";
import Owner from "./Owner";
import Customer from "./Customer";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardFooter from "../components/DashboardFooter";
import { DashboardHeader, DashboardHeaderBodySm } from "../components/DashboardHeader";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { retry_auth_api, update_auth } from "../includes/redux/slices/auth.slice";
import { signOut, auth } from "../includes/middlewares/Firebase";
import { useNavigate } from "react-router-dom";



const DashboardLayout = (props) => {
    const navigate              = useNavigate();
    const dispatch              = useDispatch();
    const { TAB_TITLE }                     = useSelector( state => state.menu );      
    const { ROLE, LOGOUT_MODAL }            = useSelector( state => state.auth );
    const { LOADER_LOADING }                = useSelector( state => state.loader );
    const { ROUTES_FAILED, ROUTES_LOADING } = useSelector( state => state.auth );

    const { USER_LOADING }                  = useSelector( state => state.auth );
    const { USER_PERMISSIONS }              = useSelector( state => state.auth );
    const { USER_SERVICES }                 = useSelector( state => state.auth );
    const { NO_PRODUCT_NOTICE }             = useSelector( state => state.auth );
    const { NO_DOMAIN_NOTICE }              = useSelector( state => state.auth );
    const { MY_TOTAL_DOMAINS }              = useSelector( state => state.auth );
    
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.reload();
            console.log("Signed out successfully")
        }).catch((error) => {
            alert("Failed to logout");
        });
    };

    useEffect(() => {
        document.body.classList = "header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-enabled";
        return () => {
            document.body.classList = "";
        }
    }, []);

    useEffect(() => {
        document.title = TAB_TITLE || 'Loading...';
        return () => {
            document.title = "Dashboard";
        }
    },[TAB_TITLE]);

    useEffect(() => {
        if(!USER_LOADING){
            if(MY_TOTAL_DOMAINS <= 0){
                dispatch(update_auth({
                    NO_DOMAIN_NOTICE: true
                }));
            }
            /*if(
                USER_SERVICES.length <= 0 || USER_PERMISSIONS.filter(up => up.status === true )
            ) {
                dispatch(update_auth({
                    NO_PRODUCT_NOTICE: true
                }));
            }*/
        }
    },[USER_LOADING]);

    return (<>
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                {/* begin:: sidebar */}
                <DashboardSidebar />
                {/* end:: sidebar */}
                <div className={"wrapper d-flex flex-column flex-row-fluid"}>
                    {(LOADER_LOADING)? <div className="linear-activity">
                        <div className="indeterminate"></div>
                    </div> : <></>}

                    {/*--BEGIN::HEADER--*/}
                    <DashboardHeader />
                    {/*--END::HEADER--*/}

                    {/*--BEGIN::CONTENT-BOX--*/}
                    <div className="content d-flex flex-column flex-column-fluid">
                        <div className=" container-xxl">
                            <DashboardHeaderBodySm />
                            {ROLE && <>
                                {ROLE == "owner" && <Owner />}
                                {ROLE == "customer" && <Customer />}
                            </>}
                        </div>
                    </div>
                    {/*--END::CONTENT-BOX--*/}

                    {/*--BEGIN::FOOTER--*/}
                    <DashboardFooter />
                    {/*--END::FOOTER--*/}

                </div>
            </div>
        </div>

        {/* BEGIN::Network error modal */} 
        <Modal
            className="modal__network-error-main"
            show={ROUTES_FAILED}
            onHide={() => {}}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body>
                <div className="modal__network-error">
                    <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" />
                    <span className="network-error__title">
                        Couldn't connect to Backend!
                    </span>
                    <p>An error has occured while connecting to Backend server.</p>
                    <div className="network-error__button" onClick={() => dispatch(retry_auth_api())}>
                        {ROUTES_LOADING? <Spinner animation="grow" size="sm" /> : 'Try Again'}
                    </div>
                </div>
            </Modal.Body>
        </Modal> 
        {/* END::Network error modal */}                      

        {/* BEGIN:: logout modal */}
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={LOGOUT_MODAL}
            onHide={() => dispatch(update_auth({
                LOGOUT_MODAL: false
            }))}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <h3>Would You like to Logout your account?</h3>
            </Modal.Body>
            <Modal.Footer className="p-4">
                <button className="btn btn-secondary btn-sm" onClick={() => dispatch(update_auth({
                    LOGOUT_MODAL: false
                }))}>
                    Cancel
                </button>
                <button className="btn btn-danger btn-sm" onClick={logout}>
                    Logout
                </button>
            </Modal.Footer>
        </Modal>
        {/* END:: logout modal */}


        {/* BEGIN:: modal no product found */}
        {!USER_LOADING && ROLE === "customer" && <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={NO_DOMAIN_NOTICE}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <h2 className="modal-title">Notice !!!</h2>
                <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={() => dispatch(update_auth({
                    NO_DOMAIN_NOTICE: false
                }))}>
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>                
                </div>
            </Modal.Header>
            <Modal.Body>
                <h3>It Looks like Your Account dosn't have any Domain !</h3>
                <p>Before you start, visit our Add Domain section and add at least 1 domain to begin your journey.</p>
            </Modal.Body>
            <Modal.Footer className="p-4">
                <button onClick={() => navigate(`/dashboard/@${ROLE}/domains/domain/add`)} className="btn btn-sm btn-primary">
                    <i className="fa fa-plus"></i> Add Domain
                </button>
            </Modal.Footer>
        </Modal>}
        {/* END:: modal no product found */}

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>);
};

export default DashboardLayout;