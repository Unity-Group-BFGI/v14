import constants from '../../constants';
import postRequest from '../post';
const addQuiz = (headers = {},data = {}) => {
    const { IELTS_ADD_QUIZ } = constants;
    return postRequest(IELTS_ADD_QUIZ, headers, data);
};

export default addQuiz;
