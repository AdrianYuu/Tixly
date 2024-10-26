import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/my-ticket',
    name: 'My Ticket',
    component: React.lazy(() => import('./MyTicket')),
    exact: true,
  },
];

export default routes;
