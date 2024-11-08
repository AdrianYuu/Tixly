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
];
