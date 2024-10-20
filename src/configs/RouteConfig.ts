import IDefaultRouter from '../interfaces/IDefaultRouter';

// Area Import Component Router
import routerLogin from '../views/Login/Login.router';
import routerRegister from '../views/Register/Register.router';

const ROUTES: IDefaultRouter[] = [...routerLogin, ...routerRegister];

export default ROUTES;
