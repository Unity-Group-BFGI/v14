import { createSlice } from '@reduxjs/toolkit'

export const ieltsLmsSlice = createSlice({
    name: 'ielts-lms',
    initialState: {
            NAME: "ielts-lms",
            ADD_QUIZ_MODAL: false,
            IELTS_LMS_EDIT_QUIZ:{},
        
            IELTS_LMS_QUESTION_SAMPLES:{
                // reading
                IELTS_LMS_QUESTION_MATCHING_HEADINGS_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'matching-headings',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'select',
                        QUESTION_LAYOUTS: ["select"]
                    }
                },
                IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'matching-information',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'select',
                        QUESTION_LAYOUTS: ["select"]
                    }
                },
                IELTS_LMS_QUESTION_TRUE_FALSE_NOTGIVEN_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'true-false-notgiven',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'custom',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': ['true','false','not-given']
                        },
                        NUMBER_OF_OPTIONS: 3
                    },
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'select',
                        QUESTION_LAYOUTS: ["select"]
                    }
                },
                IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'true-false-notgiven',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'custom',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': ['true','false','not-given']
                        },
                        NUMBER_OF_OPTIONS: 3
                    },
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'select',
                        QUESTION_LAYOUTS: ["select"]
                    }
                },
                IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'summary-form-completion',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                            { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                        ]
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
        
        
                },
                IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'sentence-completion',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                            { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                            { value: "select", label: "Select", icon: '/svgs/select.svg' },
                        ]
                    },
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
        
        
                },
                IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING: {
                    TITLE: 'Unnamed question',
                    CATEGORY: 'reading',
                    TYPE: 'plan-map-diagram-labelling',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' }
                        ]
                    },
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
        
        
                },
                // listening
                IELTS_LMS_QUESTION_MATCHING_LISTENING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'listening',
                    TYPE: 'matching',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'select',
                        QUESTION_LAYOUTS: ["select"]
                    }
                }, // [done reducers]
                IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING: {
                    TITLE: 'Unnamed question',
                    CATEGORY: 'listening',
                    TYPE: 'plan-map-diagram-labelling',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                            { value: "select", label: "Select", icon: '/svgs/select.svg' },
                        ]
                    },
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
    
    
                },
                IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'listening',
                    TYPE: 'sentence-completion',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                            { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                        ]
                    },
                    ANSWER_SETTINGS: {
                        ANSWER_TYPE: 'i',
                        ANSWER_TYPES: {
                            "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                            'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                            'A': ['A','B','C','D','E','F','G','H','I','J'],
                            'a': ['a','b','c','d','e','f','g','h','i','j'],
                            '1': ['1','2','3','4','5','6','7','8','9','10'],
                            'custom': []
                        },
                        NUMBER_OF_OPTIONS: 1
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
    
                },
                IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING:{
                    TITLE: 'Unnamed question',
                    CATEGORY: 'listening',
                    TYPE: 'summary-form-completion',
                    QUESTION:{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false
                    },
                    EXPLANATIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false 
                    }],
                    QUESTION_SETTINGS:{
                        NUMBER_OF_QUESTIONS: 1,
                        QUESTION_LAYOUT: 'fillup',
                        QUESTION_LAYOUTS: [
                            { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' }
                        ]
                    },
                    QUESTIONS:[{
                        HTML: '',
                        TEXT: '',
                        HASHTML: true,
                        HASTEXT: false,
                        ANSWER: '',
                        OPTIONS: [{
                            HTML: '',
                            CORRECT: false
                        }] 
                    }]
    
    
                }
            },

            IELTS_LMS_QUESTION_TYPES:[
                { value: "none", label: "" },
                { value: "matching-headings", label: "Matching Headings", icon: '/svgs/matching-headings.svg', category: 'reading' },
                { value: "true-false-notgiven", label: "True, False & Not Given", icon: '/svgs/true-false-notgiven.svg', category: 'reading' },
                { value: "yes-no-notgiven", label: "Yes, No & Not Given", icon: '/svgs/yes-no-notgiven.svg', category: 'reading' },
                { value: "matching-information", label: "Matching Information", icon: '/svgs/maching-information.svg', category: 'reading' },
                { value: "summary-form-completion", label: "Summary, form completion", icon: '/svgs/summary-form-completion.svg', category: 'reading' },
                { value: "sentence-completion", label: "Sentence Completion", icon: '/svgs/sentence-completion.svg', category: 'reading' },
                { value: "plan-map-diagram-labelling", label: "Plan, Map, Diagram labelling", icon: '/svgs/plan-map-diagram-labelling.svg', category: 'reading' },
                
                { value: "matching", label: "Matching", icon: '/svgs/matching.svg', category: 'listening', layout: ['select'] },
                { value: "plan-map-diagram-labelling", label: "Plan, Map, Diagram labelling", icon: '/svgs/plan-map-diagram-labelling.svg', category: 'listening', layout:['select','fillup'] },
                { value: "sentence-completion", label: "Sentence Completion", icon: '/svgs/sentence-completion.svg', category: 'listening', layout: ['radio','fillup'] },
                { value: "summary-form-completion", label: "Summary, form completion", icon: '/svgs/summary-form-completion.svg', category: 'listening', layout: ['fillup'] },
            ],
            IELTS_LMS_QUESTION_TYPE: 'none',

            // reading
            IELTS_LMS_QUESTION_MATCHING_HEADINGS_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'matching-headings',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'select',
                    QUESTION_LAYOUTS: ["select"]
                }
            }, // checked

            IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'matching-information',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'select',
                    QUESTION_LAYOUTS: ["select"]
                }
            }, // [checked]
            IELTS_LMS_QUESTION_TRUE_FALSE_NOTGIVEN_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'true-false-notgiven',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'custom',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': ['true','false','not given']
                    },
                    NUMBER_OF_OPTIONS: 3
                },
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'select',
                    QUESTION_LAYOUTS: ["select"]
                }
            }, // [checked]
            IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'yes-no-notgiven',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'custom',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': ['yes','no','not given']
                    },
                    NUMBER_OF_OPTIONS: 3
                },
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'select',
                    QUESTION_LAYOUTS: ["select"]
                }
            }, // [checked]
            IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'summary-form-completion',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                        { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]


            }, // [checked]
            IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'sentence-completion',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                        { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                        { value: "select", label: "Select", icon: '/svgs/select.svg' },
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]

            }, // [checked]
            IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING: {
                TITLE: 'Unnamed question',
                CATEGORY: 'reading',
                TYPE: 'plan-map-diagram-labelling',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' }
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]


            }, // [checked]

            // listening
            IELTS_LMS_QUESTION_MATCHING_LISTENING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'listening',
                TYPE: 'matching',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'select',
                    QUESTION_LAYOUTS: ["select"]
                }
            }, // [checked]
            IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING: {
                TITLE: 'Unnamed question',
                CATEGORY: 'listening',
                TYPE: 'plan-map-diagram-labelling',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                        { value: "select", label: "Select", icon: '/svgs/select.svg' },
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]


            }, // [checked]
            IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'listening',
                TYPE: 'sentence-completion',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' },
                        { value: "radio", label: "Radio", icon: '/svgs/radio.svg' },
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]

            }, // [checked]
            IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING:{
                TITLE: 'Unnamed question',
                CATEGORY: 'listening',
                TYPE: 'summary-form-completion',
                QUESTION:{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false
                },
                EXPLANATIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false 
                }],
                QUESTION_SETTINGS:{
                    NUMBER_OF_QUESTIONS: 1,
                    QUESTION_LAYOUT: 'fillup',
                    QUESTION_LAYOUTS: [
                        { value: "fillup", label: "Fillup", icon: '/svgs/fillup.svg' }
                    ]
                },
                ANSWER_SETTINGS: {
                    ANSWER_TYPE: 'i',
                    ANSWER_TYPES: {
                        "i": ['i','ii','iii','iv','v','vi','vii','viii','ix','x'],
                        'I': ['I','II','III','IV','V','VI','VII','VIII','IX','X'],
                        'A': ['A','B','C','D','E','F','G','H','I','J'],
                        'a': ['a','b','c','d','e','f','g','h','i','j'],
                        '1': ['1','2','3','4','5','6','7','8','9','10'],
                        'custom': []
                    },
                    NUMBER_OF_OPTIONS: 1
                },
                QUESTIONS:[{
                    HTML: '',
                    TEXT: '',
                    HASHTML: true,
                    HASTEXT: false,
                    ANSWER: '',
                    OPTIONS: [{
                        HTML: '',
                        CORRECT: false
                    }] 
                }]


            } // [checked]

    },
    reducers: {
        // aka actions with 2 parameters [state,action]
        update_ielts_lms: (state,action)                => {
            return {...state, ...action.payload};
        },
        update_question_type: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_TYPE: action.payload };
        },
        ielts_lms_update_question_by_index: (state,action) => {
            const { index, question } = action.payload;
            state.IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS[index] = {
                ...state.IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS[index],
                ...question
            };

            console.log('state', {
                ...state.IELTS_LMS_EDIT_QUIZ_QUESTIONS_LIST.QUESTIONS[index],
                ...question
            });
            return state;
        },
        update_question_matching_headings: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_MATCHING_HEADINGS_READING: { ...state.IELTS_LMS_QUESTION_MATCHING_HEADINGS_READING, ...action.payload }};
        },
        update_question_matching_headings_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_MATCHING_HEADINGS_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_matching_information: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING: { ...state.IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING, ...action.payload }};
        },
        update_question_matching_information_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_MATCHING_INFORMATION_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },


        update_question_true_false_notgiven: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_TRUE_FALSE_NOTGIVEN_READING: { ...state.IELTS_LMS_QUESTION_TRUE_FALSE_NOTGIVEN_READING, ...action.payload }};
        },
        update_question_true_false_notgiven_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_TRUE_FALSE_NOTGIVEN_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_yes_no_notgiven: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING: { ...state.IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING, ...action.payload }};
        },
        update_question_yes_no_notgiven_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_YES_NO_NOTGIVEN_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        
        update_question_summary_form_completion_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },
        update_question_summary_form_completion: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING: { ...state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING, ...action.payload }};
        },
        update_question_summary_form_completion_question_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS.forEach((o,index) => {
                if(index === oindex){
                    state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[oindex].CORRECT = true;
                } else {
                    state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[index].CORRECT = false;
                }
            });

            return state;
            

        },
        update_question_summary_form_completion_question_add_option: (state,action) => {
            const { qindex, option } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS = [... state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS, option];

            return state;
            

        },
        update_question_summary_form_completion_question_update_option: (state,action) => {
            const { qindex, oindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[oindex].HTML = html;
            return state;
        },
        update_question_summary_form_completion_update_questions_content: (state,action) => {
            const { qindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].HTML = html;
            return state;
        },
        update_question_summary_form_completion_remove_questions_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            const newOptions = [...state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS];
            newOptions.splice(oindex, 1);
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_READING.QUESTIONS[qindex].OPTIONS = [...newOptions];
            return state;
        },

        update_question_sentence_completion_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },
        update_question_sentence_completion: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING: { ...state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING, ...action.payload }};
        },
        update_question_sentence_completion_question_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS.forEach((o,index) => {
                if(index === oindex){
                    state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[oindex].CORRECT = true;
                } else {
                    state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[index].CORRECT = false;
                }
            });

            return state;
            

        },
        update_question_sentence_completion_question_add_option: (state,action) => {
            const { qindex, option } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS = [... state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS, option];

            return state;
            

        },
        update_question_sentence_completion_question_update_option: (state,action) => {
            const { qindex, oindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS[oindex].HTML = html;
            return state;
        },
        update_question_sentence_completion_update_questions_content: (state,action) => {
            const { qindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].HTML = html;
            return state;
        },
        update_question_sentence_completion_remove_questions_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            const newOptions = [...state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS];
            newOptions.splice(oindex, 1);
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_READING.QUESTIONS[qindex].OPTIONS = [...newOptions];
            return state;
        },

        update_question_plan_map_diagram_labelling: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING: { ...state.IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING, ...action.payload }};
        },
        update_question_plan_map_diagram_labelling_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_matching: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_MATCHING_LISTENING: { ...state.IELTS_LMS_QUESTION_MATCHING_LISTENING, ...action.payload }};
        },
        update_question_matching_explanation: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_MATCHING_LISTENING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_plan_map_diagram_labelling_listening: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING: { ...state.IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING, ...action.payload }};
        },
        update_question_plan_map_diagram_labelling_explanation_listening: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_LISTENING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_summary_form_completion_listening: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING: { ...state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING, ...action.payload }};
        },
        update_question_summary_form_completion_explanation_listening: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_SUMMARY_FORM_COMPLETION_LISTENING.EXPLANATIONS[index].HTML = html;
            return state;
        },

        update_question_sentence_completion_listening: (state,action) => {
            return {...state, IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING: { ...state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING, ...action.payload }};
        },
        update_question_sentence_completion_explanation_listening: (state,action) => {
            const { index, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.EXPLANATIONS[index].HTML = html;
            return state;
        },
        update_question_sentence_completion_listening_question_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS.forEach((o,index) => {
                if(index === oindex){
                    state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS[oindex].CORRECT = true;
                } else {
                    state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS[index].CORRECT = false;
                }
            });

            return state;
            

        },
        update_question_sentence_completion_listening_question_add_option: (state,action) => {
            const { qindex, option } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS = [... state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS, option];
            return state;
        },
        update_question_sentence_completion_listening_question_update_option: (state,action) => {
            const { qindex, oindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS[oindex].HTML = html;
            return state;
        },
        update_question_sentence_completion_listening_update_questions_content: (state,action) => {
            const { qindex, html } = action.payload;
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].HTML = html;
            return state;
        },
        update_question_sentence_completion_listening_remove_questions_option: (state,action) => {
            const { qindex, oindex } = action.payload;
            const newOptions = [...state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS];
            newOptions.splice(oindex, 1);
            state.IELTS_LMS_QUESTION_SENTENCE_COMPLETION_LISTENING.QUESTIONS[qindex].OPTIONS = [...newOptions];
            return state;
        },
        

    },
});

// Action creators are generated for each case reducer function
export const { 
    update_ielts_lms, 
    update_question_type, 
    ielts_lms_update_question_by_index,

    update_question_matching_headings,
    update_question_matching_headings_explanation,

    update_question_matching_information,
    update_question_matching_information_explanation,

    update_question_true_false_notgiven,
    update_question_true_false_notgiven_explanation,

    update_question_yes_no_notgiven,
    update_question_yes_no_notgiven_explanation,

    update_question_summary_form_completion_explanation,
    update_question_summary_form_completion,
    update_question_summary_form_completion_question_option,
    update_question_summary_form_completion_question_add_option,
    update_question_summary_form_completion_question_update_option,
    update_question_summary_form_completion_update_questions_content,
    update_question_summary_form_completion_remove_questions_option,

    update_question_sentence_completion_explanation,
    update_question_sentence_completion,
    update_question_sentence_completion_question_option,
    update_question_sentence_completion_question_add_option,
    update_question_sentence_completion_question_update_option,
    update_question_sentence_completion_update_questions_content,
    update_question_sentence_completion_remove_questions_option,

    update_question_plan_map_diagram_labelling,
    update_question_plan_map_diagram_labelling_explanation,

    update_question_matching,
    update_question_matching_explanation,

    update_question_summary_form_completion_listening,
    update_question_summary_form_completion_explanation_listening,

    update_question_plan_map_diagram_labelling_listening,
    update_question_plan_map_diagram_labelling_explanation_listening,

    update_question_sentence_completion_listening,
    update_question_sentence_completion_explanation_listening,
    update_question_sentence_completion_listening_question_option,
    update_question_sentence_completion_listening_question_add_option,
    update_question_sentence_completion_listening_question_update_option,
    update_question_sentence_completion_listening_update_questions_content,
    update_question_sentence_completion_listening_remove_questions_option

} = ieltsLmsSlice.actions;

export default ieltsLmsSlice.reducer;