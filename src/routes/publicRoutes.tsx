// Interfaces
import { IRoute } from "../interfaces";

const publicRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <>Home aa </>,
    exact: true,
  },
  {
    path: "/login",
    name: "LogIn",
    element: <>LogIn</>,
    exact: true,
  },
];

export { publicRoutes };
