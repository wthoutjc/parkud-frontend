import { Outlet, Navigate } from "react-router-dom";

// Redux
import { useAppSelector } from "../hooks";

const PrivateRouter = () => {
  const { logged } = useAppSelector((state) => state.auth);

  return logged ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRouter };
