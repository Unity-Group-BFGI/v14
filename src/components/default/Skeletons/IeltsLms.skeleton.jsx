import Placeholder from 'react-bootstrap/Placeholder';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';

const IeltsLmsEditQuizDynamicMenuSkeleton = () => {
    return (<>
    
        <div className={"menu-link d-flex flex-row align-items-stretch mb-1"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
        <div className={"menu-link d-flex flex-row align-items-stretch mb-1"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
        <div className={"menu-link d-flex flex-row align-items-stretch mb-1"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
        <div className={"menu-link d-flex flex-row align-items-stretch mb-1"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
        <div className={"menu-link d-flex flex-row align-items-stretch mb-1"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
    
    </>);
};

const IeltsLmsEditQuizOverviewSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
                {/* begin::Details */}
                <div className="d-flex flex-sm-nowrap">
                    {/* begin: Pic */}
                    <div className="me-7 mb-2">
                        <div className="symbol symbol-60px symbol-fixed position-relative">
                            <Skeleton variant="rectangular" width={60} height={60} />                    
                        </div>
                    </div>
                    {/* end::Pic */}
                    {/* begin::Info */}
                    <div className="flex-grow-1">
                        {/* begin::Title */}
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            {/* begin::User */}
                            <div className="d-flex flex-column">
                                {/* begin::Name */}
                                <div className="d-flex align-items-center mb-0">
                                    <Placeholder as="p" animation="glow" className={"text-gray-900 text-hover-primary fs-2 fw-bold me-1"}>
                                        <Placeholder xs={12} style={{width: "100px"}} />
                                    </Placeholder>                                  
                                </div>
                                {/* end::Name */}

                                {/* begin::Info */}
                                <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{width: "100px"}} />
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{width: "100px"}} />
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{width: "100px"}} />
                                    </Placeholder>
                                </div>
                                {/* end::Info */}
                                
                            </div>
                            {/* end::User */}
                            {/* begin::Actions */}
                            {/* end::Actions */}
                        </div>
                        {/* end::Title */}
                        
                    </div>
                    {/* end::Info */}
                </div>
                {/* end::Details */}

                {/* begin::Navs */}
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                    {/* begin::Nav item */}
                    <li className="nav-item">
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                        </Placeholder>
                    </li>
                    {/* end::Nav item */}
                </ul>
                {/* begin::Navs */}
            </div>
        </div>
    </>);
};


// basic quiz edit
const IeltsLmsEditQuizBasicEditSkeleton = () => {
    return (<>
        <div className="card">
            {/*--begin::Card header--*/}
            <div className="card-header">
                {/*--begin::Card title--*/}
                <div className="card-title fs-3 fw-bold">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/*--end::Card title--*/}
            </div>
            {/*--end::Card header--*/}
            {/*--begin::Form--*/}
            <div>

                {/*--begin::Card body--*/}
                <div className="card-body p-9">
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            
                            <Placeholder as={"div"} animation="glow">
                                <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                            </Placeholder>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <Placeholder animation="glow">
                                <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                            </Placeholder>
                        </div>
                    </div>
                    {/*--end::Row--*/}
                    
                    {/*--begin::Row--*/}
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <Placeholder as={"div"} animation="glow">
                                <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                            </Placeholder>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            <Placeholder animation="glow">
                                <Placeholder style={{width: '100%', minHeight: '150px'}} />            
                            </Placeholder>
                        </div>
                        {/*--begin::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                    {/*--begin::Row--*/}
        
                    <div className="row mb-8">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <Placeholder as={"div"} animation="glow">
                                <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                            </Placeholder>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9 fv-row fv-plugins-icon-container">
                            {/* Row */}
                            <div className="row">
                                {/* Col */}
                                <div className="col-lg-6 fv-row fv-plugins-icon-container mb-2">
                                    <Placeholder animation="glow">
                                        <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                                    </Placeholder>
                                </div>
                                {/* Col */}
                                <div className="col-lg-6 fv-row fv-plugins-icon-container mb-2">
                                    <Placeholder animation="glow">
                                        <Placeholder style={{width: '100%', minHeight: '45.88px'}} />       
                                    </Placeholder>
                                </div>
                            </div>
                            {/* Row */}

                        </div>
                        {/*--begin::Col--*/}
                    </div>                  
                    {/*--end::Row--*/}

                    
                    {/*--begin::Row--*/}
                    <div className="row">
                        {/*--begin::Col--*/}
                        <div className="col-xl-3">
                            <Placeholder as={"div"} animation="glow">
                                <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                            </Placeholder>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-9">
                            <Placeholder as={"div"} animation="glow">
                                <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                            </Placeholder>
                        </div>
                        {/*--end::Col--*/}
                    </div>
                    {/*--end::Row--*/}

                </div>
                {/*--end::Card body--*/}

                {/*--begin::Card footer--*/}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    
                    <Placeholder.Button className={"btn btn-light btn-active-light-primary me-2 btn-sm"} style={{width: '98px'}} variant="secondary" />
                    <Placeholder.Button className={"btn btn-sm btn-primary btn-sm"} style={{width: '98px'}} variant="primary" />
                </div>
                {/*--end::Card footer--*/}
                
            </div>
            {/*--end:Form--*/}
        </div>
    </>);
};


// writing essay skeleton
const IeltsLmsEditQuizWritingEssaySkeleton = () => {
    return (<>
        writing essay list
    </>);
};


// writing essay list skeleton
const IeltsLmsEditQuizEssayListSkeleton = () => {
    const [loaders,setLoaders] = useState([{},{},{},{}]);
    return (<>
        <div className="card mb-5 mb-xl-10">
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer">
                <div className="card-title m-0">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                <div className="card-toolbar">
                    <Placeholder.Button className={"btn btn-sm btn-primary btn-sm"} style={{width: '98px'}} variant="primary" />
                </div>
            </div>
            {/* end::Card header */}

            {/* begin::Content */}
            <div id="kt_account_settings_connected_accounts" className="collapse show">
                {/* begin::Card body */}
                <div className="card-body border-top p-9">
                    
                    {/* begin::Items */}
                    <div className="py-2">
                        {/* begin::Item */}
                        {(loaders && loaders.length > 0 && loaders.map((loader,index) => {
                            return (<React.Fragment key={index}>
                                <div className="d-flex flex-stack">
                                    <div className="d-flex">
                                        <Skeleton variant="rectangular" className="w-40px h-40px me-6" />
                                        <div className="d-flex flex-column">
                                            
                                            <Placeholder as={"a"} animation="glow" className="fs-5 text-dark text-hover-primary fw-bold">
                                                <Placeholder style={{width: "100px"}} xs={4} />           
                                            </Placeholder>
                                            <Placeholder as={"div"} animation="glow" className="fs-6 fw-semibold text-gray-400">
                                                <Placeholder style={{width: "200px"}} xs={4} />           
                                            </Placeholder>
                                            
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-evenly">
                                        
                                        <Placeholder as={"div"} animation="glow" className="mx-2 form-check form-check-solid form-check-custom form-switch">
                                            <Placeholder style={{width: "40px", minHeight: "20px"}} xs={4} />           
                                        </Placeholder>
                                        <Placeholder as={"div"} animation="glow" className="form-check form-check-solid form-check-custom form-switch">
                                            <Placeholder style={{width: "40px", minHeight: "20px"}} xs={4} />       
                                        </Placeholder>
                                    </div>
                                </div>
                                {index+1 < loaders.length && <div className="separator separator-dashed my-5"></div>}
                            </React.Fragment>)
                        }))}
                        
                        {/* end::Item */}
                        
                    </div>
                    {/* end::Items */}
                </div>
                {/* end::Card body */}
                {/* begin::Card footer */}
                
                {/* end::Card footer */}
            </div>
            {/* end::Content */}
        </div>
    </>);
};


const IeltsLmsEditQuizWritingEditEssaySkeleton = () => {
    return (<>
        <form className="" style={{display: 'contents'}}>
            <div className="modal-body">

                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">  
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                        </Placeholder>          
                    </div>
                </div>
                {/* END::ROW */}

                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                        </Placeholder>
                    </div>
                </div>
                {/* END::ROW */}

                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid w-100 p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '300px'}} />            
                        </Placeholder>
                    </div>
                </div>
                {/* END::ROW */}
                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <div className="fs-6 fw-semibold mt-2 mb-3">
                            <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                                <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                            </Placeholder> 
                        </div>
                    </div>
                    <div className={"col-xl-9"}>
                    
                    </div>
                </div>
                {/* END::ROW */}
                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    {/*--begin::Col--*/}
                    <div className="col-xl-9 fv-row fv-plugins-icon-container">
                        <div className="position-relative col-md-6 col-sm-12" htmlFor="mm">
                            <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                                <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                            </Placeholder>
                        </div>
                    </div>
                    {/*--begin::Col--*/}
                </div>
                {/* END::ROW */}
                {/* BEGIN::ROW */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <div className="position-relative col-md-6 col-sm-12">
                            <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                                <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                            </Placeholder>
                        </div>
                    </div>
                </div>
                {/* END::ROW */}
            </div>
            <div className="modal-footer p-4 d-flex flex-row justify-content-right">
                <Placeholder.Button className={"btn btn-primary btn-sm pull-right float-right"} style={{width: '98px'}} variant="primary" />                      
            </div>
        </form>
    </>);
};

const IeltsLmsEditQuizSpeakingEditQuestionSkeleton  = () => {
    return (<>
        <form className="" style={{display: 'contents'}}>
            <div className="modal-body">

                {/* BEGIN::ROW- title */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">  
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                        </Placeholder>          
                    </div>
                </div>
                {/* END::ROW */}

                {/* BEGIN::ROW - order */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                        </Placeholder>
                    </div>
                </div>
                {/* END::ROW */}

                {/* BEGIN::ROW - html editor */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid w-100 p-0"}>
                            <Placeholder style={{width: '100%', minHeight: '300px'}} />            
                        </Placeholder>
                    </div>
                </div>
                {/* END::ROW */}

                
                {/* BEGIN::ROW - time */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    {/*--begin::Col--*/}
                    <div className="col-xl-9 fv-row fv-plugins-icon-container">
                        <div className="position-relative col-md-6 col-sm-12" htmlFor="mm">
                            <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                                <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                            </Placeholder>
                        </div>
                    </div>
                    {/*--begin::Col--*/}
                </div>
                {/* END::ROW */}

                {/* BEGIN::ROW - status */}
                <div className="row mb-8">
                    <div className="col-xl-3">
                        <Placeholder as={"div"} animation="glow" className={"fs-6 fw-semibold mt-2 mb-3"}>
                            <Placeholder style={{width: '100px', minHeight: '35.88px'}} />           
                        </Placeholder>
                    </div>
                    <div className="col-xl-9">
                        <div className="position-relative col-md-6 col-sm-12">
                            <Placeholder as={"div"} animation="glow" className={"form-control form-control-solid p-0"}>
                                <Placeholder style={{width: '100%', minHeight: '45.88px'}} />            
                            </Placeholder>
                        </div>
                    </div>
                </div>
                {/* END::ROW */}

            </div>
            <div className="modal-footer p-4 d-flex flex-row justify-content-right">
                <Placeholder.Button className={"btn btn-primary btn-sm pull-right float-right"} style={{width: '98px'}} variant="primary" />                      
            </div>
        </form>
    </>);
};



// ielts connected domains generate quiz skeleton
const QuizForMyDomainsSkeleton = () => {
    const [loaders,setLoaders] = useState([{},{},{}]);
    return (<>
        <div className="card mb-5 mb-xl-10">
            {/* begin::Card header */}
            <div className="card-header border-0 cursor-pointer">
                <div className="card-title m-0">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
            </div>
            {/* end::Card header */}

            {/* begin::Content */}
            <div id="kt_account_settings_connected_accounts" className="collapse show">
                {/* begin::Card body */}
                <div className="card-body border-top p-9">
                    
                    {/* begin::Items */}
                    <div className="py-2">
                        {/* begin::Item */}
                        {(loaders && loaders.length > 0 && loaders.map((loader,index) => {
                            return (<React.Fragment key={index}>
                                <div className="d-flex flex-stack">
                                    <div className="d-flex">
                                        <Skeleton variant="rectangular" className="w-40px h-40px me-6" />
                                        <div className="d-flex flex-column">
                                            
                                            <Placeholder as={"a"} animation="glow" className="fs-5 text-dark text-hover-primary fw-bold">
                                                <Placeholder style={{width: "100px"}} xs={4} />           
                                            </Placeholder>
                                            <Placeholder as={"div"} animation="glow" className="fs-6 fw-semibold text-gray-400">
                                                <Placeholder style={{width: "200px"}} xs={4} />           
                                            </Placeholder>
                                            
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <div className="form-check form-check-solid form-check-custom form-switch">
                                            <input className="form-check-input w-45px h-30px" type="checkbox" id="googleswitch" disabled />
                                            <label className="form-check-label" htmlFor="googleswitch"></label>
                                        </div>
                                    </div>
                                </div>
                                {index+1 < loaders.length && <div className="separator separator-dashed my-5"></div>}
                            </React.Fragment>)
                        }))}
                        
                        {/* end::Item */}
                        
                    </div>
                    {/* end::Items */}
                </div>
                {/* end::Card body */}
                {/* begin::Card footer */}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                    <Placeholder.Button className={"btn btn-sm btn-primary btn-sm"} style={{width: '98px'}} variant="primary" />
                </div>
                {/* end::Card footer */}
            </div>
            {/* end::Content */}
        </div>
    </>);
}


const IeltsLmsEditQuizDynamicSkeleton = () => {
    const { PARAM3, PARAM2 } = useSelector( state => state.route );
    const [context,setContext] = useState(<></>);
    useEffect(() => {
        if(PARAM2 === "ielts-lms-edit-quiz"){
            if(PARAM3 === "ielts-lms-edit-quiz-basic-edit"){
                setContext(<IeltsLmsEditQuizBasicEditSkeleton />);
            } else if(PARAM3 === "ielts-lms-edit-quiz-writing-essay"){
                setContext(<IeltsLmsEditQuizWritingEssaySkeleton />);
            }
        }
    },[PARAM2,PARAM3]);

    return (<>
        {context}
    </>);
};


export { 
    IeltsLmsEditQuizDynamicMenuSkeleton, 
    IeltsLmsEditQuizOverviewSkeleton, 
    IeltsLmsEditQuizDynamicSkeleton, 
    IeltsLmsEditQuizBasicEditSkeleton, 
    QuizForMyDomainsSkeleton,
    IeltsLmsEditQuizEssayListSkeleton,
    IeltsLmsEditQuizWritingEditEssaySkeleton,
    IeltsLmsEditQuizSpeakingEditQuestionSkeleton
};