import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/tickets',
    name: 'Tickets',
    component: React.lazy(() => import('./Tickets')),
    exact: true,
  },
];

export default routes;
