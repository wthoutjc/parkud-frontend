// Redux
import { useAppSelector } from "../../hooks";

// Components
import { Client, Admin, SuperAdmin, Operator } from "../../components";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { hierarchy } = user;

  if (hierarchy === "A") return <Admin />;
  else if (hierarchy === "C") return <Client />;
  else if (hierarchy === "O") return <Operator />;
  else if (hierarchy === "S") return <SuperAdmin />;
};

export { Home };
