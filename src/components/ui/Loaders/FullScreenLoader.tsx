import { Box, CircularProgress, Typography } from "@mui/material";

// Images
import logo from "../../../styles/img/logo.png";

interface Props {
  message: string;
}

const FullScreenLoader = ({ message }: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box className="animate__animated animate__lightSpeedInLeft">
          <img src={logo} alt="logo" width="100" />
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <CircularProgress size={35} sx={{ mr: 3 }} />
          <Typography variant="h4" fontWeight={600}>
            <i>{message}</i> , por favor espere...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { FullScreenLoader };
