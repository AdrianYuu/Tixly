import IDefaultRouter from '../interfaces/IDefaultRouter';

// Area Import Component Router
import routerHome from '../views/Home/Home.router';
import routerEvent from '../views/Event/Event.router';
import routerFavorite from '../views/Favorite/Favorite.router';
import routerMyTicket from '../views/MyTicket/MyTicket.router';
import routerNotification from '../views/Notification/Notification.router';

const ROUTES: IDefaultRouter[] = [
  ...routerHome,
  ...routerEvent,
  ...routerMyTicket,
  ...routerFavorite,
  ...routerNotification,
];

export default ROUTES;
