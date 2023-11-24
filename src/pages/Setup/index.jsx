import './verify.css';
import $ from 'jquery';
import constants from '../../includes/constants';
import { update_inputs, update_verify } from "../../includes/redux-store/Slices/Verify.slice";
import { update_auth } from "../../includes/redux-store/Slices/Auth.slice";
import GradientContainer  from '../../components/styled/GradientContainer';
import { CenterLoading } from '../../components/default/Loadings';
import { signupApi } from "../../includes/rest-apis";
import ApiNavbarSetup from "../../components/default/ApiNavbarSetup";


import { Helmet } from "react-helmet";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FloatingLabel } from "react-bootstrap";



// Basic user info boxes   
const BasicInfoBox = () => {
    const dispatch      = useDispatch();
    const [stepLoading,setStepLoading] = useState(true);
    const { verify_current, inputs } = useSelector( state => state.verify );
    const { USER }  = useSelector( state => state.auth );
    const handleChange = (event) => {
        const {name,value} = event.target;
        let inputValue = value;
        // filters
        if( name === "mobile") {
            inputValue = inputValue.substring(0, 10);
        }

        dispatch(update_verify({
            inputs: {
                ...inputs,
                [name]: {
                    ...inputs[name],
                    value: inputValue
                }
            }
        }));
        

    };

    useEffect(() => {
        setStepLoading(false);
    },[verify_current]);

    return (<>  {stepLoading? <>Step loading</> :
        <div className="steps__details-form d-block w-100 pt-10">

            <div className="d-flex justify-content-between d-flex-column-sm-400">
                <FloatingLabel
                    controlId="floatingInput"
                    label="First name*"
                    className="mb-3 mr-2"
                    
                >
                    <Form.Control 
                        type="text" 
                        placeholder="First name*" 
                        name="firstName"
                        required
                        value={inputs.firstName.value || ''} 
                        onChange={handleChange}
                        className={(inputs.firstName.isInvalid !== null)? ((inputs.firstName.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.firstName.error}
                    </Form.Control.Feedback>
                </FloatingLabel> 

                <FloatingLabel
                    controlId="floatingInput"
                    label="Last name (optional)"
                    className="mb-3 ml-2"
                >
                    <Form.Control 
                        type="text" 
                        name="lastName" 
                        value={inputs.lastName.value || ''} 
                        onChange={handleChange} 
                        placeholder="Last name" 
                        className={(inputs.lastName.isInvalid !== null)? ((inputs.lastName.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.lastName.error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>

            <div className="d-flex flex-column">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                    className="mb-3 mr-2"
                >
                    <Form.Control 
                        type="email" 
                        placeholder="Email address*"
                        value={USER.email || ''}
                        disabled={true}
                        onChange={() => {}}
                        className={(inputs.email.isInvalid !== null)? ((inputs.email.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.email.error}
                    </Form.Control.Feedback>
                </FloatingLabel> 
            </div>

            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between mb-7"> 

                    <FloatingLabel 
                        controlId="floatingSelect" 
                        label="Code" 
                        style={{width: '100%', marginRight: '5px', minWidth: '120px', maxWidth: '120px'}}
                    >
                        <Form.Select 
                            name="cc" 
                            aria-label="Country code" 
                            onChange={handleChange}
                            required
                            value={inputs.cc.value || ''}
                            className={(inputs.cc.isInvalid !== null)? ((inputs.cc.isInvalid)? 'is-invalid': 'is-valid') : ''}
                        >
                            <option></option>
                            <option value="+91">+91</option>
                            <option value="+82">+82</option>
                            <option value="+1">+1</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {inputs.cc.error}
                        </Form.Control.Feedback>
                    </FloatingLabel>
        
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Mobile no."
                        style={{width: '100%'}}
                    >
                        <Form.Control 
                            className={(inputs.mobile.isInvalid !== null)? ((inputs.mobile.isInvalid)? 'is-invalid': 'is-valid') : ''}
                            type="number" 
                            name="mobile"
                            placeholder="Mobile no*"
                            value={inputs.mobile.value || ''}
                            required
                            onChange={handleChange}
                            minLength={10}
                            maxLength={10}
                        />
                        <Form.Control.Feedback type="invalid">
                            {inputs.mobile.error}
                        </Form.Control.Feedback>
                    </FloatingLabel> 
                </div>
            </div>
        </div> }
    </>);
};

// Address info box    
const AddressInfoBox = () => {
    const dispatch      = useDispatch();
    const { inputs } = useSelector( state => state.verify );
    const handleChange = (event) => {
        const {name,value} = event.target;
        let inputValue = value;
        // filters
        

        dispatch(update_verify({
            inputs: {
                ...inputs,
                [name]: {
                    ...inputs[name],
                    value: inputValue
                }
            }
        }));
        

    };

    return (<>
        <div className="steps__details-form d-block w-100 pt-10">
            <div className="d-flex justify-content-between d-flex-column-sm-400">
                <FloatingLabel controlId="floatingSelect" label="Country" className="w-100 mr-2 mb-3">
                    <Form.Select 
                        aria-label="Country" 
                        required 
                        name="country"
                        value={inputs.country.value || ''}
                        className={(inputs.country.isInvalid !== null)? ((inputs.country.isInvalid)? 'is-invalid': 'is-valid') : ''}
                        onChange={handleChange}
                    >
                        <option></option>
                        <option value="IN">IN: India</option>
                        <option value="PAK">PAK: Pakistan</option>
                        <option value="AUG">AUG: Argentina</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {inputs.country.error}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="State" className="w-100 ml-2 mb-3">
                    <Form.Select 
                        aria-label="State" 
                        required
                        name="state"
                        value={inputs.state.value || ''}
                        className={(inputs.state.isInvalid !== null)? ((inputs.state.isInvalid)? 'is-invalid': 'is-valid') : ''}
                        onChange={handleChange}
                    >
                        <option></option>
                        <option value="IN">IN: India</option>
                        <option value="PAK">PAK: Pakistan</option>
                        <option value="AUG">AUG: Argentina</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {inputs.state.error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>

            <div className="d-flex justify-content-between d-flex-column-sm-400">
                <FloatingLabel
                    controlId="floatingInput"
                    label="City*"
                    className="mb-3 mr-2 w-100" 
                >
                    <Form.Control 
                        type="text" 
                        placeholder="City*" 
                        name="city"
                        required
                        onChange={handleChange}
                        value={inputs.city.value || ''}
                        className={(inputs.city.isInvalid !== null)? ((inputs.city.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.city.error}
                    </Form.Control.Feedback>

                </FloatingLabel> 

                <FloatingLabel
                    controlId="floatingInput"
                    label="Zipcode*"
                    className="mb-3 ml-2 w-100"
                >
                    <Form.Control 
                        type="text" 
                        name="zipcode" 
                        onChange={handleChange} 
                        placeholder="Zipcode" 
                        required
                        value={inputs.zipcode.value || ''}
                        className={(inputs.zipcode.isInvalid !== null)? ((inputs.zipcode.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.zipcode.error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>

            <div className="d-flex flex-column mb-3">
                <FloatingLabel label="Address line 1">
                    <Form.Control
                        as="textarea"
                        name="address"
                        className="w-100"
                        placeholder="Address line 1"
                        style={{ height: '100px' }}
                        value={inputs.address.value || ''}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        {inputs.address.error}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
        </div>
        
    </>);
};

// Billing info box
const BillingInfoBox = () => {
    const dispatch      = useDispatch();
    
    const { verify_steps, verify_current, inputs } = useSelector( state => state.verify );
    const handleChange = (event) => {
        const {name,value} = event.target;
        let inputValue = value;
        // filters

    };

    const handleSaveCard = (event) => {
        const updatedSteps = [...verify_steps]; // Create a shallow copy of the array
        updatedSteps[verify_current] = {
            ...updatedSteps[verify_current], // Create a shallow copy of the current step object
            description: {
                ...updatedSteps[verify_current].description, // Create a shallow copy of the description object
                saveCard: event.target.checked
            }  
        };
        // Dispatch the action to update the state
        dispatch(update_verify({ verify_steps: updatedSteps }));
        
            
        
    };

    return (<>
        <div className="steps__details-form d-block w-100 pt-10">
            <div className="d-flex flex-column w-100">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Card holder*"
                    className="mb-3 mr-2"
                >
                    <Form.Control 
                        name="cardHolder"
                        type="text" 
                        required={verify_steps[verify_current].saveCard}
                        placeholder="Card holder*"
                        value={inputs.cardHolder.value || ''}
                        onChange={handleChange}
                        className={(inputs.cardHolder.isInvalid !== null)? ((inputs.cardHolder.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    />
                </FloatingLabel> 
            </div>

            <div className="d-flex flex-column w-100">
                <div className="position-relative">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Card Number*"
                        className="mb-3 mr-2"
                    >
                        <Form.Control 
                            name="cardNumber"
                            type="number" 
                            required={verify_steps[verify_current].saveCard}
                            placeholder="Card Number*"
                            value={inputs.cardNumber.value || ''}
                            onChange={handleChange}
                            className={(inputs.cardNumber.isInvalid !== null)? ((inputs.cardNumber.isInvalid)? 'is-invalid': 'is-valid') : ''}
                        />
                    </FloatingLabel> 
                    <div className="position-absolute translate-middle-y top-50 end-0 me-15">
                        <img src="/svgs/card-logos/visa.svg" alt="" className="h-25px" />
                        <img src="/svgs/card-logos/mastercard.svg" alt="" className="h-25px" />
                        <img src="/svgs/card-logos/american-express.svg" alt="" className="h-25px" />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between d-flex-column-sm-400">
                <FloatingLabel controlId="floatingSelect" label="Month" className="w-100 mr-2 mb-3">
                    <Form.Select 
                        aria-label="Month" 
                        required={verify_steps[verify_current].saveCard}
                        name="cardMonth"
                        value={inputs.cardMonth.value || ''}
                        onChange={handleChange}
                        className={(inputs.cardMonth.isInvalid !== null)? ((inputs.cardMonth.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    >
                        <option></option>
                        <option value="january">January</option>
                        <option value="febuary">Febuary</option>
                        <option value="march">March</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Year" className="w-100 mr-2 mb-3">
                    <Form.Select 
                        aria-label="Year" 
                        required={verify_steps[verify_current].saveCard}
                        name="cardYear"
                        value={inputs.cardYear.value || ''}
                        onChange={handleChange}
                        className={(inputs.cardYear.isInvalid !== null)? ((inputs.cardYear.isInvalid)? 'is-invalid': 'is-valid') : ''}
                    >
                        <option></option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </Form.Select>
                </FloatingLabel>

                <div className="w-100 mr-2 mb-3 position-relative">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="CVV*"
                        className="mb-3 mr-2"
                    >
                        <Form.Control 
                            name="cardCvv"
                            type="number" 
                            placeholder="CVV*"
                            minLength={4}
                            maxLength={4}
                            value={inputs.cardCvv.value || ''}
                            onChange={handleChange}
                            className={(inputs.cardCvv.isInvalid !== null)? ((inputs.cardCvv.isInvalid)? 'is-invalid': 'is-valid') : ''}
                            required={verify_steps[verify_current].saveCard}
                        />
                    </FloatingLabel> 
                    <div className="position-absolute translate-middle-y top-50 end-0 me-15">
                        <i className="fa fa-credit-card-alt" aria-hidden="true" style={{fontSize: '24px'}}></i>           
                    </div>
                </div>
            </div>

            <div className="d-flex flex-stack">
                
                <div className="me-5">
                    <label className="fs-6 fw-semibold form-label">Save Card for further billing?</label>
                    <div className="fs-7 fw-semibold text-muted">If you want to skip, don't enable save card</div>
                </div>
                

                
                <label className="form-check form-switch form-check-custom form-check-solid">
                    <input 
                        className="form-check-input" 
                        type="checkbox"
                        name="saveCard" 
                        
                        value={"checked"}
                        onChange={handleSaveCard} 
                        checked={verify_steps[verify_current].saveCard} 
                    />
                    <span className="form-check-label fw-semibold text-muted">
                        Save Card
                    </span>
                </label>
                
            </div>



        </div>

        
    </>);
};

// finializing info box
const FinializingInfoBox = ({step}) => {
    return (<>
        <div className="steps__details-form d-block w-100 pt-10">
            <div className="w-100" style={{minWidth: '300px'}}>
                <div className="text-center px-4">
                    <img src="/img/illustrations/sigma-1/9.png" alt="" className="mww-100 mh-350px w-60" />          
                </div>
            </div>
        </div>
    </>);
};





// inner stepBox component
const VerifyBootstrap = () => {
    const { SINGUP_ENDPOINT, SIGNUP_COMPLETE_ENDPOINT }  = constants;
    const dispatch  = useDispatch();
    const { verify_steps, verify_current, inputs } = useSelector( state => state.verify );
    const { USER }  = useSelector( state => state.auth );

    const bootstrapDashboard = () => {
        dispatch(update_auth({
            IS_USER_VERIFIED: true,
            VERIFY_LOADING: false,
            VERIFY_LOADED: true,
            VERIFY_FAILED:false
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        let ajax = false;
        if( verify_steps[verify_current].formId === 'step-0' ) {

        } else if( verify_steps[verify_current].formId === 'step-1' ) {
            if( verify_steps[verify_current].formAction === "usermeta"){
                // reset the error logic
                const inputsUpdates = {};
                for( const input in inputs ) {
                    inputsUpdates[input] = {
                        isInvalid: null,
                        error: '',
                    };
                }

                dispatch(update_inputs({
                    inputs: {
                        ...inputs,
                        firstName: {
                            isInvalid: null,
                            error: ''
                        },
                        lastName: {
                            isInvalid: null,
                            error: ''
                        },
                        email: {
                            isInvalid: null,
                            error: ''
                        },
                        cc: {
                            isInvalid: null,
                            error: ''
                        },
                        mobile: {
                            isInvalid: null,
                            error: ''
                        }
                    }
                }));

                formData.append('type', verify_steps[verify_current].formAction);
                formData.append('usermeta', JSON.stringify({
                    fields: {
                        firstName: inputs.firstName.value,
                        lastName: inputs.lastName.value,
                        email: USER.email,
                        cc: inputs.cc.value,
                        mobile: inputs.mobile.value 
                    }
                }));
                ajax = true;
            }
        } else if( verify_steps[verify_current].formId === 'step-2' ) {
            if( verify_steps[verify_current].formAction === "address"){
                // reset the error logic
                const inputsUpdates = {};
                for( const input in inputs ) {
                    inputsUpdates[input] = {
                        isInvalid: null,
                        error: '',
                    };
                }

                dispatch(update_inputs({
                    inputs: {
                        ...inputs,
                        country: {
                            isInvalid: null,
                            error: ''
                        },
                        state: {
                            isInvalid: null,
                            error: ''
                        },
                        city: {
                            isInvalid: null,
                            error: ''
                        },
                        zipcode: {
                            isInvalid: null,
                            error: ''
                        },
                        address: {
                            isInvalid: null,
                            error: ''
                        }
                    }
                }));

                formData.append('type', verify_steps[verify_current].formAction);
                formData.append('address', JSON.stringify({
                    fields: {
                        country: inputs.country.value,
                        state: inputs.state.value,
                        city: inputs.city.value,
                        zipcode: inputs.zipcode.value,
                        address: inputs.address.value 
                    }
                }));
                ajax = true;
            }

        } else if( verify_steps[verify_current].formId === 'step-3' ) {   
        } else if( verify_steps[verify_current].formId === 'step-4' ) {
            if( verify_steps[verify_current].formAction === "finish"){
                // reset the error logic
                formData.append('type', verify_steps[verify_current].formAction);
                formData.append('finish', JSON.stringify({
                    fields: {
                        verified: true
                    }
                }));
                ajax = true;
            }
        }

        if(ajax){
            // make the verification logic
            window.jsx_ajax_request = $.ajax({
                url: SINGUP_ENDPOINT,
                headers:{
                    Authorization: 'Bearer '+USER.accessToken,
                    'x-refresh-token': USER.refreshToken
                },
                method: 'POST',
                cache: false,
                processData: false, // Don't process the data
                contentType: false,
                data: formData,
                beforeSend: function(){
                    if(window.jsx_ajax_request != null) {
                        console.info('handling submit form', JSON.stringify(formData));
                    }
                },
                success: function(res){
                    
                    if(res.success && res.has_json){
                        const validFields = res.json.validFields;
                        // reset the error logic
                        // Process validFields to set isInvalid to false and error to empty string
                        if (validFields && typeof validFields === 'object') {
                            const validFieldUpdates = {};
                    
                            for (const field in validFields) {
                                if (validFields.hasOwnProperty(field)) {
                                    validFieldUpdates[field] = {
                                        isInvalid: false,
                                        error: '',
                                    };
                                }
                            }
                    
                            dispatch(update_inputs({
                                inputs: validFieldUpdates,
                            }));
                        }

                        if(verify_steps[verify_current].formId === 'step-4'){
                            bootstrapDashboard();
                        } else {
                            dispatch(update_verify({
                                verify_current: verify_current + 1
                            }));
                        }
                    } else {
                        alert(res.res);
                    }
                    
                },   
                error: function(err){
                    console.log('[error]: ',err);
                    if( err.status != 0){
                        const ErrorJson = err.responseJSON;
                        if( ErrorJson.error ) {
                            if(ErrorJson.error_for == "form-valdiation"){
                                const errors = ErrorJson.errors;
                                const validFields = ErrorJson.validFields;
                                
                                if (errors && typeof errors === 'object') {
                                    const errorUpdates = {};
                                    for (const field in errors) {
                                        if (errors.hasOwnProperty(field)) {
                                            errorUpdates[field] = {
                                                isInvalid: true,
                                                error: errors[field],
                                            };
                                        }
                                    }                         

                                    dispatch(update_inputs({
                                        inputs: errorUpdates,
                                    }));
                                }

                                // Process validFields to set isInvalid to false and error to empty string
                                if (validFields && typeof validFields === 'object') {
                                    const validFieldUpdates = {};
                            
                                    for (const field in validFields) {
                                        if (validFields.hasOwnProperty(field)) {
                                            validFieldUpdates[field] = {
                                                isInvalid: false,
                                                error: '',
                                            };
                                        }
                                    }
                            
                                    dispatch(update_inputs({
                                        inputs: validFieldUpdates,
                                    }));
                                }

                            } else {
                                alert(ErrorJson.error_message);
                            }

                        }
                    } else {
                        /*
                        success: false, 
                        has_json: false,
                        json: {},

                        error: true,
                        error_type: 'error',
                        error_message: "Couldn't connect to the API, Connection refused",        
                        error_code: 'net::ERR_CONNECTION_REFUSED',
                        show_error_modal: true
                        */
                        alert("Couldn't connect to the API, Connection refused");
                    }
                }
            });
        }

    };

    const handleComplete = (event) => {
        if( verify_steps[verify_current].controls.complete.action === 'step-0-complete' ) {
            const updatedSteps = [...verify_steps]; // Create a shallow copy of the array
            updatedSteps[verify_current] = {
                ...updatedSteps[verify_current], // Create a shallow copy of the current step object
                controls: {
                    ...updatedSteps[verify_current].controls, // Create a shallow copy of the controls object
                    complete: {
                        ...updatedSteps[verify_current].controls.complete, // Create a shallow copy of the complete object
                        loading: true, // Update the loading property
                    },
                },
                
            };
            // Dispatch the action to update the state
            dispatch(update_verify({ verify_steps: updatedSteps }));
            setTimeout(() => {
                const updatedStepsAgain = [...verify_steps]; // Create a shallow copy of the array
                updatedStepsAgain[verify_current] = {
                    ...updatedStepsAgain[verify_current], // Create a shallow copy of the current step object
                    controls: {
                        ...updatedStepsAgain[verify_current].controls, // Create a shallow copy of the controls object
                        complete: {
                            ...updatedStepsAgain[verify_current].controls.complete, // Create a shallow copy of the complete object
                            loading: false, // Update the loading property
                        },
                    },
                };
                dispatch(update_verify({ verify_steps: updatedStepsAgain, verify_current: verify_current + 1 }));

            },1000);
        } else if( verify_steps[verify_current].controls.complete.action === 'step-1-complete' ) {

        } else {

        }
    };

    const handlePrevious = (event) => {
        if( verify_steps[verify_current].controls.previous.action === 'step-0-prev' ) { 

        } else {
            dispatch(update_verify({
                verify_current: verify_current - 1
            }));
        }
    };

    const handleNext = (event) => {  
        if( verify_steps[verify_current].controls.next.action === 'step-0-next' ) { 
            
        } else if( verify_steps[verify_current].controls.next.action === 'step-1-next' ) { 
            
        } else if( verify_steps[verify_current].controls.next.action === 'step-2-next' ) { 
            
        } else if( verify_steps[verify_current].controls.next.action === 'step-3-next' ) { 
            
        } else if( verify_steps[verify_current].controls.next.action === 'step-4-next' ) { 
            

        } else {

        }
    };

    useEffect(() => {
        dispatch(update_verify({
            verify_loading: false
        }));

    },[]);


    return (<div className="card sm-card-bottom">
        <div className="card-body">
            <div className="stepper stepper-links d-flex flex-column">                                                  
                <div className="w-100">
                    { verify_steps && (verify_steps.length > 0) && verify_steps.map((step,index) => {
                        return (<div key={index} className={index === verify_current? 'd-block steps' : 'd-none steps'}>
                            {step.isSubmitable? 
                                <form id={step.formId} onSubmit={(event) => handleSubmit(event,step.formId)}>
                                                <div className="steps__details d-flex flex-column align-items-center">
                                                    <h3 className="fw-bold d-flex align-items-center text-dark mb-0">
                                                        {step.title}
                                                    </h3>
                                                    <div className="text-muted fw-semibold fs-6 mt-5">
                                                        {step.subTitle}
                                                    </div>
                                                </div> 
                    
                                                {step.content === "basic-details" && <BasicInfoBox step={step} />}
                                                {step.content === "address-details" && <AddressInfoBox step={step} />}
                                                {step.content === "billing-details" && <BillingInfoBox step={step} />}
                                                {step.content === "finalizing-box" && <FinializingInfoBox step={step} />}
                                    
                                                <div className="steps__controls d-flex flex-stack pt-6 justify-between">
                                
                                                    {(step.controls.previous.enable)? 
                                                        <button 
                                                            type={step.controls.previous.type} 
                                                            className={step.controls.previous.classes} 
                                                            onClick={handlePrevious}
                                                        >
                                                            {step.controls.previous.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.previous.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                
                                                    {(step.controls.complete.enable)? 
                                                        <button 
                                                            type={step.controls.complete.type} 
                                                            className={step.controls.complete.classes} 
                                                            onClick={handleComplete}
                                                        >
                                                            {step.controls.complete.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.complete.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                
                                                    {(step.controls.next.enable)? 
                                                        <button 
                                                            type={step.controls.next.type} 
                                                            className={step.controls.next.classes} 
                                                            onClick={handleNext}
                                                        >
                                                            {step.controls.next.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.next.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                                    
                                                </div> 
                                
                                </form> 
                                :
                                <div>
                                                <div className="steps__details d-flex flex-column align-items-center">
                                                    <h3 className="fw-bold d-flex align-items-center text-dark mb-0">
                                                        {step.title}
                                                    </h3>
                                                    <div className="text-muted fw-semibold fs-6 mt-5">
                                                        {step.subTitle}
                                                    </div>
                                                </div> 
                                
                                                {step.content === "basic-details" && <BasicInfoBox step={step} />}
                                            
                                                <div className="steps__controls d-flex flex-stack pt-6 justify-between">
                                
                                                    {(step.controls.previous.enable)? 
                                                        <button 
                                                            type={step.controls.previous.type} 
                                                            className={step.controls.previous.classes} 
                                                            onClick={handlePrevious}
                                                        >
                                                            {step.controls.previous.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.previous.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                
                                                    {(step.controls.complete.enable)? 
                                                        <button 
                                                            type={step.controls.complete.type} 
                                                            className={step.controls.complete.classes} 
                                                            onClick={handleComplete}
                                                        >
                                                            {step.controls.complete.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.complete.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                
                                                    {(step.controls.next.enable)? 
                                                        <button 
                                                            type={step.controls.next.type} 
                                                            className={step.controls.next.classes} 
                                                            onClick={handleNext}
                                                        >
                                                            {step.controls.next.loading?
                                                            <div className="btn-loading d-flex align-items-center">
                                                                <div className="spinner-border" role="status"></div>
                                                            </div> :
                                                            <div className="btn-text">
                                                                {parse(step.controls.next.text)}
                                                            </div>}
                                                            
                                                        </button> 
                                                        : 
                                                        <div></div>
                                                    }
                                                    
                                                </div> 
                            
                                </div>
                            }
                        </div>)
                    })}
                </div> 
            </div>
        </div>
    </div>);
};


const Setup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { IS_USER_LOGGED_IN, IS_USER_VERIFIED, AUTH_APP_LOADED, USER, VERIFY_LOADED }  = useSelector( state => state.auth );
    const { API_LOADED }                       = useSelector( state => state.api ); 
    const { verify_steps, verify_loading, inputs }                      = useSelector( state => state.verify );
    const [app,setApp]  = useState(<CenterLoading text="Loading..." />);

    const loadSignupForm = () => {
        signupApi({
            'Authorization': 'Bearer '+USER.accessToken,
            'x-refresh-token': USER.refreshToken 
        }, {}).then((response) => {
            const { success, json, has_json, error, error_message } = response;
            if( success && has_json ) {
                const { permissions } = json; 
            
                // get data from localstorage
                if( permissions.localStorage ) {
                    const item = localStorage.getItem('verify_user_formData');
                    if( item ) {
                        const inputsJSON = JSON.parse(item);
                        
                        dispatch(update_verify({
                            verify_isCompleted: false,
                            verify_current: 0,
                            verify_loading: true,
                            ...permissions.states.signup,
                            inputs: {
                                ...inputsJSON
                            }
                        }));
                        
                    } else {
                        dispatch(update_verify({
                            verify_isCompleted: false,
                            verify_current: 0,
                            verify_loading: true,
                            ...permissions.states.signup
                        }));
                    }
                } else {
                    const item = localStorage.getItem('verify_user_formData');
                    if( item ) {
                        const inputsJSON = JSON.parse(item);
                        
                        dispatch(update_verify({
                            verify_isCompleted: false,
                            verify_current: 0,
                            verify_loading: true,
                            ...permissions.states.signup,
                            inputs: {
                                ...inputsJSON
                            }
                        }));
                        
                    } else {
                        dispatch(update_verify({
                            verify_isCompleted: false,
                            verify_current: 0,
                            verify_loading: true,
                            ...permissions.states.signup
                        }));
                    }
                }

                setApp(<VerifyBootstrap />);

            } else {
                setApp(<CenterLoading text={error_message} />);
            }

        }).catch((err) => {
            const { error, error_message } = err;
            console.error(err);
            setApp(<CenterLoading text={error_message} />);
        });
        
    };


    useEffect(() => { 
        
        if(!verify_loading){
            if(verify_steps.length > 0) {              
                localStorage.setItem('verify_user_formData',JSON.stringify({ ...inputs }));
            }
        }
        
    },[verify_steps, verify_loading, inputs]);


    useEffect(() => {

        if(API_LOADED && AUTH_APP_LOADED && !IS_USER_LOGGED_IN){
            navigate("/");
            return;
        }

        if(API_LOADED && AUTH_APP_LOADED && IS_USER_LOGGED_IN && IS_USER_VERIFIED && VERIFY_LOADED ){
            navigate("/dashboard");
            return;
        }

        if(API_LOADED && AUTH_APP_LOADED && IS_USER_LOGGED_IN && !IS_USER_VERIFIED && VERIFY_LOADED){
            loadSignupForm();
            return;
        }
    },[IS_USER_LOGGED_IN, IS_USER_VERIFIED, AUTH_APP_LOADED, API_LOADED, VERIFY_LOADED ]);

    return (<>
        <Helmet>
            <link href="/css/dashboard.layout.css" type="text/css" rel="stylesheet" />
        </Helmet>
        <ApiNavbarSetup />
        <GradientContainer className="justify-content-center align-items-center content d-flex flex-column flex-column-fluid gradient-bg">
            {app}
        </GradientContainer>
    </>);
};

export default Setup;