// Interfaces
import { IRoute } from "../interfaces";

// Components
import { Layout, Auth, LandingPage, SuperAdmin, NewSede, NewAdministrador } from "../components";

const publicRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Layout children={<LandingPage />} />,
    exact: true,
  },
  {
    path: "/login",
    name: "LogIn",
    element: <Layout children={<Auth type={"login"} />} />,
    exact: true,
  },
  {
    path: "/signup",
    name: "SignUp",
    element: <Layout children={<Auth type={"signup"} />} />,
    exact: true,
  },
  {
    path: "/superadmin",
    name: "SuperAdmin",
    element: <Layout children={<SuperAdmin />} />,
    exact: true,
  },
  {
    path: "/newsede",
    name: "NewSede",
    element: <Layout children={<NewSede />} />,
    exact: true,
  },
  {
    path: "/newadministrador",
    name: "NewAdministrador",
    element: <Layout children={<NewAdministrador />} />,
    exact: true,
  },
];

export { publicRoutes };
