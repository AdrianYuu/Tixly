import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ROUTES from './configs/RouteConfig';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {ROUTES.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </React.Suspense>
      </Router>
    </UserProvider>
  );
};

export default App;
