import { update_question_yes_no_notgiven } from '../../../../../includes/redux-store/Slices/ieltsLms.slice';
import { LoadEditorLight } from '../../../../../components/default/Editor';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// question type: yes-no-notgiven
const QuestionMainYesNoNotgiven = () => {
    const toolbar                                       = `preview fullscreen | pastetext | undo redo `;
    const dispatch                                      = useDispatch();
    const { IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING }    = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                    = useState(<></>);
    const [floatingText, setFloatingText]               = useState(null);
    const setHtml = (html) => {
        dispatch(update_question_yes_no_notgiven({
            QUESTION:{
                ...IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING,
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


    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        <div className="step-1 steps tab-step__padding mb-10">
            <div className="step__controller row">
                <div className="col-md-12 mb-6">
                    <label htmlFor="question-html" className='mb-4'>List of Answers</label> 
                    {IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.ANSWER_SETTINGS && <>
                        <ul className='question__options-ul mb-2'>
                        {IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.ANSWER_SETTINGS.ANSWER_TYPES[IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.ANSWER_SETTINGS.ANSWER_TYPE].slice(0, +IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.ANSWER_SETTINGS.NUMBER_OF_OPTIONS).map((option, index) => {
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

export { QuestionMainYesNoNotgiven };