// Interfaces
import { IRoute } from "../interfaces";

const privateRoutes: IRoute[] = [
  {
    path: "/profile",
    name: "Profile",
    component: <>Profile</>,
    exact: true,
  },
];

export { privateRoutes };
