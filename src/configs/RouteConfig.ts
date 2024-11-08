import IDefaultRouter from '../interfaces/IDefaultRouter';

// Area Import Component Router
import routerHome from '../views/Home/Home.router';
import routerMyTickets from '../views/MyTickets/MyTickets.router';
import routerNotification from '../views/Notification/Notification.router';
import routerMyTicketDetail from '../views/MyTicketDetail/MyTicketDetail.router';
import routerTicketDetail from '../views/TicketDetail/TicketDetail.router';
import routerTickets from '../views/Tickets/Tickets.router';
import routerPayment from '../views/Payment/Payment.router';
import routerCreateActivities from '../views/CreateActivities/CreateActivities.router';
import routerMyWallet from '../views/MyWallet/MyWallet.router';
import routerWishlist from '../views/Wishlist/Wishlist.router';
import routerNotfound from '../views/Notfound/Notfound.router';

const ROUTES: IDefaultRouter[] = [
  ...routerHome,
  ...routerTickets,
  ...routerMyTickets,
  ...routerCreateActivities,
  ...routerNotification,
  ...routerMyTicketDetail,
  ...routerTicketDetail,
  ...routerPayment,
  ...routerMyWallet,
  ...routerWishlist,
  ...routerNotfound,
];

export default ROUTES;
