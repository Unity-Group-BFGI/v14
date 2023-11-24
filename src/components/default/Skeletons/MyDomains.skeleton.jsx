import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// MY-DOMAINS
const MyDomainsSkeleton = () => {
    return (<>
        
    </>);
};

const MyDomainsOverviewSkeleton = () => {
    const cards = [{},{},{},{}];
    return (<>
    <div className="d-flex flex-wrap flex-stack my-5">
        {/*--begin::Heading--*/}
        <h2 className="fs-2 fw-semibold my-2 d-flex">
            <Placeholder as="div" animation="glow" className="p-0">
                <Placeholder style={{width: "100px", minHeight: '25px'}}  /> 
            </Placeholder>
        </h2>
        {/*--end::Heading--*/}

        {/*--begin::Controls--*/}
        <div className="d-flex flex-wrap my-1">
            {/*--begin::Select wrapper--*/}
            <div className="m-0">
                {/*--begin::Select--*/}
                <Placeholder as="button" animation="glow" className="p-0 btn btn-light-primary btn-sm border-0" variant={"primary"}>
                    <Placeholder style={{width: "80px", minHeight: '25px'}}  /> 
                </Placeholder>
                {/*--end::Select--*/}
            </div>
            {/*--end::Select wrapper--*/}
        </div>
        {/*--end::Controls--*/}
    </div>

    <div className="row g-6 g-xl-9">
        {/* Col */}
        {(cards && cards.length > 0 && cards.map((c, i) => {
            
            return (<div key={i} className="col-md-6 col-xl-4">
                {/* Card */}
                <a href="/seven-html-pro/apps/projects/project.html" className="card border-hover-primary">
                    {/* Card header */}
                    <div className="card-header border-0 pt-9">
                        {/* Card Title */}
                        <div className="card-title m-0">
                            {/* Avatar */}
                            <div className="symbol symbol-50px w-50px bg-light">
                                <Placeholder as="div" animation="glow" className="p-2">
                                    <Placeholder style={{width: "50px", minHeight: '50px'}}  /> 
                                </Placeholder>
                            </div>
                            {/* Avatar */}
                        </div>
                        {/* Card Title */}

                        {/* Card toolbar */}
                        <div className="card-toolbar">
                            <span className="badge badge-light-primary fw-bold me-auto p-0">
                                <Placeholder as="span" animation="glow" className="p-0">
                                    <Placeholder style={{width: "86px", minHeight: '30.55px'}}  /> 
                                </Placeholder>
                            </span>
                            
                        </div>
                        {/* Card toolbar */}
                    </div>
                    {/* Card header */}
                    {/* Card body */}
                    <div className="card-body p-9">
                        {/* Name */}
                        
                        <Placeholder as="div" animation="glow" className="fs-3 fw-bold text-dark">
                            <Placeholder style={{width: "86px", minHeight: '26px'}}  /> 
                        </Placeholder>
                        {/* Name */}

                        {/* Description */}
                        <Placeholder as="p" animation="glow" className="text-gray-400 fw-semibold fs-5 mt-2 mb-2">
                            <Placeholder style={{width: "100%", minHeight: '24px'}}  /> 
                        </Placeholder>
                        <Placeholder as="p" animation="glow" className="text-gray-400 fw-semibold fs-5 mt-0 mb-7">
                            <Placeholder style={{width: "60%", minHeight: '20px'}}  /> 
                        </Placeholder>
                        {/* Description */}

                        {/* Info */}
                        <div className="d-flex flex-wrap mb-5">
                            {/* Due */}
                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                                
                                <Placeholder as="div" animation="glow" className="fs-6 text-gray-800 fw-bold mb-1">
                                    <Placeholder style={{width: "100%", minHeight: '20px'}}  /> 
                                </Placeholder>
                                
                                <Placeholder as="div" animation="glow" className="fw-semibold text-gray-400">
                                    <Placeholder style={{width: "80%", minHeight: '20px'}}  /> 
                                </Placeholder>
                            </div>
                            {/* Due */}

                            {/* Due */}
                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                                
                                <Placeholder as="div" animation="glow" className="fs-6 text-gray-800 fw-bold mb-1">
                                    <Placeholder style={{width: "100%", minHeight: '20px'}}  /> 
                                </Placeholder>
                                
                                <Placeholder as="div" animation="glow" className="fw-semibold text-gray-400">
                                    <Placeholder style={{width: "80%", minHeight: '20px'}}  /> 
                                </Placeholder>
                            </div>
                            {/* Due */}
                            
                        </div>
                        {/* Info */}

                        
                        

                        <div className="fs-6 d-flex justify-content-between mb-4">
                            
                            <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                                <Placeholder style={{width: "200px", minHeight: '20px'}}  /> 
                            </Placeholder>
                            
                            
                            <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                                <Placeholder style={{width: "30px", minHeight: '20px'}}  /> 
                            </Placeholder>
                        </div>

                        <div className="separator separator-dashed"></div>

                        <div className="fs-6 d-flex justify-content-between my-4">
                            <Placeholder as="div" animation="glow" className="text-gray-600 fw-semibold">
                                <Placeholder style={{width: "170px", minHeight: '20px'}}  /> 
                            </Placeholder>

                            <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                                <Placeholder style={{width: "30px", minHeight: '20px'}}  /> 
                            </Placeholder>
                        </div>

                        <div className="separator separator-dashed"></div>

                        <div className="fs-6 d-flex justify-content-between mt-4">
                            <Placeholder as="div" animation="glow" className="text-gray-400 fw-semibold">
                                <Placeholder style={{width: "140px", minHeight: '20px'}}  /> 
                            </Placeholder>

                            <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                                <Placeholder style={{width: "30px", minHeight: '20px'}}  /> 
                            </Placeholder>
                        </div>
        




                    </div>
                    {/* Card body */}
                </a>
                {/* Card */}
            </div>)

        }))}
        {/* Col */}
    </div>
    </>);
};

const MyDomainsSettingsSkeleton = () => {
    return (<>
    
    </>);
};

const MyDomainsAddDomainSkeleton = () => {
    return (<>
    add domain loading
    </>);
};

const MyDomainsEditDomainSkeleton = () => {
    return (<>
    
    </>);
};


const MyDomainsAddDomainChoosePlatformSkeleton = () => {
    return (<>
        <div className="domains__content-box m-0">
            <div className="domains__content-box-app">
                <div className="domains__content-items d-flex flex-wrap justify-content-center flex-gap-30px">

                    <div className={`domains__content-box-app__item`}>
                        <div className="domains__content-box-app__item-box h-100">
                            <div className="p-10 d-flex flex-column justify-content-start h-100 align-items-center">
                                <div className="pt-4">
                                    <Placeholder as={"div"} animation="glow" >
                                        <Placeholder xs={6} style={{ minWidth: '70px', minHeight: '70px', borderRadius: '40px' }} />
                                    </Placeholder>
                                </div>
                                <h3 className="ligt mt-2">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '100px', minHeight: '15px' }} />
                                    </Placeholder> 
                                </h3>
                                <p className="mb-4">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '200px', minHeight: '12px' }} />
                                    </Placeholder> 
                                </p>                                     
                                
                                <Placeholder.Button className={`w-100 btn btn-light-primary`} variant="primary" xs={6} />
                            </div>
                        </div>
                    </div>


                    <div className={`domains__content-box-app__item`}>
                        <div className="domains__content-box-app__item-box h-100">
                            <div className="p-10 d-flex flex-column justify-content-start h-100 align-items-center">
                                <div className="pt-4">
                                    <Placeholder as={"div"} animation="glow" >
                                        <Placeholder xs={6} style={{ minWidth: '70px', minHeight: '70px', borderRadius: '40px' }} />
                                    </Placeholder>
                                </div>
                                <h3 className="ligt mt-2">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '100px', minHeight: '15px' }} />
                                    </Placeholder> 
                                </h3>
                                <p className="mb-4">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '200px', minHeight: '12px' }} />
                                    </Placeholder> 
                                </p>                                     
                                
                                <Placeholder.Button className={`w-100 btn btn-light-primary`} variant="primary" xs={6} />
                            </div>
                        </div>
                    </div>

                    <div className={`domains__content-box-app__item`}>
                        <div className="domains__content-box-app__item-box h-100">
                            <div className="p-10 d-flex flex-column justify-content-start h-100 align-items-center">
                                <div className="pt-4">
                                    <Placeholder as={"div"} animation="glow" >
                                        <Placeholder xs={6} style={{ minWidth: '70px', minHeight: '70px', borderRadius: '40px' }} />
                                    </Placeholder>
                                </div>
                                <h3 className="ligt mt-2">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '100px', minHeight: '15px' }} />
                                    </Placeholder> 
                                </h3>
                                <p className="mb-4">
                                    <Placeholder as={"div"} animation="glow">
                                        <Placeholder xs={6} style={{ minWidth: '200px', minHeight: '12px' }} />
                                    </Placeholder> 
                                </p>                                     
                                
                                <Placeholder.Button className={`w-100 btn btn-light-primary`} variant="primary" xs={6} />
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </>);
};


export {
    MyDomainsSkeleton,
    MyDomainsOverviewSkeleton,
    MyDomainsSettingsSkeleton,
    MyDomainsAddDomainSkeleton,
    MyDomainsEditDomainSkeleton,
    MyDomainsAddDomainChoosePlatformSkeleton
};