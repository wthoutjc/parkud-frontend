// Interfaces
import { IRoute } from "../interfaces";

// Components
import {
  AuthLayout,
  Home,
  NewAdmin,
  NewSede,
  SuperAdmin,
  Sede,
  Operator,
  UpdateSede,
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
    path: "/update-sede",
    name: "Nueva sede",
    element: <AuthLayout children={<UpdateSede />} />,
    exact: true,
  },
  {
    path: "/new-administrador",
    name: "NewAdmin",
    element: <AuthLayout children={<NewAdmin />} />,
    exact: true,
  },
  {
    path: "/sede/:idSede",
    name: "Sede",
    element: <AuthLayout children={<Sede />} />,
    exact: true,
  },
  {
    path: "/operator/:id",
    name: "Operator",
    element: <AuthLayout children={<Operator />} />,
    exact: true,
  },
];

export { privateRoutes };
