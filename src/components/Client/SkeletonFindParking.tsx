import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";

const SkeletonFindParking = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CircularProgress size={25} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Buscando sedes...
        </Typography>
      </Box>
      <Skeleton variant="text" width={"100%"} height={200} />
    </Box>
  );
};

export { SkeletonFindParking };
