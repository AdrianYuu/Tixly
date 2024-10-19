import React from 'react';
import { IDefaultRouter } from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('./Login')),
    exact: true,
  },
];
export default routes;