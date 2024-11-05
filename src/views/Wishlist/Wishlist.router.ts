import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: React.lazy(() => import('./Wishlist')),
    exact: true,
  },
];

export default routes;
