import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

// Auth
import { useAuth } from "../hooks";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../reducers";

const PrivateRouter = () => {
  const dispatch = useAppDispatch();

  const { logged } = useAppSelector((state) => state.auth);
  const { GetUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token-parkud");

    if (!token) dispatch(logout());
    else if (!logged && token) GetUser();
  }, [dispatch, GetUser, logged]);

  return logged ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRouter };
