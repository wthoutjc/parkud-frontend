// Interfaces
import { IRoute } from "../interfaces";

// Components
import { Layout, Auth } from "../components";

const publicRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Layout children={<>Home aa </>} />,
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
];

export { publicRoutes };
