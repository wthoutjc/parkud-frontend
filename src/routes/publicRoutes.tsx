// Interfaces
import { IRoute } from "../interfaces";

// Components
import { Layout, Auth, LandingPage, Admin, Operator } from "../components";

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
    path: "/temp-admin",
    name: "Temporal Admin",
    element: <Layout children={<Admin />} />,
    exact: true,
  },
  {
    path: "/temp-operator/:id",
    name: "Temporal Operator",
    element: <Layout children={<Operator />} />,
    exact: true,
  },
];

export { publicRoutes };
