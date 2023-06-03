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
  NewOperator,
  Reserva,
  BlockedUsers,
  UserTraceability,
  GenerateReports,
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
  {
    path: "/new-operator",
    name: "New Operator",
    element: <AuthLayout children={<NewOperator />} />,
    exact: true,
  },
  {
    path: "/reserva/:id",
    name: "Reserva",
    element: <AuthLayout children={<Reserva />} />,
    exact: true,
  },
  {
    path: "/blocked-users",
    name: "Usuarios bloqueados",
    element: <AuthLayout children={<BlockedUsers />} />,
    exact: true,
  },
  {
    path: "/user-traceability",
    name: "Trazabilidad de usuarios",
    element: <AuthLayout children={<UserTraceability />} />,
    exact: true,
  },
  {
    path: "/reports",
    name: "Generar reportes",
    element: <AuthLayout children={<GenerateReports />} />,
    exact: true,
  },
];

export { privateRoutes };
