import { 
    update_question_sentence_completion_question_option,
    update_question_sentence_completion_question_add_option,
    update_question_sentence_completion_question_update_option,
    update_question_sentence_completion_update_questions_content,
    update_question_sentence_completion_remove_questions_option,
    update_question_sentence_completion
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
    const { IELTS_LMS_QUESTION_TYPE }                           = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING }            = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [floatingText, setFloatingText]                       = useState(null);
    const setHtml = (html) => {
        dispatch(update_question_sentence_completion({
            QUESTION:{
                ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTION,
                HTML: html
            }
        }));
    };


    const handleCorrectAnswerChangeRadio = (qindex,oindex) => {
        dispatch(update_question_sentence_completion_question_option({
            oindex: oindex,
            qindex: qindex
        }));
    };
    
    // add question option
    const addQuestionOption = (qindex) => {
        dispatch(update_question_sentence_completion_question_add_option({
            qindex: qindex,
            option: {
                HTML: '',
                CORRECT: false
            }
        }));
    };

    const updateOptionContent = (qindex,oindex, html) => {
        dispatch(update_question_sentence_completion_question_update_option({
            qindex: qindex,
            oindex: oindex,
            html: html
        }));
    };

    const updateQuestionsContent = (qindex, html) => {
        dispatch(update_question_sentence_completion_update_questions_content({
            qindex: qindex,
            html: html
        }));
    };

    const removeQuestionOption = (qindex,oindex) => {
        dispatch(update_question_sentence_completion_remove_questions_option({
            qindex: qindex,
            oindex: oindex
        }));
    };

    const copy = (event) => {
        const textToCopy = event.target.dataset.value;
    
        // Create a temporary textarea element to copy the text
        const textArea = document.createElement('textarea');
        textArea.value = `{${textToCopy}}`;
        document.body.appendChild(textArea);
    
        // Select the text in the textarea and copy it
        textArea.select();
        document.execCommand('copy');
    
        // Remove the temporary textarea
        document.body.removeChild(textArea);
        const buttons = document.querySelectorAll('.question__options-pills-animate');
        buttons.forEach((button) => {
            button.classList.remove('bg-active');
        });
    
        // Add the CSS class for animation
        event.target.classList.add('animate__jello-horizontal');
        event.target.classList.add('bg-active');
        // Remove the CSS class after 1 second
        setTimeout(() => {
            event.target.classList.remove('animate__jello-horizontal');
        }, 1000);

        

        // Create a floating element for the copied text
        if (floatingText) {
            setFloatingText(textToCopy); // Replace the value of the existing floatingText
        } else {
            setFloatingText(textToCopy); // Create a new floatingText
        }

        



    };

    document.addEventListener('paste', () => {
        if (floatingText) {
            setFloatingText(null); // Reset the floatingText
            // Remove the "bg-active" class from all buttons
            const buttons = document.querySelectorAll('.question__options-pills-animate');
            buttons.forEach((button) => {
                button.classList.remove('bg-active');
            });
            
        }
    });


    const changeAnswerType = (event) => {
        const { value } = event.target;
        if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            // Check if the new answer type is 'custom'
            if (value === 'custom') {
                const num = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1; // Use the current number of options or default to 1
                const currentCustomOptions = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom;
                const newCustomOptions = [...currentCustomOptions];
        
                if (newCustomOptions.length < num) {
                    // Add blank strings to the custom array
                    const diff = num - newCustomOptions.length;
                    for (let i = 0; i < diff; i++) {
                        newCustomOptions.push('');
                    }
                } else if (newCustomOptions.length > num) {
                    // Remove excess blank strings from the end of the custom array
                    newCustomOptions.splice(num);
                }
        
                dispatch(update_question_sentence_completion({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS,
                        ANSWER_TYPE: 'custom', // Set the answer type to 'custom'
                        NUMBER_OF_OPTIONS: num,
                        ANSWER_TYPES: {
                            ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                            custom: newCustomOptions,
                        },
                    },
                }));
            } else {
                // For other answer types, just update the answer type
                dispatch(update_question_sentence_completion({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS,
                        ANSWER_TYPE: value || 'i',
                    }
                }));
            }
        }
    };

    const changeNumberOfOptions = (event) => {
        const { value } = event.target;
        const num = +value <= 0 ? 1 : +value;
        if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            const currentCustomOptions = IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom;
            if (IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPE === 'custom') {
                const newCustomOptions = [...currentCustomOptions];
                if (newCustomOptions.length < num) {
                    // Add blank strings to the custom array
                    const diff = num - newCustomOptions.length;
                    for (let i = 0; i < diff; i++) {
                        newCustomOptions.push('');
                    }
                } else if (newCustomOptions.length > num) {
                    // Remove excess blank strings from the end of the custom array
                    newCustomOptions.splice(num);
                }
        
                dispatch(update_question_sentence_completion({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS,
                        NUMBER_OF_OPTIONS: num,
                        ANSWER_TYPES: {
                            ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                            custom: newCustomOptions,
                        },
                    },
                }));

            } else {
                dispatch(update_question_sentence_completion({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS,
                        NUMBER_OF_OPTIONS: num,
                    },
                }));
            }
        }
    };

    const updateCustomOption = (index, newValue) => {
        if(IELTS_LMS_QUESTION_TYPE === "sentence-completion"){
            const newCustomOptions = [...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom];
            newCustomOptions[index] = newValue;
        
            dispatch(update_question_sentence_completion({
                ANSWER_SETTINGS: {
                    ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS,
                    ANSWER_TYPES: {
                        ...IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                        custom: newCustomOptions,
                    },
                },
            }));
        }
    };



    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question (html)</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>
        </>}


        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTION_SETTINGS.QUESTION_LAYOUT === "radio" && <>

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
                            {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS.length > 0 && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS.map((qus,index) => {
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

        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTION_SETTINGS.QUESTION_LAYOUT === "select" && <>

            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">

                    { /* default question options types for answer */}
                    <div className="col-sm-6 col-xs-12 mb-4">
                        <label htmlFor="default-options" className='required'>Default Options</label>
                        <select 
                            id="default-options" 
                            className="form-select" 
                            value={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPE}
                            onChange={changeAnswerType}
                        >
                            <option value="i">i (Small Romans)</option>
                            <option value="I">I (Captial Romans)</option>
                            <option value="A">A (Captial Alphabets)</option>
                            <option value="a">a (Small Alphabets)</option>
                            <option value="1">1 (Numeric order)</option>
                            <option value="custom"> --Custom-- </option>
                        </select>
                    </div>  

                    {/* default answer number of options */}
                    <div className="col-sm-6 col-xs-12 mb-4">
                        <label htmlFor="number-of-options" className='required'>Number of Options</label>
                        <input 
                            type="number"
                            min="1"
                            id="number-of-options" 
                            className="form-input form-control" 
                            value={IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS}
                            onChange={changeNumberOfOptions}
                        />    
                    </div> 

                    { /* custom options */ }
                    {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPE === "custom" && <div className="custom__options">
                        <label htmlFor="custom-options" className='mb-6'>List of Custom options</label>
                        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom.length > 0 && IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom.map((option,index) => {
                            return <React.Fragment key={index}>
                                <div className="d-flex flex-row align-items-center justify-center mb-3"> 
                                    <Form.Label className="d-flex flex-row justify-center align-items-center p-0 mr-4 my-0">                            
                                        <button style={{
                                            minWidth: "44px",
                                            height: "44px",
                                            border: "1px solid #efefef",
                                            color: "gray",
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            background: 'white'
                                        }}>
                                            {index+1}
                                        </button>    
                                    </Form.Label>  
                                    <InputGroup>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Option" 
                                            style={{borderRight: 0, borderTop: 0, borderLeft: 0, borderRadius: 0, borderStyle: 'dashed'}} 
                                            value={option} 
                                            onChange={(event) => updateCustomOption(index,event.target.value)} 
                                        />  
                                    </InputGroup>
                                </div>
                            </React.Fragment>
                        })}
                    </div>}
                </div>
            </div>

            <div className="tab-step__seprator"></div>

            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">


                    {/* list of answers */}
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='mb-4'>List of Answers</label> 
                        {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS && <>
                            <ul className='question__options-ul mb-2'>
                            {IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPES[IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.ANSWER_TYPE].slice(0, +IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS).map((option, index) => {
                                return <li className='question__options-pills' key={index}>
                                    <button type='button' className='question__options-pills-animate' data-value={option} onClick={copy}>{option}</button>
                                </li>
                            })}
                            </ul>
                        </>}
                        <p className="question__hint-description">
                            click and copy the answer and paste inside question box, where you want to display the option.
                        </p>
                    </div>
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question (html)</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>                     

        </>}

    </>);
};

export { QuestionMainSentenceCompletion };