import IDefaultRouter from '../interfaces/IDefaultRouter';

// Area Import Component Router
import routerHome from '../views/Home/Home.router';
import routerFavorite from '../views/Favorite/Favorite.router';
import routerMyTickets from '../views/MyTickets/MyTickets.router';
import routerNotification from '../views/Notification/Notification.router';
import routerMyTicketDetail from '../views/MyTicketDetail/MyTicketDetail.router';
import routerTicketDetail from '../views/TicketDetail/TicketDetail.router';
import routerTickets from '../views/Tickets/Tickets.router';
import routerPayment from '../views/Payment/Payment.router';
import routerCreateActivities from '../views/CreateActivities/CreateActivities.router';
import routerMyWallet from '../views/MyWallet/MyWallet.router';

const ROUTES: IDefaultRouter[] = [
  ...routerHome,
  ...routerTickets,
  ...routerMyTickets,
  ...routerCreateActivities,
  ...routerFavorite,
  ...routerNotification,
  ...routerMyTicketDetail,
  ...routerTicketDetail,
  ...routerPayment,
  ...routerMyWallet,
];

export default ROUTES;
