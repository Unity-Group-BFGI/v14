const CenterLoading = ({text = "loading"}) => {
    return <div className="card">
        <div className="card-body w-100 h-100 p-0">
            <div className="d-flex flex-row justify-content-center align-items-center" style={{fontSize: '18px', paddingRight:'15px'}}>
                <img src={"/svgs/ajax-spinner.svg"} /> {text}
            </div>
        </div>
    </div>;
};

export default CenterLoading;