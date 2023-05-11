import { useEffect } from "react";

// Auth
import { useAuth } from "../hooks";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  PrivateRouter,
  PublicRouter,
  publicRoutes,
  privateRoutes,
} from "../routes";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../reducers";

const AuthRouter = () => {
  const dispatch = useAppDispatch();

  const { logged } = useAppSelector((state) => state.auth);
  const { GetUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token-parkud");
    if (!token) dispatch(logout());
    else if (!logged && token) GetUser();
  }, [dispatch, GetUser, logged]);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouter />}>
          {privateRoutes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
        <Route element={<PublicRouter />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export { AuthRouter };
