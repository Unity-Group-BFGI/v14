import constants from '../../constants';
import getRequest from '../get';
const bootstrapAccount = (headers = {}, data ={}) => {
    const { SERVER_BOOTSTRAP_ACCOUNT } = constants;
    return getRequest(SERVER_BOOTSTRAP_ACCOUNT,headers,data);
};

export default bootstrapAccount;