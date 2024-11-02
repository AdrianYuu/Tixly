import IDefaultRouter from '../interfaces/IDefaultRouter';

// Area Import Component Router
import routerHome from '../views/Home/Home.router';
import routerEvent from '../views/Event/Event.router';
import routerFavorite from '../views/Favorite/Favorite.router';
import routerMyTicket from '../views/MyTicket/MyTicket.router';
import routerNotification from '../views/Notification/Notification.router';
import routerMyTicketDetail from '../views/MyTicketDetail/MyTicketDetail.router';
import routerTicketDetail from '../views/TicketDetail/TicketDetail.router';
import routerTickets from '../views/Tickets/Tickets.router';

const ROUTES: IDefaultRouter[] = [
  ...routerHome,
  ...routerEvent,
  ...routerMyTicket,
  ...routerFavorite,
  ...routerNotification,
  ...routerMyTicketDetail,
  ...routerTicketDetail,
  ...routerTickets,
];

export default ROUTES;
