const NetworkErrorModal = () => {
    return (<>
        <div className="modal__network-error">
            <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" />
            <span className="network-error__title">Could't connect to Backend!</span>
            <p>An error has occured while connecting to Backend server.</p>
            <div className="network-error__button">Dismiss</div>
        </div>
    </>);
};

export default NetworkErrorModal;