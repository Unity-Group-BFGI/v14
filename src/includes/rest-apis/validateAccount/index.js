import constants from '../../constants';
import getRequest from '../get';

const validateAccount = (headers = {}, data = {}) => {
    const { SERVER_VALIDATE_ACCOUNT } = constants;
    return getRequest(SERVER_VALIDATE_ACCOUNT,headers,data);
};

export default validateAccount;
