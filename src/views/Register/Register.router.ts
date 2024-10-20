import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/register',
    name: 'Register',
    component: React.lazy(() => import('./Register')),
    exact: true,
  },
];

export default routes;
