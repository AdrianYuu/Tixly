import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/my-tickets',
    name: 'My Tickets',
    component: React.lazy(() => import('./MyTickets')),
    exact: true,
  },
];

export default routes;
