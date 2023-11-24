import { 
    update_question_summary_form_completion_listening
} from '../../../../../includes/redux-store/Slices/ieltsLms.slice';

import { LoadEditorLight } from '../../../../../components/default/Editor';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


// question type: summary-form-completion
const QuestionMainSummaryFormCompletion = () => {
    const toolbar                                                   = ``;
    const dispatch                                                  = useDispatch();
    const { IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING }  = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                                = useState(<></>);
    
    const setHtml = (html) => {
        dispatch(update_question_summary_form_completion_listening({
            QUESTION:{
                ...IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTION,
                HTML: html
            }
        }));
    };




    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        {IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question (html)</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>
        </>}
    </>);
};

export { QuestionMainSummaryFormCompletion };