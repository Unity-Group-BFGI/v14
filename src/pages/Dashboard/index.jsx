import { Outlet } from 'react-router-dom';
import { LayoutSwitcher } from '../../layouts';

import {
    MyAccount,
    MyAccountOverview,
    MyAccountSettings
} from './MyAccount';

import {
    IeltsLms,
    IeltsLmsMyQuizzes,
    IeltsLmsEditQuiz
} from './IeltsLms';



const Dashboard = () => {
    return (<LayoutSwitcher type={"dashboard"}>
        <Outlet />
    </LayoutSwitcher>);
};

export { 
    Dashboard,

    MyAccount,
    MyAccountOverview,
    MyAccountSettings,

    IeltsLms,
    IeltsLmsMyQuizzes,
    IeltsLmsEditQuiz
};