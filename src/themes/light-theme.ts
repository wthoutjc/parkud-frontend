import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f8efed",
      light: "#d6efed",
      contrastText: "#144e84",
    },
    secondary: {
      main: "#144e84",
      light: "#177ca8",
      contrastText: "#f8efed",
    },
    background: {
      default: "#f8efed",
      paper: "#d6efed",
    },
    text: {
      primary: "#144e84",
      secondary: "#177ca8",
      disabled: "#85c3dd",
    },
  },
});

export { lightTheme };

// {
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#144e84",
//       light: "#177ca8",
//       contrastText: "#f8efed",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#f8efed",
//       paper: "#d6efed",
//     },
//     text: {
//       primary: "#144e84",
//       secondary: "#177ca8",
//       disabled: "#85c3dd",
//     },
//   },
// }
