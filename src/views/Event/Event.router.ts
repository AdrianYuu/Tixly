import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/event',
    name: 'Event',
    component: React.lazy(() => import('./Event')),
    exact: true,
  },
];

export default routes;
