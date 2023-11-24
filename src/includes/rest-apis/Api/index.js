import constants from '../../constants';
import getRequest from '../get';


const checkApiStatus = (headers = {}, data = {}) => {
    const { SERVER_API_STATUS_ENDPOINT } = constants;
    return getRequest(SERVER_API_STATUS_ENDPOINT,headers,data);
};

export { 
    checkApiStatus 
};
