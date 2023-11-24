import { LoadEditorLight } from '../../../../../components/default/Editor';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update_question_plan_map_diagram_labelling } from '../../../../../includes/redux-store/Slices/ieltsLms.slice';

const QuestionMainPlanMapDiagramLabelling = () => {
    const toolbar                                               = ``;
    const dispatch                                              = useDispatch();
    const { IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING }     = useSelector( state => state.ieltsLms );
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const setHtml = (html) => {
        dispatch(update_question_plan_map_diagram_labelling({
            QUESTION:{
                ...IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING.QUESTION,
                HTML: html
            }
        }));
    };

    useEffect(() => {
        setHtmlEditor(<LoadEditorLight toolbar={toolbar} html={IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING.QUESTION.HTML} setHtml={setHtml} />);
    },[]);

    return (<>
        {IELTS_LMS_QUESTION_PLAN_MAP_DIAGRAM_LABELLING_READING.QUESTION_SETTINGS.QUESTION_LAYOUT === "fillup" && <>
            <div className="step-1 steps tab-step__padding mb-10">
                <div className="step__controller row">
                    <div className="col-md-12 mb-6">
                        <label htmlFor="question-html" className='required'>Question (html)</label>
                        {htmlEditor}
                    </div>
                </div>
            </div>
        </>}
    </>);
};

export { QuestionMainPlanMapDiagramLabelling };