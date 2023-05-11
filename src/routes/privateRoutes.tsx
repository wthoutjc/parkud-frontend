// Interfaces
import { IRoute } from "../interfaces";

// Components
import { AuthLayout, Home } from "../components";

const privateRoutes: IRoute[] = [
  {
    path: "/home",
    name: "Home",
    element: <AuthLayout children={<Home />} />,
    exact: true,
  },
];

export { privateRoutes };
