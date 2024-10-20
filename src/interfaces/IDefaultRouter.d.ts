interface IDefaultRouter {
  path: string;
  name: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  exact?: boolean;
}

export default IDefaultRouter;
