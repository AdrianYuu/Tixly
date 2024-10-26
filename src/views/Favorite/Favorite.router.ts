import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/favorite',
    name: 'Favorite',
    component: React.lazy(() => import('./Favorite')),
    exact: true,
  },
];

export default routes;
