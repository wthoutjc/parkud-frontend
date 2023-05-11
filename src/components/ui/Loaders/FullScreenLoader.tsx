import { Box, CircularProgress, Typography } from "@mui/material";

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
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircularProgress size={35} sx={{ mr: 3 }} color="primary" />
        <Typography variant="h4" color="text.disabled" fontWeight={600}>
          <i>{message}</i> , por favor espere...
        </Typography>
      </Box>
    </Box>
  );
};

export { FullScreenLoader };
