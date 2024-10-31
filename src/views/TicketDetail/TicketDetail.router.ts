import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/ticket-detail/:id',
    name: 'Ticket Detail',
    component: React.lazy(() => import('./TicketDetail')),
    exact: true,
  },
];

export default routes;
