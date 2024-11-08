import React from "react";
import IDefaultRouter from '../../interfaces/IDefaultRouter';

const routes: IDefaultRouter[] = [
  {
    path: "*",
    exact: true,
    name: "Not Found",
    component: React.lazy(() => import("./Notfound")),
  },
];

export default routes;