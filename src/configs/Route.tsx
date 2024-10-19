import { IDefaultRouter } from "../interfaces/IDefaultRouter";

// Area Import Component Router
import routerLogin from '../views/Login/Login.router';

export const routes: IDefaultRouter[] = [
    ...routerLogin
]

export default routes;