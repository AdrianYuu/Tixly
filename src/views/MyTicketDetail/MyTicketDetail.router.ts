import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/my-ticket-detail/:id',
    name: 'My Ticket Detail',
    component: React.lazy(() => import('./MyTicketDetail')),
    exact: true,
  },
];

export default routes;
