import store from './includes/redux/store';

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import App from './App';
const Signin          = React.lazy(() => import('./views/auth/Signin'));
const Signup          = React.lazy(() => import('./views/auth/Signup'));
const DashboardLayout = React.lazy(() => import('./layouts/Dashboard'));
const AuthLayout      = React.lazy(() => import('./layouts/Auth'));
const FocusLayout     = React.lazy(() => import('./layouts/Focus'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.Fragment>
  <Provider store={store}>
    <FocusLayout>
      <App>
        <Suspense fallback={<>Loading...</>}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/signin" name="Signin Page" element={<Signin />} />
              <Route exact path="/signup" name="Signup Page" element={<Signup />} />
              <Route exact path="/dashboard/*" name="Dashboard page" element={<DashboardLayout />} />
              <Route path="*" name="Dashboard" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </App>
    </FocusLayout>
  </Provider>
</React.Fragment>);

