import { update_ielts_lms } from "../../../includes/redux-store/Slices/ieltsLms.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const DynamicHeaderControls = () => {
    const dispatch = useDispatch();
    const [action,currentAction] = useState(null);
    const { DASHBOARD_CURRENT_ACTIVE_SUBMENU } = useSelector( state => state.dashboard );
    useEffect(() => {
        if(DASHBOARD_CURRENT_ACTIVE_SUBMENU && DASHBOARD_CURRENT_ACTIVE_SUBMENU.actions) {
            const { header } = DASHBOARD_CURRENT_ACTIVE_SUBMENU.actions;
            currentAction(header || null);
        } else {
            currentAction(null);
        }

        return () => { currentAction(null); }
    },[DASHBOARD_CURRENT_ACTIVE_SUBMENU]);
    return (<>
        {action && action.length > 0 && action.map((ac,index) => {
            switch(ac) {
                case "create-quiz-modal":
                    return <div className="d-flex ms-3" key={index}>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => dispatch(update_ielts_lms({
                            ADD_QUIZ_MODAL: true
                        }))}>
                            <i className="fa fa-plus"></i> Add New Quiz
                        </button>
                    </div>
                default: 
                    return <React.Fragment key={index} />
                    
            }
        })}
        
    </>);
};

export default DynamicHeaderControls;