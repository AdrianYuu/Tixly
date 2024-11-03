import React from 'react';
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: '/my-wallet',
    name: 'My Wallet',
    component: React.lazy(() => import('./MyWallet')),
    exact: true,
  },
];

export default routes;