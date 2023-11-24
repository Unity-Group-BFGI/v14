import { update_question_matching_information } from '../../../../../includes/redux-store/Slices/ieltsLms.slice';
import { LoadEditorLight } from '../../../../../components/default/Editor';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


// question type: matching-headings
const QuestionMainMatchingInformation = () => {
    const toolbar                                       = ``;
    const dispatch                                      = useDispatch();
    const { IELTS_LMS_QUESTION_TYPE }                   = useSelector( state => state.ieltsLms );
    const { IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING }      = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                    = useState(<></>);
    const [floatingText, setFloatingText]               = useState(null);
    const setHtml = (html) => {
        dispatch(update_question_matching_information({
            QUESTION:{
                ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.QUESTION,
                HTML: html
            }
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
        if(IELTS_LMS_QUESTION_TYPE === "matching-information"){
            // Check if the new answer type is 'custom'
            if (value === 'custom') {
                const num = IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1; // Use the current number of options or default to 1
                const currentCustomOptions = IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom;
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
        
                dispatch(update_question_matching_information({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS,
                        ANSWER_TYPE: 'custom', // Set the answer type to 'custom'
                        NUMBER_OF_OPTIONS: num,
                        ANSWER_TYPES: {
                            ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                            custom: newCustomOptions,
                        },
                    },
                }));
            } else {
                // For other answer types, just update the answer type
                dispatch(update_question_matching_information({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS,
                        ANSWER_TYPE: value || 'i',
                    }
                }));
            }
        }
    };

    const changeNumberOfOptions = (event) => {
        const { value } = event.target;
        const num = +value <= 0 ? 1 : +value;
        if(IELTS_LMS_QUESTION_TYPE === "matching-information"){
            const currentCustomOptions = IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom;
            if (IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPE === 'custom') {
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
        
                dispatch(update_question_matching_information({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS,
                        NUMBER_OF_OPTIONS: num,
                        ANSWER_TYPES: {
                            ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                            custom: newCustomOptions,
                        },
                    },
                }));

            } else {
                dispatch(update_question_matching_information({
                    ANSWER_SETTINGS: {
                        ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS,
                        NUMBER_OF_OPTIONS: num,
                    },
                }));
            }
        }
    };

    const updateCustomOption = (index, newValue) => {
        if(IELTS_LMS_QUESTION_TYPE === "matching-information"){
            const newCustomOptions = [...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom];
            newCustomOptions[index] = newValue;
        
            dispatch(update_question_matching_information({
                ANSWER_SETTINGS: {
                    ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS,
                    ANSWER_TYPES: {
                        ...IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES,
                        custom: newCustomOptions,
                    },
                },
            }));
        }
    };


    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        <div className="step-1 steps tab-step__padding mb-10">
            <div className="step__controller row">

                { /* default question options types for answer */}
                <div className="col-sm-6 col-xs-12 mb-4">
                    <label htmlFor="default-options" className='required'>Default Options</label>
                    <select 
                        id="default-options" 
                        className="form-select" 
                        value={IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPE}
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
                        value={IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS}
                        onChange={changeNumberOfOptions}
                    />    
                </div> 

                { /* custom options */ }
                {IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS && IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPE === "custom" && <div className="custom__options">
                    <label htmlFor="custom-options" className='mb-6'>List of Custom options</label>
                    {IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom && IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom.length > 0 && IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES.custom.map((option,index) => {
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
                    {IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS && <>
                        <ul className='question__options-ul mb-2'>
                        {IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPES[IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.ANSWER_TYPE].slice(0, +IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS).map((option, index) => {
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
    </>);
};

export { QuestionMainMatchingInformation };
