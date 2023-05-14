import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

// Redux
import { useAppSelector } from "../hooks";

const PublicRouter = () => {
  const navigate = useNavigate();
  const { logged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token-parkud");
    if (token) return navigate("/home");
  }, [navigate]);

  useEffect(() => {
    console.log(logged);
  }, [logged])

  return !logged ? <Outlet /> : <Navigate to="/home" />;
};

export { PublicRouter };
