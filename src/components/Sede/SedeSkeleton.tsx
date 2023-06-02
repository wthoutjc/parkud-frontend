import { Box, Typography, Skeleton } from "@mui/material";

const SedeSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" sx={{ mb: 2 }} fontWeight={800}>
        Sede - Cargando...
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} />

        <Box>
          <Skeleton variant="rounded" width={"100%"} height={60} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={60} />
          <Skeleton variant="rounded" width={"100%"} height={60} />
        </Box>
      </Box>

      <Box>
        <Skeleton variant="rounded" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} />
      </Box>
      <Skeleton variant="rounded" width={"100%"} height={60} />

      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rounded" width={"100%"} height={60} />
      </Box>

      <Skeleton variant="rounded" width={"100%"} height={60} />
    </Box>
  );
};

export { SedeSkeleton };
