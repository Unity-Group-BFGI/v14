import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import themeSlice from './slices/theme.slice';
import menuSlice from './slices/menu.slice';
import constantsSlice from './slices/constants.slice';
import ieltslmsSlice from './slices/ieltslms.slice';
import loaderSlice from './slices/loader.slice';
import modalsSlice from './slices/modals.slice';
import domainSlice from './slices/domain.slice';
import servicesSlice from './slices/services.slice';
import marketSlice from './slices/market.slice';

const store =  configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice,
        menu: menuSlice,
        constants: constantsSlice,
        ieltslms: ieltslmsSlice,
        loader: loaderSlice,
        modals: modalsSlice,
        domain: domainSlice,
        services: servicesSlice,
        market: marketSlice 
    }
});

export default store;