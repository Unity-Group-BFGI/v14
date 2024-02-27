import Placeholder from 'react-bootstrap/Placeholder';

const MyDomainsOverviewSkeleton = () => {
    const cards = [{}, {}, {}, {}];
    return (<>
        <div className="d-flex flex-wrap flex-stack my-5">
            {/*--begin::Heading--*/}
            <h2 className="fs-2 fw-semibold my-2 d-flex">
                <Placeholder as="div" animation="glow" className="p-0">
                    <Placeholder style={{ width: "100px", minHeight: '25px' }} />
                </Placeholder>
            </h2>
            {/*--end::Heading--*/}

            {/*--begin::Controls--*/}
            <div className="d-flex flex-wrap my-1">
                {/*--begin::Select wrapper--*/}
                <div className="m-0">
                    {/*--begin::Select--*/}
                    <Placeholder as="button" animation="glow" className="p-0 btn btn-light-primary btn-sm border-0" variant={"primary"}>
                        <Placeholder style={{ width: "80px", minHeight: '25px' }} />
                    </Placeholder>
                    {/*--end::Select--*/}
                </div>
                {/*--end::Select wrapper--*/}
            </div>
            {/*--end::Controls--*/}
        </div>

        <MyDomainsDomainsListSkeleton />
    </>);
};

const MyDomainsDomainsListSkeleton = () => {
    const cards = [{}, {}, {}, {}];
    return (<>
        <div className="row g-6 g-xl-9">
            {/* Col */}
            {(cards && cards.length > 0 && cards.map((c, i) => {

                return (<MyDomainsSingleDomainSkeleton key={i} />)

            }))}
            {/* Col */}
        </div>

    </>)
};

const MyDomainsSingleDomainSkeleton = () => {
    return (<>
        <div className="col-md-6 col-xl-4">
            {/* Card */}
            <a className="card border-hover-primary">
                {/* Card header */}
                <div className="card-header border-0 pt-9">
                    {/* Card Title */}
                    <div className="card-title m-0">
                        {/* Avatar */}
                        <div className="symbol symbol-50px w-50px bg-light">
                            <Placeholder as="div" animation="glow" className="p-2">
                                <Placeholder style={{ width: "50px", minHeight: '50px' }} />
                            </Placeholder>
                        </div>
                        {/* Avatar */}
                    </div>
                    {/* Card Title */}

                    {/* Card toolbar */}
                    <div className="card-toolbar">
                        <span className="badge badge-light-primary fw-bold me-auto p-0">
                            <Placeholder as="span" animation="glow" className="p-0">
                                <Placeholder style={{ width: "86px", minHeight: '30.55px' }} />
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
                        <Placeholder style={{ width: "86px", minHeight: '26px' }} />
                    </Placeholder>
                    {/* Name */}

                    {/* Description */}
                    <Placeholder as="p" animation="glow" className="text-gray-400 fw-semibold fs-5 mt-2 mb-2">
                        <Placeholder style={{ width: "100%", minHeight: '24px' }} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="text-gray-400 fw-semibold fs-5 mt-0 mb-7">
                        <Placeholder style={{ width: "60%", minHeight: '20px' }} />
                    </Placeholder>
                    {/* Description */}

                    {/* Info */}
                    <div className="d-flex flex-wrap mb-5">
                        {/* Due */}
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">

                            <Placeholder as="div" animation="glow" className="fs-6 text-gray-800 fw-bold mb-1">
                                <Placeholder style={{ width: "100%", minHeight: '20px' }} />
                            </Placeholder>

                            <Placeholder as="div" animation="glow" className="fw-semibold text-gray-400">
                                <Placeholder style={{ width: "80%", minHeight: '20px' }} />
                            </Placeholder>
                        </div>
                        {/* Due */}

                        {/* Due */}
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">

                            <Placeholder as="div" animation="glow" className="fs-6 text-gray-800 fw-bold mb-1">
                                <Placeholder style={{ width: "100%", minHeight: '20px' }} />
                            </Placeholder>

                            <Placeholder as="div" animation="glow" className="fw-semibold text-gray-400">
                                <Placeholder style={{ width: "80%", minHeight: '20px' }} />
                            </Placeholder>
                        </div>
                        {/* Due */}

                    </div>
                    {/* Info */}




                    <div className="fs-6 d-flex justify-content-between mb-4">

                        <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                            <Placeholder style={{ width: "200px", minHeight: '20px' }} />
                        </Placeholder>


                        <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                            <Placeholder style={{ width: "30px", minHeight: '20px' }} />
                        </Placeholder>
                    </div>

                    <div className="separator separator-dashed"></div>

                    <div className="fs-6 d-flex justify-content-between my-4">
                        <Placeholder as="div" animation="glow" className="text-gray-600 fw-semibold">
                            <Placeholder style={{ width: "170px", minHeight: '20px' }} />
                        </Placeholder>

                        <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                            <Placeholder style={{ width: "30px", minHeight: '20px' }} />
                        </Placeholder>
                    </div>

                    <div className="separator separator-dashed"></div>

                    <div className="fs-6 d-flex justify-content-between mt-4">
                        <Placeholder as="div" animation="glow" className="text-gray-400 fw-semibold">
                            <Placeholder style={{ width: "140px", minHeight: '20px' }} />
                        </Placeholder>

                        <Placeholder as="div" animation="glow" className="text-gray-800 fw-semibold">
                            <Placeholder style={{ width: "30px", minHeight: '20px' }} />
                        </Placeholder>
                    </div>





                </div>
                {/* Card body */}
            </a>
            {/* Card */}
        </div>
    </>)
};

const MyDomainOverviewSkeleton = () => {
    return (<>
        <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
                {/* begin::Details */}
                <div className="d-flex flex-sm-nowrap">
                    {/* begin: Pic */}
                    <div className="me-7 mb-2">
                        <div className="symbol symbol-60px symbol-fixed position-relative">
                            <Placeholder as="div" animation="glow" className={"text-gray-900 text-hover-primary fs-2 fw-bold me-1"}>
                                <Placeholder xs={12} style={{ width: "60px", height: '60px' }} />
                            </Placeholder>
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
                                        <Placeholder xs={12} style={{ width: "100px" }} />
                                    </Placeholder>
                                </div>
                                {/* end::Name */}

                                {/* begin::Info */}
                                <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{ width: "100px" }} />
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{ width: "100px" }} />
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow" className={"d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"}>
                                        <Placeholder xs={12} style={{ width: "100px" }} />
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
                            <Placeholder xs={12} style={{ minHeight: "25px", width: "100px" }} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{ minHeight: "25px", width: "100px" }} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{ minHeight: "25px", width: "100px" }} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{ minHeight: "25px", width: "100px" }} />
                        </Placeholder>
                    </li>
                    <li className="nav-item" >
                        <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5"}>
                            <Placeholder xs={12} style={{ minHeight: "25px", width: "100px" }} />
                        </Placeholder>
                    </li>
                    {/* end::Nav item */}
                </ul>
                {/* begin::Navs */}
            </div>
        </div>
    </>);
};

const MyDomainApiKeyTrSkeleton = () => {
    const data = [{},{},{},{}];
    return (<>
        {data.length > 0 && data.map((data,index) => {
            return (<tr key={index}>
                <td className="ps-9">
                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                        <Placeholder style={{minWidth: "125px", minHeight: '20px'}} />           
                    </Placeholder>
                </td>
                <td>
                    <Placeholder as={"div"} animation="glow" className={"m-0"}>
                        <Placeholder style={{minWidth: "100px"}} />           
                    </Placeholder>
                </td>
                <td>
                    <Placeholder as={"span"} animation="glow" className={"m-0 badge badge-light-primary fs-7 fw-semibold"}>
                        <Placeholder style={{minWidth: "50px"}} />           
                    </Placeholder>
                </td>
                <td className="pe-9 d-flex">
                    
                    <Placeholder.Button className={"btn btn-color-gray-500 btn-active-color-primary btn-icon btn-sm btn-outline-light"} style={{width: '42px'}} variant="secondary" />
                    &nbsp; &nbsp;
                    <div className="w-100px position-relative">
                        <Placeholder as={"div"} className={"form-select form-select-sm form-select-solid"}>
                            <Placeholder style={{width: '50px', minHeight: '20px'}} />           
                        </Placeholder>
                    </div>
                </td>
            </tr>)
        })}
    </>)
};

export {
    MyDomainsOverviewSkeleton,
    MyDomainsSingleDomainSkeleton,
    MyDomainsDomainsListSkeleton,
    MyDomainOverviewSkeleton,
    MyDomainApiKeyTrSkeleton
};