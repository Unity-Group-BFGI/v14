import Constants from '../../Constants';
const Razorpay = (config = {}, prefill = {}) => {
    const { RAZORPAY_CONFIG } = Constants;
    if(window.Razorpay) { 
        var options = {
            "key": import.meta.env.VITE_APP_RAZORPAY_CLIENT_KEY, // Enter the Key ID generated from the Dashboard
            "one_click_checkout": true,
            "name": "Acme Corp", //your business name
            "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
            "show_coupons": true, // default true; false if coupon widget should be hidden
            "callback_url": RAZORPAY_CONFIG.callback_url,
            "prefill": prefill,
            "notes": {
                "address": "Razorpay Corporate Office"
            }
        };
        return new window.Razorpa(options);
        
    }
    return false;
};

export default Razorpay;