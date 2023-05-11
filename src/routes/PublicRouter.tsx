import { Outlet, Navigate } from "react-router-dom";

// Redux
import { useAppSelector } from "../hooks";

const PublicRouter = () => {
  const { logged } = useAppSelector((state) => state.auth);
  
  return !logged ? <Outlet /> : <Navigate to="/home" />;
};

export { PublicRouter };
