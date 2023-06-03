// Redux
import { useAppSelector } from "../../hooks";

// Components
import {
  Client,
  Admin,
  SuperAdmin,
  HomeLayout,
  HomeOperator,
} from "../../components";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { hierarchy } = user;

  if (hierarchy === "A") return <HomeLayout children={<Admin />} />;
  else if (hierarchy === "C") return <HomeLayout children={<Client />} />;
  else if (hierarchy === "O") return <HomeLayout children={<HomeOperator />} />;
  else if (hierarchy === "S") return <HomeLayout children={<SuperAdmin />} />;
  else return <HomeLayout children={<Client />} />;
};

export { Home };
