// Interfaces
import { IRoute } from "../interfaces";

// Components
import {
  AuthLayout,
  Home,
  NewAdministrador,
  NewSede,
  SuperAdmin,
  Sede,
} from "../components";

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
  {
    path: "/new-administrador",
    name: "NewAdministrador",
    element: <AuthLayout children={<NewAdministrador />} />,
    exact: true,
  },
  {
    path: "/sede/:idSede",
    name: "Sede",
    element: <AuthLayout children={<Sede />} />,
    exact: true,
  },
];

export { privateRoutes };
