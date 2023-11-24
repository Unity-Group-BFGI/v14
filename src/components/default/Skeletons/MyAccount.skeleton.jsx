import Placeholder from 'react-bootstrap/Placeholder';
import { Skeleton } from '@mui/material';

const MyAccountSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
                {/* begin::Details */}
                <div className="d-flex flex-sm-nowrap">
                    {/* begin: Pic */}
                    <div className="me-7 mb-2">
                        <div className="symbol symbol-90px symbol-fixed position-relative">
                            <Skeleton variant="rectangular" width={90} height={90} />                    
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

// Overview
const MyAccountOverviewSkeleton = () => {
    return (<>
    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        {/* Card header */}
        <div className="card-header cursor-pointer">
            {/* Card title */}
            <div className="card-title m-0">
                <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                    <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                </Placeholder>
            </div>
            {/* Action */}
            <Placeholder.Button className={"btn btn-sm btn-primary align-self-center"} style={{width: '98px'}} variant="primary" />
        </div>
        {/* Card header */}
        {/* Card body */}
        <div className="card-body p-9">
            {/* Row */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Row */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
            {/* Input group */}
            <div className="row mb-7">
                {/* Label */}
                <label className="col-lg-4 fw-semibold text-muted">
                    <Placeholder animation="glow">
                        <Placeholder style={{width: "100px"}} />           
                    </Placeholder>
                </label>
                {/* Col */}
                <div className="col-lg-8">
                    <span className="fw-bold fs-6 text-gray-800">
                        <Placeholder animation="glow">
                            <Placeholder style={{width: "200px"}} />           
                        </Placeholder>
                    </span>
                </div>
            </div>
            {/* Input group */}
        </div>
        {/* Card body */}
    </div>
    </>);
};

// settings
const MyAccountSettingsSkeleton = () => {
    return (
        <div className="card mb-5 mb-xl-10" data-select2-id="select2-data-155-kq5x">
            {/* Card header */}
            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
                {/* Card title */}
                <div className="card-title m-0">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
            </div>
            {/* Card header */}
            {/* Content */}
            <div id="kt_account_settings_profile_details" className="collapse show" data-select2-id="select2-data-kt_account_settings_profile_details">
                {/* Form */}
                <form className="form fv-plugins-bootstrap5 fv-plugins-framework">
                    {/* Card body */}
                    <div className="card-body border-top p-9" data-select2-id="select2-data-154-scw1">

                        {/* Input group */}
                        <div className="row mb-6">
                            {/* Label */}
                            <label className="col-lg-4 col-form-label fs-6">
                                <Placeholder as={"div"} animation="glow">
                                    <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                                </Placeholder>
                            </label>
                            {/* Col */}
                            <div className="col-lg-8">
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
                            {/* Col */}
                        </div>
                        {/* Input group */}


                        {/* Input group */}
                        <div className="row mb-6">
                            {/* Label */}
                            <label className="col-lg-4 col-form-label fs-6">
                                <Placeholder as={"div"} animation="glow">
                                    <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                                </Placeholder>
                            </label>
                            {/* Col */}
                            <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                <Placeholder animation="glow">
                                    <Placeholder style={{minWidth: "245.89px", width: '100%', minHeight: '45.88px'}} />        
                                </Placeholder>
                            </div>
                            {/* Col */}
                        </div>
                        {/* Input group */}

                        {/* Input group */}
                        <div className="row mb-6">
                            {/* Label */}
                            <label className="col-lg-4 col-form-label fs-6">
                                <Placeholder as={"div"} animation="glow">
                                    <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                                </Placeholder>
                            </label>
                            {/* Col */}
                            <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                <Placeholder animation="glow">
                                    <Placeholder style={{minWidth: "245.89px", width: '100%', minHeight: '45.88px'}} />           
                                </Placeholder>
                            </div>
                            {/* Col */}
                        </div>
                        {/* Input group */}

                        {/* Input group */}
                        <div className="row mb-6">
                            {/* Label */}
                            <label className="col-lg-4 col-form-label fs-6">
                                <Placeholder as={"div"} animation="glow">
                                    <Placeholder style={{width: "100px", minHeight: '30px'}} />           
                                </Placeholder>
                            </label>
                            {/* Col */}
                            <div className="col-lg-8 fv-row fv-plugins-icon-container">
                                <Placeholder animation="glow">
                                    <Placeholder style={{minWidth: "245.89px", width: '100%', minHeight: '45.88px'}} />           
                                </Placeholder>
                            </div>
                            {/* Col */}
                        </div>
                        {/* Input group */}

                        
                    </div>
                    {/* Card body */}
                    {/* Actions */}
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <Placeholder.Button className={"btn btn-light btn-active-light-primary me-2 btn-sm"} style={{width: '98px'}} variant="secondary" />
                        <Placeholder.Button className={"btn btn-sm btn-primary btn-sm"} style={{width: '98px'}} variant="primary" />
                    </div>
                    {/* Actions */}
                    <input type="hidden" />
                </form>
                {/* Form */}
            </div>
            {/* Content */}
        </div>
    );
};

// Security
const MyAccountSecuritySkeleton = () => {
    return (<>
        <div className="card mb-5 mb-lg-10">
            {/* Card header */}
            <div className="card-header">
                {/* Heading */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar">
                    <div className="my-1 me-4">
                        {/* Select */}
                        <Placeholder.Button className={"btn btn-sm btn-light my-1"} style={{width: '100px'}} variant="secondary" />
                        {/* Select */}
                    </div>
                    
                    <Placeholder.Button className={"btn btn-sm btn-primary my-1"} style={{width: '76px'}} variant="primary" />
                </div>
                {/* Toolbar */}
            </div>
            {/* Card header */}
            {/* Card body */}
            <div className="card-body p-0">
                {/* Table wrapper */}
                <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                        {/* Thead */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="min-w-250px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-100px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fw-6 fw-semibold text-gray-600">
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-success fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-warning fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-danger fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-info fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>


                        </tbody>
                        {/* Tbody */}
                    </table>
                    {/* Table */}
                </div>
                {/* Table wrapper */}
            </div>
            {/* Card body */}
        </div>
    </>);
};

const MyAccountBillingSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-xl-10">

            {/* Card header */}
            <div className="card-header card-header-stretch pb-0">
                {/* Title */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"m-0"}>
                        <Placeholder style={{width: "140px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                
            </div>
            {/* Card header */}
            
            {/* Tab content */}
            <div className="card-body">
                
                {/* Title */}
                <Placeholder as={"h3"} animation="glow" className={"m-5"}>
                    <Placeholder style={{width: "100px", minHeight: '25px'}} xs={4} />           
                </Placeholder>
                {/* Row */}

                <div className="row gx-9 gy-6">

                    
                    {/* Col */}
                    <div className="col-xl-6" data-kt-billing-element="card">
                        {/* Card */}
                        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">

                            {/* Info */}
                            <div className="d-flex flex-column py-2">
                                {/* Owner */}
                                <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                                    <Placeholder as="h3" animation="glow">
                                        <Placeholder style={{width: "100px", minHeight: '20px'}} xs={4} /> 
                                    </Placeholder>
                                </div>
                                {/* Wrapper */}
                                <div className="d-flex align-items-center">
                                    {/* Icon */}
                                    
                                    <Placeholder as="div" animation="glow" className="me-4 mb-2">
                                        <Placeholder style={{width: "80px", minHeight: '48px'}}  /> 
                                    </Placeholder>
                                    {/* Details */}
                                    <div>
                                        <Placeholder as="p" animation="glow" className="fs-4 fw-bold m-0">
                                            <Placeholder style={{width: "100px", minHeight: '18px'}}  /> 
                                        </Placeholder>
                                        <Placeholder as="p" animation="glow" className="fs-6 fw-semibold text-gray-400 m-0">
                                            <Placeholder style={{width: "80px", minHeight: '15px'}}  /> 
                                        </Placeholder>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* Info */}

                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">                             
                                <Placeholder.Button className={"btn btn-sm btn-light me-3"} style={{width: '76px'}} variant="danger" />
                                <Placeholder.Button className={"btn btn-sm btn-light"} style={{width: '76px'}} variant="secondary" />
                            </div>
                            {/* Actions */}

                        </div>
                        {/* Card */}
                    </div>
                    {/* Col */}

                    {/* Col */}
                    <div className="col-xl-6" data-kt-billing-element="card">
                        {/* Card */}
                        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">

                            {/* Info */}
                            <div className="d-flex flex-column py-2">
                                {/* Owner */}
                                <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                                    <Placeholder as="h3" animation="glow">
                                        <Placeholder style={{width: "100px", minHeight: '20px'}} xs={4} /> 
                                    </Placeholder>
                                </div>
                                {/* Wrapper */}
                                <div className="d-flex align-items-center">
                                    {/* Icon */}
                                    
                                    <Placeholder as="div" animation="glow" className="me-4 mb-2">
                                        <Placeholder style={{width: "80px", minHeight: '48px'}}  /> 
                                    </Placeholder>
                                    {/* Details */}
                                    <div>
                                        <Placeholder as="p" animation="glow" className="fs-4 fw-bold m-0">
                                            <Placeholder style={{width: "100px", minHeight: '18px'}}  /> 
                                        </Placeholder>
                                        <Placeholder as="p" animation="glow" className="fs-6 fw-semibold text-gray-400 m-0">
                                            <Placeholder style={{width: "80px", minHeight: '15px'}}  /> 
                                        </Placeholder>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* Info */}

                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">                             
                                <Placeholder.Button className={"btn btn-sm btn-light me-3"} style={{width: '76px'}} variant="danger" />
                                <Placeholder.Button className={"btn btn-sm btn-light"} style={{width: '76px'}} variant="secondary" />
                            </div>
                            {/* Actions */}
                            
                        </div>
                        {/* Card */}
                    </div>
                    {/* Col */}

                    {/* Col */}
                    <div className="col-xl-6" data-kt-billing-element="card">
                        {/* Card */}
                        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">

                            {/* Info */}
                            <div className="d-flex flex-column py-2">
                                {/* Owner */}
                                <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                                    <Placeholder as="h3" animation="glow">
                                        <Placeholder style={{width: "100px", minHeight: '20px'}} xs={4} /> 
                                    </Placeholder>
                                </div>
                                {/* Wrapper */}
                                <div className="d-flex align-items-center">
                                    {/* Icon */}
                                    
                                    <Placeholder as="div" animation="glow" className="me-4 mb-2">
                                        <Placeholder style={{width: "80px", minHeight: '48px'}}  /> 
                                    </Placeholder>
                                    {/* Details */}
                                    <div>
                                        <Placeholder as="p" animation="glow" className="fs-4 fw-bold m-0">
                                            <Placeholder style={{width: "100px", minHeight: '18px'}}  /> 
                                        </Placeholder>
                                        <Placeholder as="p" animation="glow" className="fs-6 fw-semibold text-gray-400 m-0">
                                            <Placeholder style={{width: "80px", minHeight: '15px'}}  /> 
                                        </Placeholder>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* Info */}

                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">                             
                                <Placeholder.Button className={"btn btn-sm btn-light me-3"} style={{width: '76px'}} variant="danger" />
                                <Placeholder.Button className={"btn btn-sm btn-light"} style={{width: '76px'}} variant="secondary" />
                            </div>
                            {/* Actions */}
                            
                        </div>
                        {/* Card */}
                    </div>
                    {/* Col */}

                    
                </div>
                {/* Row */}
                
            </div>
            {/* Tab content */}
        </div>

        <div className="card mb-5 mb-xl-10">
            {/* Card header */}
            <div className="card-header card-header-stretch pb-0">
                {/* Title */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"m-0"}>
                        <Placeholder style={{width: "140px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                
            </div>
            {/* Card header */}

            {/* Card body */}
            <div className="card-body">
                {/* Addresses */}
                <div className="row gx-9 gy-6">
                    {/* Col */}
                    <div className="col-xl-6" data-kt-billing-element="address">
                        {/* Address */}
                        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">

                            {/* Details */}
                            <div className="d-flex flex-column py-2">

                                <Placeholder as="p" animation="glow" className="d-flex align-items-center fs-5 fw-bold mb-5">
                                    <Placeholder style={{width: "100px", minHeight: '18px'}}  /> 
                                </Placeholder>

                                <div className="fs-6 fw-semibold text-gray-600">
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "160px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "120px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "40px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                </div>
                            </div>
                            {/* Details */}

                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">
                                
                                <Placeholder.Button className={"btn btn-sm btn-light me-3"} style={{width: '76px'}} variant="danger" />

                                <Placeholder.Button className={"btn btn-sm btn-light"} style={{width: '76px'}} variant="secondary" />

                            
                            </div>
                            {/* Actions */}

                        </div>
                        {/* Address */}
                    </div>
                    {/* Col */}

                    {/* Col */}
                    <div className="col-xl-6" data-kt-billing-element="address">
                        {/* Address */}
                        <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
                            
                            {/* Details */}
                            <div className="d-flex flex-column py-2">

                                <Placeholder as="p" animation="glow" className="d-flex align-items-center fs-5 fw-bold mb-5">
                                    <Placeholder style={{width: "100px", minHeight: '18px'}}  /> 
                                </Placeholder>

                                <div className="fs-6 fw-semibold text-gray-600">
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "160px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "120px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className="fw-semibold text-gray-600 mb-1">
                                        <Placeholder style={{width: "40px", minHeight: '15px'}}  /> 
                                    </Placeholder>
                                </div>
                            </div>
                            {/* Details */}

                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">
                                
                                <Placeholder.Button className={"btn btn-sm btn-light me-3"} style={{width: '76px'}} variant="danger" />

                                <Placeholder.Button className={"btn btn-sm btn-light"} style={{width: '76px'}} variant="secondary" />

                            
                            </div>
                            {/* Actions */}

                        </div>
                        {/* Address */}
                    </div>
                    {/* Col */}                
                </div>
                {/* Addresses */}

                
            </div>
            {/* Card body */}



        </div>

        <div className="card">
            {/* Header */}
            <div className="card-header card-header-stretch">
                {/* Title */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar m-0">
                    {/* Tab nav */}
                    <ul className="nav nav-stretch fs-5 fw-semibold nav-line-tabs border-transparent" role="tablist">
                        <li className="nav-item" role="presentation">                  
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800 active"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                    </ul>
                    {/* Tab nav */}
                </div>
                {/* Toolbar */}
            </div>
            {/* Header */}
            {/* Tab Content */}
            <div id="kt_referred_users_tab_content" className="tab-content">
                {/* Tab panel */}
                <div id="kt_referrals_1" className="card-body p-0 tab-pane fade active show" role="tabpanel" aria-labelledby="kt_referrals_year_tab">
                    <div className="table-responsive">
                        {/* Table */}
                        <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                        {/* Thead */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="min-w-175px ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px px-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-350px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "200px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-125px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-125px text-center">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fs-6 fw-semibold text-gray-600">
                            {/* Add more rows as needed */}
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "120px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px'}} variant="primary" />                                
                                </td>
                            </tr>    
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "80px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px'}} variant="primary" />                                
                                </td>
                            </tr>     
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "120px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px', minHeight: '20px'}} variant="secondary" />                                
                                </td>
                            </tr>                
                            {/* Add more rows as needed */}
                        </tbody>
                        {/* Tbody */}
                        </table>
                        {/* Table */}
                    </div>
                </div>
                {/* Tab panel */}
                {/* Repeat the tab panels for other years as needed */}
            </div>
            {/* Tab Content */}
        </div>
    </>);
};

// Statements
const MyAccountStatementsSkeleton = () => {
    return (<>
        <div className="row g-xxl-9" data-select2-id="select2-data-150-wp7r">
            {/* Col */}
            <div className="col-xxl-12">
                {/* Earnings */}
                <div className="card card-xxl-stretch mb-5 mb-xxl-10">
                    {/* Header */}
                    <div className="card-header">
                        <div className="card-title">
                            <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                                <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </div>
                    </div>
                    {/* Header */}
                    {/* Body */}
                    <div className="card-body pb-0">
    
                        <Placeholder as={"div"} animation="glow" className={"fs-5 fw-semibold text-gray-600 pb-0 d-block mb-1"}>
                            <Placeholder style={{width: "600px", minHeight: '20px'}} xs={4} />           
                        </Placeholder>
                        <Placeholder as={"div"} animation="glow" className={"fs-5 fw-semibold text-gray-600 pb-4 d-block"}>
                            <Placeholder style={{width: "400px", minHeight: '20px'}} xs={4} />           
                        </Placeholder>

                        {/* Left Section */}
                        <div className="d-flex flex-wrap justify-content-between pb-6">
                            {/* Row */}
                            <div className="d-flex flex-wrap">
                                {/* Col */}
                                
                                <Placeholder as={"div"} animation="glow" className={"fs-2x fw-bold text-gray-800 lh-1 rounded my-3 p-0 me-6"}>
                                    <Placeholder style={{width: "125px", minHeight: '75px'}} xs={4} />           
                                </Placeholder>                         
                                {/* Col */}
                                <Placeholder as={"div"} animation="glow" className={"fs-2x fw-bold text-gray-800 lh-1 rounded my-3 p-0 me-6"}>
                                    <Placeholder style={{width: "125px", minHeight: '75px'}} xs={4} />           
                                </Placeholder>
                                {/* Col */}
                                <Placeholder as={"div"} animation="glow" className={"fs-2x fw-bold text-gray-800 lh-1 rounded my-3 p-0 me-6"}>
                                    <Placeholder style={{width: "125px", minHeight: '75px'}} xs={4} />           
                                </Placeholder>
                            </div>
                            {/* Row */}
                            
                            <Placeholder.Button className={"btn btn-primary px-6 flex-shrink-0 align-self-center"} style={{width: '98px'}} variant="primary" />
                        </div>
                        {/* Left Section */}
                    </div>
                    {/* Body */}

                </div>
                {/* Earnings */}
            </div>
            {/* Col */}
        </div>
        
        <div className="card">
            {/* Header */}
            <div className="card-header card-header-stretch">
                {/* Title */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar m-0">
                    {/* Tab nav */}
                    <ul className="nav nav-stretch fs-5 fw-semibold nav-line-tabs border-transparent" role="tablist">
                        <li className="nav-item" role="presentation">                  
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800 active"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Placeholder as={"a"} animation="glow" className={"nav-link text-active-gray-800"}>
                                <Placeholder style={{width: "70px", minHeight: '30px'}} xs={4} />           
                            </Placeholder>
                        </li>
                    </ul>
                    {/* Tab nav */}
                </div>
                {/* Toolbar */}
            </div>
            {/* Header */}
            {/* Tab Content */}
            <div id="kt_referred_users_tab_content" className="tab-content">
                {/* Tab panel */}
                <div id="kt_referrals_1" className="card-body p-0 tab-pane fade active show" role="tabpanel" aria-labelledby="kt_referrals_year_tab">
                    <div className="table-responsive">
                        {/* Table */}
                        <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                        {/* Thead */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="min-w-175px ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px px-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-350px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "200px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-125px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-125px text-center">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fs-6 fw-semibold text-gray-600">
                            {/* Add more rows as needed */}
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "120px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px'}} variant="primary" />                                
                                </td>
                            </tr>    
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "80px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px'}} variant="primary" />                                
                                </td>
                            </tr>     
                            <tr>
                                <td className="ps-9">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "125px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="ps-0">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "120px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-success">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td className="text-center">
                                    <Placeholder.Button className={"btn btn-light btn-sm btn-active-light-primary"} style={{width: '100px', minHeight: '20px'}} variant="secondary" />                                
                                </td>
                            </tr>                
                            {/* Add more rows as needed */}
                        </tbody>
                        {/* Tbody */}
                        </table>
                        {/* Table */}
                    </div>
                </div>
                {/* Tab panel */}
                {/* Repeat the tab panels for other years as needed */}
            </div>
            {/* Tab Content */}
        </div>
    </>);
}

// logs
const MyAccountLogsSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-lg-10">
            {/* Card header */}
            <div className="card-header">
                {/* Heading */}
                <div className="card-title">
                    <Placeholder as={"h3"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar">
                    <div className="my-1 me-4">
                        {/* Select */}
                        <Placeholder.Button className={"btn btn-sm btn-light my-1"} style={{width: '100px'}} variant="secondary" />
                        {/* Select */}
                    </div>
                    
                    <Placeholder.Button className={"btn btn-sm btn-primary my-1"} style={{width: '76px'}} variant="primary" />
                </div>
                {/* Toolbar */}
            </div>
            {/* Card header */}
            {/* Card body */}
            <div className="card-body p-0">
                {/* Table wrapper */}
                <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                        {/* Thead */}
                        <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                            <tr>
                                <th className="min-w-250px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-100px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                                <th className="min-w-150px">
                                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fw-6 fw-semibold text-gray-600">
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-success fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-warning fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-danger fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>

                            <tr>
                                <td>                      
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>

                                <td>                              
                                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-info fs-7 fw-bold"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>

                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-hover-primary text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                            </tr>


                        </tbody>
                        {/* Tbody */}
                    </table>
                    {/* Table */}
                </div>
                {/* Table wrapper */}
            </div>
            {/* Card body */}
        </div>

        <div className="card pt-4 mb-6">
            {/* Card header */}
            <div className="card-header border-0">
                {/* Card title */}
                <div className="card-title">
                    <Placeholder as={"h2"} animation="glow" className={"fw-bold m-0"}>
                        <Placeholder style={{width: "100px", minHeight: '30px'}} xs={4} />           
                    </Placeholder>

                </div>
                {/* Card title */}
                {/* Card toolbar */}
                <div className="card-toolbar">
                    {/* Button */}
                    <Placeholder.Button className={"btn btn-sm btn-primary my-1"} style={{width: '76px'}} />
                    {/* Button */}
                </div>
                {/* Card toolbar */}
            </div>
            {/* Card header */}
            {/* Card body */}
            <div className="card-body py-0">
                {/* Table wrapper */}
                <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5" id="kt_table_customers_logs">
                        {/* Table body */}
                        <tbody>

                            {/* Table row */}
                            <tr>
                                {/* Badge */}
                                <td className="min-w-70px">                                  
                                    <Placeholder as={"div"} animation="glow" className={"m-0 badge badge-light-success"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Badge */}
                                {/* Status */}
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "250px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Status */}
                                {/* Timestamp */}
                                <td className="pe-0 text-end min-w-200px">
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Timestamp */}
                            </tr>
                            {/* Table row */}

                            {/* Table row */}
                            <tr>
                                {/* Badge */}
                                <td className="min-w-70px">                                  
                                    <Placeholder as={"div"} animation="glow" className={"m-0 badge badge-light-success"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Badge */}
                                {/* Status */}
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "300px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Status */}
                                {/* Timestamp */}
                                <td className="pe-0 text-end min-w-200px">
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "100px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Timestamp */}
                            </tr>
                            {/* Table row */}

                            {/* Table row */}
                            <tr>
                                {/* Badge */}
                                <td className="min-w-70px">                                  
                                    <Placeholder as={"div"} animation="glow" className={"m-0 badge badge-light-success"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Badge */}
                                {/* Status */}
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "300px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Status */}
                                {/* Timestamp */}
                                <td className="pe-0 text-end min-w-200px">
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Timestamp */}
                            </tr>
                            {/* Table row */}

                            {/* Table row */}
                            <tr>
                                {/* Badge */}
                                <td className="min-w-70px">                                  
                                    <Placeholder as={"div"} animation="glow" className={"m-0 badge badge-light-success"}>
                                        <Placeholder style={{minWidth: "50px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Badge */}
                                {/* Status */}
                                <td>
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "300px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Status */}
                                {/* Timestamp */}
                                <td className="pe-0 text-end min-w-200px">
                                    <Placeholder as={"a"} animation="glow" className={"m-0 text-gray-600"}>
                                        <Placeholder style={{minWidth: "150px"}} />           
                                    </Placeholder>
                                </td>
                                {/* Timestamp */}
                            </tr>
                            {/* Table row */}

                        </tbody>
                        {/* Table body */}
                    </table>
                    {/* Table */}
                </div>
                {/* Table wrapper */}
            </div>
            {/* Card body */}
        </div>
    </>);
};

export {
    MyAccountSkeleton, 
    MyAccountOverviewSkeleton, 
    MyAccountSettingsSkeleton, 
    MyAccountSecuritySkeleton,
    MyAccountBillingSkeleton,
    MyAccountLogsSkeleton, 
    MyAccountStatementsSkeleton
};