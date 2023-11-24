const constants = {
    endpoint: import.meta.env.VITE_APP_ENDPOINT,
    SERVER_API_STATUS_ENDPOINT: import.meta.env.VITE_APP_ENDPOINT + "/ping",
    SERVER_VALIDATE_ACCOUNT: import.meta.env.VITE_APP_ENDPOINT + "/account/validate",
    SERVER_BOOTSTRAP_ACCOUNT: import.meta.env.VITE_APP_ENDPOINT + "/account/bootstrap",
    SINGUP_ENDPOINT: import.meta.env.VITE_APP_ENDPOINT + "/account/signup",
    SIGNUP_COMPLETE_ENDPOINT: import.meta.env.VITE_APP_ENDPOINT + "/account/signup/complete",
    VALIDATE_DOMAIN: import.meta.env.VITE_APP_ENDPOINT + "/my-domains/validate",
    SEND_OTP: import.meta.env.VITE_APP_ENDPOINT + "/my-domains/send-otp",
    VALIDATE_OTP: import.meta.env.VITE_APP_ENDPOINT + "/my-domains/validate-otp",
    GET_PLATFORMS: import.meta.env.VITE_APP_ENDPOINT + "/server/platforms",
    IELTS_ADD_QUIZ: import.meta.env.VITE_APP_ENDPOINT + "/ielts-lms/quiz/create",
    IELTS_EDIT_QUIZ_BASIC: import.meta.env.VITE_APP_ENDPOINT + "/ielts-lms/quiz/edit/basic"
};

export default constants; 