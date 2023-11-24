import { MyAccountStatementsSkeleton } from '../../../../components/Skeletons';

const Statements = () => {
    const loading = true;
    return (<>
        {loading? 
        <MyAccountStatementsSkeleton /> 
        :
        <>
            <div className="row g-xxl-9">
                {/* Col */}
                <div className="col-xxl-12">
                    {/* Earnings */}
                    <div className="card card-xxl-stretch mb-5 mb-xxl-10">
                        {/* Header */}
                        <div className="card-header">
                            <div className="card-title">
                            <h3>Earnings</h3>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="card-body pb-0">
                            <span className="fs-5 fw-semibold text-gray-600 pb-5 d-block">Last 30 day earnings calculated. Apart from arranging the order of topics.</span>
                            {/* Left Section */}
                            <div className="d-flex flex-wrap justify-content-between pb-6">
                            {/* Row */}
                            <div className="d-flex flex-wrap">
                                {/* Col */}
                                <div className="border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6">
                                    <span className="fs-2x fw-bold text-gray-800 lh-1">
                                        <span data-kt-countup="true" data-kt-countup-value="6,840" data-kt-countup-prefix="$" className="counted" data-kt-initialized="1">$6,840</span>
                                    </span>
                                    <span className="fs-6 fw-semibold text-gray-400 d-block lh-1 pt-2">Net Earnings</span>
                                </div>
                                {/* Col */}
                                <div className="border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6">
                                    <span className="fs-2x fw-bold text-gray-800 lh-1">
                                        <span className="counted" data-kt-countup="true" data-kt-countup-value="80" data-kt-initialized="1">80</span>%
                                    </span>
                                    <span className="fs-6 fw-semibold text-gray-400 d-block lh-1 pt-2">Change</span>
                                </div>
                                {/* Col */}
                                <div className="border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6">
                                    <span className="fs-2x fw-bold text-gray-800 lh-1">
                                        <span data-kt-countup="true" data-kt-countup-value="1,240" data-kt-countup-prefix="$" className="counted" data-kt-initialized="1">$1,240</span>
                                    </span>
                                    <span className="fs-6 fw-semibold text-gray-400 d-block lh-1 pt-2">Fees</span>
                                </div>
                            </div>
                            {/* Row */}
                            <a href="#" className="btn btn-primary px-6 flex-shrink-0 align-self-center">Withdraw Earnings</a>
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
                    <h3 className="m-0 text-gray-800">Statement</h3>
                    </div>
                    {/* Toolbar */}
                    <div className="card-toolbar m-0">
                    {/* Tab nav */}
                    <ul className="nav nav-stretch fs-5 fw-semibold nav-line-tabs border-transparent" role="tablist">
                        <li className="nav-item" role="presentation">
                        <a id="kt_referrals_year_tab" className="nav-link text-active-gray-800 active" data-bs-toggle="tab" role="tab" href="#kt_referrals_1" aria-selected="true">
                            This Year
                        </a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a id="kt_referrals_2019_tab" className="nav-link text-active-gray-800 me-4" data-bs-toggle="tab" role="tab" href="#kt_referrals_2" aria-selected="false" tabIndex="-1">
                            2022
                        </a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a id="kt_referrals_2018_tab" className="nav-link text-active-gray-800 me-4" data-bs-toggle="tab" role="tab" href="#kt_referrals_3" aria-selected="false" tabIndex="-1">
                            2021
                        </a>
                        </li>
                        <li className="nav-item" role="presentation">
                        <a id="kt_referrals_2017_tab" className="nav-link text-active-gray-800 ms-8" data-bs-toggle="tab" role="tab" href="#kt_referrals_4" aria-selected="false" tabIndex="-1">
                            2020
                        </a>
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
                            <th className="min-w-175px ps-9">Date</th>
                            <th className="min-w-150px px-0">Order ID</th>
                            <th className="min-w-350px">Details</th>
                            <th className="min-w-125px">Amount</th>
                            <th className="min-w-125px text-center">Invoice</th>
                            </tr>
                        </thead>
                        {/* Thead */}
                        {/* Tbody */}
                        <tbody className="fs-6 fw-semibold text-gray-600">
                            <tr>
                                <td className="ps-9">Nov 01, 2020</td>
                                <td className="ps-0">102445788</td>
                                <td>Darknight transparency  36 Icons Pack</td>
                                <td className="text-success">$38.00</td>
                                <td className="text-center"><button className="btn btn-light btn-sm btn-active-light-primary">Download</button></td>
                            </tr>
                            <tr>
                                <td className="ps-9">Nov 01, 2020</td>
                                <td className="ps-0">102445788</td>
                                <td>Darknight transparency  36 Icons Pack</td>
                                <td className="text-success">$38.00</td>
                                <td className="text-center"><button className="btn btn-light btn-sm btn-active-light-primary">Download</button></td>
                            </tr>
                            <tr>
                                <td className="ps-9">Nov 01, 2020</td>
                                <td className="ps-0">102445788</td>
                                <td>Darknight transparency  36 Icons Pack</td>
                                <td className="text-success">$38.00</td>
                                <td className="text-center"><button className="btn btn-light btn-sm btn-active-light-primary">Download</button></td>
                            </tr>
                            <tr>
                                <td className="ps-9">Nov 01, 2020</td>
                                <td className="ps-0">102445788</td>
                                <td>Darknight transparency  36 Icons Pack</td>
                                <td className="text-success">$38.00</td>
                                <td className="text-center"><button className="btn btn-light btn-sm btn-active-light-primary">Download</button></td>
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
        </>}
    </>);
};

export default Statements;