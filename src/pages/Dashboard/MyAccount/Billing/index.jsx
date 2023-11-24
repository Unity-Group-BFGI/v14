import { MyAccountBillingSkeleton } from '../../../../components/Skeletons';

const Billing = () => {
    const loading = true;
    return (<>
    {loading? <MyAccountBillingSkeleton /> :
    <>
        <div className="card mb-5 mb-xl-10">
            {/* Card header */}
            <div className="card-header card-header-stretch pb-0">
                {/* Title */}
                <div className="card-title">
                <h3 className="m-0">Payment Methods</h3>
                </div>
                {/* Toolbar */}
                <div className="card-toolbar m-0">
                {/* Tab nav */}
                {/* You can add Tab navigation here if needed */}
                </div>
            </div>
            {/* Card header */}
            
            {/* Tab content */}
            <div id="kt_billing_payment_tab_content" className="card-body tab-content">
                {/* Tab panel */}
                <div id="kt_billing_creditcard" className="tab-pane fade active show" role="tabpanel" aria-labelledby="kt_billing_creditcard_tab">
                {/* Title */}
                <h3 className="mb-5">My Cards</h3>
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
                            Marcus Morris 
                            <span className="badge badge-light-success fs-7 ms-2">Primary</span>
                        </div>
                        {/* Wrapper */}
                        <div className="d-flex align-items-center">
                            {/* Icon */}
                            <img src="/seven-html-pro/assets/media/svg/card-logos/visa.svg" alt="" className="me-4" />
                            {/* Details */}
                            <div>
                            <div className="fs-4 fw-bold">Visa **** 1679</div>
                            <div className="fs-6 fw-semibold text-gray-400">Card expires at 09/24</div>
                            </div>
                        </div>
                        </div>
                        {/* Info */}
                        {/* Actions */}
                        <div className="d-flex align-items-center py-2">
                        <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="card-delete">
                            {/* Indicator label */}
                            <span className="indicator-label">
                            Delete
                            </span>
                            {/* Indicator label */}
                            {/* Indicator progress */}
                            <span className="indicator-progress">
                            Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                            {/* Indicator progress */}
                        </button>
                        <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Edit</button>
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
                                Jacob Holder 
                            </div>
                            {/* Wrapper */}
                            <div className="d-flex align-items-center">
                                {/* Icon */}
                                <img src="/seven-html-pro/assets/media/svg/card-logos/american-express.svg" alt="" className="me-4" />
                                {/* Details */}
                                <div>
                                <div className="fs-4 fw-bold">Mastercard **** 2040</div>
                                <div className="fs-6 fw-semibold text-gray-400">Card expires at 10/22</div>
                                </div>
                            </div>
                            </div>
                            {/* Info */}
                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">
                            <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="card-delete">
                                {/* Indicator label */}
                                <span className="indicator-label">
                                Delete
                                </span>
                                {/* Indicator label */}
                                {/* Indicator progress */}
                                <span className="indicator-progress">
                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                                {/* Indicator progress */}
                            </button>
                            <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Edit</button>
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
                                Jhon Larson
                            </div>
                            {/* Wrapper */}
                            <div className="d-flex align-items-center">
                                {/* Icon */}
                                <img src="/seven-html-pro/assets/media/svg/card-logos/mastercard.svg" alt="" className="me-4" />
                                {/* Details */}
                                <div>
                                <div className="fs-4 fw-bold">Mastercard **** 1290</div>
                                <div className="fs-6 fw-semibold text-gray-400">Card expires at 03/23</div>
                                </div>
                            </div>
                            </div>
                            {/* Info */}
                            {/* Actions */}
                            <div className="d-flex align-items-center py-2">
                            <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="card-delete">
                                {/* Indicator label */}
                                <span className="indicator-label">
                                Delete
                                </span>
                                {/* Indicator label */}
                                {/* Indicator progress */}
                                <span className="indicator-progress">
                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                                {/* Indicator progress */}
                            </button>
                            <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Edit</button>
                            </div>
                            {/* Actions */}
                        </div>
                        {/* Card */}
                    </div>
                    {/* Col */}
                    {/* Col */}
                    <div className="col-xl-6">
                        {/* Notice */}
                        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed h-lg-100 p-6">
                            {/* Wrapper */}
                            <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                            {/* Content */}
                            <div className="mb-3 mb-md-0 fw-semibold">
                                <h4 className="text-gray-900 fw-bold">Important Note!</h4>
                                <div className="fs-6 text-gray-700 pe-7">Please carefully read <a href="#" className="fw-bold me-1">Product Terms</a> adding <br /> your new payment card</div>
                            </div>
                            {/* Content */}
                            {/* Action */}
                            <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Add Card</a>
                            {/* Action */}
                            </div>
                            {/* Wrapper */}
                        </div>
                        {/* Notice */}
                    </div>
                    {/* Col */}
                </div>
                {/* Row */}
                </div>
                {/* Tab panel */}
            </div>
            {/* Tab content */}
        </div>

        <div className="card mb-5 mb-xl-10">
            {/* Card header */}
            <div className="card-header">
                {/* Title */}
                <div className="card-title">
                <h3>Billing Address</h3>
                </div>
                {/* Title */}
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
                            <div className="d-flex align-items-center fs-5 fw-bold mb-5">
                            Address 1
                            <span className="badge badge-light-success fs-7 ms-2">Primary</span>
                            </div>

                            <div className="fs-6 fw-semibold text-gray-600">
                            Ap #285-7193 Ullamcorper Avenue<br />
                            Amesbury HI 93373<br />US
                            </div>
                        </div>
                        {/* Details */}

                        {/* Actions */}
                        <div className="d-flex align-items-center py-2">
                            <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="address-delete">
                            {/* Indicator label */}
                            <span className="indicator-label">Delete</span>
                            {/* Indicator label */}
                            {/* Indicator progress */}
                            <span className="indicator-progress">
                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                            {/* Indicator progress */}
                            </button>
                            <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">Edit</button>
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
                            <div className="d-flex align-items-center fs-5 fw-bold mb-3">
                            Address 2
                            </div>

                            <div className="fs-6 fw-semibold text-gray-600">
                            Ap #285-7193 Ullamcorper Avenue<br />
                            Amesbury HI 93373<br />US
                            </div>
                        </div>
                        {/* Details */}

                        {/* Actions */}
                        <div className="d-flex align-items-center py-2">
                            <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="address-delete">
                            {/* Indicator label */}
                            <span className="indicator-label">Delete</span>
                            {/* Indicator label */}
                            {/* Indicator progress */}
                            <span className="indicator-progress">
                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                            {/* Indicator progress */}
                            </button>
                            <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">Edit</button>
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
                            <div className="d-flex align-items-center fs-5 fw-bold mb-3">
                            Address 3
                            </div>

                            <div className="fs-6 fw-semibold text-gray-600">
                            Ap #285-7193 Ullamcorper Avenue<br />
                            Amesbury HI 93373<br />US
                            </div>
                        </div>
                        {/* Details */}

                        {/* Actions */}
                        <div className="d-flex align-items-center py-2">
                            <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="address-delete">
                            {/* Indicator label */}
                            <span className="indicator-label">Delete</span>
                            {/* Indicator label */}
                            {/* Indicator progress */}
                            <span className="indicator-progress">
                                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                            {/* Indicator progress */}
                            </button>
                            <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">Edit</button>
                        </div>
                        {/* Actions */}
                        </div>
                        {/* Address */}
                    </div>
                    {/* Col */}

                    {/* Col */}
                    <div className="col-xl-6">
                        {/* Notice */}
                        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed flex-stack h-xl-100 mb-10 p-6">
                        {/* Wrapper */}
                        <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                            {/* Content */}
                            <div className="mb-3 mb-md-0 fw-semibold">
                            <h4 className="text-gray-900 fw-bold">This is a very important note!</h4>

                            <div className="fs-6 text-gray-700 pe-7">Writing headlines for blog posts is much science and probably cool audience</div>
                            </div>
                            {/* Content */}

                            {/* Action */}
                            <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">
                            New Address
                            </a>
                            {/* Action */}
                        </div>
                        {/* Wrapper */}
                        </div>
                        {/* Notice */}
                    </div>
                    {/* Col */}
                </div>
                {/* Addresses */}

                
            </div>
            {/* Card body */}
        </div>
    </>}
    </>);
};

export default Billing;




