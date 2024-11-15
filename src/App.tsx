import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ROUTES from './configs/RouteConfig';
import MainLayout from './layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notfound from './views/Notfound/Notfound';

const App = () => {
  return (
    <HelmetProvider>
      <ToastContainer></ToastContainer>
      <UserProvider>
        <Router>
          <React.Suspense
            fallback={
              <div className="text-black w-full min-h-screen flex justify-center items-center font-bold">
                Loading...
              </div>
            }
          >
            <Routes>
              {ROUTES.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <MainLayout>
                      <route.component />
                    </MainLayout>
                  }
                />
              ))}

              <Route path="*" element={<Notfound />} />
            </Routes>
          </React.Suspense>
        </Router>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;
