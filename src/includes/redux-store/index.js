import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './Slices/Api.slice';
import authSlice from './Slices/Auth.slice';
import themeSlice from './Slices/Theme.slice';
import verifySlice from './Slices/Verify.slice';
import dashboardSlice from './Slices/Dashboard.slice';
import routeSlice from './Slices/Route.slice';
import myAccountSlice from './Slices/MyAccount.slice';
import ieltsLmsSlice from './Slices/ieltsLms.slice';


const store =  configureStore({
    reducer: {
        api: apiSlice,
        auth: authSlice,
        theme: themeSlice,
        verify: verifySlice,
        dashboard: dashboardSlice,
        route: routeSlice,
        myAccount: myAccountSlice,
        ieltsLms: ieltsLmsSlice
    },
});

export default store;