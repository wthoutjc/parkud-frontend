// TODO: Verificar que se pueda añadir sede y usuario
import "./styles/styles.scss";
import "animate.css";

// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./themes";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Components
import { Notifications } from "./components";

// Router
import { AuthRouter } from "./routes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={store}>
        <CssBaseline />
        <Notifications />
        <AuthRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
