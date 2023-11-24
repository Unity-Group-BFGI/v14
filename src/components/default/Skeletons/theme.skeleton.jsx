import { useDispatch, useSelector } from "react-redux";
import { update_theme } from '../../../includes/redux-store/Slices/Theme.slice';
import Placeholder from 'react-bootstrap/Placeholder';


const PrimaryMenuSkeleton = () => {
    const menu = [{},{},{},{},{}];
    return (<>
        <ul className="nav flex-column" role="tablist">
            {menu.length > 0 && menu.map((m,index) => {
                return <li className="nav-item mb-2" role="presentation" key={index}>
                    <Placeholder as="div" animation="glow">
                        <Placeholder className="placeholder-custom" />
                    </Placeholder>
                </li>
            })}  
        </ul>
    </>)
};

const SecondryMenuSkeleton = () => {
    const menu = [{},{},{},{},{},{},{}];
    return (<>
        {menu.length > 0 && menu.map((m,index) => {
            return <div className="menu-item pb-0" key={index}>
                <div className="menu-link d-block pb-0">
                    <Placeholder animation="glow" className={"mb-2"}>
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
            </div>
        })}
    </>);
};


const HeaderSkeleton = () => {
    const dispatch = useDispatch();
    const { SIDEBAR_EXPAND, Y, WIDTH } = useSelector(state => state.theme );
    return (<>
        <div className={WIDTH > 991? (Y >= 100? (SIDEBAR_EXPAND? 'header header-sticky pl-header-custom' : 'header header-sticky pl-header-custom-100') : 'header') : (Y >= 100? 'header header-sticky': 'header')}>
            <div className="container-xxl d-flex align-items-center justify-content-between">
                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">             
                    <Placeholder as={"h1"} animation="glow" className={"text-dark fw-semibold my-0 fs-2"}>
                        <Placeholder style={{width: "55px"}} xs={4} />           
                    </Placeholder>
                    
                    <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                    </ul>
                    
                </div>
        
                
                <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
                    <div className="btn btn-icon btn-active-icon-primary" onClick={() => dispatch(update_theme({
                        SIDEBAR_EXPAND: !SIDEBAR_EXPAND
                    }))}>
                        <span className="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                    <a href="/dashboard" className="d-flex align-items-center">
                        <img alt="Logo" src={"https://preview.keenthemes.com/seven-html-pro/assets/media/logos/logo-default.svg"} className="h-40px" />
                    </a>
                </div>                   

                <div className="d-flex flex-shrink-0">
                    
                </div>

            </div>
        </div>
        {(Y>= 100)?
        <div className={WIDTH > 991? (Y >= 100? (SIDEBAR_EXPAND? 'header opacity-0 pointer-events-none' : 'header opacity-0 pointer-events-none') : 'header opacity-0 pointer-events-none') : (Y >= 100? 'header opacity-0 pointer-events-none': 'header opacity-0 pointer-events-none')}>
            <div className="container-xxl d-flex align-items-center justify-content-between">
                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">             
                    <Placeholder as={"h1"} animation="glow" className={"text-dark fw-semibold my-0 fs-2"}>
                        <Placeholder style={{width: "55px"}} xs={4} />           
                    </Placeholder>
                    
                    <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                        <li className={"breadcrumb-item text-muted"}>
                            <Placeholder animation="glow">
                                <Placeholder style={{width: "55px"}} xs={4} />           
                            </Placeholder>
                        </li> 
                    </ul>
                    
                </div>
        
                
                <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
                    <div className="btn btn-icon btn-active-icon-primary" onClick={() => dispatch(update_theme({
                        SIDEBAR_EXPAND: !SIDEBAR_EXPAND
                    }))}>
                        <span className="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                    <a href="/dashboard" className="d-flex align-items-center">
                        <img alt="Logo" src={"https://preview.keenthemes.com/seven-html-pro/assets/media/logos/logo-default.svg"} className="h-40px" />
                    </a>
                </div>                   

                <div className="d-flex flex-shrink-0">
                    
                </div>

            </div>
        </div> : <></>}
    </>);
};

export {
    PrimaryMenuSkeleton,
    SecondryMenuSkeleton,
    HeaderSkeleton
};