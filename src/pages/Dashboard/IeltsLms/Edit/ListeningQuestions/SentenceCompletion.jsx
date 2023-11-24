import { 
    update_question_sentence_completion_listening_question_option,
    update_question_sentence_completion_listening_question_add_option,
    update_question_sentence_completion_listening_question_update_option,
    update_question_sentence_completion_listening_update_questions_content,
    update_question_sentence_completion_listening_remove_questions_option,
    update_question_sentence_completion_listening
} from '../../../../../includes/redux-store/Slices/ieltsLms.slice';

import { LoadEditorLight } from '../../../../../components/default/Editor';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


// question type: summary-form-completion
const QuestionMainSentenceCompletion = () => {
    const toolbar                                               = ``;
    const dispatch                                              = useDispatch();
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING }  = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);

    const setHtml = (html) => {
        dispatch(update_question_sentence_completion_listening({
            QUESTION:{
                ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION,
                HTML: html
            }
        }));
    };

    const handleCorrectAnswerChangeRadio = (qindex,oindex) => {
        dispatch(update_question_sentence_completion_listening_question_option({
            oindex: oindex,
            qindex: qindex
        }));
    };
    
    // add question option
    const addQuestionOption = (qindex) => {
        dispatch(update_question_sentence_completion_listening_question_add_option({
            qindex: qindex,
            option: {
                HTML: '',
                CORRECT: false
            }
        }));
    };

    const updateOptionContent = (qindex,oindex, html) => {
        dispatch(update_question_sentence_completion_listening_question_update_option({
            qindex: qindex,
            oindex: oindex,
            html: html
        }));
    };

    const updateQuestionsContent = (qindex, html) => {
        dispatch(update_question_sentence_completion_listening_update_questions_content({
            qindex: qindex,
            html: html
        }));
    };

    const removeQuestionOption = (qindex,oindex) => {
        dispatch(update_question_sentence_completion_listening_remove_questions_option({
            qindex: qindex,
            oindex: oindex
        }));
    };


    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question (html)</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>
        </>}

        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTION_SETTINGS.QUESTION_LAYOUT === "radio" && <>

            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Instructions</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>

            <div className="tab-step__seprator"></div>

            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    
                        <div className="col-md-12 mb-6">
                            <label htmlFor="question-html" className='required mb-6'>List of Questions</label>
                            {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS.length > 0 && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS.map((qus,index) => {
                                const { HTML, OPTIONS } = qus;
                                const questionIndex = index;
                                return <React.Fragment key={index}>
                                    <div className="card mb-4" style={{background: '#fbf6f6',padding: '5px 5px 0'}}>
                                        <div className="question_box mb-2 d-flex flex-row">
                                            <InputGroup.Text className='question__question-label'>Q.{index+1}</InputGroup.Text>
                                            <Form.Control 
                                                className='question__question-input'
                                                type="text" 
                                                placeholder="Question text" 
                                                value={HTML} 
                                                onChange={(event) => updateQuestionsContent(questionIndex,event.target.value)} 
                                            />    
                                        </div>
                                        <div className="question_options-box d-flex flex-column">
                                            {OPTIONS.length > 0 && OPTIONS.map((option,index) => {
                                                const { CORRECT, HTML } = option;
                                                return <React.Fragment key={index}>
                                                    <div className="d-flex flex-row align-items-center justify-center mb-3">
                                                        <InputGroup className='question__input-group'>
                                                            <InputGroup.Radio onChange={(event) => handleCorrectAnswerChangeRadio(questionIndex,index)} checked={CORRECT} className="question__correct-option-radio" aria-label="Radio button for following text input" />
                                                            <Form.Control onChange={(event) => updateOptionContent(questionIndex,index,event.target.value)} value={HTML} placeholder={'Option '+(index+1)} aria-label="Text input with radio button" />
                                                            {OPTIONS.length > 1 && <button className="btn" onClick={() => removeQuestionOption(questionIndex,index)}>
                                                                <i className="fa fa-times text-danger"></i>
                                                            </button>}
                                                        </InputGroup>
                                                    </div>
                                                </React.Fragment>
                                            })}
                                            <div className="d-flex flex-row align-items-center justify-center mb-3">
                                                <InputGroup onClick={() => addQuestionOption(questionIndex)} className='question__input-group question_input-group-add-more'>
                                                    <InputGroup.Radio aria-label="Radio button for following text input" />
                                                    <Form.Control readOnly placeholder={'Add more options'} aria-label="Text input with radio button" />
                                                </InputGroup>
                                            </div>

                                        </div>

                                    </div>
                                </React.Fragment>
                            })}
                        </div>
                
                </div>
            </div>

        </>}
    </>);
};

export { QuestionMainSentenceCompletion };