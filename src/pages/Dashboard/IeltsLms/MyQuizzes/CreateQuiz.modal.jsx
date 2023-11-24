import { update_ielts_lms } from '../../../../includes/redux-store/Slices/ieltsLms.slice';
import { ieltsLmsAddQuiz } from '../../../../includes/rest-apis';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';




const CreateQuizModal = () => {
    const dispatch = useDispatch();
    const { ADD_QUIZ_MODAL }    = useSelector( state => state.ieltsLms );
    const { WIDTH }             = useSelector(state => state.theme);
    const { USER }              = useSelector( state => state.auth );
    const [creating,setCreating] = useState(false);
    const [failed,setFailed]     = useState(false);
    const [error,setError]       = useState({
        error_message: '',
        error_type: '',
        error_code: ''
    });  
    const [titleError,setTitleError] = useState(null);
    
    

    // quiz modal stepper
    const [step,setStep] = useState(1);
    // quiz items states
    const [quizItems,setQuizItems] = useState({
        "title"         : "",
        "description"   : "",
        "category"      : "reading",
        "time"          : {
            "timer"     : true,
            "hh"        : 0,
            "mm"        : 0,
            "ss"        : 0        
        },
        "status"        : "published" 
    });
    // quiz form validation
    const [validated, setValidated] = useState(false);

    // handling close modal
    const handleClose = () => {
        if(!creating){
            if(step !== 3){
                dispatch(update_ielts_lms({
                    ADD_QUIZ_MODAL: false
                }));
                setQuizItems({
                    "title"         : "",
                    "description"   : "",
                    "category"      : "reading",
                    "time"          : {
                        "timer"         : true,    
                        "hh"            : 0,
                        "mm"            : 0,
                        "ss"            : 0
                    },
                    "status"        : "published"            
                });
                setValidated(false);
                setStep(1);
                hideErrors();
                
            }
        }
    };

    // check validation on keyup ot other events
    const checkFormValidity = () => {
        const form = document.querySelector('#create-quiz-form');
        if(form && form.checkValidity() === false){
            setValidated(true);
        }
    };

    // append quiz to list of quizzes
    const appendQuizToContext = (quiz) => {
        
    };

    const changeTime = (n,t = 0) => {
        
        if(t > -1 && t <= 60){
            setQuizItems({
                ...quizItems,
                time: {
                    ...quizItems.time,
                    timer : quizItems.category === "reading" || quizItems.category === "listening"? true : false,
                    [n]: t
                } 
            });  
        }    
    }

    // on submit from handler
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(true);
            hideErrors();
            setCreating(true);
            ieltsLmsAddQuiz({
                'Authorization': 'Bearer '+USER.accessToken,
                'x-refresh-token': USER.refreshToken,
                'x-api-token': ''
            },{
                quiz: {
                    ...quizItems
                }
            }).then((response) => {
                const { success, has_json, json, error, res } = response;
                if( success ) {
                    if(has_json && json.insert){
                        
                    } else {
                        setError({
                            error_message: res,
                            error_code: 'Alert',
                            error_type: 'warning'
                        });
                        setFailed(true);
                    }
                } else {
                    setError({
                        error_message: "Something went wrong with response",
                        error_code: "Unknown response",
                        error_type: "danger"
                    });
                    setFailed(true);
                }
            }).catch((err) => {
                const { success, error, error_type, error_message, error_code, errors } = err;
                if( error ) {

                    

                    setError({
                        error_message: error_message,
                        error_code: error_code,
                        error_type: error_type == 'error'? 'danger' : error_type
                    });
                    setFailed(true);
                    
                } else {
                    console.log('[ERROR]: UNKNOWN',err);
                    setError({
                        error_message: "Cirital errors",
                        error_code: 'Unknown',
                        error_type: 'danger'
                    });
                    setFailed(true);
                }
            }).finally(() => {
                setCreating(false);
            }); 
        } 
    };

    // hide errors
    const hideErrors = () => {
        setFailed(false);
        setError({
            error_message: '',
            error_type: '',
            error_code: ''
        });
    };

    return (
        <Modal
            show={ADD_QUIZ_MODAL}
            size="md"
            backdrop="static"
            keyboard={false}
            fullscreen={WIDTH <= 400? true : false}
            centered
        >
            <Form
                id="create-quiz-form"
                onSubmit={handleSubmit}
                style={{display:"contents"}}
                noValidate 
                validated={validated}

            >
                <div className="modal-header">
                    <h4>Create IELTS Quiz</h4>
                    {!creating &&
                    <div className="btn btn-sm btn-icon btn-active-color-primary" type="button" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>                
                    </div>}
                </div>
                <Modal.Body>
                    {step === 1 && <div className="d-flex flex-column">
                        <p className="w-100">Choose Category: <b>{quizItems.category}</b>
                        </p>
                        <div
                            className={WIDTH > 450
                            ? "d-flex flex-center flex-shrink flex-row"
                            : "d-flex flex-center flex-shrink flex-column"}>

                            <label
                                htmlFor="reading"
                                className={quizItems.category === "reading"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-succe" +
                                    "ss m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-success m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="reading"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "reading"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-4x svg-icon-lg-3x">
                                    <i className="ki-duotone ki-book-open fs-3x">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                        <span className="path4"></span>
                                    </i> 
                                </span>
                            </label>
                            <label
                                htmlFor="listening"
                                className={quizItems.category === "listening"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-prima" +
                                    "ry m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-primary m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="listening"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "listening"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    
                                </span>
                            </label>
                            <label
                                htmlFor="writing"
                                className={quizItems.category === "writing"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-warni" +
                                    "ng m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-warning m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="writing"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "writing"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    
                                </span>
                            </label>
                            <label
                                htmlFor="speaking"
                                className={quizItems.category === "speaking"
                                ? "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-dange" +
                                    "r m-4"
                                : "cursor-pointer d-flex flex-center w-100px h-100px flex-shrink-0 rounded bg-light" +
                                    "-danger m-4"}>
                                <input
                                    type="radio"
                                    className="label-active"
                                    name="category"
                                    id="speaking"
                                    style={{
                                    display: "none"
                                }}
                                    checked={quizItems.category === "speaking"}
                                    onChange={(event) => setQuizItems({
                                    ...quizItems,
                                    category: event.target.id
                                })}/>
                                <span className="svg-icon svg-icon-primary svg-icon-4x svg-icon-lg-3x">
                                    
                                </span>
                            </label>
                        </div>
                    </div>}
                    {step === 2 && <div className="bs-hidden">
                        {failed && !creating &&        
                        <div className="error-box">

                            {/*--begin::Alert--*/}
                            <div className={`alert alert-dismissible bg-light-${error.error_type} d-flex flex-column flex-sm-row p-5 mb-10`}>
                                {/*--begin::Icon--*/}
                                <i className={`ki-duotone ki-notification-bing fs-2hx text-${error.error_type} me-4 mb-5 mb-sm-0`}>
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                </i>
                                {/*--end::Icon--*/}

                                {/*--begin::Wrapper--*/}
                                <div className="d-flex flex-column pe-0 pe-sm-10">
                                    {/*--begin::Title--*/}
                                    <h4 className="fw-semibold">{error.error_code}</h4>
                                    {/*--end::Title--*/}

                                    {/*--begin::Content--*/}
                                    <span>{error.error_message}</span>
                                    {/*--end::Content--*/}
                                </div>
                                {/*--end::Wrapper--*/}

                                {/*--begin::Close--*/}
                                <button type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" onClick={hideErrors}>
                                    <i className={`ki-duotone ki-cross fs-1 text-${error.error_type}`}>
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                </button>
                                {/*--end::Close--*/}
                            </div>
                            {/*--end::Alert--*/}



                        </div>}       


                        <FloatingLabel
                            className="mb-2 validate-label"
                            controlId="floatingInput"
                            label="Add title">
                            <Form.Control
                                size="small"
                                type="text"
                                required
                                placeholder="Add title"
                                value={quizItems.title}
                                className="form-control-solid"
                                onKeyUp={checkFormValidity}
                                onChange={(event) => setQuizItems({
                                ...quizItems,
                                title: event.target.value
                            })}/>
                            <Form.Control.Feedback type="invalid">{titleError || 'Please add quiz title'}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Short description (Optional)">
                            <Form.Control
                                as="textarea"
                                placeholder="Short description (Optional)"
                                style={{
                                height: '100px'
                            }}
                                value={quizItems.description}
                                className="form-control-solid"
                                onChange={(event) => setQuizItems({
                                ...quizItems,
                                description: event.target.value
                            })}/>
                        </FloatingLabel>

                        {(quizItems.category === "reading" || quizItems.category === "listening") && 
                        <div className="row mt-4 b-1px-dashed p-4">
                            <label className="form-label mb-3">Quiz time (minuts)</label>
                            <div className="position-relative col-12">

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 start-0 mx-3"
                                    onClick={() => changeTime("mm", + quizItems.time.mm - 1)}
                                >

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                                <input
                                    type="number"
                                    className="no-valdiations form-control form-control-solid border-0 text-center"
                                    placeholder="MM"
                                    name="hh"
                                    value={quizItems.time.mm}
                                    min="0"
                                    max="60"
                                    onChange={(event) => changeTime("mm", + event.target.value)}/>

                                <button
                                    type="button"
                                    className="btn btn-icon btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0 mx-3"
                                    onClick={() => changeTime("mm", + quizItems.time.mm + 1)}>

                                    <span className="svg-icon svg-icon-1">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.3"
                                                x="2"
                                                y="2"
                                                width="20"
                                                height="20"
                                                rx="5"
                                                fill="currentColor"></rect>
                                            <rect
                                                x="10.8891"
                                                y="17.8033"
                                                width="12"
                                                height="2"
                                                rx="1"
                                                transform="rotate(-90 10.8891 17.8033)"
                                                fill="currentColor"></rect>
                                            <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>

                                </button>

                            </div>

                        </div>}

                    </div>}
                    {step === 3 && <div className="d-flex align-items-center justify-center">

                        <Spinner animation="border" variant="primary"/>

                    </div>}

                </Modal.Body>
                {step !== 3 && <Modal.Footer className="flex flex-stack">

                    {step === 2 && <Button
                        variant="primary"
                        disabled={creating}
                        className="btn-sm btn-light-primary pull-left"
                        onClick={() => setStep(1)}>Change category
                    </Button>}
                    <div></div>
                    {step === 2 && <Button 
                        variant="primary" 
                        className="btn-sm pull-left" 
                        type="submit"
                        disabled={creating}
                        >
                        Add Quiz
                    </Button>}
                    {step === 1 && <Button
                        variant="primary"
                        disabled={creating}
                        className="btn-sm btn-light-primary pull-right"
                        onClick={() => setStep(2)}> Next
                    </Button>}

                </Modal.Footer>}
            </Form>
        </Modal>
    );
};

export default CreateQuizModal;