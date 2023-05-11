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
import { FullScreenLoader } from "../components";

const AuthRouter = () => {
  const { request } = useAppSelector((state) => state.ui);
  const { message, loading } = request;

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
