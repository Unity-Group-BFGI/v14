import getRequest from "../../../includes/rest-apis/get";
import constants from "../../../includes/constants";

import { Outlet, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Split from 'react-split';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Plyr from 'plyr';





const IeltsTestPreview = () => {
    const { endpoint }              = constants;
    const { category, id }          = useParams();
    const [loading,setLoading]      = useState(true);
    const { USER }                  = useSelector( state => state.auth );
    const { WIDTH }                 = useSelector( state => state.theme );
    const [sections,setSections]    = useState([]);
    const [questions,setQuestions]  = useState([]);
    let [TOTAL_QUESTIONS,setTotalQuestions] = useState(0);
    const [time,setTime]            = useState(0);
    let questionIndex               = 0;
    let qindex                      = 0;
    let qR                          = 0;
    let controlBtns                 = ['play-large', 'rewind', 'play', 'fast-forward', 'current-time', 'progress', 'mute', 'volume'];
    

    const updateStates = (states) => {
        const { quiz } = states;
        if(quiz.quiz.category === "reading"){
            document.body.className = `reading-test show-palette take-test-page -practice-mode user-logged-in path-node page-node-type-quiz has-glyphicons`;
            setSections(quiz.sections);
            let sectionQuestions = [];
            quiz.sections.forEach((section,index) => {
                const { _id }           = section;
                let filteredQuestions   = quiz.questions.filter(obj => obj._sectionId === _id );
                sectionQuestions.push(filteredQuestions);
            });
            setQuestions(sectionQuestions);
            if(quiz.quiz){
                const mainQuiz = quiz.quiz;
                const time = mainQuiz.time;
                if(time.timer){
                    const quizTime = (+time.hh*3600) + (+time.mm*60) + (+time.ss);
                    setTime(quizTime);
                }
            }
            setLoading(false);
        } else if(quiz.quiz.category === "listening"){
            document.body.className = `listening-test show-palette take-test-page -practice-mode user-logged-in path-node page-node-type-quiz has-glyphicons`;
            setSections(quiz.sections);
            let sectionQuestions = [];
            quiz.sections.forEach((section,index) => {
                const { _id }           = section;
                let filteredQuestions   = quiz.questions.filter(obj => obj._sectionId === _id );
                sectionQuestions.push(filteredQuestions);
            });
            setQuestions(sectionQuestions);
            if(quiz.quiz){
                const mainQuiz = quiz.quiz;
                const time = mainQuiz.time;
                if(time.timer){
                    const quizTime = (+time.hh*3600) + (+time.mm*60) + (+time.ss);
                    setTime(quizTime);
                }
            }
            setLoading(false);
        } else if(quiz.quiz.category === "writing"){
            document.body.className = `reading-test show-palette take-test-page -practice-mode user-logged-in path-node page-node-type-quiz has-glyphicons`;
            setSections(quiz.sections);
        }
    };

    const questionHtml = (index,partId) => {
        let mainHtml = "";
        let num      = 0;

        // select type
        const replaceCurlyBracketsWithSelect = (html, answerOptions, numberOfQuestions, numberOfOptions,TYPE) => {
            
            return html.replace(/\{[^{}]+\}/g, (match, index) => {
                if (numberOfQuestions > 0) {
                    
                    const innerText = match.substring(1, match.length - 1);
                    const matchingOption = answerOptions.includes(innerText); 
                    if( matchingOption ){
                        numberOfQuestions--;
                        num++;
                        qindex++;
    
                        const selectOptions = answerOptions.slice(0, numberOfOptions).map((option,index) => (
                            `<option key="${index}" value="${option}">${option}</option>`
                        )).join('');
    
                        return `<b class="iot-question-number">${qindex}.</b>
                                <select 
                                    value="" 
                                    data-q_type="${TYPE}"
                                    data-input_type="select"
                                    data-num="${qindex}"
                                    data-id="q-${qindex}"
                                    data-part="${partId}"
                                    class="question__input iot-lr-question iot-option iot-dropdown form-control mb-2">
                                        <option></option>
                                        ${selectOptions}
                                    </select>
                        `;
                    } else {
                        return match; 
                    }
                } else {
                    return match; // Leave other curly brackets unchanged
                }
            });
        };  
        
        // fillup type
        const replaceCurlyBracketsWithTextInput = (html = '', numberOfQuestions, TYPE) => {
            
            return html.replace(/\{[^{}]+\}/g, (match, index) => {
                if (numberOfQuestions > 0) {
                    numberOfQuestions--;
                    num++;
                    qindex++;
                    const innerText = match.substring(1, match.length - 1);
                    return `<input 
                                type="text" 
                                placeholder="${qindex}" 
                                class="question__input iot-question iot-lr-question iot-question__fill-blank form-control test-panel__input-answer" 
                                data-q_type="${TYPE}"
                                data-input_type="fillup"
                                data-num="${qindex}"
                                data-id="q-${qindex}"
                                data-part="${partId}"
                                autocomplete="off" 
                                id="q-${qindex}"
                            >
                    `;

                } else {
                    return match; // Leave other curly brackets unchanged
                }
            });
        };

        // radio type
        const radioTypeQuestions = (html = '', numberOfQuestions, questions = [], explanations = [], TYPE, mode = "quiz") => {
            let questionHtml    = "";
            let explanationHtml = "";

            if( questions.length > 0  && questions.length === explanations.length){
                questions.forEach((qus,index) => {
                    const { HTML, OPTIONS } = qus;
                    if(HTML){
                        if(numberOfQuestions > 0){
                            numberOfQuestions--;
                            num++;
                            qindex++;
                            
                            let answers = '';
                            let correctAnswer   = '';
                            if(OPTIONS.length > 0){
                                OPTIONS.forEach((op,oindex) => {
                                    if(op.CORRECT){
                                        correctAnswer = (oindex+1);
                                    }
                                    answers += `<div class="test-panel__answer-item">
                                        <div class="test-panel__answer-option">${oindex+1}</div>
                                        <label for="radio-${qindex}-${oindex+1}" class="iot-radio">
                                            <input 
                                                type="radio" 
                                                class="question__input radio-iot iot-lr-question" 
                                                name="q-${qindex}" 
                                                
                                                value="${oindex+1}" 
                                                id="radio-${qindex}-${oindex+1}" 
                                                placeholder=""

                                                data-q_type="${TYPE}"
                                                data-input_type="radio"
                                                data-num="${qindex}"
                                                data-id="q-${qindex}"
                                                data-part="${partId}"
                                            >
                                            ${op.HTML}
                                        </label>
                                    </div>`;
                                });
                            }

                            explanationHtml = `
                                <li class="answer" key="${num}">
                                    <span>
                                        <b>${num}</b>
                                    </span> 
                                    Answer: <span class="b-r">${correctAnswer}</span>
                                    <div class="sl-item explanation" key="${num}">
                                        <div class="sl-control"> 
                                            <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${num}" href="javascript:void(0)" aria-expanded="true"> 
                                                <span class="icon-explain"></span> Explain 
                                            </a> 
                                        </div>
                                        <div id="col-${num}" class="collapse in" aria-expanded="true" style="">
                                            <!-- Your explanation text here -->
                                            ${explanations[index]}
                                        </div>
                                    </div>
                                </li>
                            `;
                            
                            if(mode == "quiz"){
                                questionHtml += `
                                    <div class="test-panel__question-sm-group">
                                        <div class="test-panel__question-sm-title">${HTML}</div>
                                        <div class="test-panel__answer">${answers}</div>
                                    </div>
                                `;
                            } else if(mode == "result-preview"){
                                questionHtml += `
                                    <div class="test-panel__question-sm-group">
                                        <div class="test-panel__question-sm-title">${HTML}</div>
                                        <div class="test-panel__answer">${answers}</div>
                                    </div>
                                    <ul style="margin-top:20px;margin-bottom:20px;">
                                        ${explanationHtml}
                                    </ul>
                                `;
                            }
                        }

                    }
                });
            }

            return `
                <div class="test-panel__question">${html}</div>
                ${questionHtml}
            `;
        };

        if(questions && questions.length > 0 && questions[index]){
            let sectionQuestions = questions[index];

            sectionQuestions.forEach((qus,index) => {
                const { ANSWER_SETTINGS, QUESTION, QUESTION_SETTINGS, TYPE, QUESTIONS, EXPLANATIONS } = qus;
                const answerType = ANSWER_SETTINGS.ANSWER_TYPE;
                const answerOptions = ANSWER_SETTINGS.ANSWER_TYPES[answerType] || [];
                const numberOfQuestions = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                const numberOfOptions = ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1;
                let beforeQindex = qindex;

                let audio = "";
                if(category === "listening"){
                    if(QUESTION_SETTINGS.LISTENING_FROM_HERE){
                        if(QUESTION_SETTINGS.LISTENING_FROM_HERE.STATUS){
                            audio = `<span class="listen-from-here" data-time="${QUESTION_SETTINGS.LISTENING_FROM_HERE.TIME}">Listen from here</span>`;
                        }
                    }
                }

                

                if(TYPE === "matching-headings" || TYPE === "matching"  && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml           = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions,TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }

                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "matching-information" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "true-false-notgiven" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "yes-no-notgiven" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }

                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "summary-form-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updatedHtml  = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "summary-form-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "radio"){
                    const updatedHtml  =  radioTypeQuestions(QUESTION.HTML,numberOfQuestions,QUESTIONS,EXPLANATIONS, TYPE, 'quiz' );
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    <div class="test-panel__item">
                        ${headings}
                        ${updatedHtml} 
                    </div>`;

                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updatedHtml  = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){

                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;

                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "radio"){
                    const updatedHtml  =  radioTypeQuestions(QUESTION.HTML,numberOfQuestions,QUESTIONS,EXPLANATIONS, TYPE, 'quiz' );
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    <div class="test-panel__item">
                        ${headings}
                        ${updatedHtml} 
                    </div>`;
                } else if(TYPE === "plan-map-diagram-labelling" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updatedHtml  = replaceCurlyBracketsWithTextInput(QUESTION.HTML, numberOfQuestions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } else if(TYPE === "plan-map-diagram-labelling" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    let headings = "";
                    if(numberOfQuestions > 1){
                        headings = `<div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>`;
                    } else {
                        headings = "";
                    }
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        ${headings}
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                    </div>`;
                } 
            });

            
        }
        
        

        return `<div class="test-panel__header">
            <h2 class="test-panel__title">Part ${index+1}</h2>
            <div class="test-panel__title-caption"></div>
        </div>
        ${mainHtml}
        `;
    };

    useEffect(() => {

        
        if( id && category ) {
            setLoading(true);
            getRequest(endpoint + "/preview/ielts/"+category+"/"+id, {
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken
            },{}).then((response) => {
                const { success, has_json, json, error, res } = response;
                if( success && has_json && !error ) {
                    updateStates(json);
                } else {
                    console.warn(`[warning]: ${res}`);
                }
            }).catch((err) => {
                const { success, error, error_type, error_message, error_code } = err;
                if( error ) {
                    console.log(error_message);
                    
                } else {
                    console.log('[ERROR]: UNKNOWN',err);
                }
            });
        }

        return () => {
            document.body.className = '';
            setLoading(true);
        };

    },[]);

    useEffect(() => {
        if(document.querySelector('.gutter')){
            if(WIDTH > 768){
                document.querySelector('.gutter').classList = 'gutter gutter-horizontal w-4px';
            } else {
                document.querySelector('.gutter').classList = 'gutter gutter-vertical h-4px';
            }
        }
    },[WIDTH]);

    useEffect(() => {
        if(!loading && category === "listening"){
            window.listeningPlayer  = new Plyr('#take-test__player', {
                controls: controlBtns,
                hideControls: false,
                seekTime: 5,
                youtube: {
                    noCookie: true,
                }
            });
        }
    },[loading]);

    


    return (<>
        <Helmet>
            <link rel="stylesheet" href="/css/ielts/iot-reading.css" />
        </Helmet>
        {loading? <>Loading...</> : <>
            {category === "reading" && <div className="dialog-off-canvas-main-canvas js-attempt-only-reading">
                <header className="realtest-header ">
                    <img src="/themes/iot/images/logos/IOT_ShortLogo_by_Intergreat.svg" alt="" className="realtest-header__logo" />
                    <div className="realtest-header__time "> 
                        <span className="realtest-header__time-clock" data-time={time} data-duration-default="3600" id="time-clock">
                            <span className="realtest-header__time-val">{'-:-'}</span>
                            <span className="realtest-header__time-text">minutes remaining</span>
                        </span>
                    </div>
                    <div className="realtest-header__btn-group">
                        <div className="realtest-header__btn-save save_hidden">
                            Saved<span className="ioticon-check-v2"></span>
                        </div>
                        <div className="realtest-header__icon -note" id="js-bt-notepad"></div>
                        <div className="realtest-header__icon -full-screen" id="js-full-screen" data-original-title="Full Screen Mode" data-placement="bottom" data-trigger="hover"></div>
                        <button className="realtest-header__bt-review" data-target="#modal-review-test"> 
                            <span className="ioticon-review"></span>Review 
                        </button> 
                        <button className="realtest-header__bt-submit"> 
                            Submit 
                        </button>
                    </div>
                </header>
                
                <div className="page take-test">

                    <div className="highlight-box" id="highlight-box" style={{display: 'none'}}> 
                        <button className="highlight-box__btn -note" id="js-btn-note">Note</button> 
                        <button className="highlight-box__btn -remove-note" id="js-remove-note">Remove note</button> 
                        <button className="highlight-box__btn -highlight" id="js-btn-highlight">Highlight</button> 
                        <button className="highlight-box__btn -remove" id="js-remove-highlight">Remove highlight</button>
                        <div className="highlight-box__note-content" id="js-note-content" style={{display: 'none'}}>
                            <textarea name="" id="user-note-input" className="highlight-box__textarea form-control" rows="3" placeholder="Please enter your notes">
                            </textarea>
                            <div className="highlight-box__note-buttons"> 
                                <button className="highlight-box__note-btn btn -save" id="save-note">Save</button> 
                                <button className="highlight-box__note-btn btn -cancel" id="cancel-note">Cancel</button>
                            </div>
                        </div>
                    </div>

                    <div className="notepad" id="notepad" style={{height: '820px'}}> 
                        <span className="notepad__close-icon ioticon-x"></span>
                        <h5 className="notepad__title">Notepad</h5>
                        <form className="notepad__search-form" action="" method="POST" role="form">
                            <div className="notepad__search"> 
                                <input type="text" name="noteSearch" className="form-control notepad__input" id="note-search" placeholder="Search for your note..." /> 
                                <button type="button" className="notepad__search-icon ioticon-search"></button>
                            </div>
                            <div className="notepad__search-results" id="search-results"></div>
                        </form>
                        <div className="notepad__item-wrap" id="notes-container" style={{overflow:'hidden',outline: 'none'}} tabIndex="1"></div>
                    </div>

                    <div className="take-test__body">
                        <div className="region region-content">
                            <article role="article">
                                <Split
                                    className="take-test__board highlighter-context"
                                    sizes={[50, 50]}
                                    minSize={100}
                                    expandToMin={false}
                                    gutterSize={4}
                                    gutterAlign="center"
                                    snapOffset={30}
                                    dragInterval={1}
                                    direction={WIDTH > 768? "horizontal" : "vertical"}
                                    cursor="col-resize"
                                    id="highlighter-contents"
                                >
                                    <div id="split-one" className={`take-test__split-item ${WIDTH > 768? 'w-50-2' : 'h-50-2'}`}>
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section;
                                            return <section key={index} id={"part-"+(index+1)} className={(index === 0? "test-contents ckeditor-wrapper -show" :"test-contents ckeditor-wrapper")} style={{overflowY:'scroll', outline:'none', display: 'none'}}>
                                                <div className="test-contents__paragragh" dangerouslySetInnerHTML={{ __html: content }}>

                                                </div>
                                            </section>
                                        })}
                                        
                                    </div>
                                    <div id="split-two" className={`take-test__split-item ${WIDTH > 768? 'w-50-2' : 'h-50-2'}`}>
                                        
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section;
                                            return <section dangerouslySetInnerHTML={{ __html: questionHtml(index,index+1) }} key={index} id={"part-questions-"+(index+1)} className={(index === 0? "test-panel -show" :"test-panel")} style={{overflowY:'scroll', outline:'none', display: 'none'}}>
                                                
                                            </section>
                                        })}

                                        <div className="test-panel__nav">
                                            <div className="test-panel__nav-buttons" id="js-btn-wrap" data-part-show="0"> 
                                                <button className="test-panel__nav-btn -prev -disabled" id="js-btn-previous"> 
                                                    <span className="ioticon-prev-icon"></span> 
                                                </button> 
                                                <button className="test-panel__nav-btn -next" id="js-btn-next"> 
                                                    <span className="ioticon-next-icon"></span> 
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </Split>
                            </article>
                        </div>
                        <div className="take-test__bottom-palette">
                            <div className="question-palette">
                                <div className="question-palette__list-item" id="question-palette-table">
                                    {sections && sections.length > 0 && sections.map((section,index) => {
                                        const { title, content } = section; 
                                        const sectionPalette = questions[index]; 
                                        let totalQuestions = 0;
                                        
                                        sectionPalette.forEach((p) => {
                                            const { QUESTION_SETTINGS } = p;
                                            totalQuestions += +QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                                        });
                                        
                                        return <div id={'navigation-bar-'+(index+1)} key={index} className={`question-palette__part ${index === 0? '-active' : ''}`} data-part={index+1} data-questions="14">
                                            <div className="question-palette__part-title"> 
                                                Part {index+1} <span>:</span>
                                            </div>
                                            <div className="question-palette__part-status">
                                                <span className="number">0</span> of <span className="total">{totalQuestions}</span> questions
                                            </div>
                                            <div className="question-palette__items-group"> 
                                                {Array(totalQuestions).fill().map((_, qindex) => {
                                                    questionIndex++;
                                                    return <span key={qindex} className={`question-palette__item ${index === 1 && qindex === 1? 'is-selected' : ''}`} data-p={index+1} data-num={questionIndex}>{questionIndex}</span> 
                                                })}
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade modal-review-test" id="modal-review-test" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <i className="ioticon-x modal-review-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                            <div className="modal-body">
                                <h4 className="modal-review-test__title">Review your answers</h4>
                                <p className="modal-review-test__caption">* This window is to review your answers only, you cannot change the answers in here</p>
                                <div className="modal-review-test__table">
                                    <div className="result-table" style={{display: 'flex',flexWrap: 'wrap',alignItems: 'center',justifyContent: 'center'}}>
                                        
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section; 
                                            const sectionPalette = questions[index]; 
                                            let totalQuestions = 0;
                                            
                                            sectionPalette.forEach((p) => {
                                                const { QUESTION_SETTINGS } = p;
                                                totalQuestions += +QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                                            });
                                            
                                            return <React.Fragment key={index}>{Array(totalQuestions).fill().map((_, qindex) => {
                                                qR++;
                                                return <div key={qR} className="result-table__col" data-p={index+1} data-num={qR}><span>Q{qR}:</span><em></em></div> 
                                            })}</React.Fragment>
                                                
                                        })}
                                    </div>
                                </div>
                                <div className="modal-review-test__footer">
                                    <button type="button" className="modal-review-test__btn iot-grbt -main-color" data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade modal-submit-test" id="modal-submit-test" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <i className="ioticon-x modal-submit-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                            <div className="modal-body">
                                <div className="modal-submit-test__icon"></div>
                                <h4 className="modal-submit-test__title">Are you sure you want to submit?</h4>
                                <div className="modal-submit-test__footer">
                                <button type="button" className="modal-submit-test__btn iot-grbt -white" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button id="modal-submit-test__btn" data-id={id} data-category={category} type="button" className="modal-submit-test__btn iot-grbt -main-color -btn-submit-test">
                                    Submit and Review Answers
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade modal-submit-test" id="modal-do-not-work-lr" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <i className="ioticon-x modal-submit-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                        <div className="modal-body">
                            <div className="modal-submit-test__icon"></div>
                            <h4 className="modal-submit-test__title">Please select an answer!</h4>
                        </div>
                        </div>
                    </div>
                </div>

            </div>}

            {category === "listening" && <div className="dialog-off-canvas-main-canvas js-attempt-only-listening">
                <header className="realtest-header ">
                    <img src="https://ieltsonlinetests.com/themes/iot/images/logos/IOT_ShortLogo_by_Intergreat.svg" alt="" className="realtest-header__logo" />
                    <div className="realtest-header__time "> 
                        <span className="realtest-header__time-clock" data-time={time} data-duration-default="3600" id="time-clock">
                            <span className="realtest-header__time-val">{'-:-'}</span>
                            <span className="realtest-header__time-text">minutes remaining</span>
                        </span>
                    </div>
                    <div className="realtest-header__btn-group">
                        <div className="realtest-header__btn-save save_hidden">
                            Saved<span className="ioticon-check-v2"></span>
                        </div>
                        <div className="realtest-header__icon -note" id="js-bt-notepad"></div>
                        <div className="realtest-header__icon -full-screen" id="js-full-screen" data-original-title="Full Screen Mode" data-placement="bottom" data-trigger="hover"></div>
                        <button className="realtest-header__bt-review" data-target="#modal-review-test"> 
                            <span className="ioticon-review"></span>Review 
                        </button> 
                        <button className="realtest-header__bt-submit"> 
                            Submit 
                        </button>
                    </div>
                </header>
                <div className="take-test__player-wrap">
                    <div className="take-test__player-container">
                        <audio id="take-test__player" className="take-test__player" data-source={"['http','https']"}></audio>
                    </div>
                </div>
                <div className="page take-test">

                    <div className="highlight-box" id="highlight-box" style={{display: 'none'}}> 
                        <button className="highlight-box__btn -note" id="js-btn-note">Note</button> 
                        <button className="highlight-box__btn -remove-note" id="js-remove-note">Remove note</button> 
                        <button className="highlight-box__btn -highlight" id="js-btn-highlight">Highlight</button> 
                        <button className="highlight-box__btn -remove" id="js-remove-highlight">Remove highlight</button>
                        <div className="highlight-box__note-content" id="js-note-content" style={{display: 'none'}}>
                            <textarea name="" id="user-note-input" className="highlight-box__textarea form-control" rows="3" placeholder="Please enter your notes">
                            </textarea>
                            <div className="highlight-box__note-buttons"> 
                                <button className="highlight-box__note-btn btn -save" id="save-note">Save</button> 
                                <button className="highlight-box__note-btn btn -cancel" id="cancel-note">Cancel</button>
                            </div>
                        </div>
                    </div>

                    <div className="notepad" id="notepad" style={{height: '820px'}}> 
                        <span className="notepad__close-icon ioticon-x"></span>
                        <h5 className="notepad__title">Notepad</h5>
                        <form className="notepad__search-form" action="" method="POST" role="form">
                            <div className="notepad__search"> 
                                <input type="text" name="noteSearch" className="form-control notepad__input" id="note-search" placeholder="Search for your note..." /> 
                                <button type="button" className="notepad__search-icon ioticon-search"></button>
                            </div>
                            <div className="notepad__search-results" id="search-results"></div>
                        </form>
                        <div className="notepad__item-wrap" id="notes-container" style={{overflow:'hidden',outline: 'none'}} tabIndex="1"></div>
                    </div>

                    <div className="take-test__body">
                        <div className="region region-content">
                            <article role="article">
                                <div className="take-test__board highlighter-context" id="highlighter-contents">
                                    <div className="take-test__questions-wrap">      
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section;
                                            return <section dangerouslySetInnerHTML={{ __html: questionHtml(index,index+1) }} key={index} id={"part-questions-"+(index+1)} className={(index === 0? "test-panel -show" :"test-panel")} style={{overflowY:'scroll', outline:'none', display: 'none'}}>
                                            </section>
                                        })}

                                        <div className="test-panel__nav">
                                            <div className="test-panel__nav-buttons" id="js-btn-wrap" data-part-show="0"> 
                                                <button className="test-panel__nav-btn -prev -disabled" id="js-btn-previous"> 
                                                    <span className="ioticon-prev-icon"></span> 
                                                </button> 
                                                <button className="test-panel__nav-btn -next" id="js-btn-next"> 
                                                    <span className="ioticon-next-icon"></span> 
                                                </button>
                                            </div>
                                        </div>
                                    </div>   
                                </div>
                            </article>
                        </div>
                        <div className="take-test__bottom-palette">
                            <div className="question-palette">
                                <div className="question-palette__list-item" id="question-palette-table">
                                    {sections && sections.length > 0 && sections.map((section,index) => {
                                        const { title, content } = section; 
                                        const sectionPalette = questions[index]; 
                                        let totalQuestions = 0;
                                        
                                        sectionPalette.forEach((p) => {
                                            const { QUESTION_SETTINGS } = p;
                                            totalQuestions += +QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                                        });
                                        
                                        return <div id={'navigation-bar-'+(index+1)} key={index} className={`question-palette__part ${index === 0? '-active' : ''}`} data-part={index+1} data-questions="14">
                                            <div className="question-palette__part-title"> 
                                                Part {index+1} <span>:</span>
                                            </div>
                                            <div className="question-palette__part-status">
                                                <span className="number">0</span> of <span className="total">{totalQuestions}</span> questions
                                            </div>
                                            <div className="question-palette__items-group"> 
                                                {Array(totalQuestions).fill().map((_, qindex) => {
                                                    questionIndex++;
                                                    return <span key={qindex} className={`question-palette__item ${index === 1 && qindex === 1? 'is-selected' : ''}`} data-p={index+1} data-num={questionIndex}>{questionIndex}</span> 
                                                })}
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="modal fade modal-review-test" id="modal-review-test" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <i className="ioticon-x modal-review-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                            <div className="modal-body">
                                <h4 className="modal-review-test__title">Review your answers</h4>
                                <p className="modal-review-test__caption">* This window is to review your answers only, you cannot change the answers in here</p>
                                <div className="modal-review-test__table">
                                    <div className="result-table" style={{display: 'flex',flexWrap: 'wrap',alignItems: 'center',justifyContent: 'center'}}>
                                        
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section; 
                                            const sectionPalette = questions[index]; 
                                            let totalQuestions = 0;
                                            
                                            sectionPalette.forEach((p) => {
                                                const { QUESTION_SETTINGS } = p;
                                                totalQuestions += +QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                                            });
                                            
                                            return <React.Fragment key={index}>{Array(totalQuestions).fill().map((_, qindex) => {
                                                qR++;
                                                return <div key={qR} className="result-table__col" data-p={index+1} data-num={qR}><span>Q{qR}:</span><em></em></div> 
                                            })}</React.Fragment>
                                                
                                        })}
                                    </div>
                                </div>
                                <div className="modal-review-test__footer">
                                    <button type="button" className="modal-review-test__btn iot-grbt -main-color" data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade modal-submit-test" id="modal-submit-test" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <i className="ioticon-x modal-submit-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                            <div className="modal-body">
                                <div className="modal-submit-test__icon"></div>
                                <h4 className="modal-submit-test__title">Are you sure you want to submit?</h4>
                                <div className="modal-submit-test__footer">
                                <button type="button" className="modal-submit-test__btn iot-grbt -white" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button id="modal-submit-test__btn" data-id={id} data-category={category} type="button" className="modal-submit-test__btn iot-grbt -main-color -btn-submit-test">
                                    Submit and Review Answers
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade modal-submit-test" id="modal-do-not-work-lr" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <i className="ioticon-x modal-submit-test__close-modal" data-dismiss="modal" aria-label="Close"></i>
                        <div className="modal-body">
                            <div className="modal-submit-test__icon"></div>
                            <h4 className="modal-submit-test__title">Please select an answer!</h4>
                        </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>}
    </>);
};



const IeltsSolutionPreview = () => {
    const { endpoint }              = constants;
    const { category, id }          = useParams();
    const [loading,setLoading]      = useState(true);
    const { USER }                  = useSelector( state => state.auth );
    const { WIDTH }                 = useSelector( state => state.theme );
    const [sections,setSections]    = useState([]);
    const [questions,setQuestions]  = useState([]);
    const [time,setTime]            = useState(0);
    const [answers,setAnswers]      = useState(null);
    let questionIndex               = 0;
    let qindex                      = 0;
    let qR                          = 0;
    let exIndex                     = 0;

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShow(true);
    };

    const updateStates = (states) => {
        const { quiz } = states;
        setSections(quiz.sections);
        let sectionQuestions = [];
        quiz.sections.forEach((section,index) => {
            const { _id }           = section;
            let filteredQuestions   = quiz.questions.filter(obj => obj._sectionId === _id );
            sectionQuestions.push(filteredQuestions);
        });
        setQuestions(sectionQuestions);
        if(quiz.quiz){
            const mainQuiz = quiz.quiz;
            const time = mainQuiz.time;
            if(time.timer){
                const quizTime = (+time.hh*3600) + (+time.mm*60) + (+time.ss);
                setTime(quizTime);
            }
        }

        if(localStorage.getItem('review_solution-'+id)){
            let solution = localStorage.getItem('review_solution-'+id);
            setAnswers(JSON.parse(solution));
            setLoading(false);
        }  
    };

    const questionHtml = (index,partId) => {
        let mainHtml = "";
        let num      = 0;
        const USER_RESPONSE = answers;
        

        const replaceCurlyBracketsWithSelect = (html, answerOptions, numberOfQuestions, numberOfOptions,TYPE) => {
            
            return html.replace(/\{[^{}]+\}/g, (match, index) => {
                if (numberOfQuestions > 0) {
                    
                    const innerText = match.substring(1, match.length - 1);
                    const matchingOption = answerOptions.includes(innerText); 
                    if( matchingOption ){
                        numberOfQuestions--;
                        num++;
                        qindex++;

                        let response = USER_RESPONSE.answers[qindex];
                        let answerFound = 0;
                        let answer = "";
                        if(
                            response.input_type && response.input_type === "select" &&
                            response.q_type && response.q_type === TYPE &&
                            response.pNum && response.pNum === partId
                        ){
                            if(response.class && response.class === "-checked"){
                                answerFound = 1;
                                answer = response.answer;
                            }
                        }

    
                        const selectOptions = answerOptions.slice(0, numberOfOptions).map((option,index) => {
                            return `<option key="${index}" value="${option}" ${answerFound == 1 && answer == option? 'selected' : ''}>${option}</option>`;
                        }).join('');
    
                        return `<b class="iot-question-number">${qindex}.</b>
                                <select 
                                    value="" 
                                    data-q_type="${TYPE}"
                                    data-input_type="select"
                                    data-num="${qindex}"
                                    data-id="q-${qindex}"
                                    data-part="${partId}"
                                    class="question__input iot-lr-question iot-option iot-dropdown form-control mb-2">
                                        <option></option>
                                        ${selectOptions}
                                    </select>
                        `;
                    } else {
                        return match; 
                    }
                } else {
                    return match; // Leave other curly brackets unchanged
                }
            });
        }; 
        
        const createExplanations = (html, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE) => {
            let explanations = [];
            explanations = EXPLANATIONS;
    
    
    
            const regex = /\{([^{}]+)\}/g;
            const matches = html.match(regex);
            let explanationHtml = '';
    
            if (matches) {
                matches.map((match, index) => {
                    const innerText = match.substring(1, match.length - 1);
                    const matchingOption = answerOptions.includes(innerText);
                    exIndex++;
                    let explanation = "";
                    if(explanations && explanations.length > 0){
                        
                        if(explanations[index]){
                            const { HTML } = explanations[index];

                            explanation = `
                                <div class="sl-item explanation" key="${exIndex}">
                                    <div class="sl-control"> 
                                        <a class="explanation-click" title="Explain" data-toggle="collapse" data-target="#col-${exIndex}" href="javascript:void(0)" aria-expanded="false"> 
                                            <span class="icon-explain"></span> Explain 
                                        </a> 
                                    </div>
                                    <div id="col-${exIndex}" class="collapse" aria-expanded="false" style="">
                                        <!-- Your explanation text here -->
                                        ${HTML}
                                    </div>
                                </div>
                            `;
                        }
                    }
    
                    explanationHtml += `
                        <li class="answer" key="${exIndex}">
                            <span>
                                <b>${exIndex}</b>
                            </span> 
                            Answer: <span class="b-r">${matchingOption ? innerText : ''}</span>
                            ${explanation}
                        </li>
                    `;
                });
            }
    
    
            return `
                <ul style="margin-top:20px;">
                    ${explanationHtml}
                </ul>
            `;
        };

        if(questions && questions.length > 0 && questions[index]){
            let sectionQuestions = questions[index];

            sectionQuestions.forEach((qus,index) => {
                const { ANSWER_SETTINGS, QUESTION, QUESTION_SETTINGS, TYPE, EXPLANATIONS } = qus;
                const answerType = ANSWER_SETTINGS.ANSWER_TYPE;
                const answerOptions = ANSWER_SETTINGS.ANSWER_TYPES[answerType] || [];
                const numberOfQuestions = QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                const numberOfOptions   = ANSWER_SETTINGS.NUMBER_OF_OPTIONS || 1;
                let beforeQindex        = qindex;
                let audio               = "";

                if(category === "listening"){
                    if(QUESTION_SETTINGS.LISTENING_FROM_HERE){
                        if(QUESTION_SETTINGS.LISTENING_FROM_HERE.STATUS){
                            audio = `<span class="listen-from-here" data-time="${QUESTION_SETTINGS.LISTENING_FROM_HERE.TIME}">Listen from here</span>`;
                        }
                    }
                }

                if(TYPE === "matching-headings" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml           = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions,TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    mainHtml += `<div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;
                } else if(TYPE === "matching-information" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    

                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    mainHtml += `<div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;
                } else if(TYPE === "true-false-notgiven" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    

                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    mainHtml += `<div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;
                }  else if(TYPE === "yes-no-notgiven" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    

                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;
                } else if(TYPE === "summary-form-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                } else if(TYPE === "summary-form-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "radio"){
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                
                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){

                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;

                } else if(TYPE === "sentence-completion" && QUESTION_SETTINGS.QUESTION_LAYOUT === "radio"){
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                
                } else if(TYPE === "plan-map-diagram-labelling" && QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup"){
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                } else if(TYPE === "plan-map-diagram-labelling" && QUESTION_SETTINGS.QUESTION_LAYOUT === "select"){
                    const updatedHtml  = replaceCurlyBracketsWithSelect(QUESTION.HTML, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
                    const updateHtmlWithResult  = createExplanations(QUESTION.HTML, EXPLANATIONS, answerOptions, numberOfQuestions, numberOfOptions, TYPE);
            
                    
                    mainHtml += `
                    
                    <div class="test-panel__item">
                        <div class="test-panel__question">
                            <h4 class="test-panel__question-title">
                                Questions ${beforeQindex+1}-${qindex} ${audio}
                            </h4>
                            <div class="test-panel__question-desc"></div>
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updatedHtml}
                        </div>
                        <div class="test-panel__answers-wrap">
                            ${updateHtmlWithResult}
                        </div>
                    </div>`;
                } 
            });
        }
        

        return mainHtml;
    };

    useEffect(() => {

        document.body.className = `reading-test show-palette take-test-page -practice-mode user-logged-in path-node page-node-type-quiz has-glyphicons`;
        if( id && category ) {
            setLoading(true);
            getRequest(endpoint + "/preview/ielts/"+category+"/"+id, {
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken
            },{}).then((response) => {
                const { success, has_json, json, error, res } = response;
                if( success && has_json && !error ) {
                    updateStates(json);
                } else {
                    console.warn(`[warning]: ${res}`);
                }
            }).catch((err) => {
                const { success, error, error_type, error_message, error_code } = err;
                if( error ) {
                    console.log(error_message);
                    
                } else {
                    console.log('[ERROR]: UNKNOWN',err);
                }
            });
        }

        return () => {
            document.body.className = '';
            setLoading(true);
        };

    },[]);

    useEffect(() => {
        if(document.querySelector('.gutter')){
            if(WIDTH > 768){
                document.querySelector('.gutter').classList = 'gutter gutter-horizontal w-4px';
            } else {
                document.querySelector('.gutter').classList = 'gutter gutter-vertical h-4px';
            }
        }
    },[WIDTH]);


    return (<>
        <Helmet>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous" />
            <link rel="stylesheet" href="/css/ielts/iot-reading.css" />
        </Helmet>
        <div>
        {loading? <>Loading...</> : <>
            <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
                Solution
            </Button>
            <Modal className="modal__solution" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <div className="dialog-off-canvas-main-canvas">
                    <header className="realtest-header ">
                        
                        <div className="realtest-header__time "> 
                            <span className="realtest-header__time-clock" data-time={time} data-duration-default="3600" id="time-clock">
                                <span className="realtest-header__time-val">{'-:-'}</span>
                                <span className="realtest-header__time-text">minutes remaining</span>
                            </span>
                        </div>
                        <div className="realtest-header__btn-group">
                            <div className="realtest-header__icon -full-screen" id="js-full-screen" data-original-title="Full Screen Mode" data-placement="bottom" data-trigger="hover"></div>
                            
                            <button className="solution__btn-close-x" onClick={() => setShow(false)}> 
                                Close
                            </button>
                        </div>
                    </header>

                    <div className="page take-test">


                        <div className="take-test__body">
                            <div className="region region-content">
                                <article role="article">
                                    <Split
                                        className="take-test__board highlighter-context"
                                        sizes={[50, 50]}
                                        minSize={100}
                                        expandToMin={false}
                                        gutterSize={4}
                                        gutterAlign="center"
                                        snapOffset={30}
                                        dragInterval={1}
                                        direction={WIDTH > 768? "horizontal" : "vertical"}
                                        cursor="col-resize"
                                        id="highlighter-contents"
                                    >
                                        <div id="split-one" className={`take-test__split-item ${WIDTH > 768? 'w-50-2' : 'h-50-2'}`}>
                                            {sections && sections.length > 0 && sections.map((section,index) => {
                                                const { title, content } = section;
                                                return <section key={index} id={"part-"+(index+1)} className={(index === 0? "test-contents ckeditor-wrapper -show" :"test-contents ckeditor-wrapper")} style={{overflowY:'scroll', outline:'none', display: 'none'}}>
                                                    <div className="test-contents__paragragh" dangerouslySetInnerHTML={{ __html: content }}>
                                                    </div>
                                                </section>
                                            })}
                                            
                                        </div>
                                        <div id="split-two" className={`take-test__split-item ${WIDTH > 768? 'w-50-2' : 'h-50-2'}`}>
                                            
                                            {sections && sections.length > 0 && sections.map((section,index) => {
                                                const { title, content } = section;
                                                return <section dangerouslySetInnerHTML={{ __html: questionHtml(index,index+1) }} key={index} id={"part-questions-"+(index+1)} className={(index === 0? "test-panel -show" :"test-panel")} style={{overflowY:'scroll', outline:'none', display: 'none'}}>
                                                    
                                                </section>
                                            })}

                                            <div className="test-panel__nav">
                                                <div className="test-panel__nav-buttons" id="js-btn-wrap" data-part-show="0"> 
                                                    <button className="test-panel__nav-btn -prev -disabled" id="js-btn-previous"> 
                                                        <span className="ioticon-prev-icon"></span> 
                                                    </button> 
                                                    <button className="test-panel__nav-btn -next" id="js-btn-next"> 
                                                        <span className="ioticon-next-icon"></span> 
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                    </Split>
                                </article>
                            </div>
                            <div className="take-test__bottom-palette">
                                <div className="question-palette">
                                    <div className="question-palette__list-item" id="question-palette-table">
                                        {sections && sections.length > 0 && sections.map((section,index) => {
                                            const { title, content } = section; 
                                            const sectionPalette = questions[index]; 
                                            let totalQuestions = 0;
                                            
                                            sectionPalette.forEach((p) => {
                                                const { QUESTION_SETTINGS } = p;
                                                totalQuestions += +QUESTION_SETTINGS.NUMBER_OF_QUESTIONS;
                                            });
                                            
                                            return <div id={'navigation-bar-'+(index+1)} key={index} className={`question-palette__part ${index === 0? '-active' : ''}`} data-part={index+1} data-questions="14">
                                                <div className="question-palette__part-title"> 
                                                    Part {index+1} <span>:</span>
                                                </div>
                                                <div className="question-palette__part-status">
                                                    <span className="number">0</span> of <span className="total">{totalQuestions}</span> questions
                                                </div>
                                                <div className="question-palette__items-group"> 
                                                    {Array(totalQuestions).fill().map((_, qindex) => {
                                                        questionIndex++;
                                                        return <span key={qindex} className={`question-palette__item ${index === 1 && qindex === 1? 'is-selected' : ''}`} data-p={index+1} data-num={questionIndex}>{questionIndex}</span> 
                                                    })}
                                                </div>
                                            </div>
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>}
        </div>
    </>);
};

export { IeltsTestPreview, IeltsSolutionPreview };