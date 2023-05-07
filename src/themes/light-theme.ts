import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#177ca8",
      light: "#d6efed",
      contrastText: "#f8efed",
      dark: "#144e84",
    },
    secondary: {
      main: '#85c3dd',
      dark: "#7055a6",
      light: "#bdbcdb",
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
//     mode: 'light',
//     primary: {
//       main: '#177ca8',
//       light: '#85c3dd',
//       contrastText: '#f8efed',
//       dark: '#144e84',
//     },
//     secondary: {
//       main: '#cb6dd9',
//       dark: '#7055a6',
//       light: '#ff95f3',
//       contrastText: '#f8efed',
//     },
//     background: {
//       default: '#f8efed',
//       paper: '#d6efed',
//     },
//     text: {
//       primary: '#144e84',
//       secondary: '#177ca8',
//       disabled: '#85c3dd',
//     },
//   },
// };
