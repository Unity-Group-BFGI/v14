import { createSlice } from '@reduxjs/toolkit'

export const ieltslmsSlice = createSlice({
    name: 'IELTS-LMS',
    initialState: {
        NAME: 'IELTS-LMS',
        IELTS_LMS_LOADED: false,
        IELTS_LMS_LOADING: true,
        IELTS_LMS_FAILED: false,
        IELTS_LMS_MY_QUIZZES:{
            LOADED: false,
            LOADING: true,
            FAILED:false,
            QUIZZES: []
        },
        IELTS_LMS_MY_QUIZZES_STATES: {
            PER_PAGE: 10,
            CURRENT_PAGE: 1,
            TOTAL_PAGES: 1,
            TOTAL_ITEMS: 0,
            REMAINING_ITEMS: 0,
            QUIZ_CATEGORY: 'all',
            QUIZ_STATUS: 'published'
        },
        IELTS_LMS_MY_COURSES:{
            LOADED: false,
            LOADING: true,
            FAILED:false,
            COURSES: []
        },
        IELTS_LMS_MY_COURSES_STATES: {
            PER_PAGE: 10,
            CURRENT_PAGE: 1,
            TOTAL_PAGES: 1,
            TOTAL_ITEMS: 0,
            REMAINING_ITEMS: 0,
            COURSE_STATUS: 'published'
        },
        IELTS_LMS_EDIT_QUIZ: {
            LOADED: false,
            LOADING: true,
            FAILED: false,
            QUIZ: null,
        },
        IELTS_LMS_EDIT_QUIZ_BASIC: {
            LOADED: false,
            LOADING: true,
            FAILED: false,
            QUIZ: null
        },
        IELTS_LMS_EDIT_QUIZ_SECTIONS:{
            LOADED: false,
            LOADING: true,
            FAILED: false,
            SECTIONS: []
        },
        IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES: {
            PER_PAGE: 10,
            CURRENT_PAGE: 1,
            TOTAL_PAGES: 0,
            TOTAL_ITEMS: 0,
            REMAINING_ITEMS: 0,
            SECTION_STATUS: 'published'
        },
        IELTS_LMS_EDIT_QUIZ_QUESTIONS: {
            LOADED: false,
            LOADING: true,
            FAILED: false,
            SECTIONS: [],
            QUESTIONS: [],
            CURRENT_SECTION_ID: null
        },
        IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES: {
            PER_PAGE: 10,
            CURRENT_PAGE: 1,
            TOTAL_PAGES: 0,
            TOTAL_ITEMS: 0,
            REMAINING_ITEMS: 0,
            QUESTION_STATUS: 'published'
        },

        // QUESTIONS ------------------------------------------------------------------- [QUESTIONS]
        // QUESTION ------------------------------ [inputTypes]
        IELTS_LMS_EDIT_QUIZ_QUESTION_INPUT_TYPES: [
            { value: "none", label: "" },
            { value: "fillup", label: "Fillup", icon: '/svgs/input-types/fillup.svg' },
            { value: "radio", label: "Radio", icon: '/svgs/input-types/radio.svg' },
            { value: "select", label: "Select", icon: '/svgs/input-types/select.svg' },
            { value: "checkbox", label: "Checkbox", icon: '/svgs/input-types/checkbox.svg' },
        ],
        // QUESTION ------------------------------ [main]
        IELTS_LMS_EDIT_QUIZ_QUESTION:{
            LOADED:false,
            LOADING:true,
            FAILED:false,
            PROCESSING: false,
            SAVING: 1,
            QUESTION:{
                title: '',
                order: '',
                status: 'published',
                _postType: '', // [reading-question, listening-question, 'writing-question','speaking-question']
                _postId: '',
                _quizId: '',
                _id: '',
                _category: 'uncategorized', // [matching-headings, form completion, etc...]
                _tags: [],
                content:{
                    hasHtml: true,
                    html: '',
                    text: ''
                },
                questions: [
                    {
                        hasHtml: true,
                        html: 'Question 1',
                        text: '',
                        options:[{
                            correct: false,
                            content: 'Option 1'
                        }]
                    }
                ],
                explanations:[
                    {
                        hasHtml: true,
                        html: '',
                        text: '',
                        type: 'text'  // [text,audio,video]
                    }
                ],
                options: [
                    {
                        correct: false,
                        content: 'Option 1'
                    }
                ],
                _questionSettings:{
                    numberOfQuestions: 1,
                    combine: true,
                    inputType: 'none',
                    time:{
                        hh: 0,
                        mm: 0,
                        ss: 0
                    },
                    media: null
                },
                _answerSettings:{
                    numberOfOptions: 1,
                    answerType: 'a',
                    answerTypes: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'true-false-notgiven': ['True','False','Not Given'],
                        'yes-no-notgiven': ['Yes','No','Not Given'],
                        'custom': []
                    }
                },
                _mode:{
                    insert: true,
                    update: false
                }
                

            }
        },
        IELTS_LMS_EDIT_QUIZ_QUESTION_SAMPLE:{
            LOADED:false,
            LOADING:true,
            FAILED:false,
            PROCESSING: false,
            SAVING: 1,
            QUESTION:{
                title: '',
                order: '',
                status: 'published',
                _postType: '', // [reading-question, listening-question, 'writing-question','speaking-question']
                _postId: '',
                _quizId: '',
                _id: '',
                _category: 'uncategorized', // [matching-headings, form completion, etc...]
                _tags: [],
                content:{
                    hasHtml: true,
                    html: '',
                    text: ''
                },
                questions: [
                    {
                        hasHtml: true,
                        html: 'Question 1',
                        text: '',
                        options:[{
                            correct: false,
                            content: 'Option 1'
                        }]
                    }
                ],
                explanations:[
                    {
                        hasHtml: true,
                        html: '',
                        text: '',
                        type: 'text'  // [text,audio,video]
                    }
                ],
                options: [
                    {
                        correct: false,
                        content: 'Option 1'
                    }
                ],
                _questionSettings:{
                    combine: true,
                    numberOfQuestions: 1,
                    inputType: 'none',
                    time:{
                        hh: 0,
                        mm: 0,
                        ss: 0
                    },
                    media: null
                },
                _answerSettings:{
                    numberOfOptions: 1,
                    answerType: 'a',
                    answerTypes: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'true-false-notgiven': ['True','False','Not Given'],
                        'yes-no-notgiven': ['Yes','No','Not Given'],
                        'custom': []
                    }
                },
                _mode:{
                    insert: true,
                    update: false
                }
                

            }
        },

        IELTS_LMS_EDIT_MY_COURSE: {
            LOADED: false, 
            LOADING: true,
            FAILED: false,
            COURSE: null
        },
        // Builder
        IELTS_LMS_EDIT_COURSE_BUILDER:{
            LOADED:true,
            LOADING: false,
            FAILED:false,
            LESSONS: []
        },
        IELTS_LMS_EDIT_COURSE_BUILDER_STATES: {
            LOADED:true,
            LOADING: false,
            FAILED:false,
            SELECTED_QUIZ_CATEGORY: 'all',
            RECENT_QUIZZES: [],
            QUIZZES: []
        }

    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_ieltslms: (state,action)                         => {
            return {...state, ...action.payload};
        },
        update_ieltslms_myQuizzes: (state,action)               => {
            return {...state, IELTS_LMS_MY_QUIZZES: {...state.IELTS_LMS_MY_QUIZZES, ...action.payload }}
        },
        update_ieltslms_myQuizzes_states: (state,action)        => {
            return {...state, IELTS_LMS_MY_QUIZZES_STATES: {...state.IELTS_LMS_MY_QUIZZES_STATES, ...action.payload }}
        },
        update_ieltslms_myCourses: (state,action)               => {
            return {...state, IELTS_LMS_MY_COURSES: {...state.IELTS_LMS_MY_COURSES, ...action.payload }}
        },
        update_ieltslms_myCourses_states: (state,action)        => {
            return {...state, IELTS_LMS_MY_COURSES_STATES: {...state.IELTS_LMS_MY_COURSES_STATES, ...action.payload }}
        },
        update_ieltslms_editQuiz: (state,action)                => {
            return {...state, IELTS_LMS_EDIT_QUIZ: {...state.IELTS_LMS_EDIT_QUIZ, ...action.payload }}
        },
        update_ieltslms_editQuizBasic: (state,action)           => {
            return {...state, IELTS_LMS_EDIT_QUIZ_BASIC: {...state.IELTS_LMS_EDIT_QUIZ_BASIC, ...action.payload }}
        },
        update_ieltslms_editQuiz_sections: (state,action)       => {
            return {...state, IELTS_LMS_EDIT_QUIZ_SECTIONS: {...state.IELTS_LMS_EDIT_QUIZ_SECTIONS, ...action.payload }}
        },
        update_ieltslms_editQuiz_sections_states: (state,action)       => {
            return {...state, IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES: {...state.IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES, ...action.payload }}
        },
        update_ieltslms_editQuiz_questions: (state,action)       => {
            return {...state, IELTS_LMS_EDIT_QUIZ_QUESTIONS: {...state.IELTS_LMS_EDIT_QUIZ_QUESTIONS, ...action.payload }}
        },
        update_ieltslms_editQuiz_questions_states: (state,action)       => {
            return {...state, IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES: {...state.IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES, ...action.payload }}
        },
        update_ieltslms_editQuiz_reset: (state,action) => {
            const SECTIONS = {
                LOADED: false,
                LOADING: true,
                FAILED: false,
                SECTIONS: []
            };
            const SECTIONS_STATES = {
                PER_PAGE: 10,
                CURRENT_PAGE: 1,
                TOTAL_PAGES: 0,
                TOTAL_ITEMS: 0,
                REMAINING_ITEMS: 0,
                SECTION_STATUS: 'published'
            };
            const QUESTIONS = {
                LOADED: false,
                LOADING: true,
                FAILED: false,
                SECTIONS: [],
                QUESTIONS: [],
                CURRENT_SECTION_ID: null
            };
            const QUESTIONS_STATES = {
                PER_PAGE: 10,
                CURRENT_PAGE: 1,
                TOTAL_PAGES: 0,
                TOTAL_ITEMS: 0,
                REMAINING_ITEMS: 0,
                QUESTION_STATUS: 'published'
            };

            return {...state, 
                IELTS_LMS_EDIT_QUIZ_SECTIONS: SECTIONS, 
                IELTS_LMS_EDIT_QUIZ_SECTIONS_STATES: SECTIONS_STATES,
                IELTS_LMS_EDIT_QUIZ_QUESTIONS: QUESTIONS,
                IELTS_LMS_EDIT_QUIZ_QUESTIONS_STATES: QUESTIONS_STATES
            }
        },
        // start creating question contents here -------------------------------------------- [QUESTIONS]
        update_ieltslms_editQuiz_question: (state,action) => {
            return {...state, IELTS_LMS_EDIT_QUIZ_QUESTION: {...state.IELTS_LMS_EDIT_QUIZ_QUESTION, ...action.payload }}
        },
        update_ieltslms_editQuiz_question_question: (state,action) => {
            return {...state, IELTS_LMS_EDIT_QUIZ_QUESTION: {
                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                QUESTION:{
                    ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                    ...action.payload
                } 
            }}
        },
        update_ieltslms_editQuiz_question_reset: (state,action) => {
            return {...state, IELTS_LMS_EDIT_QUIZ_QUESTION: state.IELTS_LMS_EDIT_QUIZ_QUESTION_SAMPLE }
        },
        // change question input type
        update_ieltslms_editQuiz_question_settings: (state,action) => {
            const { type, value } = action.payload;
            if(type == "inputType"){
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            _questionSettings:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                                inputType: value
                            }
                        }
                    }
                }
            } else if(type == "numberOfQuestions"){
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            _questionSettings:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings,
                                numberOfQuestions: value
                            }
                        }
                    }
                }
            } else if(type == "combine") {
                let beforeValue = state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.combine;
                let combine = true;
                if(beforeValue){
                    combine = false;
                } else {
                    combine = true;
                }


                let xnum = 0;
                if(combine){
                    xnum = state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                } else {
                    let c = state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                    if( c ) {
                        xnum = 1;
                    }
                }

                // add explanations
                const newExplanations = Array(xnum).fill({
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                });
                // merge
                for (let i = 0; i < Math.min(xnum, state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                    newExplanations[i] = { ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
                }

                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations = [
                    ...newExplanations
                ];

                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._questionSettings.combine = combine;
                return state;


            } else {
                return {...state };
            }
        },
        // change question content [html,text]
        update_ieltslms_editQuiz_question_content: (state,action) => {
            const { type, value } = action.payload;
            if(type == "html"){
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            content:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.content,
                                hasHtml: true,
                                html: value
                            }
                        }
                    }
                }
            } else {
                return {...state };
            }
        }, 
        // add question
        update_ieltslms_editQuiz_question_add_questions: (state,action) => {
            const { type } = action.payload;
            
            if( type === "radio" ) {
                const QUS = {
                    hasHtml: true,
                    html: `Question ${state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions.length + 1}`,
                    text: '',
                    options:[{
                        correct: false,
                        content: 'Option 1'
                    }]
                };
                const EXP = {
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                };

                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions, QUS];
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations, EXP];
                return state;

            }
        },
        // remove question
        update_ieltslms_editQuiz_question_remove_questions: (state,action) => {
            const { type, qindex } = action.payload;
            
            if( type === "radio" ) {
                const newQuestions = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions];
                const newExplanations = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations];
                newQuestions.splice(qindex, 1);
                newExplanations.splice(qindex,1);
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions = [...newQuestions];
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations = [...newExplanations];
                return state;

            }
        },
        // questions content
        update_question_editQuiz_question_update_questions_content: (state,action) => {
            const { type, qindex, html } = action.payload; 
            if( type === "radio" ) {
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].html = html;
                return state;

            }
        },
        // questions - options [add\remove]
        update_question_editQuiz_question_update_questions_options: (state,action) => {
            const { type, qindex, mode, oindex, option, content } = action.payload; 
            if( type === "radio" ) {
                if(mode == "add"){
                    state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options = [
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options,
                        option
                    ];
                    return state;
                } else if(mode == "remove"){
                    const newOptions = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options];
                    newOptions.splice(oindex, 1);
                    state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options = [...newOptions];
                    return state;
                } else if(mode == "content"){
                    state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options[oindex].content = content;
                    return state;
                } else if(mode == "correct"){
                    state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options.forEach((o,index) => {
                        if(index === oindex){
                            state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options[index].correct = true;
                        } else {
                            state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.questions[qindex].options[index].correct = false;
                        }
                    });
                    return state;
                }

            }
        },
        // question - change answer settings
        update_ieltslms_editQuiz_question_answer_settings: (state,action) => {
            const { type, value, _answerSettings, cindex } = action.payload;
            if(type == "answerType"){
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            _answerSettings:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                                answerType: value
                            }
                        }
                    }
                }
            } else if(type == "numberOfOptions"){
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            _answerSettings:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                                numberOfOptions: value
                            }
                        }
                    }
                }
            } else if(type == "all") {
                return { 
                    ...state, 
                    IELTS_LMS_EDIT_QUIZ_QUESTION: {
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                        QUESTION:{
                            ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                            _answerSettings:{
                                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings,
                                ..._answerSettings
                            }
                        }
                    }
                }
            } else if(type == "custom-answer"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._answerSettings.answerTypes.custom[cindex] = value;
                return { ...state };
            } else {
                return {...state };
            }
        },
        // explanations
        update_ieltslms_editQuiz_questions_explanations: (state,action) => {
            const { explanations } = action.payload;
            return { 
                ...state, 
                IELTS_LMS_EDIT_QUIZ_QUESTION: {
                    ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                    QUESTION:{
                        ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                        explanations: [...explanations]
                    }
                }
            }
        },
        // explanations content
        update_ieltslms_editQuiz_question_update_explanation_content: (state,action) => {
            const { xindex, html } = action.payload;
            state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[xindex].html = html;
            return state;
        },
        // change basic question
        update_ieltslms_editQuiz_question_update_question_main: (state,action) => {
            const { type, value } = action.payload;
            if(type === "title"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.title = value;
            } else if(type === "order"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.order = value;
            } else if(type === "_category"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION._category = value;
            }
            return state;
        },
        // update main question
        update_ieltslms_editQuiz_update_question: (state,action) => {
            return { ...state, IELTS_LMS_EDIT_QUIZ_QUESTION: {
                ...state.IELTS_LMS_EDIT_QUIZ_QUESTION,
                QUESTION:{
                    ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION,
                    ...action.payload
                }
            }}
        },
        // checkbox options
        update_ieltslms_editQuiz_alter_option: (state,action) => {
            const { type, oindex, content } = action.payload;
            if( type == "add" ) {
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options = [
                    ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options,
                    {
                        content: 'Option '+(state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length + 1),
                        correct: false
                    }
                ];
            } else if(type == "remove"){
                const newOptions = [...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options];
                newOptions.splice(oindex, 1);
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options = [...newOptions];
            } else if(type == "correct"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[oindex].correct = !state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[oindex].correct;
            } else if(type == "content"){
                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[oindex].content = content;
            }

            if( type == "add" || type == "remove" || type == "correct" ){

                let xnum = state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct == true || item.correct == "true")).length;
                // add explanations
                const newExplanations = Array(xnum).fill({
                    hasHtml: true,
                    html: '',
                    text: '',
                    type: 'text'  // [text,audio,video]
                });
                // merge
                for (let i = 0; i < Math.min(xnum, state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                    newExplanations[i] = { ...state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
                }

                state.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations = [
                    ...newExplanations
                ];
            }

            return state;
            
        },
        update_ieltslms_editQuiz_alter_option1: (state, action) => {
            const { type, oindex, content } = action.payload;

            return produce(state, draft => {
              if (type === "add") {
                draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options = [
                  ...draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options,
                  {
                    content: 'Option ' + (draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.length + 1),
                    correct: false,
                  },
                ];
              } else if (type === "remove") {
                draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.splice(oindex, 1);
              } else if (type === "correct") {
                draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[oindex].correct = !draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options[oindex].correct;
              }
          
              let xnum = draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.options.filter(item => (item.correct === true || item.correct === "true")).length;
          
              // Update explanations
              const newExplanations = Array(xnum).fill({
                hasHtml: true,
                html: '',
                text: '',
                type: 'text', // [text,audio,video]
              });
          
              // Merge
              for (let i = 0; i < Math.min(xnum, draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations.length); i++) {
                newExplanations[i] = { ...draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations[i] };
              }
          
              // Update the explanations array
              draft.IELTS_LMS_EDIT_QUIZ_QUESTION.QUESTION.explanations = newExplanations;
            });
        },
        
        // edit my course
        update_ieltslms_editCourse: (state,action)                => {
            return {...state, IELTS_LMS_EDIT_MY_COURSE: {...state.IELTS_LMS_EDIT_MY_COURSE, ...action.payload }}
        },
        update_ieltslms_editCourse_reset: (state,action)           => {
            return {
                ...state, 
                IELTS_LMS_EDIT_MY_COURSE: {
                    LOADED: false, 
                    LOADING: true,
                    FAILED: false,
                    COURSE: null
                },
                IELTS_LMS_EDIT_COURSE_BUILDER:{
                    LOADED:true,
                    LOADING: false,
                    FAILED:false,
                    LESSONS: []
                },
                IELTS_LMS_EDIT_COURSE_BUILDER_STATES: {
                    LOADED:true,
                    LOADING: false,
                    FAILED:false
                }
            };
        },
        // builder -
        update_ieltslms_editCourse_builder: (state,action)          => {
            return {
                ...state,
                IELTS_LMS_EDIT_COURSE_BUILDER:{
                    ...state.IELTS_LMS_EDIT_COURSE_BUILDER,
                    ...action.payload
                }
            };
        },
        update_ielts_lms_edit_course_builder_add_lesson: (state,action) => {
            return {
                ...state,
                IELTS_LMS_EDIT_COURSE_BUILDER: {
                    ...state.IELTS_LMS_EDIT_COURSE_BUILDER,
                    LESSONS: [...state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS, action.payload]
                }
            };
        },
        update_ielts_lms_edit_course_builder_edit_lesson: (state,action) => {
            const { index, type, value } = action.payload;
            if(state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]){
                if(type == "preview") {
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].preview = value;
                } else if(type == "_editTitle"){
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._states._editTitle = value;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._unsaved = true;
                } else if(type == "temp-title") {
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._states._editTitle = false;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._title = value;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._unsaved = true;
                } else if(type == "title-onchange"){
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].title = value;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._unsaved = true;
                } else if(type == "title"){
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].title = value;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._states._editTitle = false;
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._unsaved = true;
                } else if(type == "quizzes"){
                    // Use a Set to keep track of unique _id values
                    //const uniqueIdsSet = new Set(state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].quizzes.map(quiz => quiz._id));

                    // Filter out quizzes with duplicate _id values
                    //const uniqueQuizzes = value.filter(quiz => !uniqueIdsSet.has(quiz._id));
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].quizzes ??= [];
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].wishlist ??= [];
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index].quizzes = [...value];
                    state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[index]._temp._unsaved = true;
                }
            }
            return state;
        },
        update_ielts_lms_edit_course_builder_remove_quiz_from_lesson: (state,action) => {
            const { li, _id } = action.payload;
            if(state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[li]){
                let newQuizzes = [...state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[li].quizzes];
                let updatedQuizzes = newQuizzes.filter((qz) => qz._id !== _id);
                state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[li].quizzes = updatedQuizzes;
                state.IELTS_LMS_EDIT_COURSE_BUILDER.LESSONS[li]._temp._unsaved = true;
            }
            return state;
        }
    },
});

// Action creators are generated for each case reducer function
export const { 
    update_ieltslms, 
    update_ieltslms_myQuizzes, 
    update_ieltslms_myQuizzes_states,

    update_ieltslms_myCourses, 
    update_ieltslms_myCourses_states,

    update_ieltslms_editQuiz_reset,
    update_ieltslms_editQuiz,
    update_ieltslms_editQuizBasic,

    update_ieltslms_editQuiz_questions,
    update_ieltslms_editQuiz_questions_states,
    // ---------------------------------------------------------------------------------------- [QUESTIONS]
    update_ieltslms_editQuiz_question,
    update_ieltslms_editQuiz_question_reset,
    // ----------------------- events [QUESTIONS][inputType] -----------------------------------------------
    update_ieltslms_editQuiz_question_settings,
    // ------------------------ events [QUESTION][content][html,text] --------------------------------------
    update_ieltslms_editQuiz_question_content,
    update_ieltslms_editQuiz_question_add_questions,
    update_ieltslms_editQuiz_question_remove_questions,
    update_question_editQuiz_question_update_questions_content,
    // options
    update_question_editQuiz_question_update_questions_options,
    // answer settings
    update_ieltslms_editQuiz_question_answer_settings,
    // explanations
    update_ieltslms_editQuiz_questions_explanations,
    // explanations content
    update_ieltslms_editQuiz_question_update_explanation_content,
    update_ieltslms_editQuiz_question_update_question_main,
    update_ieltslms_editQuiz_update_question,
    update_ieltslms_editQuiz_question_question,
    // checkbox 
    update_ieltslms_editQuiz_alter_option,

    // sections
    update_ieltslms_editQuiz_sections,
    update_ieltslms_editQuiz_sections_states,

    // edit my course
    update_ieltslms_editCourse,
    update_ieltslms_editCourse_reset,
    update_ieltslms_editCourse_builder,
    update_ielts_lms_edit_course_builder_edit_lesson,
    update_ielts_lms_edit_course_builder_add_lesson,
    update_ielts_lms_edit_course_builder_remove_quiz_from_lesson



} = ieltslmsSlice.actions;

export default ieltslmsSlice.reducer;