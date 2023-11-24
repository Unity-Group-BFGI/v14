import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { auth, signInWithPopup, googleAuthProvider } from "../../../includes/middlewares/Firebase/Firebase.middleware";

const PrimaryNavbar = () => {
    const { AUTH_APP_LOADED, VERIFY_LOADING }           = useSelector( state => state.auth );
    const { IS_USER_LOGGED_IN, USER, IS_USER_VERIFIED } = useSelector( state => state.auth );
    const { API_LOADED }                                = useSelector( state => state.api );
    
    const goTo = (url) => {
        window.open(url, '_blank');
    };

    const signInWithGoogle = () => {
		signInWithPopup(auth, googleAuthProvider).then((result) => {
		}).catch((error) => {
			if(error.errorCode === "auth/operation-not-allowed") {
				alert("Auth::method-not-allowed");
			}
		});
	};

    return (<>
        <section>
            <div className="flex items-center justify-between px-7 py-5 bg-white">
                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto mr-14">
                            <a href="#">
                                <img src="/svgs/flaro-logo-black.svg" alt="logo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto hidden lg:block">
                            <ul className="flex items-center mr-16">
                                <li className="mr-9 font-medium hover:text-gray-700">
                                    <Link to="/" data-config-id="auto-txt-1-2">Home</Link>
                                </li>
                                <li className="mr-9 font-medium hover:text-gray-700">
                                    <Link to="/about" data-config-id="auto-txt-1-2">About</Link>
                                </li>
                                <li className="mr-9 font-medium hover:text-gray-700">
                                    <Link to="/pricing" data-config-id="auto-txt-1-2">Pricing</Link>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto hidden lg:block">
                            <div className="inline-block">
                                {API_LOADED && AUTH_APP_LOADED? <>

                                    {IS_USER_LOGGED_IN && IS_USER_VERIFIED? <>
                                        <button 
                                            className="flex py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200" 
                                            type="button" onClick={() => goTo("/dashboard") }
                                        > 
                                            <img style={{width: '25px', marginRight: "10px"}} src={USER.photoUrl} alt="google logo" />
                                            {USER.displayName}
                                        </button>
                                    </> : <></>}

                                    {!IS_USER_LOGGED_IN? <>

                                        <button 
                                            className="flex py-3 px-5 w-full font-semibold border hover:border-gray-300 rounded-xl focus:ring focus:ring-gray-50 bg-white hover:bg-gray-50 transition ease-in-out duration-200" 
                                            type="button" onClick={signInWithGoogle}
                                        >
                                            <img style={{width: '25px', marginRight: "10px"}} src={"/svgs/google-logo.svg"} alt="google logo" /> My Account
                                        </button>
                                    
                                    
                                    </> : <></>}    

                                </> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </>);
};

export default PrimaryNavbar;