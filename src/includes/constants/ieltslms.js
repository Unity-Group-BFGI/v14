// constants category for my_quizzes
const IELTS_LMS_MY_QUIZZES_CATEGORIES = [
    {
        key: 0,
        LABEL: " --All Modules-- ",
        VALUE: 'all'
    },
    {
        key: 1,
        LABEL: "Reading",
        VALUE: 'reading'
    },
    {
        key: 2,
        LABEL: "Listening",
        VALUE: 'listening'
    },
    {
        key: 3,
        LABEL: "Writing",
        VALUE: 'writing'
    },
    {
        key: 4,
        LABEL: "Speaking",
        VALUE: 'speaking'
    }
];

// constants status for my quizzes
const IELTS_LMS_MY_QUIZZES_STATUS = [
    {
        key: 0,
        LABEL: "Published",
        VALUE: 'published'
    },
    {
        key: 1,
        LABEL: "Drafted",
        VALUE: 'drafted'
    },
    {
        key: 2,
        LABEL: "Trashed",
        VALUE: 'trashed'
    }
];

// constants status for my courses
const IELTS_LMS_MY_COURSES_STATUS = [
    {
        key: 0,
        LABEL: "Published",
        VALUE: 'published'
    },
    {
        key: 1,
        LABEL: "Drafted",
        VALUE: 'drafted'
    },
    {
        key: 2,
        LABEL: "Trashed",
        VALUE: 'trashed'
    }
];


const IELTS_LMS_SECTIONS_STATUS = [
    {
        key: 0,
        LABEL: "Published",
        VALUE: 'published'
    },
    {
        key: 1,
        LABEL: "Drafted",
        VALUE: 'drafted'
    },
    {
        key: 2,
        LABEL: "Trashed",
        VALUE: 'trashed'
    }
];

const IELTS_LMS_QUESTIONS_STATUS = [
    {
        key: 0,
        LABEL: "Published",
        VALUE: 'published'
    },
    {
        key: 1,
        LABEL: "Drafted",
        VALUE: 'drafted'
    },
    {
        key: 2,
        LABEL: "Trashed",
        VALUE: 'trashed'
    }
];

const IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS = [
    {
        key: 0,
        action: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT'
        },
        meta: {
            heading             : 'Basic Edit',
            subHeading          : 'Edit Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'IELTS-LMS-EDIT-QUIZ-READING-PASSAGES',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-READING-PASSAGES'
        },
        meta: {
            heading             : 'Passages',
            subHeading          : 'Reading passages',
            icon                : 'svg-1',
            activeClass: "bg-light-warning txt-warning border-warning",
            iconColorClass: "svg-icon-warning",
            iconBgColorClass: "bg-light-warning"
        }
    },
    {
        key: 2,
        action: 'IELTS-LMS-EDIT-QUIZ-READING-QUESTIONS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-READING-QUESTIONS'
        },
        meta: {
            heading             : 'Questions',
            subHeading          : 'Reading questions',
            icon                : 'svg-2',
            activeClass: "bg-light-success txt-success border-success",
            iconColorClass: "svg-icon-success",
            iconBgColorClass: "bg-light-success"
        }
    },
    /*
    {
        key: 3,
        action: 'IELTS-LMS-EDIT-QUIZ-READING-SETTINGS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-READING-SETTINGS'
        },
        meta: {
            heading             : 'Settings',
            subHeading          : 'Reading settings',
            icon: "svg-3",
            iconColorClass: "svg-icon-info",
            iconBgColorClass: "bg-light-info",
            activeClass: "bg-light-info txt-info border-info"
        }
    }*/
];

const IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS = [
    {
        key: 0,
        action: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT'
        },
        meta: {
            heading             : 'Basic Edit',
            subHeading          : 'Edit Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'IELTS-LMS-EDIT-QUIZ-LISTENING-PASSAGES',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-LISTENING-PASSAGES'
        },
        meta: {
            heading             : 'Passages',
            subHeading          : 'Listening passages',
            icon                : 'svg-1',
            activeClass: "bg-light-warning txt-warning border-warning",
            iconColorClass: "svg-icon-warning",
            iconBgColorClass: "bg-light-warning"
        }
    },
    {
        key: 2,
        action: 'IELTS-LMS-EDIT-QUIZ-LISTENING-QUESTIONS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-LISTENING-QUESTIONS'
        },
        meta: {
            heading             : 'Questions',
            subHeading          : 'Listening questions',
            icon                : 'svg-2',
            activeClass: "bg-light-success txt-success border-success",
            iconColorClass: "svg-icon-success",
            iconBgColorClass: "bg-light-success"
        }
    },
    /*
    {
        key: 3,
        action: 'IELTS-LMS-EDIT-QUIZ-LISTENING-SETTINGS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-LISTENING-SETTINGS'
        },
        meta: {
            heading             : 'Settings',
            subHeading          : 'Listening settings',
            icon: "svg-3",
            iconColorClass: "svg-icon-info",
            iconBgColorClass: "bg-light-info",
            activeClass: "bg-light-info txt-info border-info"
        }
    }*/
];

const IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS = [
    {
        key: 0,
        action: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT'
        },
        meta: {
            heading             : 'Basic Edit',
            subHeading          : 'Edit Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'IELTS-LMS-EDIT-QUIZ-WRITING-ESSAYS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-WRITING-ESSAYS'
        },
        meta: {
            heading             : 'Essays',
            subHeading          : 'Writing essays',
            icon                : 'svg-1',
            activeClass: "bg-light-warning txt-warning border-warning",
            iconColorClass: "svg-icon-warning",
            iconBgColorClass: "bg-light-warning"
        }
    },
    /*
    {
        key: 2,
        action: 'IELTS-LMS-EDIT-QUIZ-WRITING-SETTINGS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-WRITING-SETTINGS'
        },
        meta: {
            heading             : 'Settings',
            subHeading          : 'Writing settings',
            icon: "svg-3",
            iconColorClass: "svg-icon-info",
            iconBgColorClass: "bg-light-info",
            activeClass: "bg-light-info txt-info border-info"
        }
    }*/
];

const IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS = [
    {
        key: 0,
        action: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-BASIC-EDIT'
        },
        meta: {
            heading             : 'Basic Edit',
            subHeading          : 'Edit Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-SECTIONS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-SECTIONS'
        },
        meta: {
            heading             : 'Sections',
            subHeading          : 'Speaking Sections',
            icon                : 'svg-1',
            activeClass: "bg-light-warning txt-warning border-warning",
            iconColorClass: "svg-icon-warning",
            iconBgColorClass: "bg-light-warning"
        }
    },
    {
        key: 2,
        action: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-QUESTIONS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-QUESTIONS'
        },
        meta: {
            heading             : 'Questions',
            subHeading          : 'Speaking questions',
            icon                : 'svg-2',
            activeClass: "bg-light-success txt-success border-success",
            iconColorClass: "svg-icon-success",
            iconBgColorClass: "bg-light-success"
        }
    },
    /*{
        key: 3,
        action: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-SETTINGS',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-QUIZ',
            param3: 'IELTS-LMS-EDIT-QUIZ-SPEAKING-SETTINGS'
        },
        meta: {
            heading             : 'Settings',
            subHeading          : 'Speaking settings',
            icon: "svg-3",
            iconColorClass: "svg-icon-info",
            iconBgColorClass: "bg-light-info",
            activeClass: "bg-light-info txt-info border-info"
        }
    }*/
];

const READING_QUESTION_CATEGORIES = [
    {
        "label": "Matching Headings",
        "value": "matching-headings",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Matching Information",
        "value": "matching-information",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Multiple Choice",
        "value": "multiple-choice",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Plan, Map, Diagram Labelling",
        "value": "plan-map-diagram-labelling",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Sentence Completion",
        "value": "sentence-completion",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Summary, Form completion",
        "value": "summary-form-completion",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "True False & Not Given",
        "value": "true-false-notgiven",
        "status": "published",
        "_postType": "reading-question-category"
    },
    {
        "label": "Yes No & Not Given",
        "value": "yes-no-notgiven",
        "status": "published",
        "_postType": "reading-question-category"
    }
    
];

const LISTENING_QUESTION_CATEGORIES = [
    {
        "label": "Matching",
        "value": "matching",
        "status": "published",
        "_postType": "listening-question-category"
    },
    {
        "label": "Multiple Choice",
        "value": "multiple-choice",
        "status": "published",
        "_postType": "listening-question-category"
    },
    {
        "label": "Plan, Map, Diagram Labelling",
        "value": "plan-map-diagram-labelling",
        "status": "published",
        "_postType": "listening-question-category"
    },
    {
        "label": "Sentence Completion",
        "value": "sentence-completion",
        "status": "published",
        "_postType": "listening-question-category"
    },
    {
        "label": "Summary, Form completion",
        "value": "summary-form-completion",
        "status": "published",
        "_postType": "listening-question-category"
    }
];

const IELTS_LMS_EDIT_MY_COURSE_DYNAMIC_OPTIONS = [
    {
        key: 0,
        action: 'IELTS-LMS-EDIT-MY-COURSE-BASIC-EDIT',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-MY-COURSE',
            param3: 'IELTS-LMS-EDIT-MY-COURSE-BASIC-EDIT'
        },
        meta: {
            heading             : 'Basic Edit',
            subHeading          : 'Edit Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'IELTS-LMS-EDIT-MY-COURSE-BUILDER',
        params: {
            param1: 'IELTS-LMS',
            param2: 'IELTS-LMS-EDIT-MY-COURSE',
            param3: 'IELTS-LMS-EDIT-MY-COURSE-BUILDER'
        },
        meta: {
            heading             : 'Builder',
            subHeading          : 'Course Builder',
            icon                : 'svg-3',
            iconColorClass      : "svg-icon-success",
            iconBgColorClass    : "bg-light-success",
            activeClass         : "bg-light-success txt-success border-success",
        }
    }
];

export { 
    IELTS_LMS_MY_QUIZZES_CATEGORIES, 
    IELTS_LMS_MY_QUIZZES_STATUS,
    IELTS_LMS_MY_COURSES_STATUS,
    IELTS_LMS_QUIZ_READING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_LISTENING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_WRITING_DYNAMIC_OPTIONS,
    IELTS_LMS_QUIZ_SPEAKING_DYNAMIC_OPTIONS,
    IELTS_LMS_SECTIONS_STATUS,
    IELTS_LMS_QUESTIONS_STATUS,
    READING_QUESTION_CATEGORIES,
    LISTENING_QUESTION_CATEGORIES,
    IELTS_LMS_EDIT_MY_COURSE_DYNAMIC_OPTIONS
};