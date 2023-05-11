import { Box, Typography } from "@mui/material";

// Images
import errorImg from "../../../styles/img/cancelar.png";

const ResponsiveError = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "primary.light",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 150,
          mb: 2,
        }}
      >
        <img
          src={errorImg}
          alt="error-parkud"
          style={{
            width: "100%",
          }}
        />
      </Box>
      <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
        Error :(
      </Typography>
      <Typography
        variant="body2"
        fontSize={25}
        fontWeight={400}
        color="text.secondary"
      >
        Por favor, utiliza un dispositivo con una resolución mayor a 1500px
      </Typography>
    </Box>
  );
};

export { ResponsiveError };
