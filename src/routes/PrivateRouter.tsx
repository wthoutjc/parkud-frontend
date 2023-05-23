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
  const { GetUser, status } = useAuth();
  console.log(status.updatePassword);

  const { request } = useAppSelector((state) => state.ui);
  const { loading } = request;

  useEffect(() => {
    const token = localStorage.getItem("token-parkud");
    const tokenUp = localStorage.getItem("token-up");

    if (!token && !tokenUp) {
      setRedirect(true);
      dispatch(logout());
      return;
    }

    if (!logged && token && !loading) GetUser().then(() => setRedirect(false));
  }, [dispatch, GetUser, logged, loading]);

  return logged ? <Outlet /> : redirect ? <Navigate to="/login" /> : null;
};

export { PrivateRouter };
