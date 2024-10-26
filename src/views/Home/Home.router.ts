import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/',
    name: 'Home',
    component: React.lazy(() => import('./Home')),
    exact: true,
  },
];

export default routes;
