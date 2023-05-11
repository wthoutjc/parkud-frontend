import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

// Auth
import { useAuth } from "../hooks";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../reducers";

const PrivateRouter = () => {
  const dispatch = useAppDispatch();

  const [redirect, setRedirect] = useState(false);

  const { logged } = useAppSelector((state) => state.auth);
  const { GetUser } = useAuth();

  const { request } = useAppSelector((state) => state.ui);
  const { loading } = request;

  useEffect(() => {
    const token = localStorage.getItem("token-parkud");

    if (!token) {
      dispatch(logout());
      return;
    }

    if (!logged && token && !loading) GetUser().then(() => setRedirect(true));
  }, [dispatch, GetUser, logged, loading]);

  return logged ? <Outlet /> : redirect && <Navigate to="/login" />;
};

export { PrivateRouter };
