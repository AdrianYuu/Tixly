import { IDefaultRouter } from "../interfaces/IDefaultRouter";

// Area Import Component Router
import routerLogin from '../views/Login/Login.router';
import routerRegister from '../views/Register/Register.router';

export const routes: IDefaultRouter[] = [
    ...routerLogin,
    ...routerRegister
]

export default routes;