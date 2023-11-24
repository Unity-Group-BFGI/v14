import getRequest from '../get';
import constants from '../../constants';

const signupApi = (headers = {}, data = {}) => {
    const { SINGUP_ENDPOINT } = constants;
    return getRequest(SINGUP_ENDPOINT,headers,data);
};

export default signupApi;