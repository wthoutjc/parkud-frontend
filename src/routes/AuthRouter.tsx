import { useState, useEffect } from "react";
// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  PrivateRouter,
  PublicRouter,
  publicRoutes,
  privateRoutes,
} from "../routes";

// Redux
import { useAppSelector } from "../hooks";

// Components
import { FullScreenLoader, ResponsiveError } from "../components";

const AuthRouter = () => {
  const [responsiveError, setResponsiveError] = useState(false);

  const { request } = useAppSelector((state) => state.ui);
  const { message, loading } = request;

  useEffect(() => {
    addEventListener("resize", () => {
      setResponsiveError(window.innerWidth <= 1250 ? true : false);
    });

    return () => {
      removeEventListener("resize", () => {
        setResponsiveError(window.innerWidth <= 1250 ? true : false);
      });
    };
  }, []);

  if (responsiveError) return <ResponsiveError />;

  return (
    <>
      {loading && <FullScreenLoader message={message} />}
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
    </>
  );
};

export { AuthRouter };
