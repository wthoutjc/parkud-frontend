// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./themes";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// React Router DOM
import { publicRoutes } from "./routes";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    publicRoutes.map((route, index) => <Route key={index} {...route} />)
  )
);

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
