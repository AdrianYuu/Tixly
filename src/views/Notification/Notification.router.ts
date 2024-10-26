import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/notification',
    name: 'Notification',
    component: React.lazy(() => import('./Notification')),
    exact: true,
  },
];

export default routes;
