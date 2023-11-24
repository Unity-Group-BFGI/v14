import { useEffect, useState } from "react";

const LoadIcon = ({icon = ""}) => {
    const [iconBox,setIcon] = useState(<></>);
    useEffect(() => {
        switch(icon){
            case "icon-my-account":
                setIcon(<i className="ki-duotone ki-profile-circle fs-2x">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                </i>);
                break;
            case "icon-my-account-overview":
                setIcon(<i className="ki-duotone ki-profile-circle fs-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                </i>);
                break;
            case "icon-my-account-settings":
                setIcon(<i className="bi bi-gear fs-4"></i>);
                break;
            case "icon-my-account-security":
                setIcon(<i className="ki-duotone ki-fingerprint-scanning fs-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                </i>);
                break;
            case "icon-my-account-billing":
                setIcon(<i className="fa-thin fa-regular fa-credit-card fx-1"></i>);
                break;
            case "icon-my-account-statements":
                setIcon(<i className="ki-duotone ki-burger-menu fs-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                </i>);
                break;
            case "icon-my-account-logs":
                setIcon(<i className="ki-duotone ki-tablet-text-up fs-3">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>);
                break;                
            case "icon-accounts":
                setIcon(<i className="ki-duotone ki-people fs-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                </i>);
                break;
            case ("icon-my-domains"): 
                setIcon(<i className="ki-duotone ki-element-11 fs-2x">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                </i>);
                break;
            case ("icon-my-domains-overview"): 
                setIcon(<i className="ki-duotone ki-element-11 fs-1x">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                </i>);
                break;
            case ("icon-my-domains-add-new"):
                setIcon(<i className="fa fa-plus fs-1x"></i>);
                break;
            case ("icon-marketplace"):
                setIcon(<i className="ki-duotone ki-handcart fs-2 fs-2x"></i>);
                break;
            case ("icon-marketplace-overview"):
                setIcon(<i className="ki-duotone ki-briefcase fx-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>);
                break;
            case ("icon-marketplace-my-subscription"):
                setIcon(<i className="ki-duotone ki-basket fx-1">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                </i>);
                break;
            case ("icon-platform-wordpress-cms"):
                setIcon(<i className="fs-4x fa-brands fa-wordpress-simple domains__platform-img"></i>);
                break;
            case ("icon-platform-html5"):
                setIcon(<i className="fs-4x fa-brands fa-html5 domains__platform-img"></i>);
                break;
            case ("icon-ielts-lms"):
                setIcon(<i className="ki-duotone ki-abstract-33 fs-2x">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>);
                break;
            case ("icon-ielts-lms-my-quizzes"):
                setIcon(<i className="ki-duotone ki-abstract-26">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>);
                break;
            case ("icon-ielts-lms-free-quizzes"):
                setIcon(<i className="ki-duotone ki-abstract-21">
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>);
                break;
            default: 
                setIcon(<>no icon</>);
                break;
        }
    },[icon]);
    return (<>{iconBox}</>);
};

export default LoadIcon;