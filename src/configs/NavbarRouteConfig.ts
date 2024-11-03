interface INavbarRoute {
  path: string;
  name: string;
  needAuthorized?: boolean;
}

export const NAVBAR_ROUTES: INavbarRoute[] = [
  {
    path: '/',
    name: 'Home',
    needAuthorized: false,
  },
  {
    path: '/tickets',
    name: 'Tickets',
    needAuthorized: false,
  },
  {
    path: '/my-tickets',
    name: 'My Tickets',
    needAuthorized: false,
  },
  {
    path: '/create-activities',
    name: 'Create Activities',
    needAuthorized: false,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    needAuthorized: false,
  },
  // {
  //   path: '/notification',
  //   name: 'Notification',
  //   needAuthorized: true,
  // },
  // {
  //   path: '/wallet',
  //   name: 'Wallet',
  //   needAuthorized: true,
  // },
  // {
  //   path: '/wishlist',
  //   name: 'Wishlist',
  //   needAuthorized: true,
  // },
];
