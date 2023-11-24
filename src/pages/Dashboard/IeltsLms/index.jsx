import { Outlet } from "react-router-dom";
import { IeltsLmsLayout } from "../../../layouts";

import IeltsLmsMyQuizzes from "./MyQuizzes";
import { EditQuiz } from "./Edit";




const IeltsLms = () => {
    return (<>
        <IeltsLmsLayout>
            <Outlet />
        </IeltsLmsLayout>
    </>)
};

export { 
    IeltsLms,
    IeltsLmsMyQuizzes,
    EditQuiz as IeltsLmsEditQuiz 
};