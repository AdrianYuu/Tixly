import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/payment/:id',
    name: 'Payment',
    component: React.lazy(() => import('./Payment')),
    exact: true,
  },
];

export default routes;