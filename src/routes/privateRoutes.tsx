// Interfaces
import { IRoute } from "../interfaces";

// Components
import { AuthLayout, Home, NewSede, SuperAdmin } from "../components";

const privateRoutes: IRoute[] = [
  {
    path: "/home",
    name: "Home",
    element: <AuthLayout children={<Home />} />,
    exact: true,
  },
  {
    path: "/superadmin",
    name: "SuperAdmin",
    element: <AuthLayout children={<SuperAdmin />} />,
    exact: true,
  },
  {
    path: "/new-sede",
    name: "Nueva sede",
    element: <AuthLayout children={<NewSede />} />,
    exact: true,
  },
];

export { privateRoutes };
