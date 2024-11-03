interface INavbarRoute {
  path: string;
  name: string;
  needAuthorized?: boolean;
  dropdownProperty?: boolean;
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
  {
    path: '/notification',
    name: 'Notification',
    needAuthorized: true,
    dropdownProperty: true
  },
  {
    path: '/wallet',
    name: 'Wallet',
    needAuthorized: true,
    dropdownProperty: true
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    needAuthorized: true,
    dropdownProperty: true
  },
];
