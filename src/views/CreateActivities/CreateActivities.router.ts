import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/create-activities',
    name: 'Create Activities',
    component: React.lazy(() => import('./CreateActivities')),
    exact: true,
  },
];

export default routes;
