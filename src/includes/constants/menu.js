const IELTS_LMS_MENU_MY_ITEMS = [
    {
        key: 0,
        PRIMARY: 'IELTS-LMS',
        SECONDARY: 'IELTS-LMS-MY-QUIZZES',
        ICON: 'icon-ielts-lms-my-quizzes',
        DISPLAY: true,
        MENU_TITLE: 'My Quizzes',
        LINK: '/ielts-lms/my-quizzes'
    },
    {
        key: 1,
        PRIMARY: 'IELTS-LMS',
        SECONDARY: 'IELTS-LMS-MY-COURSES',
        ICON: 'icon-ielts-lms-my-courses',
        DISPLAY: true,
        MENU_TITLE: 'My Courses',
        LINK: '/ielts-lms/my-courses'
    }
];

// my-account/overview
const MY_ACCOUNT_MENU_ITEMS = [
    {
        key: 0,
        PRIMARY: 'MY-ACCOUNT',
        SECONDARY: 'MY-ACCOUNT-OVERVIEW',
        ICON: 'icon-my-account-overview',
        DISPLAY: true,
        MENU_TITLE: 'Overview',
        LINK: '/my-account/overview'
    },
];

// domains/my-domains
const DOMAINS_MENU_ITEMS = [
    {
        key: 0,
        PRIMARY: 'DOMAINS',
        SECONDARY: 'MY-DOMAINS-OVERVIEW',
        ICON: 'icon-my-domains-overview',
        DISPLAY: true,
        MENU_TITLE: 'My Domains',
        LINK: '/domains/my-domains'
    },
    {
        key: 1,
        PRIMARY: 'DOMAINS',
        SECONDARY: 'ADD-MY-DOMAIN',
        ICON: 'icon-my-domains-add-new',
        DISPLAY: true,
        MENU_TITLE: 'Add Domain',
        LINK: '/domains/domain/add'
    },
];

//market
const MARKET_MENU_ITEMS = [
    {
        key: 0,
        PRIMARY: 'MARKET',
        SECONDARY: 'MARKET-OVERVIEW',
        ICON: 'icon-market-overview',
        DISPLAY: true,
        MENU_TITLE: 'Product & Services',
        LINK: '/market/overview'
    }
];




const OWNER_PRIMARY_MENU = [
    {
        key: 0,
        PRIMARY: 'IELTS-LMS',
        ICON: 'icon-ielts-lms',
        DISPLAY: true,
        MENU_TITLE: 'IELTS LMS'
    },
    {
        key: 1,
        PRIMARY: 'MY-ACCOUNT',
        ICON: 'icon-my-account',
        DISPLAY: true,
        MENU_TITLE: 'Account'
    },
    {
        key: 2,
        PRIMARY: 'MARKET',
        ICON: 'icon-market',
        DISPLAY: true,
        MENU_TITLE: 'MARKET'
    }
];

const CUSTOMER_PRIMARY_MENU = [
    {
        key: 0,
        PRIMARY: 'MY-ACCOUNT',
        ICON: 'icon-my-account',
        DISPLAY: true,
        MENU_TITLE: 'Account'
    },
    {
        key: 1,
        PRIMARY: 'DOMAINS',
        ICON: 'icon-my-domains',
        DISPLAY: true,
        MENU_TITLE: 'DOMAINS'
    },
    {
        key: 2,
        PRIMARY: 'MARKET',
        ICON: 'icon-market',
        DISPLAY: true,
        MENU_TITLE: 'MARKET'
    }
];

export { 
    OWNER_PRIMARY_MENU,
    CUSTOMER_PRIMARY_MENU,
    IELTS_LMS_MENU_MY_ITEMS,
    MY_ACCOUNT_MENU_ITEMS,
    DOMAINS_MENU_ITEMS,
    MARKET_MENU_ITEMS 
};